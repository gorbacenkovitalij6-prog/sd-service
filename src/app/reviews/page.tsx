'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase, type VideoReview } from '@/lib/supabase';
import { ContactDialog } from '@/components/ContactDialog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ReviewsPage() {
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  useEffect(() => {
    fetchVideoReviews();
  }, []);

  async function fetchVideoReviews() {
    try {
      const { data, error } = await supabase
        .from('video_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideoReviews(data || []);
    } catch (error) {
      console.error('Error fetching video reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  // Функция для получения embed URL
  const getEmbedUrl = (videoUrl: string, platform: 'rutube' | 'youtube') => {
    if (platform === 'rutube') {
      // Rutube URL format: https://rutube.ru/video/ID/
      const videoId = videoUrl.split('/video/')[1]?.split('/')[0];
      if (!videoId) {
        return '';
      }
      return `https://rutube.ru/play/embed/${videoId}`;
    } else {
      // YouTube URL format: https://youtube.com/watch?v=ID
      const videoId = videoUrl.split('v=')[1]?.split('&')[0];
      if (!videoId) {
        return '';
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
  };

  const textReviews = [
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

  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden border-b border-slate-200/60">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -top-1/2 -right-1/4 animate-pulse opacity-50" />
          <div className="absolute w-[600px] h-[600px] bg-[#0088cc]/5 rounded-full blur-[100px] -bottom-1/2 -left-1/4 animate-pulse opacity-50 
            [animation-delay:2s]" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
        </div>

        <div className="relative z-10 px-8 py-16 pt-32">
          <div className="max-w-screen-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">ОТЗЫВЫ КЛИЕНТОВ</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Мы гордимся доверием наших клиентов. Узнайте, что говорят о работе с СД-СЕРВИС.
            </p>
          </div>
        </div>
      </section>

      {/* Video Reviews Grid */}
      <section className="py-20 px-8 bg-card border-y border-slate-200/60 relative">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          {loading ? (
            <div className="text-center py-20 glass-panel border-slate-200/60 rounded-2xl">
              <div className="text-xl text-muted-foreground">Загрузка видео-отзывов...</div>
            </div>
          ) : videoReviews.length === 0 ? (
            <div className="text-center py-20 glass-panel border-slate-200/60 border-dashed rounded-2xl">
              <div className="text-6xl mb-6">🎥</div>
              <p className="text-foreground text-2xl font-bold mb-4">Пока нет видео-отзывов</p>
              <p className="text-muted-foreground text-lg">
                Добавьте первое видео через админ панель
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videoReviews.map((video) => (
                <div
                  key={video.id}
                  className="relative aspect-video bg-white backdrop-blur-md rounded-2xl overflow-hidden glass-panel border-slate-200/60 group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                >
                  <iframe
                    src={getEmbedUrl(video.video_url, video.platform)}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Text Reviews Section */}
      <section className="py-20 px-8 bg-background relative">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              ТЕКСТОВЫЕ ОТЗЫВЫ КЛИЕНТОВ
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => scroll('left')}
                className="w-14 h-14 bg-slate-50 border border-slate-200/60 hover:bg-primary hover:border-primary text-foreground rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-md"
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-14 h-14 bg-slate-50 border border-slate-200/60 hover:bg-primary hover:border-primary text-foreground rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-md"
              >
                →
              </button>
            </div>
          </div>

            <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 px-4 -mx-4 items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {textReviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 lg:w-96 glass-panel border-slate-200/60 rounded-2xl flex flex-col hover:border-primary/30 transition-colors duration-300 p-6 shadow-xl"
              >
                {/* Header with name */}
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-foreground">{review.name}</h4>
                </div>

                {/* Review text */}
                <div className="mb-6 flex-grow">
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/50 pl-4">
                    "{review.text}"
                  </p>
                </div>

                {/* Car image */}
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={review.carImage}
                    alt={`${review.name}'s car`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Footer with platform and rating */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-auto">
                  <div className="flex items-center gap-3">
                    {review.platform === '2gis' ? (
                      <div className="bg-[#A4C400]/20 text-[#A4C400] border border-[#A4C400]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        2ГИС
                      </div>
                    ) : (
                      <div className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Яндекс
                      </div>
                    )}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(review.rating) ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-muted-foreground'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground drop-shadow-md">
                    {review.rating.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Dialog */}
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
}
