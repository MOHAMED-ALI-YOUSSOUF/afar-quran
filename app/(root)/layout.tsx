// app/(root)/layout.tsx
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفسير الشيخ حمد",
  description: "تفسير القرآن الكريم باللغة العفرية من الشيخ حمد",
};

export default function RootSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen dark">
      <main className="container mx-auto px-4 py-8">
      
        {children}
            <Footer  />
      </main>
    </div>
  );
}