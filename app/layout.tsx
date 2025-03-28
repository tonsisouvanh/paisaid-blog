import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/lib/provider/ReactQueryProvider';
import { ThemeProvider } from '@/lib/provider/theme-provider';
import type { Metadata } from 'next';
import { Noto_Sans_Lao } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/nav-bar';
import Footer from '@/components/footer';
import { MobileBottomNav } from '@/components/mobile-bottom.nav';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const notoSansLao = Noto_Sans_Lao({
  subsets: ['lao'],
  display: 'swap',
  weight: ['400', '500', '700'],
});
export const metadata: Metadata = {
  title: 'Heineken',
  description: 'Heineken beer - Enjoy the best quality beer from Heineken.',
  icons: {
    icon: ['/favicon.ico?v=4'],
    // apple: ['/apple-touch-icon.png?v=4'],
    // shortcut: ['/apple-touch-icon.png'],
  },
  openGraph: {
    title: 'YOUR APP NAME | App description',
    description: 'Description of the app',
    url: 'https://www.heinekenlaos.la/',
    images: [
      {
        url: 'https://www.heinekenlaos.la/assets/images/banner.png',
        width: 1200,
        height: 630,
        alt: 'Heineken beer pack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEINEKEN | Wedding promotion 2024',
    description: 'Heineken beer - Enjoy the best quality beer from Heineken.',
    images: 'https://www.heinekenlaos.la/assets/images/banner.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansLao.className} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <main className="">
              <Navbar />
              {children}
              <MobileBottomNav />
              <Footer className="pb-20" />
            </main>
          </ThemeProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
