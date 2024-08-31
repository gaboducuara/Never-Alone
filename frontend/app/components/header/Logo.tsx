import { Image } from '@nextui-org/react';

export default function Logo() {
  return (
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <Image
        src="/logo.png"
        className="w-[5rem] h-[3rem]"
        alt="Flowbite Logo"
      />
    </a>
  );
}
