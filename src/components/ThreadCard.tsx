import { defaultPfp } from '@/utils/constants'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

type props = {
    count: {
        likes: number
        replies: number
    }
    author: {
        id: string
        name: string | null
        email: string | null
        image: string | null
    }
    content: string
    img: string
    createdAt: Date
}

function ThreadCard({ author, content, count, createdAt, img }: props) {
    return (
        <div className='grid p-3 border-t-0 border border-[#2f3336]'>
            <Link
                href={`/profile/${author.id}`}
                className='flex items-start gap-4'
            >
                <Image
                    src={author.image || defaultPfp}
                    className='rounded-full w-[48px] h-[48px] object-cover'
                    alt={author.name!}
                    width={48}
                    height={48}
                    sizes='100%'
                />
                <div>
                    <p className='font-bold'>{author.name!}</p>
                    <p className='text-sm font-normal text-[#71767b]'>
                        {author.email}
                    </p>
                </div>
            </Link>
            <p className='pt-2'>{content}</p>
            {img && img.length !== 0 && (
                <Image
                    src={img}
                    alt={author.name!}
                    className='rounded-2xl ml-16 mt-4 w-4/5 h-auto'
                    width='0'
                    height='0'
                    sizes='100%'
                />
            )}
            <p className='text-sm text-[#71767b] mt-2'>
                {moment(createdAt).format('h:mm A · MMMM DD, YYYY')}
            </p>
            <hr className='border-[#2f3336] my-3' />
            <div className='flex items-center gap-3'>
                <p className='font-bold'>
                    {count.replies}{' '}
                    <span className='font-normal text-[#71767b]'>Replies</span>
                </p>
                <p className='font-bold'>
                    {count.likes}{' '}
                    <span className='font-normal text-[#71767b]'>Likes</span>
                </p>
            </div>
            <hr className='border-[#2f3336] my-3' />
        </div>
    )
}

export default ThreadCard
