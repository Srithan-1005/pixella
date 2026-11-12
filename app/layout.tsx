import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./hire-orbit-styles.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

export const metadata: Metadata = {
  title: "HireOrbit | AI-Powered Job & Internship Platform",
  description: "The futuristic hiring ecosystem for students and professionals. Get AI-matched jobs, ATS scoring, and interview prep.",
  keywords: ["job search", "AI matching", "resume parser", "interview prep", "career", "engineering jobs"],
  authors: [{ name: "HireOrbit" }],
  creator: "HireOrbit",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    title: "HireOrbit - Where talent meets opportunity",
    description: "Get hired 5x faster with AI-powered job matching",
    siteName: "HireOrbit",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HireOrbit - AI Job Matching Platform",
    description: "Get hired 5x faster with AI-powered matching",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script: reads localStorage before React hydrates to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('hireorbit_theme');var t=s;if(!t||t==='system'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className={cn(
        inter.variable,
        outfit.variable,
        "font-sans antialiased selection:bg-indigo-500/30"
      )}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
