import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare, hash } from 'bcrypt'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'PUT':
            const { name, email, oldPass, newPass } = req.body
            const session = await getServerAuthSession({ req, res })
            if (!session) return res.status(403).json({ err: 'Unauthorized' })
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: session.user.id,
                    },
                    select: {
                        hash: true,
                    },
                })

                if (!(await compare(oldPass, user?.hash!)))
                    return res.status(200).json({ err: 'Invalid Password' })

                // if (newPass === null || newPass.trim().length === 0) {
                const newUser = await prisma.user.update({
                    where: {
                        id: session.user.id,
                    },
                    data: {
                        email,
                        name,
                        hash:
                            newPass === null || newPass.trim().length === 0
                                ? user?.hash
                                : await hash(newPass, 10),
                    },
                })
                console.log(newUser)
                // }

                return res.status(200).json({ err: null })
            } catch (error: any) {
                return res.status(400).json({ err: error.message })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
