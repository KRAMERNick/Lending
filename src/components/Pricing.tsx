import { Check, Sparkles, TrendingUp, Zap, DollarSign, Star } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: 'Разовое занятие',
      price: '3 000',
      description: 'Идеально для пробного урока',
      icon: Sparkles,
      gradient: 'from-stone-700 to-stone-800',
      features: [
        'Индивидуальное занятие 60 минут',
        'Профессиональное оборудование',
        'Персональная программа обучения',
        'Все материалы включены'
      ],
      popular: false
    },
    {
      name: 'Абонемент на 4 занятия',
      price: '11 000',
      pricePerLesson: '2 750',
      description: 'Экономия 250₽ с каждого урока',
      icon: TrendingUp,
      gradient: 'from-stone-600 to-stone-700',
      features: [
        '4 индивидуальных занятия',
        'Действует 1 месяц',
        'Гибкий график посещения',
        'Персональная программа',
        'Отслеживание прогресса'
      ],
      popular: true,
      savings: '1 000'
    },
    {
      name: 'Абонемент на 8 занятий',
      price: '21 000',
      pricePerLesson: '2 625',
      description: 'Максимальная выгода!',
      icon: Zap,
      gradient: 'from-stone-600 to-stone-700',
      features: [
        '8 индивидуальных занятий',
        'Действует 2 месяца',
        'Приоритетное расписание',
        'Персональная программа',
        'Бесплатная консультация',
        'Записи занятий для повторения'
      ],
      popular: false,
      savings: '3 000'
    }
  ];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Smooth dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/80 via-transparent to-stone-900/60 transform -skew-y-3"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-stone-800/12 to-transparent animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(120, 113, 108, 0.1) 60px, rgba(120, 113, 108, 0.1) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(120, 113, 108, 0.1) 60px, rgba(120, 113, 108, 0.1) 61px)
          `
        }}></div>
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-24 left-16 w-20 h-20 border border-stone-600/10 rounded-full animate-float"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 border border-stone-500/12 rotate-45 animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-stone-600/8 animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800/50 backdrop-blur-xl rounded-full mb-6 border border-stone-700/50 creative-card">
            <DollarSign className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 text-sm font-medium">Стоимость</span>
          </div>
          
          <h2 className="mb-6">
            ЦЕНЫ НА <span className="gradient-text">ОБУЧЕНИЕ</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-stone-600 to-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            Выберите удобный формат занятий. Чем больше абонемент — тем выгоднее цена урока!
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className="relative perspective-container"
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4" />
                      Популярный выбор
                    </div>
                  </div>
                )}

                <div className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ease-out hover:translate-y-[-8px] hover:shadow-2xl ${
                  plan.popular
                    ? 'bg-gradient-to-br from-stone-800/90 to-stone-900/90 border-stone-600/60 shadow-2xl shadow-stone-900/40 mt-6'
                    : 'bg-stone-900/70 border-stone-800/40 shadow-xl mt-8'
                }`} style={{ willChange: 'transform' }}>
                  {/* Diagonal accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-700/20 to-transparent transform rotate-45 translate-x-16 -translate-y-16"></div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-6 shadow-lg creative-card`}>
                    <Icon className="w-8 h-8 text-stone-100" />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-stone-100 mb-3 text-2xl">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black gradient-text">{plan.price}</span>
                      <span className="text-stone-400 text-xl">₽</span>
                    </div>
                    {plan.pricePerLesson && (
                      <p className="text-stone-400 text-sm mt-2 font-medium">
                        {plan.pricePerLesson}₽ за урок
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-stone-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Savings badge */}
                  {plan.savings && (
                    <div className="relative mb-6 p-4 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-green-900/30 backdrop-blur-sm"></div>
                      <p className="relative text-emerald-400 text-sm text-center font-bold flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Экономия {plan.savings}₽
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-stone-800/60 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-stone-700/40">
                          <Check className="w-3.5 h-3.5 text-stone-400" />
                        </div>
                        <span className="text-stone-300 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 rounded-xl font-bold transition-all transform hover:scale-105 ${
                      plan.popular
                        ? 'glow-button bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 shadow-lg hover:shadow-xl'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80 border-2 border-stone-800/40 hover:border-stone-700/60'
                    }`}
                  >
                    Записаться
                  </button>

                  {/* Corner decoration */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-stone-700/40 rounded-bl-3xl"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-stone-900/60 backdrop-blur-xl rounded-2xl border border-stone-700/40 creative-card">
            <Sparkles className="w-5 h-5 text-stone-500" />
            <p className="text-stone-400 text-sm">
              💡 Хотите получить <span className="text-stone-300 font-bold">скидку 50%</span> на первое занятие? Пройдите мини-игру ниже и получите промокод!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}