import { ReactNode } from "react";

export default function ThirdPartyTitle({children}:{children:ReactNode}) {
  return (
    <div className="absolute separator">
      <div></div>
      <span className="inline-block text-nowrap">{children}</span>
      <div></div>
    </div>
  );
}
