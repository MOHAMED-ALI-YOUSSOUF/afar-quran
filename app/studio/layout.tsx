// app/studio/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Content management for Tafsir Cheikh Hamad",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" className="min-h-screen bg-white">
      {children}
    </div>
  );
}