'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Андрей Игоревич',
      image: 'https://i.ibb.co/bjNBwTnK/photo-2026-02-13-15-50-56.jpg'
    },
    {
      name: 'Юрий Владимирович',
      image: 'https://i.ibb.co/jvZbqk5n/photo-2026-02-13-15-51-11.jpg'
    },
    {
      name: 'Владимир Валерьевич',
      image: 'https://i.ibb.co/JjVwRGBc/photo-2026-02-13-15-51-48.jpg'
    },
    {
      name: 'Михаил Сергеевич',
      image: 'https://i.ibb.co/XfJRxK9x/photo-2026-02-13-15-51-51.jpg'
    },
    {
      name: 'Михаил Андреевич',
      image: 'https://i.ibb.co/99tPWVZP/photo-2026-02-13-15-51-24.jpg'
    },
    {
      name: 'Смирнов Артём',
      image: 'https://i.ibb.co/0RmH9Fg3/photo-2026-02-13-15-51-27.jpg'
    },
    {
      name: 'Иван Алексеевич',
      image: 'https://i.ibb.co/CqF3bB8/photo-2026-02-13-15-51-31.jpg'
    },
    {
      name: 'Алексей Александрович',
      image: 'https://i.ibb.co/dw239xSw/photo-2026-02-13-15-51-34.jpg'
    },
    {
      name: 'Андрей Евгеньевич',
      image: 'https://i.ibb.co/39dM8DnT/photo-2026-02-13-15-51-38.jpg'
    },
    {
      name: 'Александр Петрович',
      image: 'https://i.ibb.co/232vM00R/photo-2026-02-13-15-51-41.jpg'
    },
    {
      name: 'Сергей Владимирович',
      image: 'https://i.ibb.co/FkDmPZ27/photo-2026-02-13-15-51-44.jpg'
    },
    {
      name: 'Виктор Васильевич',
      image: 'https://i.ibb.co/WvzNYTqS/photo-2026-02-13-15-51-15.jpg'
    },
    {
      name: 'Роман Сергеевич',
      image: 'https://i.ibb.co/4Zhk2DwD/photo-2026-02-13-15-51-19.jpg'
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">КОМАНДА</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Профессионалы, которые делают покупку авто простой и безопасной.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 px-8 bg-card border-y border-slate-200/60 relative flex-grow">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          {/* First member - centered */}
          <div className="flex justify-center mb-16">
            <div className="flex flex-col items-center glass-panel border-slate-200/60 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group w-full max-w-sm">
              <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-primary/20 group-hover:border-primary transition-colors duration-500 shadow-xl relative">
                <div className="absolute inset-0 rounded-full border border-primary/50 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
                <img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-center">
                {teamMembers[0].name}
              </h3>
              <p className="text-primary mt-2 uppercase tracking-widest text-sm font-semibold">Руководитель</p>
            </div>
          </div>

          {/* Rest of the team - 4 columns grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.slice(1).map((member, index) => (
              <div key={index} className="flex flex-col items-center glass-panel border-slate-200/60 rounded-3xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-md group">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-slate-200/60 group-hover:border-primary/50 transition-colors duration-500 relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  </div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground text-center">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
