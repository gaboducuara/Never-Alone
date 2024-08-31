import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import Main from './components/Main/Main';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NOA - Never One Alone',
  description:
    '¡Sumérgete en nuestra plataforma de citas para gamers y descubre un mundo donde encontrar tu compañero de juego ideal es más que posible! Conecta con jugadores afines y disfruta de sesiones épicas juntos, explorando un universo de juegos que amas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen">
        <Providers>
          <Main>{children}</Main>
        </Providers>
      </body>
    </html>
  );
}
