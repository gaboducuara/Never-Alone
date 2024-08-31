'use client';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import '../public/fonts/chakra-petch.css';
import HeaderNav from './components/header/Header';
import '../app/globals.css';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [moved, setMoved] = useState(false);
  console.log({ session, status });

  const handleLoginButtonClick = () => {
    signIn();
    setIsOpen(true);
  };

  useEffect(() => {
    setMoved(true);
  }, []);

  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="h-screen  section " id="1">
      <HeaderNav />

      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
        <ul className="space-y-2">
          <li>
            <a
              href="#1"
              className={`nav-dot ${activeId === '1' ? 'active' : ''}`}
            ></a>
          </li>
          <li>
            <a
              href="#2"
              className={`nav-dot ${activeId === '2' ? 'active' : ''}`}
            ></a>
          </li>
          <li>
            <a
              href="#3"
              className={`nav-dot ${activeId === '3' ? 'active' : ''}`}
            ></a>
          </li>
          <li>
            <a
              href="#4"
              className={`nav-dot ${activeId === '4' ? 'active' : ''}`}
            ></a>
          </li>
        </ul>
      </div>

      <div
        className={`absolute top-10 left-0`}
        style={{
          transition: 'transform 2s ease',
          transform: moved ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <Image
          src="/Image2.png"
          width={355}
          height={376}
          alt="Imagen Superior Izquierda"
          className=""
        />
      </div>
      <div
        className={`absolute top-0 right-0`}
        style={{
          transition: 'transform 2s ease',
          transform: moved ? 'translateX(0%)' : 'translateX(100%)',
        }}
      >
        <Image
          src="/Image3.png"
          width={250}
          height={379}
          alt="Imagen Superior Derecha"
          className=""
        />
      </div>
      <div className="text-center relative top-56 mt-10 ">
        <div>
          <h1 className="text-7xl font-bold text-white">NOA</h1>
          <h1 className="text-7xl font-bold text-white">CONEXION MATCHING</h1>
          <h2 className="text-lg font-medium text-gray-500 mt-4">
            Un espacio donde encontrar el Match Perfecto para jugar a tus
            partidas.
          </h2>
        </div>
        <div
          className="left-0 right-0 text-center mt-36 h-screen "
          style={{
            transition: 'transform 2s ease',
            transform: moved ? 'translateY(0%)' : 'translateY(130%)',
          }}
        >
          <Image
            src="/Image1.png"
            width={194}
            height={183}
            alt="Imagen Inferior"
            className="inline-block"
          />
        </div>
      </div>

      <div className="flex h-screen items-center justify-center section" id="2">
        <div className="absolute left-4 text-center ml-10">
          <h1 className="text-7xl font-bold text-white ">Matchea con tus </h1>
          <h1 className="text-7xl font-bold text-white">juegos favoritos </h1>
          <h2 className="text-lg font-medium text-white mt-4">
            Un espacio donde encontrar al match perfecto para jugar tus partidas
          </h2>
          <button className="btn yellowBtn mt-5">A jugar!</button>
        </div>
        <div className="absolute right-0">
          <Image
            src="/Image4.png"
            width={708}
            height={1024}
            alt="Imagen Seccion 2"
            className="inline-block"
          />
        </div>
      </div>

      <div
        className="flex flex-col h-screen items-center justify-center section mt-56"
        id="3"
      >
        <div className="absolute text-center z-10 mb-96 ">
          <h1 className="text-7xl font-bold text-white">
            Encuentra a tu Match
          </h1>
          <h2 className="text-lg font-medium text-white mt-4">
            Podras encontrar a diferentes personas para jugar
          </h2>
        </div>
        <div className="flex justify-center z-0 mt-56">
          <div className="border-2 border-white border-solid relative m-10 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
            <Image
              src="/Perrito.png"
              width={350}
              height={393}
              alt="Imagen Cards"
              className="inline-block h-[20rem] object-cover"
            />
            <p className="text-white text-center text-5xl mt-5">Cristiano</p>
          </div>
          <div className="border-2 border-white border-solid relative m-10 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
            <Image
              src="/gamer2.webp"
              width={350}
              height={393}
              alt="Imagen Card"
              className="inline-block h-[20rem] object-cover"
            />
            <p className="text-white text-center text-5xl mt-5">Leonel</p>
          </div>
          <div className="border-2 h-[402px] border-white border-solid  relative m-10 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
            <Image
              src="/gamer3.avif"
              width={350}
              height={200}
              alt="Imagen Cards"
              className="inline-block h-[20rem] object-cover"
            />
            <p className="text-white text-center text-5xl mt-5">Federico</p>
          </div>
        </div>
      </div>
      <div className="flex  items-center justify-center section" id="4">
        <div className="absolute left-4 text-center ml-10">
          <h1 className="text-7xl font-bold text-white">A jugar!</h1>

          <button className="btn yellowBtn mt-5">Registrate</button>
        </div>
        <div className="">
          <Image
            src="/Valorant.gif"
            width={1920}
            height={1080}
            alt="Imagen Seccion 4"
            className=""
          />
        </div>
      </div>
    </main>
  );
};

export default Header;
