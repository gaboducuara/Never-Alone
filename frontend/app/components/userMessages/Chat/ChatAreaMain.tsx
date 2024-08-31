import { useSession } from 'next-auth/react';
import { Key, ReactNode, useEffect, useState } from 'react';
import { getMessages } from '../../../api/actions/messages';
import { IChatAreaMain, Message } from '../interfaces';
import ChatMsg from './ChatMsg';

export default function ChatAreaMain({ conversation }: IChatAreaMain) {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (session) {
        try {
          const convos = await getMessages(session, conversation?.id || "");
          setMessages(convos);
          if (convos.length > 0) console.log('Messages from page: ', convos);
        } catch (error) {
          console.error('Error fetching Messages:', error);
        }
      }
    };

    fetchConversations();
  }, [session, conversation?.id, messages]);

  return (
    <div className="overflow-y-auto" style={{ maxHeight: 'calc(83vh - 4rem)' }}>
      {messages?.map(
        (message: Message, index: Key): ReactNode => (
          <ChatMsg key={index} message={message} />
        )
      )}
    </div>
  );
}
