'use client';

import Link from 'next/link';
import { Send, MessageCircle, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full flex justify-center ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-slate-200/60 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="w-full max-w-screen-2xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="СД-СЕРВИС" className="h-20 lg:h-24 w-auto object-contain transition-all duration-300" />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex xl:gap-8 gap-5 items-center">
          {['Главная', 'О нас', 'Команда', 'Отзывы', 'Каталог'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Главная' ? '/' : `/${item === 'О нас' ? 'about' : item === 'Команда' ? 'team' : item === 'Отзывы' ? 'reviews' : 'catalog'}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-2"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-amber-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300 ease-out" />
            </Link>
          ))}
        </nav>

        {/* Contact Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="https://t.me/Sdservice24"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-50 border border-slate-200/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-primary/50 group"
            title="Наш Telegram канал"
          >
            <Send className="w-4 h-4 text-muted-foreground group-hover:text-[#0088cc] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </a>
          <a
            href="https://max.ru/u/f9LHodD0cOJ3xGhjX3_bzt3hbn2mMkcuVqd-AqaGN00IyQj8UqGzpUvfg64"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-50 border border-slate-200/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-primary/50 group"
            title="Наш MAX мессенджер"
          >
            <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-[#0088cc] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </a>
          <a
            href="tel:+79383591091"
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-foreground px-5 py-2.5 rounded-full font-medium shadow-md transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm tracking-wide">+7(938)359-10-91</span>
          </a>
        </div>
      </div>
    </header>
  );
}
