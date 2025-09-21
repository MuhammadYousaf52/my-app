import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from './mongodb'
import User from '../model/User'
import bcrypt from 'bcryptjs'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await connectDB()
          const user = await User.findOne({ email: credentials.email })
          if (!user) return null
          
          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) return null
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}