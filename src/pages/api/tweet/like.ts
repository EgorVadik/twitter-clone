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
            const { tweetId } = req.body
            const session = await getServerAuthSession({ req, res })
            if (!session) return res.status(403).json({ err: 'Unauthorized' })
            let update = 1

            try {
                const like = await prisma.like.findFirst({
                    where: {
                        tweetId,
                        userId: session.user.id,
                    },
                })

                if (like) {
                    await prisma.like.delete({
                        where: {
                            id: like.id,
                        },
                    })
                    update *= -1
                } else {
                    await prisma.like.create({
                        data: {
                            tweetId,
                            userId: session.user.id,
                        },
                    })
                }

                return res.status(200).json({ update })
            } catch (error) {
                return res.status(400).json({ err: error })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
