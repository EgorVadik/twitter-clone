import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'POST':
            try {
                const { oldPass } = req.body

                const session = await getServerAuthSession({ req, res })
                if (!session)
                    return res.status(403).json({ err: 'Unauthorized' })
                const user = await prisma.user.findUnique({
                    where: {
                        id: session.user.id,
                    },
                    select: {
                        hash: true,
                    },
                })

                if (!(await compare(oldPass as string, user?.hash!)))
                    return res.status(403).json({ err: 'Invalid Password' })

                return res.status(200).json({ err: null })
            } catch (error: any) {
                return res.status(400).json({ err: error.message })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
