# ОРЕОН - Авто из Европы

Сайт компании ОРЕОН для продажи и доставки автомобилей из Европы в Россию.

## 🚀 Возможности

- ✅ Каталог автомобилей с фильтрацией
- ✅ Формы заявок с интеграцией Telegram
- ✅ Видео-отзывы клиентов
- ✅ Админ панель для управления контентом
- ✅ Полностью адаптивный дизайн
- ✅ Интеграция с Supabase для хранения данных

## 🛠 Технологии

- **Framework:** Next.js 15.3.7
- **Runtime:** Bun
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Deploy:** Netlify

## 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/gorbacenkovitalij6-prog/auto-europe-site.git

# Перейти в директорию
cd auto-europe-site

# Установить зависимости
bun install

# Запустить dev сервер
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## ⚙️ Настройка

### 1. Переменные окружения

Создайте файл `.env.local` и добавьте:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 2. Supabase

См. документацию в `.same/SUPABASE_SETUP.md` для настройки базы данных.

### 3. Telegram Bot

См. документацию в `TELEGRAM_SETUP.md` для настройки бота.

## 📁 Структура проекта

```
auto-europe-site/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Главная страница
│   │   ├── about/        # Страница "О нас"
│   │   ├── team/         # Страница "Команда"
│   │   ├── reviews/      # Страница "Отзывы"
│   │   ├── catalog/      # Каталог автомобилей
│   │   ├── admin/        # Админ панель
│   │   └── api/          # API маршруты
│   ├── components/       # React компоненты
│   │   └── ui/          # shadcn/ui компоненты
│   └── lib/             # Утилиты и конфиги
├── public/              # Статические файлы
└── .same/               # Документация и SQL скрипты
```

## 🚢 Деплой

### Netlify

1. Подключите репозиторий к Netlify
2. Добавьте переменные окружения (см. `NETLIFY_ENV_SETUP.md`)
3. Нажмите Deploy

### Локально

```bash
bun run build
```

## 📄 Документация

- `TELEGRAM_SETUP.md` - Настройка Telegram бота
- `NETLIFY_ENV_SETUP.md` - Настройка переменных для Netlify
- `.same/SUPABASE_SETUP.md` - Настройка Supabase
- `.same/site-health-check.md` - Отчет о проверке сайта

## 🔐 Доступ к админ панели

Админ панель доступна по адресу `/login` или `/admin`.

## 📞 Контакты

- Telegram: [@OreonAuto](https://t.me/OreonAuto)
- Телефон: +7 (495) 178-06-46
- Email: sd-service@rambler.ru

## 📝 Лицензия

© 2026 ОРЕОН. Все права защищены.
