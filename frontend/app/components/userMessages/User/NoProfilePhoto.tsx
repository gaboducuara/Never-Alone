import { INoProfilePhoto } from '../interfaces';

export default function NoProfilePhoto({ username }: INoProfilePhoto) {
  return (
    username && <div className="avatar-pseudo ">
      <span className="initial text-[#da404c]">{username[0]}</span>
    </div>
  );
}
