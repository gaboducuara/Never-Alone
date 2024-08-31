import { IChatArea } from '../interfaces';
import ChatAreaFooter from './ChatAreaFooter';
import ChatAreaHeader from './ChatAreaHeader';
import ChatAreaMain from './ChatAreaMain';

export default function ChatArea({
  conversation,
  setSelectedConversation,
}: IChatArea) {
  return (
    <div>
      <div className="row-span-1">
        <ChatAreaHeader
          conversation={conversation}
          setSelectedConversation={setSelectedConversation}
        />
      </div>
      <div className="row-start-2 row-span-1 max-h-[calc(100vh-18rem)]">
        <div className="overflow-y-auto">
          <ChatAreaMain conversation={conversation} />
        </div>
      </div>
      <div className="row-start-3">
        <div className="absolute bottom-0 right-0 w-[456px]">
          <ChatAreaFooter conversation={conversation} />
        </div>
      </div>
    </div>
  );
}
