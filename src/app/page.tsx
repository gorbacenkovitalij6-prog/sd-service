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
import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, ChevronRight, Shield, Globe, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { supabase, type Car, type VideoReview } from '@/lib/supabase';
import { ContactDialog } from '@/components/ContactDialog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export default function Home() {
  const [agreed, setAgreed] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [heroFormData, setHeroFormData] = useState({
    name: '',
    phone: '',
    budget: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetchCars();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function fetchCars() {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleHeroFormSubmit(e: React.FormEvent) {
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
          name: heroFormData.name,
          phone: heroFormData.phone,
          budget: heroFormData.budget,
          type: 'hero'
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }

      alert(`Спасибо, ${heroFormData.name}! Мы свяжемся с вами в ближайшее время по номеру ${heroFormData.phone}`);

      // Очистка формы
      setHeroFormData({ name: '', phone: '', budget: '' });
      setAgreed(false);
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Premium Header */}
      <Header />

      {/* Hero Section - Redesigned for Maximum Impact */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden mx-auto">
        {/* Background Video/Image & Overlays */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2615&auto=format&fit=crop"
            alt="Premium Car Import"
            className="w-full h-full object-cover object-center transform scale-105 animate-[zoomIn_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="w-full max-w-screen-2xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start pt-10 lg:pt-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">Премиальный импорт</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
              АВТО ИЗ ЕВРОПЫ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400 text-glow">
                БЕЗ КОМПРОМИССОВ
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/60 mb-8 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Мы доставляем автомобили под ключ быстрее и дешевле рынка. От подбора на аукционах до постановки на учёт в РФ — полное сопровождение и прозрачность.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-white/80">Доступ ко всем<br/>базам Европы</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-white/80">Юридическая<br/>чистота 100%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-white/80">Доставка от<br/>7 до 14 дней</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-white/80">Выгода до 30%<br/>от рынка РФ</div>
              </div>
            </div>
          </div>

          {/* Right Content - Glassmorphism Form */}
          <div className="flex justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-700 w-full">
            <div className="w-full max-w-md glass-panel p-8 rounded-2xl relative overflow-hidden group">
              {/* Form Glow Effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-5 group-hover:animate-shine" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Рассчитать стоимость</h3>
                <p className="text-sm text-white/50 mb-6">Оставьте заявку, и наш эксперт свяжется с вами для детального расчёта.</p>

                <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70 ml-1">Как к вам обращаться?</label>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={heroFormData.name}
                      onChange={(e) => setHeroFormData({ ...heroFormData, name: e.target.value })}
                      required
                      className="h-12 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70 ml-1">Контактный телефон</label>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center h-12 w-16 bg-black/40 border border-white/10 rounded-md text-sm text-white/70">
                        +7
                      </div>
                      <Input
                        type="tel"
                        placeholder="(999) 000-00-00"
                        value={heroFormData.phone}
                        onChange={(e) => setHeroFormData({ ...heroFormData, phone: e.target.value })}
                        required
                        className="h-12 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70 ml-1">Планируемый бюджет</label>
                    <Select
                      value={heroFormData.budget}
                      onValueChange={(value) => setHeroFormData({ ...heroFormData, budget: value })}
                      required
                    >
                      <SelectTrigger className="h-12 bg-black/40 border-white/10 text-white focus:ring-primary transition-all">
                        <SelectValue placeholder="Выберите бюджет" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10 text-white">
                        <SelectItem value="500k">До 500 000 ₽</SelectItem>
                        <SelectItem value="1m">500 000 - 1 000 000 ₽</SelectItem>
                        <SelectItem value="2m">1 000 000 - 2 000 000 ₽</SelectItem>
                        <SelectItem value="3m">2 000 000 - 3 000 000 ₽</SelectItem>
                        <SelectItem value="more">Более 3 000 000 ₽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={submitting || !agreed}
                      className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white text-base font-bold rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] disabled:opacity-50 disabled:shadow-none relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? 'Отправка...' : 'Получить расчет стоимости'}
                        {!submitting && <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                      </span>
                    </Button>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(checked: boolean) => setAgreed(checked)}
                      className="mt-1 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs text-white/50 leading-relaxed cursor-pointer hover:text-white/70 transition-colors"
                    >
                      Я даю согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности.
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="w-full py-16 px-6 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />
        
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Side - Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
              КЛИЕНТЫ, КОТОРЫЕ<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">УЖЕ ПОЛУЧИЛИ АВТО</span>
            </h2>
            <p className="text-white/60 text-lg">
              Более 1 000 человек уже доверили нам растаможку и доставку своих авто.
            </p>
          </div>

          {/* Right Side - Client Avatars */}
          <div className="flex-1 flex flex-col flex-wrap md:flex-nowrap items-center md:items-end gap-6">
            <div className="flex items-center justify-center -space-x-4 hover:space-x-2 transition-all duration-500 cursor-pointer group">
              {/* Client photos with glow */}
              {[
                "https://ext.same-assets.com/3655081281/309832735.jpeg",
                "https://ext.same-assets.com/3655081281/3937889675.jpeg",
                "https://ext.same-assets.com/3655081281/331457206.jpeg",
                "https://ext.same-assets.com/3655081281/2574035094.jpeg",
                "https://ext.same-assets.com/3655081281/911256757.jpeg",
                "https://ext.same-assets.com/3655081281/3422714086.jpeg",
                "https://ext.same-assets.com/3655081281/1140135373.jpeg"
              ].map((src, idx) => (
                <div key={idx} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-background shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-card flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  <img
                    src={src}
                    alt="Клиент"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ))}

              {/* Counter Badge */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-background bg-gradient-to-br from-primary to-blue-600 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] z-10 transition-transform hover:scale-110">
                <div className="text-white font-black md:text-lg text-sm leading-none">1000+</div>
                <div className="text-white/80 text-[10px] uppercase tracking-wider font-semibold mt-0.5">чел</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="w-full py-20 px-6 bg-card relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 drop-shadow-md">Каталог</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              АВТОМОБИЛИ ГОТОВЫЕ К ОТПРАВКЕ
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full" />
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mx-auto mb-6" />
              <p className="text-white/60 text-lg animate-pulse">Загрузка эксклюзивных предложений...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-24 glass-panel rounded-2xl border border-white/5">
              <div className="text-6xl mb-6 opacity-50">🏎️</div>
              <p className="text-white text-2xl font-semibold mb-3">Каталог обновляется</p>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                В данный момент нет автомобилей в наличии. Добавьте первый автомобиль через панель управления.
              </p>
              <Link href="/admin">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-xl font-bold transition-all">
                  Перейти в админ-панель
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cars.map((car) => (
                  <div key={car.id} className="group bg-background rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] flex flex-col h-full transform hover:-translate-y-1">
                    {/* Car Image with Status Badge */}
                    <div className="relative h-60 overflow-hidden bg-white/5">
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={car.images[0]}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🚗</div>
                            <div className="text-sm font-medium">Нет фото</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                      
                      {/* Price Badge over Image */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                            {car.year} <span className="w-1 h-1 rounded-full bg-primary" /> {car.mileage.toLocaleString()} км
                          </p>
                          <h3 className="text-2xl font-bold text-white leading-tight">
                            {car.brand} {car.model}
                          </h3>
                        </div>
                      </div>

                      {/* Status Badges */}
                      {car.status === 'sold' && (
                        <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-blue-500/50">
                          Продано
                        </div>
                      )}
                      {car.status === 'reserved' && (
                        <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-blue-400/50">
                          Резерв
                        </div>
                      )}
                    </div>

                    {/* Car Info */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-white/60 mb-6 flex-grow">
                        <div className="flex items-center gap-2">
                           <span className="text-primary">•</span> Двигатель: <span className="text-white">{car.fuel_type} {car.engine_volume ? `${car.engine_volume}л` : ''}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-primary">•</span> КПП: <span className="text-white">{car.transmission}</span>
                        </div>
                        {car.drive_type && (
                          <div className="flex items-center gap-2">
                            <span className="text-primary">•</span> Привод: <span className="text-white">{car.drive_type}</span>
                          </div>
                        )}
                      </div>

                      {/* Price & Action */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-xs text-white/40 mb-1">Итоговая цена</div>
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            {car.price.toLocaleString()} ₽
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-5">
                        <Link href="/catalog" className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black transition-all">
                            Детали
                          </Button>
                        </Link>
                        <Button
                          onClick={() => setContactDialogOpen(true)}
                          className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white border-0"
                        >
                          Заказать
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-16 relative">
                <Link href="/catalog">
                  <Button className="bg-white text-black hover:bg-gray-200 px-10 py-7 text-lg font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
                    Смотреть весь каталог
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="w-full py-24 px-6 relative overflow-hidden">
        {/* Deep, rich red background for contrast */}
        <div className="absolute inset-0 bg-[#040b16]" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-transparent" />
        
        <div className="w-full max-w-screen-2xl mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              БЕЗОПАСНОСТЬ СДЕЛКИ <br />
              <span className="text-primary italic">ГАРАНТИРОВАНА</span>
            </h2>
            <p className="text-lg text-white/70">
              Покупка автомобиля за границей сопряжена с рисками. Мы берем все риски из вашей головы и переносим их в юридический договор.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Risk 1 */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Скрытые дефекты</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Страх купить авто с замаскированным кузовным ремонтом или скрученным пробегом.
              </p>
            </div>

            {/* Risk 2 */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl transform hover:-translate-y-2 transition-transform duration-500 delay-100">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Рост цены</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Опасение, что цена «под ключ» вырастет на огромную сумму при расчете растаможки.
              </p>
            </div>

            {/* Risk 3 */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl transform hover:-translate-y-2 transition-transform duration-500 delay-200">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Логистика и банки</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Боязнь того, что авто застрянет на границе или ваши деньги заморозят в банке.
              </p>
            </div>
          </div>

          {/* Solution Banner */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-1 relative overflow-hidden shadow-[0_0_40px_rgba(5,150,105,0.3)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
            <div className="bg-background/40 backdrop-blur-sm rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xl">
                  <Shield className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">МЫ ИСКЛЮЧИЛИ ЭТИ РИСКИ</h3>
                  <p className="text-white/90 text-lg">Полная юридическая прозрачность и ответственность с 2018 года.</p>
                </div>
              </div>
              <Button onClick={() => setContactDialogOpen(true)} className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-xl whitespace-nowrap shadow-lg">
                Смотреть договор
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="w-full py-20 px-6 bg-background relative">
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 drop-shadow-md">Процесс</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              ВЫБИРАЕТЕ АВТО - <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ОСТАЛЬНОЕ БЕРЁМ НА СЕБЯ</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Legal Safety Block */}
            <div className="glass-panel rounded-2xl overflow-hidden group">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6">
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" /> ЮРИДИЧЕСКАЯ БЕЗОПАСНОСТЬ
                  </h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    Ваш автомобиль будет ввезён и оформлен в РФ строго по закону — без рисков и скрытых проблем.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/80 text-xs leading-relaxed">
                      <strong>Точно то, что вы хотите</strong><br />
                      Мы фиксируем все ваши требования в договоре: марка, комплектация, год, пробег, бюджет — и ищем идеальное соответствие.
                    </p>
                  </div>
                </div>
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Безопасность"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent md:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden block" />
                </div>
              </div>
            </div>

            {/* European Quality Block */}
            <div className="glass-panel rounded-2xl overflow-hidden group">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6">
                <div className="relative h-64 md:h-full overflow-hidden order-2 md:order-1">
                  <img
                    src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Европейское качество"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent md:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden block" />
                </div>
                <div className="p-8 flex flex-col justify-center order-1 md:order-2">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" /> ЕВРОПЕЙСКОЕ КАЧЕСТВО
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Используем лучшие предложения с автоаукционов Европы и 10-летний опыт, чтобы подобрать надёжный авто в рамках вашего бюджета.
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Block */}
            <div className="glass-panel rounded-2xl overflow-hidden group">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6">
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-primary" /> БЕРЁМ НА СЕБЯ ВСЁ СЛОЖНОЕ:
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm">
                    <li className="flex gap-3">
                      <span className="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">•</span>
                      Поиск, бронирование, выкуп и доставка авто.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">•</span>
                      Комплексная диагностика, проверка истории и юридической чистоты.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">•</span>
                      Поддержка на каждом этапе — от выбора до постановки на учёт.
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/4489728/pexels-photo-4489728.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Доставка"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent md:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden block" />
                </div>
              </div>
            </div>

            {/* You only need to */}
            <div className="glass-panel rounded-2xl overflow-hidden group">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6">
                <div className="relative h-64 md:h-full overflow-hidden order-2 md:order-1">
                  <img
                    src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Автомобиль премиум класса"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent md:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden block" />
                </div>
                <div className="p-8 flex flex-col justify-center order-1 md:order-2">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" /> ВАМ ОСТАЁТСЯ ТОЛЬКО:
                  </h3>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>Описать желаемый автомобиль</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>Выбрать способ оплаты</span>
                    </li>
                    <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>Получить ключи — спокойно и без стресса</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="rounded-2xl overflow-hidden mt-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-card border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-20">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest w-fit mb-6">
                  Наш опыт работает на вас
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight text-glow">
                  «ЛТС» — ВАШ НАДЕЖНЫЙ ПАРТНЁР
                </h3>
                <p className="text-white/70 mb-8 text-lg font-medium">
                  Мы экономим ваше время, бережем нервы и защищаем ваши интересы при покупке авто из Европы.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/50 text-primary">✓</div>
                    <p className="text-white/80 text-sm mt-1.5">
                      <strong className="text-white text-base">Более 11 лет опыта</strong> — 1000+ авто по всей РФ
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/50 text-primary">✓</div>
                    <p className="text-white/80 text-sm mt-1.5">
                      <strong className="text-white text-base">Экономия 20-30%</strong> — прямые поставки
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/50 text-primary">✓</div>
                    <p className="text-white/80 text-sm mt-1.5">
                      <strong className="text-white text-base">Абсолютно прозрачные цены</strong> — без скрытых комиссий
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-[#0088cc]/20 to-transparent border border-[#0088cc]/30 backdrop-blur-md">
                  <a
                    href="https://t.me/LTSPRigon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,136,204,0.5)]"
                  >
                    <Send className="w-6 h-6 text-white ml-1" />
                  </a>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Свежие поступления и онлайн-консультации <strong>с 8 до 22 МСК</strong> в нашем Telegram!
                  </p>
                </div>
              </div>
              
              {/* Background Image that shows through gradient */}
              <div className="absolute inset-0 lg:relative h-full w-full z-[-1] lg:z-0">
                <img
                  src="/lts_office.png"
                  alt="Premium SUV"
                  className="w-full h-full object-cover lg:object-right object-center opacity-30 lg:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent lg:block hidden" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      <HowToGetCarSection />
      <ClientReviewsSection />
      <FAQSection />
      <ConsultationFormSection />

      {/* Footer */}
      <Footer />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
}

function HowToGetCarSection() {
  const [currentReview, setCurrentReview] = useState(0);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const reviews = [
    {
      image: "https://i.ibb.co/yB7vDp2c/photo-2026-01-14-12-40-23.jpg",
      name: "Павел Д.",
      text: "Все прошло на высшем уровне. Доставили быстро, в идеальном состоянии, документы оформлены без задержек. Приятно, когда люди следуют выполненным срокам!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/qMSXBdFL/photo-2026-01-14-12-40-43.jpg",
      name: "Екатерина Л.",
      text: "Приехала на свою новую покупку, как только планировала! Довольна качеством и состоянием, а также отличным сервисом и четкостью на всех этапах.",
      rating: 5
    },
    {
      image: "https://i.ibb.co/4GYrgJb/photo-2026-01-14-12-40-55.jpg",
      name: "Максим Р.",
      text: "Решил купить из Европы и не ошибся. Все расходы и этапы были прозрачны заранее, и доставили вовремя. Очень рад, что выбрал вас!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/j9jbH9vJ/photo-2026-01-19-12-55-04.jpg",
      name: "Виктор С.",
      text: "Очень рекомендую этот способ покупки! Пригнали в отличном виде, документы в порядке. Профессиональная команда!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/SDSkFmCB/photo-2026-01-19-13-00-11.jpg",
      name: "Лариса Д.",
      text: "Автомобиль приехал в отличном состоянии. Как и обещали, проверка была быстрой. Весь процесс прошел гладко!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/dJfRt4YZ/photo-2026-01-26-17-10-30.jpg",
      name: "Федор П.",
      text: "Спасибо за честность и профессионализм! Соответствует всем заявленным характеристикам. Процесс был прозрачным от начала до конца.",
      rating: 5
    },
    {
      image: "https://i.ibb.co/GLyBZ69/photo-2026-01-26-17-33-52.jpg",
      name: "Дмитрий В.",
      text: "Очень доволен качеством подбора и скоростью доставки. Цена действительно выгоднее, чем у дилеров.",
      rating: 5
    },
    {
      image: "https://i.ibb.co/sJssx8HP/photo-2026-01-27-15-36-53.jpg",
      name: "Сергей М.",
      text: "Отличный сервис! Помогли с выбором, организовали доставку, оформили все документы. Рекомендую всем!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/HLsdvDM2/photo-2026-01-30-13-27-51.jpg",
      name: "Алексей Т.",
      text: "Пришло в идеальном состоянии! Все как в описании. Спасибо за профессиональную работу и внимание к деталям.",
      rating: 5
    },
    {
      image: "https://i.ibb.co/TxzYwpTG/photo-2026-01-30-13-27-52.jpg",
      name: "Игорь П.",
      text: "Весь процесс занял меньше месяца. Отличная поддержка на всех этапах. Полностью соответствует ожиданиям!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/JWkRjMk2/photo-2026-02-05-13-08-15-2.jpg",
      name: "Анна В.",
      text: "Качество подбора на высоте, все документы в порядке. Очень довольна сотрудничеством!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/Q3qS7MMH/photo-2026-02-05-13-08-15.jpg",
      name: "Андрей Л.",
      text: "Профессиональный подход, честные цены, быстрая доставка. Всё на высшем уровне! Буду рекомендовать друзьям.",
      rating: 5
    },
    {
      image: "https://i.ibb.co/h1wMxhr0/photo-2026-02-12-13-08-08.jpg",
      name: "Ельвира К.",
      text: "Получил точно в срок. Вся информация была предоставлена заранее. Никаких скрытых платежей. Отличная работа!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/213tpzZq/photo-2026-02-12-13-08-12.jpg",
      name: "Владимир Б.",
      text: "Очень доволен покупкой! В отличном состоянии, все документы оформлены правильно. Спасибо за качественную работу!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/4BKx44M/photo-2026-02-03-13-15-49.jpg",
      name: "Константин Д.",
      text: "Приятно удивлен качеством сервиса. Весь процесс был прозрачным и понятным. Соответствует всем ожиданиям!",
      rating: 5
    },
    {
      image: "https://i.ibb.co/DDf4dP2V/photo-2026-02-12-13-10-04.jpg",
      name: "Николай П.",
      text: "Превосходный опыт покупки! Команда профессионалов сделала всё быстро и качественно. Теперь у меня!",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden bg-card">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-screen-2xl mx-auto relative z-10">
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
          <div>
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block drop-shadow-md">Алгоритм</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              КАК ПОЛУЧИТЬ АВТОМОБИЛЬ<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ИЗ ДРУГИХ СТРАН, ОТ А ДО Я</span>
            </h2>
          </div>
          <div className="w-full md:w-[600px] h-[500px] bg-background border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full relative group">
              
              {/* Decorative glows */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-[50px] z-20 pointer-events-none opacity-50" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-[50px] z-20 pointer-events-none opacity-50" />

              <div className="relative h-full w-full">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentReview ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                    }`}
                  >
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent flex flex-col justify-end p-8">
                      <div className="glass-panel border border-white/10 rounded-2xl p-6 backdrop-blur-md transform translate-y-0 opacity-100 transition-all duration-500 delay-200 shadow-2xl">
                        
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <h4 className="font-bold text-xl text-white drop-shadow-md">{review.name}</h4>
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-lg drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">★</span>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-white/80 leading-relaxed mb-6 italic">
                          "{review.text}"
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                          <div className="flex bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5 items-center gap-2">
                             <div className="text-xs text-white/60 font-medium">Яндекс</div>
                             <div className="text-sm text-white font-bold">4.9</div>
                          </div>
                          <div className="flex bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-500/30 items-center gap-2">
                             <div className="text-xs text-green-400 font-medium">2ГИС</div>
                             <div className="text-sm text-green-300 font-bold">5.0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-4 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                  className="w-12 h-12 bg-background/50 hover:bg-primary/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 transition-all hover:scale-110 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <button
                  onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
                  className="w-12 h-12 bg-background/50 hover:bg-primary/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 transition-all hover:scale-110 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-background/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentReview ? 'bg-primary w-6 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-white/30 w-2 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
function ConsultationFormSection() {
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
          type: 'consultation'
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
    <section className="py-24 px-8 bg-background relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 relative z-10">
            {/* Left side - Text */}
            <div className="text-white">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block drop-shadow-md">Индивидуальный подход</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                ПОЛУЧИТЕ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ПО ПОДБОРУ АВТОМОБИЛЯ</span>
              </h2>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">•</span>
                  <span className="text-lg">Объясним, как проходит процесс покупки и поставки авто</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">•</span>
                  <span className="text-lg">Подберём подходящие модели под ваш бюджет и задачи</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">•</span>
                  <span className="text-lg">Рассчитаем стоимость авто с учётом всех расходов</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">•</span>
                  <span className="text-lg">Расскажем об актуальных акциях и возможных скидках</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">•</span>
                  <span className="text-lg">Ответим на все вопросы по покупке, доставке и растаможке</span>
                </li>
              </ul>
            </div>

            {/* Right side - Form */}
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50 focus:ring-primary/50 transition-colors"
                />

                <div className="flex gap-2">
                  <div className="flex items-center gap-2 h-14 px-4 bg-white/5 border border-white/10 rounded-md">
                    <span className="text-2xl">🇷🇺</span>
                    <span className="text-white/60">+7</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="(000) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50 focus:ring-primary/50 transition-colors flex-1"
                  />
                </div>

                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  required
                >
                  <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/50 transition-colors">
                    <SelectValue placeholder="Выберите бюджет" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem value="500k" className="focus:bg-white/10 focus:text-white">До 500 000 ₽</SelectItem>
                    <SelectItem value="1m" className="focus:bg-white/10 focus:text-white">500 000 - 1 000 000 ₽</SelectItem>
                    <SelectItem value="2m" className="focus:bg-white/10 focus:text-white">1 000 000 - 2 000 000 ₽</SelectItem>
                    <SelectItem value="3m" className="focus:bg-white/10 focus:text-white">2 000 000 - 3 000 000 ₽</SelectItem>
                    <SelectItem value="more" className="focus:bg-white/10 focus:text-white">Более 3 000 000 ₽</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="submit"
                  disabled={!agreed || submitting}
                  className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white text-base font-bold rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 disabled:opacity-50 disabled:shadow-none relative overflow-hidden group"
                >
                  <span className="relative z-10">{submitting ? 'Отправка...' : 'Оставить заявку'}</span>
                </Button>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="consultation-terms"
                    checked={agreed}
                    onCheckedChange={(checked: boolean) => setAgreed(checked)}
                    className="mt-1 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor="consultation-terms"
                    className="text-sm text-white/50 leading-tight cursor-pointer hover:text-white/70 transition-colors"
                  >
                    Я согласился с условиями пользовательского соглашения
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Из чего формируется стоимость автомобиля?",
      answer: "Стоимость автомобиля складывается из нескольких составляющих: цена автомобиля на аукционе или у дилера, стоимость доставки из Европы в РФ, таможенные платежи (пошлина, НДС, утилизационный сбор), оформление документов и наши услуги по подбору и сопровождению сделки."
    },
    {
      question: "Какие марки автомобилей вы привозите из Европы?",
      answer: "Мы работаем со всеми европейскими марками: Mercedes-Benz, BMW, Audi, Volkswagen, Porsche, Volvo, Land Rover, Jaguar и многими другими. Подбираем автомобили любых классов - от компактных городских до премиум и спортивных моделей."
    },
    {
      question: "Какие гарантии доставки и как страхуется автомобиль на время транспортировки?",
      answer: "Автомобиль страхуется на весь период транспортировки от момента покупки до передачи вам. Мы работаем только с проверенными транспортными компаниями. В договоре прописываются все сроки и условия доставки с гарантией возмещения в случае любых повреждений."
    },
    {
      question: "Как долго доставляется автомобиль из Европе?",
      answer: "Средний срок доставки составляет от 7 до 14 дней с момента покупки автомобиля. Это включает время на оформление документов, логистику и растаможку. Точные сроки зависят от страны отправления и текущей загруженности таможни."
    },
    {
      question: "Какие гарантии вы предоставляете?",
      answer: "Мы предоставляем полную юридическую гарантию чистоты автомобиля, гарантию соответствия заявленным характеристикам, страховку на время доставки. Все условия прописываются в договоре. Также проводим полную диагностику перед отправкой."
    }
  ];

  return (
    <section className="py-24 px-8 bg-card relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block drop-shadow-md">Ответы экспертов</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            ОТВЕЧАЕМ НА ЧАСТО<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ЗАДАВАЕМЫЕ ВОПРОСЫ</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-panel border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 lg:p-8 flex items-center justify-between text-left group"
              >
                <h3 className="text-lg lg:text-xl font-bold text-white pr-8 group-hover:text-primary transition-colors">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === index ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] rotate-45' : 'border-white/10 text-white/50 group-hover:border-primary/50 group-hover:text-primary'}`}>
                  <span className="text-2xl leading-none font-light mb-1">+</span>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 lg:p-8 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Павел Д.",
      text: "Все прошло на высшем уровне. Доставили быстро, авто в идеальном состоянии, документы оформлены без задержек. Приятно, когда люди следуют выполненным сроках!",
      carImage: "https://i.ibb.co/yB7vDp2c/photo-2026-01-14-12-40-23.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Екатерина Л.",

      text: "Получила свою новую машину, как и планировала! Довольна качеством и состоянием авто, а также отличным сервисом и четкостью на всех этапах. Все организовано быстро и удобно.",
      carImage: "https://i.ibb.co/qMSXBdFL/photo-2026-01-14-12-40-43.jpg",
      platform: "2gis",
      rating: 4.9
    },
    {
      name: "Максим Р.",

      text: "Решил купить авто из Европы и не ошибся. Все расходы и этапы были прозрачны, заранее, и автомобиль доставили вовремя. Очень рад, что выбрал вас!",
      carImage: "https://i.ibb.co/4GYrgJb/photo-2026-01-14-12-40-55.jpg",
      platform: "yandex",
      rating: 5.0
    },
    {
      name: "Виктор С.",

      text: "Очень рекомендую этот способ покупки! Автомобиль пригнали в отличном виде, документы в порядке. Профессиональная команда, с которой приятно работать.",
      carImage: "https://i.ibb.co/j9jbH9vJ/photo-2026-01-19-12-55-04.jpg",
      platform: "yandex",
      rating: 5.0
    },
    {
      name: "Лариса Д.",

      text: "Автомобиль приехал в отличном состоянии. Как и обещали, проверка была быстрой. Весь процесс прошел гладко и без каких-либо сюрпризов.",
      carImage: "https://i.ibb.co/SDSkFmCB/photo-2026-01-19-13-00-11.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Федор П.",

      text: "Спасибо за честность и профессионализм! Машина соответствует всем заявленным характеристикам. Процесс был прозрачным от начала до конца.",
      carImage: "https://i.ibb.co/dJfRt4YZ/photo-2026-01-26-17-10-30.jpg",
      platform: "yandex",
      rating: 5.0
    },
    {
      name: "Дмитрий В.",

      text: "Очень доволен качеством подбора и скоростью доставки. Цена действительно выгоднее, чем у дилеров. Получил именно то, что хотел!",
      carImage: "https://i.ibb.co/GLyBZ69/photo-2026-01-26-17-33-52.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Сергей М.",

      text: "Отличный сервис! Помогли с выбором, организовали доставку, оформили все документы. Рекомендую всем, кто хочет купить авто из Европы.",
      carImage: "https://i.ibb.co/sJssx8HP/photo-2026-01-27-15-36-53.jpg",
      platform: "yandex",
      rating: 4.9
    },
    {
      name: "Алексей Т.",

      text: "Машина пришла в идеальном состоянии! Все как в описании. Спасибо за профессиональную работу и внимание к деталям.",
      carImage: "https://i.ibb.co/HLsdvDM2/photo-2026-01-30-13-27-51.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Игорь П.",

      text: "Весь процесс занял меньше месяца. Отличная поддержка на всех этапах. Автомобиль полностью соответствует ожиданиям!",
      carImage: "https://i.ibb.co/TxzYwpTG/photo-2026-01-30-13-27-52.jpg",
      platform: "yandex",
      rating: 5.0
    },
    {
      name: "Анна В.",

      text: "Качество подбора на высоте, все документы в порядке. Очень довольна сотрудничеством! Автомобиль мечты получен.",
      carImage: "https://i.ibb.co/JWkRjMk2/photo-2026-02-05-13-08-15-2.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Андрей Л.",

      text: "Профессиональный подход, честные цены, быстрая доставка. Всё на высшем уровне! Буду рекомендовать друзьям.",
      carImage: "https://i.ibb.co/Q3qS7MMH/photo-2026-02-05-13-08-15.jpg",
      platform: "yandex",
      rating: 4.9
    },
    {
      name: "Ельвира К.",

      text: "Получила автомобиль точно в срок. Вся информация была предоставлена заранее. Никаких скрытых платежей. Отличная работа!",
      carImage: "https://i.ibb.co/h1wMxhr0/photo-2026-02-12-13-08-08.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Владимир Б.",

      text: "Очень доволен покупкой! Автомобиль в отличном состоянии, все документы оформлены правильно. Спасибо за качественную работу!",
      carImage: "https://i.ibb.co/213tpzZq/photo-2026-02-12-13-08-12.jpg",
      platform: "yandex",
      rating: 5.0
    },
    {
      name: "Константин Д.",

      text: "Приятно удивлен качеством сервиса. Весь процесс был прозрачным и понятным. Автомобиль соответствует всем ожиданиям!",
      carImage: "https://i.ibb.co/4BKx44M/photo-2026-02-03-13-15-49.jpg",
      platform: "2gis",
      rating: 5.0
    },
    {
      name: "Николай П.",

      text: "Превосходный опыт покупки! Команда профессионалов сделала всё быстро и качественно. Автомобиль мечты теперь у меня!",
      carImage: "https://i.ibb.co/DDf4dP2V/photo-2026-02-12-13-10-04.jpg",
      platform: "2gis",
      rating: 5.0
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block drop-shadow-md">Нам доверяют</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              ОТЗЫВЫ КЛИЕНТОВ —<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ПОКАЗАТЕЛЬ КАЧЕСТВА</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-white rounded-full flex items-center justify-center transition-all border border-white/10 hover:scale-110 group shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-white rounded-full flex items-center justify-center transition-all border border-white/10 hover:scale-110 group shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 -mx-8 px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="flex-shrink-0 w-80 md:w-96 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 snap-center group">
              {/* Header with name */}
              <div className="p-6 md:p-8 border-b border-white/5">
                <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{review.name}</h4>
              </div>

              {/* Review text */}
              <div className="p-6 md:p-8 min-h-[140px]">
                <p className="text-sm text-white/70 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Car image */}
              <div className="px-6 md:px-8">
                <div className="rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                  <img
                    src={review.carImage}
                    alt={review.name}
                    className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Footer with platform and rating */}
              <div className="p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {review.platform === '2gis' ? (
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                      <span>2ГИС</span>
                    </div>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                      <span>Яндекс</span>
                    </div>
                  )}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm md:text-base ${i < Math.floor(review.rating) ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-white/20'}`}>★</span>
                    ))}
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  {review.rating.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
