import { prisma } from '@/server/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method

    switch (method) {
        case 'POST':
            const { tweetId, imgUrl } = req.body

            try {
                const t = await prisma.tweet.update({
                    where: {
                        id: tweetId,
                    },
                    data: {
                        img: imgUrl,
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
