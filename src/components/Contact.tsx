import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import whatsappIcon from 'figma:asset/17e15d8d95330ebfb7ad34056a0e0a0bf15ffd83.png';
import telegramIcon from 'figma:asset/63d672cd159d922216bb9da97c2c7a1a9c556779.png';

export function Contact() {
  const messengers = [
    {
      name: 'WhatsApp',
      link: 'https://wa.me/79123456789',
      gradient: 'from-green-600 to-emerald-700',
      icon: whatsappIcon
    },
    {
      name: 'Telegram',
      link: 'https://t.me/nikolaybokarev',
      gradient: 'from-blue-600 to-sky-700',
      icon: telegramIcon
    }
  ];

  const contactInfo = [
    { icon: Phone, label: 'Телефон', value: '+7 (912) 345-67-89' },
    { icon: Mail, label: 'Email', value: 'nikolay.bokarev@mail.ru' },
    { icon: MessageCircle, label: 'Адрес', value: 'Ленинградский просп., 47, стр. 1' },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-stone-950 to-stone-900">
      {/* Smooth dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/60 via-transparent to-stone-950/50"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-stone-800/12 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      
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
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={messenger.icon}
                    alt={`${messenger.name} logo`}
                    className="w-10 h-10 object-contain"
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
                <div key={index} className="bg-stone-900/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-stone-800/20 hover:shadow-lg hover:shadow-stone-900/30 transition-all">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl mb-4 shadow-lg shadow-stone-900/50">
                    <Icon className="w-7 h-7 text-stone-100" />
                  </div>
                  <div className="text-stone-400 text-sm mb-2">{info.label}</div>
                  <div className="text-stone-100 font-medium">{info.value}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Contact Form */}
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-800/20 shadow-2xl">
            <h3 className="text-stone-100 mb-6 text-center">
              Быстрая заявка на урок
            </h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-5 py-4 bg-stone-800/60 border-2 border-stone-800/30 rounded-xl text-stone-100 placeholder-stone-500 focus:border-stone-700/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-5 py-4 bg-stone-800/60 border-2 border-stone-800/30 rounded-xl text-stone-100 placeholder-stone-500 focus:border-stone-700/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Сообщение (необязательно)"
                  className="w-full px-5 py-4 bg-stone-800/60 border-2 border-stone-800/30 rounded-xl text-stone-100 placeholder-stone-500 focus:border-stone-700/50 focus:outline-none resize-none transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 rounded-xl hover:shadow-lg hover:shadow-stone-900/50 transition-all transform hover:scale-[1.02]"
              >
                <Send className="w-5 h-5" />
                Отправить заявку
              </button>
              <p className="text-stone-500 text-sm text-center">
                Это демо-форма. В реальной версии данные будут отправляться на ваш email или в мессенджеры.
              </p>
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