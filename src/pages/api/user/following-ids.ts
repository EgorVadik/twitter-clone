import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'GET':
            const session = await getServerAuthSession({ req, res })
            if (!session) return res.status(403).json({ err: 'Unauthorized' })

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: session.user.id,
                    },
                    select: {
                        followingIDs: true,
                    },
                })

                return res
                    .status(200)
                    .json({ followingIds: user?.followingIDs })
            } catch (error) {
                return res.status(400).json({ err: error })
            }

        default:
            break
    }
}
