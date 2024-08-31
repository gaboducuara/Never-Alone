import ThirdPartyTitle from "../ThirdPartyTitle";
import ThirdPartyRegisterButtons from "../register/ThirdPartyRegisterButtons";

export default function ThirdPartyLogin() {
  return (
    <div className="flex justify-center">
      <ThirdPartyTitle>O inicar sesión con</ThirdPartyTitle>
      <ThirdPartyRegisterButtons/>
    </div>
  );
}
