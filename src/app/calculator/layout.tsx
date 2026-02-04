import type { Metadata } from "next";

export const metadata: Metadata = {
  // The title that appears on the browser tab
  title: "Germany Nurse Salary Calculator | Taldo",
  // The description for Google Search
  description: "Calculate your potential salary, savings, and tax benefits as a nurse in Germany. Based on official 2026 German tax laws.",
  
  // The "Card" that appears on WhatsApp/LinkedIn
  openGraph: {
    title: "Germany Nurse Salary Calculator 🇩🇪",
    description: "See how much you can save! 💰 3x Higher Savings & Permanent Residency.",
    url: "https://taldo.org/calculator", // Update this when you have a real domain
    siteName: "Taldo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // We will add this image next
        width: 1200,
        height: 630,
        alt: "Taldo Salary Calculator Preview",
      },
    ],
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}