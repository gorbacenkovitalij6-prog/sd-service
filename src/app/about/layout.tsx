import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании СД-СЕРВИС - Авто из Европы",
  description: "СД-СЕРВИС — команда специалистов с опытом в подборе и импорте автомобилей более 11 лет. Честность, прозрачность и профессионализм.",
  openGraph: {
    title: "О компании СД-СЕРВИС - Авто из Европы",
    description: "СД-СЕРВИС — команда специалистов с опытом в подборе и импорте автомобилей более 11 лет. Честность, прозрачность и профессионализм.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
