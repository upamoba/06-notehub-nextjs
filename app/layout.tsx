import './globals.css';
import { PropsWithChildren } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { TanStackProvider } from '../components/TanStackProvider/TanStackProvider';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}