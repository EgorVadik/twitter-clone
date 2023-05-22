import { type GetServerSidePropsContext } from 'next'
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/server/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { AdapterUser } from 'next-auth/adapters'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            bannerImg?: string
        } & DefaultSession['user']
    }
}

export const authOptions: NextAuthOptions = {
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                // @ts-ignore
                token.user.name = session.user.name
                // @ts-ignore
                token.user.email = session.user.email
                // @ts-ignore
                token.user.image = session.user.image
                // @ts-ignore
                token.user.bannerImg = session.user.bannerImg
            }

            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            const id = (token.user as AdapterUser).id
            // @ts-ignore
            const bannerImg = (token.user as AdapterUser).bannerImg

            // @ts-ignore
            session.user.name = token.user.name
            // @ts-ignore
            session.user.email = token.user.email
            // @ts-ignore
            session.user.image = token.user.image

            return {
                ...session,
                user: {
                    ...session.user,
                    bannerImg,
                    id,
                },
            }
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials!

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                })

                if (user) {
                    if (await compare(password, user.hash)) {
                        return user
                    }
                }
                return null
            },
        }),
    ],
}

export const getServerAuthSession = async (ctx?: {
    req: GetServerSidePropsContext['req']
    res: GetServerSidePropsContext['res']
}) => {
    if (ctx) {
        return await getServerSession(ctx.req, ctx.res, authOptions)
    }
    return await getServerSession(authOptions)
}
