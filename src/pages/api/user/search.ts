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
            const session = await getServerAuthSession({ req, res })
            if (!session) return res.status(403).json({ err: 'Unauthorized' })

            const { search } = req.body

            try {
                const users = await prisma.user.findMany({
                    where: {
                        OR: [
                            { email: { contains: search } },
                            { name: { contains: search } },
                        ],
                    },
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                    },
                })

                return res.status(200).json({ users: users })
            } catch (error) {
                return res.status(400).json({ err: error })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
