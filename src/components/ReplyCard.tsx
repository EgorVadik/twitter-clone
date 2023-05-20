import { defaultPfp } from '@/utils/constants'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

type props = {
    userId: string
    // tweetId: string
    userName: string
    userImg: string | null
    content: string
    createdAt: Date
}

function ReplyCard({
    userId,
    // tweetId,
    content,
    createdAt,
    userName,
    userImg,
}: props) {
    return (
        <>
            <div className='hover:bg-tweet-hover grid p-3 border-t-0 border border-[#2f3336]'>
                <Link
                    href={`/profile/${userId}`}
                    className='flex items-start gap-4'
                >
                    <Image
                        src={userImg || defaultPfp}
                        className='rounded-full'
                        alt={userName}
                        width={48}
                        height={48}
                    />
                    <div>
                        <p className='font-bold'>
                            {userName}{' '}
                            <span className='text-sm font-normal text-[#71767b]'>
                                {moment(
                                    createdAt.setSeconds(
                                        createdAt.getSeconds() + 1
                                    )
                                ).fromNow()}
                            </span>
                        </p>
                        <p>{content}</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ReplyCard
