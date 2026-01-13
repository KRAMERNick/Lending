import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e4ef8ce5/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-e4ef8ce5/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return c.json({ error: "Имя и телефон обязательны" }, 400);
    }

    // Store the submission in KV store
    const timestamp = new Date().toISOString();
    const key = `contact_${timestamp}_${phone.replace(/\D/g, '')}`;
    
    await kv.set(key, {
      name,
      phone,
      message: message || '',
      timestamp,
      status: 'new'
    });

    console.log(`New contact form submission: ${name} (${phone})`);

    // Send email notification via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    // Detailed logging for debugging
    console.log('=== RESEND API KEY DEBUG ===');
    console.log(`API Key exists: ${!!resendApiKey}`);
    console.log(`API Key length: ${resendApiKey?.length || 0}`);
    console.log(`API Key starts with 're_': ${resendApiKey?.startsWith('re_')}`);
    console.log(`API Key (first 10 chars): ${resendApiKey?.substring(0, 10) || 'N/A'}`);
    console.log(`API Key (last 5 chars): ${resendApiKey?.substring(resendApiKey.length - 5) || 'N/A'}`);
    console.log('===========================');
    
    if (resendApiKey) {
      try {
        // Trim whitespace from API key
        const trimmedApiKey = resendApiKey.trim();
        
        console.log('Attempting to send email via Resend...');
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${trimmedApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Сайт Николая Бокарева <onboarding@resend.dev>',
            to: ['hunternicke@mail.ru'],
            subject: `Новая заявка на урок от ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #292524;">Новая заявка на урок барабанов</h2>
                <div style="background-color: #f5f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>Имя:</strong> ${name}</p>
                  <p style="margin: 10px 0;"><strong>Телефон:</strong> ${phone}</p>
                  ${message ? `<p style="margin: 10px 0;"><strong>Сообщение:</strong> ${message}</p>` : ''}
                  <p style="margin: 10px 0; color: #78716c;"><strong>Дата:</strong> ${new Date(timestamp).toLocaleString('ru-RU')}</p>
                </div>
                <p style="color: #57534e;">Свяжитесь с клиентом в ближайшее время!</p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #e7e5e4;">
                <p style="color: #a8a29e; font-size: 12px;">Письмо отправлено на hunternicke@mail.ru. Вы можете настроить автопересылку на bn-school@yandex.ru в настройках почты.</p>
              </div>
            `
          })
        });

        console.log(`Resend API response status: ${emailResponse.status}`);
        
        const emailData = await emailResponse.json();
        console.log('Resend API response:', JSON.stringify(emailData));

        if (!emailResponse.ok) {
          console.error('Error sending email via Resend:', emailData);
          return c.json({ 
            success: true, 
            message: "Заявка сохранена, но письмо не отправлено. Ошибка Resend: " + JSON.stringify(emailData),
            emailError: emailData
          });
        } else {
          console.log('Email sent successfully via Resend');
        }
      } catch (emailError) {
        console.error('Error while sending email notification:', emailError);
        return c.json({ 
          success: true, 
          message: "Заявка сохранена, но произошла ошибка при отправке письма: " + String(emailError),
          emailError: String(emailError)
        });
      }
    } else {
      console.warn('RESEND_API_KEY not configured - email notification skipped');
      return c.json({ 
        success: true, 
        message: "Заявка сохранена, но RESEND_API_KEY не настроен" 
      });
    }

    return c.json({ 
      success: true, 
      message: "Заявка успешно отправлена! Я свяжусь с вами в ближайшее время." 
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ 
      error: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь через WhatsApp/Telegram." 
    }, 500);
  }
});

// Get all contact form submissions (admin endpoint)
app.get("/make-server-e4ef8ce5/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_');
    
    // Sort by timestamp (newest first)
    const sortedContacts = contacts.sort((a, b) => {
      const timeA = new Date(a.timestamp || 0).getTime();
      const timeB = new Date(b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    return c.json({ 
      success: true, 
      contacts: sortedContacts,
      count: sortedContacts.length
    });

  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return c.json({ 
      error: "Произошла ошибка при получении заявок" 
    }, 500);
  }
});

Deno.serve(app.fetch);