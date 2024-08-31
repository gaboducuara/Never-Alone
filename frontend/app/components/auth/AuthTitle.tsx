import { ReactNode } from "react";

export default function AuthTitle({children}:{children:ReactNode}) {
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <h2 className="text-2xl font-bold">{children}</h2>
      <hr className="w-full border-b-1 absolute mt-9" />
    </div>
  );
}
