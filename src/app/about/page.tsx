'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Пожалуйста, согласитесь с условиями пользовательского соглашения');
      return;
    }

    setSubmitting(true);

    try {
      // Отправка в Telegram
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          budget: formData.budget,
          type: 'about_consultation'
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }

      alert(`Спасибо, ${formData.name}! Мы свяжемся с вами в ближайшее время.`);

      // Reset form
      setFormData({ name: '', phone: '', budget: '' });
      setAgreed(false);
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-12 overflow-hidden mx-auto bg-card">
        <div className="absolute inset-0 bg-background/50" />
        <div className="relative z-10 px-8 py-8 text-center">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-4">О <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">НАС</span></h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-amber-500 rounded-full mx-auto" />
          </div>
        </div>
      </section>

      {/* Company Description Section */}
      <section className="bg-background pb-16 pt-8">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text */}
            <div className="text-foreground space-y-4">
              <p className="text-base leading-relaxed">
                <strong>«СД-СЕРВИС»</strong> — команда специалистов с опытом в подборе и импорте автомобилей более 11 лет.
              </p>
              <p className="text-base leading-relaxed">
                Мы работаем напрямую с европейскими дилерами, аукционами и проверенными продавцами, чтобы вы получали честный, прозрачный и выгодный вариант без переплат перекупам.
              </p>
              <p className="text-base leading-relaxed">
                Для нас важно, чтобы клиент понимал каждый этап сделки и был уверен в своём выборе — именно поэтому мы предлагаем полную прозрачность на каждом этапе работы.
              </p>
            </div>

            {/* Right side - Video */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-50 border border-slate-200/60 flex items-center justify-center">
              <div className="text-muted-foreground text-base font-medium tracking-wide">Видео скоро появится</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-8 bg-card border-y border-slate-200/60">
        <div className="max-w-screen-2xl mx-auto">
          <div className="glass-panel border-slate-200/60 rounded-2xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-foreground mb-8">ЧЕМ МЫ ЗАНИМАЕМСЯ</h2>

              <div className="space-y-4">
                <p className="text-base text-muted-foreground">
                  Мы сопровождаем покупку автомобиля из-за границы <strong className="text-foreground">от идеи до постановки на учёт в РФ:</strong>
                </p>

                <ul className="space-y-3 text-muted-foreground text-sm pl-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0A7ABF] mt-0.5">•</span>
                    <span>Подбор авто под ваш бюджет и запросы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0A7ABF] mt-0.5">•</span>
                    <span>Проверка истории по базам и по VIN</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0A7ABF] mt-0.5">•</span>
                    <span>Организация осмотра и диагностики</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0A7ABF] mt-0.5">•</span>
                    <span>Переговоры с продавцом и выкуп</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0A7ABF] mt-0.5">•</span>
                    <span>Доставка авто в Россию</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0A7ABF] mt-0.5">•</span>
                    <span>Растаможка и оформление всех документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 font-bold">•</span>
                    <span>Постановка на учёт и передача автомобиля вам</span>
                  </li>
                </ul>

              <p className="text-base text-muted-foreground pt-6 border-t border-slate-200/60 mt-6 font-medium">
                Вы получаете готовый к эксплуатации автомобиль, который уже прошел все юридические и технические этапы.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles Section */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Principle Card */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-8 shadow-xl hover:border-primary/30 transition-colors">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                НАШ ПРИНЦИП — ЧЕСТНОСТЬ И ПРОЗРАЧНОСТЬ
              </h2>

              <p className="text-muted-foreground mb-6 text-sm">Мы открыто показываем:</p>

              <ul className="space-y-3 text-muted-foreground text-sm mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#0A7ABF] mt-0.5">•</span>
                  <span>из каких стран и по каким каналам берём автомобили;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A7ABF] mt-0.5">•</span>
                  <span>как формируется итоговая стоимость;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A7ABF] mt-0.5">•</span>
                  <span>какие платежи вы оплачиваете и на каком этапе.</span>
                </li>
              </ul>

              <p className="text-muted-foreground font-medium bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                Никаких скрытых комиссий и «сюрпризов» по цене. Все условия закрепляем в договоре.
              </p>
            </div>

            {/* Why Choose Us Card */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-8 shadow-xl hover:border-primary/30 transition-colors">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                ПОЧЕМУ «СД-СЕРВИС»
              </h2>

              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-200/60">
                  <h3 className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">Экономия до 20–30%</h3>
                  <p className="text-muted-foreground text-sm">
                    по сравнению с покупкой аналогичного авто на внутреннем рынке
                  </p>
                </div>

                <div className="pb-4 border-b border-slate-200/60">
                  <h3 className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">Честная диагностика и реальные данные</h3>
                  <p className="text-muted-foreground text-sm">
                    по пробегу и состоянию
                  </p>
                </div>

                <div className="pb-4 border-b border-slate-200/60">
                  <h3 className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">Полное сопровождение</h3>
                  <p className="text-muted-foreground text-sm">
                    — вы не занимаетесь бюрократией и логистикой
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">Ответственность за результат</h3>
                  <p className="text-muted-foreground text-sm">
                    — мы заинтересованы, чтобы вы остались довольны и рекомендовали нас дальше
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why >1000 People Section */}
      <section className="py-20 px-8 bg-card border-y border-slate-200/60 relative">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-10 text-center">
            ПОЧЕМУ &gt;1000 ЧЕЛОВЕК РЕШИЛИ<br />
            РАБОТАТЬ С НАМИ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {/* Card 1 - Triple Check */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold text-foreground mb-4">
                АВТО ПРОХОДИТ<br />
                ТРОЙНУЮ ПРОВЕРКУ
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Юридическая чистота (запреты, залоги, ДТП)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Подлинность пробега (история ТО, сервисные книжки)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Техсостояние ДВС)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Комплексная диагностика у независимого эксперта</span>
                </li>
              </ul>
              <p className="text-xs text-primary/80 italic mt-auto pt-4 border-t border-slate-200/60">
                Риски исключены — вы получаете только прозрачный, безопасный автомобиль.
              </p>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Card 2 - Fixed Price */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold text-foreground mb-4">
                СТОИМОСТЬ «ПОД КЛЮЧ»<br />
                ФИКСИРУЕТСЯ В ДОГОВОРЕ
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Вы сразу получаете полную смету перед подписанием. Никаких доплат в пути — <strong className="text-foreground">итоговая цена авто «под ключ» строго закреплена в договоре.</strong>
              </p>
              <p className="text-xs text-primary/80 italic mt-auto pt-4 border-t border-slate-200/60">
                Никаких сюрпризов на этапе растаможки или доставки.
              </p>
            </div>

            {/* Card 3 - Turnkey */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold text-foreground mb-4">
                ОФОРМЛЕНИЕ<br />
                ПОД КЛЮЧ
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                <strong className="text-foreground">Таможенное оформление,</strong> постановка на учёт, оформление на физическое или юридическое лицо.
              </p>
              <p className="text-xs text-primary/80 italic mt-auto pt-4 border-t border-slate-200/60">
                Огромный опыт работ, позволяет нам, сделать всё качественно и быстро.
              </p>
            </div>

            {/* Card 4 - 2 Weeks Delivery */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold text-foreground mb-4">
                ДОСТАВКА АВТО<br />
                ЗА 2 НЕДЕЛИ
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Это <strong className="text-foreground">быстрее рынка на 25%,</strong> благодаря налаженным цепочкам и экспресс-таможне.
              </p>
              <p className="text-xs text-primary/80 italic mt-auto pt-4 border-t border-slate-200/60">
                Мы не обещаем лишнего, мы строго соблюдаем график.
              </p>
            </div>

            {/* Card 5 - 24/7 Support */}
            <div className="glass-panel border-slate-200/60 rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold text-foreground mb-4">
                24/7 ПОДДЕРЖКА<br />
                ЛИЧНОГО МЕНЕДЖЕРА
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Закрепляем за Вами личного менеджера, который ведёт Вас от первого звонка до получения авто.
              </p>
              <p className="text-xs text-primary/80 italic mt-auto pt-4 border-t border-slate-200/60">
                Вы получаете регулярные отчёты о ходе доставки, помощь с документами и 24/7 поддержку по любым вопросам.
              </p>
            </div>

            {/* Card 6 - 20% Savings */}
            <div className="bg-gradient-to-br from-primary to-amber-500 rounded-2xl p-8 text-foreground flex flex-col justify-center relative overflow-hidden shadow-md">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">
                  30% ЭКОНОМИИ
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Вы получите авто за счет прямых поставок,</strong> без посредников.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="py-20 px-8 bg-background relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="glass-panel border border-slate-200/60 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text */}
              <div className="text-foreground">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                  ПОЛУЧИТЕ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">ПО ПОДБОРУ АВТОМОБИЛЯ</span>
                </h2>

                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/50 text-primary">✓</div>
                    <span className="text-muted-foreground">Объясним, как проходит процесс покупки и доставки авто</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/50 text-primary">✓</div>
                    <span className="text-muted-foreground">Подберём подходящие модели под ваш бюджет и задачи</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/50 text-primary">✓</div>
                    <span className="text-muted-foreground">Рассчитаем стоимость авто с учётом всех расходов</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/50 text-primary">✓</div>
                    <span className="text-muted-foreground">Расскажем об актуальных акциях и возможных скидках</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/50 text-primary">✓</div>
                    <span className="text-muted-foreground">Ответим на все вопросы по покупке, доставке и растаможке</span>
                  </li>
                </ul>
              </div>

              {/* Right side - Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 bg-white backdrop-blur-md border-slate-200/60 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-all"
                />

                <div className="flex gap-2">
                  <div className="flex items-center justify-center h-12 w-16 bg-white backdrop-blur-md border border-slate-200/60 rounded-md text-sm text-muted-foreground">
                    +7
                  </div>
                  <Input
                    type="tel"
                    placeholder="(000) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 bg-white backdrop-blur-md border-slate-200/60 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-all flex-1"
                  />
                </div>

                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  required
                >
                  <SelectTrigger className="h-12 bg-white backdrop-blur-md border-slate-200/60 text-foreground focus:ring-primary transition-all">
                    <SelectValue placeholder="Выберите бюджет" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-slate-200/60 text-foreground">
                    <SelectItem value="500k">До 500 000 ₽</SelectItem>
                    <SelectItem value="1m">500 000 - 1 000 000 ₽</SelectItem>
                    <SelectItem value="2m">1 000 000 - 2 000 000 ₽</SelectItem>
                    <SelectItem value="3m">2 000 000 - 3 000 000 ₽</SelectItem>
                    <SelectItem value="more">Более 3 000 000 ₽</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="submit"
                  disabled={!agreed || submitting}
                  className="w-full h-12 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-foreground text-base font-bold rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
                >
                  {submitting ? 'Отправка...' : 'Оставить заявку'}
                </Button>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consultation-terms-about"
                    checked={agreed}
                    onCheckedChange={(checked: boolean) => setAgreed(checked)}
                    className="mt-1 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor="consultation-terms-about"
                    className="text-xs text-muted-foreground leading-relaxed cursor-pointer hover:text-muted-foreground transition-colors"
                  >
                    Я даю согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
