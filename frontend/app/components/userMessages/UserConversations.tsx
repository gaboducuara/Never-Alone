'use client';
import { ReactNode, useState } from 'react';
import ChatArea from './Chat/ChatArea';
import ConversationArea from './Conversation/ConversationArea';
import UserProfile from './User/UserProfile';
import { Conversation, IUserConversations } from './interfaces';

export default function UserConversations({
  user,
  conversations,
}: IUserConversations): ReactNode {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>();
  return (
    <div className="w-1/3 grid grid-rows-3">
      {!selectedConversation ? (
        <div>
          <UserProfile user={user} />
          <div className="border-l-2 h-screen border-[#49454F]">
            <ConversationArea
              conversations={conversations}
              setSelectedConversation={setSelectedConversation}
            />
          </div>
        </div>
      ) : (
        <ChatArea
          conversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      )}
    </div>
  );
}
