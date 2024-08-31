import { IConversationArea } from './interfaces.d';
//Base
type Status = 'online' | 'offline';
export interface User {
  email?:any;
  id?:any;
  username?: string;
  image?: string | null;
  profile_picture?: string | null;
  description?: string | null;
  status?: string;
  accessToken?:any
  meta?:any
}

export interface Conversation {
  updatedAt?: any
  id?: string
  userEmisor?: User;
  userReceptor?: User;
  messages?: Message[];
}

export interface DataJson {
  user: User;
  conversation: Conversation[];
}

export interface MsgTxt {
  text: string;
  timestamp: string;
}
export interface Message {
  id?:string
  text?:string
  updatedAt?:any
  userId?: string;
  owner?: boolean;
  content?: MsgTxt[];
  read?: boolean;
}

//Components

export interface IUserConversations {
  user: User;
  conversations: Conversation[];
}

//Conversations
export interface IUserProfile extends Pick<IUserConversations, 'user'> {}

export interface IConversationArea
  extends Pick<IUserConversations, 'conversations'> {
  setSelectedConversation?: any;
}

export interface ILastConversation
  extends Omit<IConversationArea, 'conversations'> {
  conversation: Conversation;
}

//Messages

export interface IChatArea extends Omit<IConversationArea, 'conversations'> {
  conversation: Conversation | undefined;
}

export interface IChatFooter extends Omit<IConversationArea, 'conversations'> {
  conversation: Conversation | undefined;
}

export interface IChatAreaHeader extends IChatArea {}

export interface IChatAreaMain
  extends Omit<IChatArea, 'setSelectedConversation'> {}

export interface IMessages {
  messages: Message[];
}

export interface ILastSentMessage {
  message: Message;
}

export interface IChatMsg {
  message: Message;
}

export interface IProfilePhoto extends Pick<User, 'profile_picture'> {}

export interface INoProfilePhoto extends Pick<User, 'username'> {}
