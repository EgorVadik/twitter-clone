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
            const { profileId } = req.body
            const session = await getServerAuthSession({ req, res })
            if (!session) return res.status(403).json({ err: 'Unauthorized' })

            try {
                let userFollows = await prisma.user.findUnique({
                    where: {
                        id: session.user.id,
                    },
                    select: {
                        followingIDs: true,
                    },
                })

                if (userFollows?.followingIDs.includes(profileId)) {
                    userFollows.followingIDs = userFollows.followingIDs.filter(
                        (ids) => ids !== profileId
                    )
                } else {
                    userFollows?.followingIDs.push(profileId)
                }

                await prisma.user.update({
                    data: {
                        followingIDs: userFollows?.followingIDs,
                    },
                    where: {
                        id: session.user.id,
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
