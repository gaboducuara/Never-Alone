import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: Session | null;
      id: any;
      meta: any;
      email: string;
      token: string;
    };
  }
}
