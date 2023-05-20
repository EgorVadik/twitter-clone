import { defaultPfp } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'

type props = {
    id: string
    name: string
    email: string
    img: string | null
}

function SearchUserCard({ id, email, img, name }: props) {
    return (
        <Link
            href={`/profile/${id}`}
            className='flex items-center gap-3 px-5 py-3 text-start hover:bg-user-card-hover'
        >
            <Image
                src={img || defaultPfp}
                alt={name}
                width={48}
                height={48}
                className='rounded-full'
            />
            <div>
                <p className='font-bold'>{name}</p>
                <p className='text-[#71767b]'>{email}</p>
            </div>
        </Link>
    )
}

export default SearchUserCard
