import { Image } from '@nextui-org/react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { ILastConversation, Message } from '../interfaces';
import LastSentMsg from './LastSentMsg';

export default function LastConversation({
  conversation,
  setSelectedConversation,
}: any) {
  const { data: session, status } = useSession();

  // Comprobaciones de nulabilidad para conversation y messages
  if (
    !conversation ||
    !conversation.messages ||
    conversation.messages.length === 0
  ) {
    return null; // o puedes retornar un mensaje de error u otro componente
  }

  const index = conversation.messages.length - 1;
  const lastMsg: Message = conversation.messages[index];

  // Comprobaciones de nulabilidad para userEmisor y userReceptor
  const userEmisor = conversation.userEmisor;
  const userReceptor = conversation.userReceptor;
  if (!userEmisor || !userReceptor) {
    return null; // o puedes retornar un mensaje de error u otro componente
  }

  const profile_picture =
    userEmisor.email === session?.user?.email
      ? userReceptor.image
      : userEmisor.image;
  const name =
    userEmisor.id === session?.user?.id
      ? userReceptor.username
      : userEmisor.username;

  return (
    <div
      className={clsx('msg' /*status === 'online' ? 'online' : ''*/)}
      onClick={() => setSelectedConversation(conversation)}
    >
      <Image className="msg-profile" src={profile_picture || ''} alt={name} />
      <div className="msg-detail">
        <div className="msg-username">{name}</div>
        <LastSentMsg message={lastMsg} />
      </div>
    </div>
  );
}
