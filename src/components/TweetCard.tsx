'use client'
import { defaultPfp } from '@/utils/constants'
import moment from 'moment'
import Image from 'next/image'
import { useState } from 'react'
import ReplyModal from './ReplyModal'
import Link from 'next/link'

type props = {
    userId: string
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
    userId,
    tweetId,
    content,
    createdAt,
    likes,
    replies,
    userName,
    contentImg,
    userImg,
}: props) {
    const [likesCount, setLikesCount] = useState(likes)
    const [repliesCount, setRepliesCount] = useState(replies)
    const [isOpened, setIsOpened] = useState(false)

    function handleClose() {
        setIsOpened(false)
    }

    return (
        <>
            {isOpened && (
                <ReplyModal
                    tweetId={tweetId}
                    isOpened={isOpened}
                    handleClose={handleClose}
                    userName={userName}
                    replyToContent={content}
                    replyToUserImg={userImg}
                    createdAt={moment(
                        createdAt.setSeconds(createdAt.getSeconds() + 1)
                    ).fromNow()}
                />
            )}
            <Link href={`/tweet/${tweetId}`}>
                <div className='hover:bg-tweet-hover grid p-3 border-t-0 border border-[#2f3336]'>
                    <div
                        // href={`/profile/${userId}`}
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
                                    setIsOpened(true)
                                }}
                            >
                                <Image
                                    src={'/reply.svg'}
                                    alt='Reply'
                                    className=''
                                    width='24'
                                    height='24'
                                />
                                {repliesCount}
                            </button>
                        </li>
                        <li className='hover:text-like-hover'>
                            <button
                                className='flex items-center gap-3'
                                onClick={async (e) => {
                                    e.preventDefault()
                                    const { update } = await fetch(
                                        '/api/tweet/like',
                                        {
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                            },
                                            method: 'POST',
                                            body: JSON.stringify({
                                                tweetId,
                                            }),
                                        }
                                    ).then((res) => res.json())
                                    setLikesCount((prev) => prev + update)
                                }}
                            >
                                <Image
                                    src={'/like.svg'}
                                    alt='Like'
                                    className='hover:fill-like-hover'
                                    width='24'
                                    height='24'
                                />
                                {likesCount}
                            </button>
                        </li>
                    </ul>
                </div>
            </Link>
        </>
    )
}

export default TweetCard

// https://pbs.twimg.com/media/FwXIVpjXoAMKRu_?format=jpg&name=small
// https://pbs.twimg.com/profile_images/1560341882420563970/dpm2vcNU_400x400.jpg
