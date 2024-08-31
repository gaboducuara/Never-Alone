import { Key, ReactNode } from 'react';
import { Conversation, IConversationArea } from '../interfaces';
import LastConversation from './LastConversation';
import NoConversations from './NoConversations';

export default function ConversationArea({
  conversations,
  setSelectedConversation,
}: IConversationArea) {
  const sortedConversations = conversations.sort(
    (a: Conversation, b: Conversation) => {
      // Sort conversations based on the updatedAt timestamp of the last message in each conversation
      const aLastMessageTime = new Date(
        a.messages?.[a.messages.length - 1]?.updatedAt || ''
      ).getTime();
      const bLastMessageTime = new Date(
        b.messages?.[b.messages.length - 1]?.updatedAt || ''
      ).getTime();
      return bLastMessageTime - aLastMessageTime;
    }
  );

  return sortedConversations.length > 0 ? (
    <div>
      <span className="text-[#ACA5A5] px-5 mt-5 text-[18px] ">Mensajes</span>
      <div className="max-h-[calc(100vh-4rem)] max-w-full hover:overflow-y-auto">
        {sortedConversations.map(
          (conversation: Conversation, index: Key): ReactNode => {
            // Pass the last message of each conversation to LastConversation component
            const lastMessage =
              conversation.messages?.[conversation.messages.length - 1] ?? null;
            return (
              <LastConversation
                key={index}
                conversation={conversation}
                lastMessage={lastMessage} // Pass the last message as a prop
                setSelectedConversation={setSelectedConversation}
              />
            );
          }
        )}
      </div>
    </div>
  ) : (
    <NoConversations />
  );
}
