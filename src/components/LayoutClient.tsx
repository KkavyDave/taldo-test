"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Contact from "@/components/Contact"; // <--- Keep this commented or delete it

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Helper checks
  const isAdminPage = pathname?.startsWith("/admin");
  const isCalculatorPage = pathname?.startsWith("/calculator"); // Optional if you have specific logic for this later

  return (
    <>
      {/* Hide Header on Admin pages */}
      {!isAdminPage && <Header />}
      
      {children}
      
  
      
      {/* Hide Footer on Admin pages */}
      {!isAdminPage && <Footer />}
    </>
  );
}