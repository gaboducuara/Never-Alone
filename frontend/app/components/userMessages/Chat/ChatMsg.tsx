import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { Key } from 'react';
import { IChatMsg, MsgTxt } from '../interfaces';

export default function ChatMsg({ message }: IChatMsg) {
  const { data: session, status } = useSession();
  const owner = message.userId;
  console.log(message, 'messssss');

  return (
    <div
      className={clsx(
        'chat-msg',
        owner === session?.user.id ? 'owner' : 'owner-not'
      )}
    >
      <div className="chat-msg-content">
          <div className="chat-msg-text">{message.text}</div>
      </div>
    </div>
  );
}
