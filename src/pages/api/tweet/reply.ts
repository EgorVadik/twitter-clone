import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'POST':
            const { tweetId, content } = req.body
            const session = await getServerAuthSession({ req, res })
            if (!session) return res.status(403).json({ err: 'Unauthorized' })

            try {
                await prisma.reply.create({
                    data: {
                        content,
                        tweetId,
                        userId: session.user.id,
                    },
                })

                return res.status(200).json({ err: null })
            } catch (error) {
                return res.status(400).json({ err: error })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
