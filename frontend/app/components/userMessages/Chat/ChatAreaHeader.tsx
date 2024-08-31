import { Image } from '@nextui-org/react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el ícono de retroceso
import { IChatAreaHeader } from '../interfaces';

export default function ChatAreaHeader({
  conversation,
  setSelectedConversation,
}: IChatAreaHeader) {
  const { data: session, status } = useSession();
  const profile_picture =
    conversation?.userEmisor?.id === session?.user.id
      ? conversation?.userReceptor?.image
      : conversation?.userEmisor?.image;
  console.log(profile_picture);
  const name =
    conversation?.userEmisor?.id === session?.user?.id
      ? conversation?.userReceptor?.username
      : conversation?.userEmisor?.username;
  // const status = conversation?.recipient?.status || ''; // Asegurarse de manejar el caso en que status esté vacío

  return (
    <div className="chat-area-header">
      <button onClick={() => setSelectedConversation(null)}>
        <FiArrowLeft className="w-20 h-6 mr-0 back-arrow" />
      </button>
      <div
        className={clsx('msg', 'online', /*status === 'online' ? 'online' : ''*/)}
      >
        <Image
          className="w-[2.75rem] h-[2.75rem] rounded-full"
          src={profile_picture || ""}
          alt={name}
        />
      </div>
      <div className="chat-area-title">{name}</div>
    </div>
  );
}
