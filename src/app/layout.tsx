import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";

// 1. IMPORT THE NEW MODAL LOGIC
import { EnquiryModalProvider } from "@/context/EnquiryModalContext";
import { EnquiryModal } from "@/components/ui/EnquiryModal";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Taldo",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5S6RTVW9');`,
          }}
        />
      </head>
      <body className={`${albertSans.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5S6RTVW9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* 2. WRAP YOUR APP WITH THE PROVIDER */}
        <EnquiryModalProvider>
          
          <LayoutClient>
            {children}
          </LayoutClient>

          {/* 3. ADD THE MODAL COMPONENT HERE */}
          <EnquiryModal />
          
        </EnquiryModalProvider>

      </body>
    </html>
  );
}