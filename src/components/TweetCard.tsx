'use client'
import { defaultPfp } from '@/utils/constants'
import moment from 'moment'
import Image from 'next/image'

type props = {
    tweetId: string
    userName: string
    userImg: string | null
    content: string
    contentImg?: string
    createdAt: Date
    likes: number
    replies: number
}

function TweetCard({
    tweetId,
    content,
    createdAt,
    likes,
    replies,
    userName,
    contentImg,
    userImg,
}: props) {
    return (
        <div className='hover:bg-tweet-hover grid p-3 border-t-0 border border-[#2f3336]'>
            <div className='flex items-start gap-4'>
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
                                createdAt.setSeconds(createdAt.getSeconds() + 1)
                            ).fromNow()}
                        </span>
                    </p>
                    <p>{content}</p>
                </div>
            </div>
            {contentImg && contentImg.length !== 0 && (
                <Image
                    src={contentImg}
                    alt={userName}
                    className='rounded-2xl ml-16 mt-4 w-4/5 h-auto'
                    width='0'
                    height='0'
                    sizes='100%'
                />
            )}

            <ul className='flex items-center justify-evenly my-3 text-[#71767b]'>
                <li className='hover:text-reply-hover'>
                    <button
                        className='flex items-center gap-3'
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <Image
                            src={'/reply.svg'}
                            alt='Reply'
                            className=''
                            width='24'
                            height='24'
                        />
                        {replies}
                    </button>
                </li>
                <li className='hover:text-like-hover'>
                    <button
                        className='flex items-center gap-3'
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <Image
                            src={'/like.svg'}
                            alt='Like'
                            className='hover:fill-like-hover'
                            width='24'
                            height='24'
                        />
                        {likes}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TweetCard

// https://pbs.twimg.com/media/FwXIVpjXoAMKRu_?format=jpg&name=small
// https://pbs.twimg.com/profile_images/1560341882420563970/dpm2vcNU_400x400.jpg
