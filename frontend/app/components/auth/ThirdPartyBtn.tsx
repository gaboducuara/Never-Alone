import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';

export default function ThirdPartyBtns() {
  return (
    <div className="flex mt-8 gap-5">
      <button>
        <GoogleIcon />
      </button>
      <button>
        <FacebookRoundedIcon />
      </button>
    </div>
  );
}
