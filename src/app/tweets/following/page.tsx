import Redirect from '@/components/Redirect'
import TweetCard from '@/components/TweetCard'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import Link from 'next/link'
import Router from 'next/navigation'

export default async function page() {
    const session = await getServerAuthSession()
    if (!session) {
        return <Redirect redirectTo='/' />
    }

    const followedUsers = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            followingIDs: true,
        },
    })

    const followingTweets = await prisma.tweet.findMany({
        where: {
            userId: {
                in: followedUsers?.followingIDs,
            },
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
        <>
            <div
                className={`md:w-[600px] w-full ${
                    session !== null ? 'pt-[108px]' : 'pt-[50px]'
                }`}
            >
                {followingTweets.map((tweet) => (
                    <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
                        <TweetCard
                            tweetId={tweet.id}
                            content={tweet.content}
                            likes={tweet._count.likes}
                            createdAt={tweet.createdAt}
                            replies={tweet._count.replies}
                            userName={tweet.author.name!}
                            contentImg={tweet.img}
                            userImg={tweet.author.image}
                        />
                    </Link>
                ))}
            </div>
        </>
    )
}
