import { Mail, Send, Check, MessageCircle, Send as SendIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SubtleBackground } from './SubtleBackground';
import whatsappIcon from '/images/whatsapp-icon.png';
import telegramIcon from '/images/telegram-icon.png';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const messengers = [
    {
      name: 'Telegram',
      link: 'https://t.me/nikolaibokarev',
      gradient: 'from-blue-600 to-sky-700',
      icon: telegramIcon
    },
    {
      name: 'WhatsApp',
      link: 'https://wa.me/79019069119',
      gradient: 'from-green-600 to-emerald-700',
      icon: whatsappIcon
    }
  ];

  const contactInfo = [
    { 
      icon: Send, 
      label: 'Телефон', 
      value: '+7 (901) 906-91-19',
      copyValue: '+79019069119',
      type: 'copy' as const
    },
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'bn-school@yandex.ru',
      copyValue: 'bn-school@yandex.ru',
      type: 'copy' as const
    },
    { 
      icon: MessageCircle, 
      label: 'Адрес', 
      value: 'Ленинградский просп., 47, стр. 1',
      link: 'https://yandex.ru/maps/?pt=37.530822,55.799806&z=17&l=map',
      type: 'link' as const
    },
  ];

  const handleCopy = (text: string, label: string) => {
    try {
      // Use execCommand method which works in iframes and doesn't require permissions
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopyFeedback(`${label} скопирован!`);
          setTimeout(() => setCopyFeedback(''), 2000);
        } else {
          // If execCommand fails, show text to copy manually
          setCopyFeedback(`Скопируйте: ${text}`);
          setTimeout(() => setCopyFeedback(''), 4000);
        }
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Show the text to user so they can copy manually
      setCopyFeedback(`Скопируйте: ${text}`);
      setTimeout(() => setCopyFeedback(''), 4000);
    }
  };

  const handleContactClick = (info: typeof contactInfo[number]) => {
    if (info.type === 'copy' && info.copyValue) {
      handleCopy(info.copyValue, info.label);
    } else if (info.type === 'link' && info.link) {
      window.open(info.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      setSubmitStatus('error');
      setStatusMessage('Пожалуйста, заполните имя и телефон');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e4ef8ce5/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message);
        setFormData({ name: '', phone: '', message: '' });
        
        // Log any email errors from server
        if (data.emailError) {
          console.error('Server email error:', data.emailError);
        }
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Произошла ошибка. Попробуйте позже.');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('Произошла ошибка при отправке. Попробуйте связаться через WhatsApp или Telegram.');
    } finally {
      setIsSubmitting(false);
      // Reset status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <SubtleBackground variant={1} />
      
      {/* Floating shapes */}
      <div className="absolute top-24 right-20 w-20 h-20 border border-stone-600/10 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-24 w-24 h-24 border border-stone-500/12 rotate-45 animate-float-slow"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-stone-600/8 animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/30 backdrop-blur-sm rounded-full mb-4 border border-stone-700/30">
            <Send className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm">Свяжитесь со мной</span>
          </div>
          <h2 className="text-stone-100 mb-4">
            Контакты
          </h2>
          <p className="text-stone-400">
            Выберите удобный способ связи и запишитесь на пробный урок
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Messenger Buttons с настоящими иконками */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto">
            {messengers.map((messenger, index) => (
              <a
                key={index}
                href={messenger.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative overflow-hidden flex flex-col items-center justify-center gap-3 p-6 rounded-2xl text-white transition-all transform hover:scale-105 shadow-lg shadow-stone-900/20 bg-gradient-to-br ${messenger.gradient}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={messenger.icon}
                    alt={`${messenger.name} logo`}
                    className="w-10 h-10 object-contain brightness-0 invert"
                  />
                </div>
                <span className="font-medium">{messenger.name}</span>
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div 
                  key={index} 
                  className="bg-stone-900/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-stone-800/20 hover:shadow-lg hover:shadow-stone-900/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  onClick={() => handleContactClick(info)}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl mb-4 shadow-lg shadow-stone-900/50">
                    <Icon className="w-7 h-7 text-stone-100" />
                  </div>
                  <div className="text-stone-400 text-sm mb-2">{info.label}</div>
                  <div className="text-stone-100 font-medium hover:text-stone-200 transition-colors">
                    {info.value}
                  </div>
                  <div className="text-stone-600 text-xs mt-2">
                    {info.type === 'copy' ? 'Нажмите, чтобы скопировать' : 'Нажмите, чтобы открыть в Яндекс.Картах'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Contact Form */}
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-800/20 shadow-2xl">
            <h3 className="text-stone-100 mb-6 text-center">
              Быстрая заявка на урок
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-stone-800/60 border-2 border-stone-800/30 rounded-xl text-stone-100 placeholder-stone-500 focus:border-stone-700/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Телефон"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-stone-800/60 border-2 border-stone-800/30 rounded-xl text-stone-100 placeholder-stone-500 focus:border-stone-700/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Сообщение (необязательно)"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-stone-800/60 border-2 border-stone-800/30 rounded-xl text-stone-100 placeholder-stone-500 focus:border-stone-700/50 focus:outline-none resize-none transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 rounded-xl hover:shadow-lg hover:shadow-stone-900/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-stone-100 border-t-transparent rounded-full animate-spin"></div>
                    Отправка...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-5 h-5" />
                    Отправить заявку
                  </>
                )}
              </button>
              {submitStatus !== 'idle' && (
                <div
                  className={`mt-4 text-center ${
                    submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {statusMessage}
                </div>
              )}
              {copyFeedback && (
                <div className="mt-4 text-center text-green-500">
                  {copyFeedback}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-stone-800/20">
          <p className="text-stone-500">
            © 2024 Николай Бокарев. Все права защищены.
          </p>
        </div>
      </div>
    </section>
  );
}