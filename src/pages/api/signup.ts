import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'POST':
            const { email, password, name } = req.body
            console.log(process.env.DATABASE_URL)

            try {
                const user = await prisma.user.create({
                    data: {
                        email,
                        name,
                        hash: await hash(password, 10),
                    },
                })
                return res.status(200).json({ user })
            } catch (error: any) {
                return res.status(400).json({ err: error.message })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
