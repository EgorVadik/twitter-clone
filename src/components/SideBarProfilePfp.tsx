import { defaultPfp } from '@/utils/constants'
import Image from 'next/image'

type props = {
    imgUrl?: string | null
    name: string
    email: string
}

function SideBarProfilePfp({ imgUrl, name, email }: props) {
    return (
        <>
            <Image
                src={imgUrl || defaultPfp}
                alt={name}
                width={40}
                height={40}
            />
            <div className='text-base hidden lg:block text-start'>
                <p className='font-bold'>{email}</p>
                <p className='text-[#71767b]'>{name}</p>
            </div>
        </>
    )
}

export default SideBarProfilePfp
