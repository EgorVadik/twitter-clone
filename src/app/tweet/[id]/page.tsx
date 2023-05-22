import Redirect from '@/components/Redirect'
import ReplyCard from '@/components/ReplyCard'
import ThreadCard from '@/components/ThreadCard'
import TopBackBtn from '@/components/TopBackBtn'
import { prisma } from '@/server/db'

async function page({ params }: any) {
    const tweet = await prisma.tweet.findUnique({
        where: {
            id: params.id,
        },
        select: {
            content: true,
            img: true,
            createdAt: true,

            _count: {
                select: {
                    likes: true,
                    replies: true,
                },
            },
            author: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    image: true,
                },
            },
            replies: {
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    })

    if (!tweet) {
        return <Redirect redirectTo='/' />
    }

    return (
        <div className='md:w-[600px] w-full border-x border-x-[#2f3336]'>
            <TopBackBtn name='Thread' tweetCount={-1} />
            <div className='pt-[60px]'>
                <ThreadCard
                    author={tweet.author}
                    content={tweet.content}
                    count={tweet._count}
                    createdAt={tweet.createdAt}
                    img={tweet.img}
                />
                {tweet.replies.map((reply) => (
                    <ReplyCard
                        key={reply.id}
                        content={reply.content}
                        createdAt={reply.createdAt}
                        userId={reply.user.id}
                        userImg={reply.user.image}
                        userName={reply.user.name!}
                    />
                ))}
            </div>
        </div>
    )
}

export default page
