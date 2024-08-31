import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if(!credentials) {
          throw new Error(
            'No credentials previded!'
          );
        }
        if (credentials.email.length < 3) {
          throw new Error(
            'El correo electrónico debe tener al menos 3 caracteres.'
          );
        }
        if (credentials.password.length < 10) {
          throw new Error('La contraseña debe tener al menos 10 caracteres.');
        }
        if (!credentials.email || !credentials.password) {
          throw new Error(
            'Debe ingresar un correo electrónico y una contraseña.'
          );
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const user = await res.json();
        console.log('router user', user);
        if (user.error) {
          throw new Error(user.error.message);
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
  },
});
export { handler as GET, handler as POST };

