import TweetCard from '@/components/TweetCard'
import { prisma } from '@/server/db'

interface Params {
    id: string
}

async function page({ params }: { params: Params }) {
    const tweets = await prisma.tweet.findMany({
        where: {
            userId: params.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            author: true,
            _count: {
                select: {
                    likes: true,
                    replies: true,
                },
            },
        },
    })

    return (
        <div className={`md:w-[600px] w-full`}>
            {tweets.map((tweet) => (
                <TweetCard
                    key={tweet.id}
                    userId={tweet.author.id}
                    tweetId={tweet.id}
                    content={tweet.content}
                    likes={tweet._count.likes}
                    createdAt={tweet.createdAt}
                    replies={tweet._count.replies}
                    userName={tweet.author.name!}
                    contentImg={tweet.img}
                    userImg={tweet.author.image}
                />
            ))}
        </div>
    )
}

export default page
