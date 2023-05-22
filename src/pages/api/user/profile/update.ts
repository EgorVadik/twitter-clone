import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'PUT':
            const { name, email, newPass, bannerImgUrl, imgUrl } = req.body

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

                await prisma.user.update({
                    where: {
                        id: session.user.id,
                    },
                    data: {
                        email: email as string,
                        name: name as string,
                        hash:
                            newPass === null ||
                            (newPass as string).trim().length === 0
                                ? user?.hash
                                : await hash(newPass as string, 10),
                        bannerImg:
                            bannerImgUrl !== null
                                ? bannerImgUrl
                                : session.user.bannerImg,
                        image: imgUrl !== null ? imgUrl : session.user.image,
                    },
                })

                return res.status(200).json({ err: null })
            } catch (error: any) {
                return res.status(400).json({ err: error.message })
            }

        default:
            return res.status(405).json({ err: 'Method Not Allowed' })
    }
}
