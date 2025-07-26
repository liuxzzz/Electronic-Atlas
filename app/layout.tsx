import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Electronic Atlas',
  description:
    '一个现代化的电子地图集应用，为您提供详细的地理信息和交互式地图体验',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <body className={`antialiased min-h-screen flex flex-col`}>
        <Header />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
