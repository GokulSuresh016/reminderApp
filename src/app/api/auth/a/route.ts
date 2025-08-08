import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

// NextAuth.js configuration for Google authentication
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar.readonly',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  // Callbacks to handle the application flow and data if the auth is successful
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string
      }
      return session
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/enter-phone`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
