'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase, type Car } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBudget, setFilterBudget] = useState('all');

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      setError('Не удалось загрузить автомобили. Пожалуйста, попробуйте обновить страницу.');
    } finally {
      setLoading(false);
    }
  }

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesBudget = true;
      if (filterBudget !== 'all') {
        const price = car.price;
        if (filterBudget === '500k') matchesBudget = price <= 500000;
        else if (filterBudget === '1m') matchesBudget = price > 500000 && price <= 1000000;
        else if (filterBudget === '2m') matchesBudget = price > 1000000 && price <= 2000000;
        else if (filterBudget === '3m') matchesBudget = price > 2000000 && price <= 3000000;
        else if (filterBudget === 'more') matchesBudget = price > 3000000;
      }

      return matchesSearch && matchesBudget;
    });
  }, [cars, searchQuery, filterBudget]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      <div className="max-w-screen-2xl mx-auto px-6 py-12 pt-32 flex-grow w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center pt-8">
          КАТАЛОГ АВТОМОБИЛЕЙ
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-8 flex items-center justify-between">
            <span>{error}</span>
            <Button
              onClick={fetchCars}
              variant="destructive"
            >
              Повторить
            </Button>
          </div>
        )}

        {/* Filters */}
        <div className="glass-panel border-white/10 rounded-2xl p-6 mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Поиск по марке или модели..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all"
            />
            <Select value={filterBudget} onValueChange={setFilterBudget}>
              <SelectTrigger className="h-12 bg-black/40 border-white/10 text-white focus:ring-primary transition-all">
                <SelectValue placeholder="Все бюджеты" />
              </SelectTrigger>
              <SelectContent className="bg-background border-white/10 text-white">
                <SelectItem value="all">Все бюджеты</SelectItem>
                <SelectItem value="500k">До 500 000 ₽</SelectItem>
                <SelectItem value="1m">500 000 - 1 000 000 ₽</SelectItem>
                <SelectItem value="2m">1 000 000 - 2 000 000 ₽</SelectItem>
                <SelectItem value="3m">2 000 000 - 3 000 000 ₽</SelectItem>
                <SelectItem value="more">Более 3 000 000 ₽</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilterBudget('all');
              }}
              variant="outline"
              className="h-12 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              Сбросить фильтры
            </Button>
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-20 glass-panel border-white/10 rounded-2xl">
            <p className="text-2xl text-white/80">Автомобили не найдены</p>
            <p className="text-white/50 mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="glass-panel border-white/10 rounded-2xl overflow-hidden shadow-lg group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full bg-black/20">
                <div className="relative h-56 bg-white/5 overflow-hidden">
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                      Нет фото
                    </div>
                  )}
                  {car.status === 'sold' && (
                    <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full font-semibold shadow-lg border border-red-500/30">
                      Продано
                    </div>
                  )}
                  {car.status === 'reserved' && (
                    <div className="absolute top-3 right-3 bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full font-semibold shadow-lg border border-orange-500/30">
                      Забронировано
                    </div>
                  )}
                  
                  {/* Gradient Overlay for Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80" />
                  
                  {/* Title and Price inside image container */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight drop-shadow-md">
                      {car.brand} {car.model}
                    </h3>
                    <div className="text-lg font-bold text-primary drop-shadow-md">
                      {car.price.toLocaleString()} ₽
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-white/80 text-sm mb-3">
                    <span className="font-medium">{car.year} г.</span>
                    <span className="text-white/30">•</span>
                    <span className="font-medium">{car.mileage.toLocaleString()} км</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/60 mb-4 bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-white/40">Двигатель</span>
                      <span className="text-white/80 font-medium">
                        {car.engine_volume ? `${car.engine_volume} л ` : ''}{car.fuel_type}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-2">
                      <span className="text-white/40">КПП / Привод</span>
                      <span className="text-white/80 font-medium">
                        {car.transmission}{car.drive_type ? ` / ${car.drive_type}` : ''}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-white/50 text-xs mb-4 line-clamp-2 flex-grow">{car.description}</p>
                  
                  <div className="mt-auto">
                    <a
                      href="https://t.me/LTSPRigon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
                        Заказать такой же
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
