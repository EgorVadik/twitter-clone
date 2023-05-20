import ExploreBar from '@/components/ExploreBar'
import TweetCard from '@/components/TweetCard'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import Link from 'next/link'

export default async function Home() {
    const allTweets = await prisma.tweet.findMany({
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

    const session = await getServerAuthSession()

    return (
        <>
            <ExploreBar session={session} />
            <div
                className={`md:w-[600px] w-full ${
                    session !== null ? 'pt-[108px]' : 'pt-[50px]'
                }`}
            >
                {allTweets.map((tweet) => (
                    // <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
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
                    // </Link>
                ))}
            </div>
        </>
    )
}
