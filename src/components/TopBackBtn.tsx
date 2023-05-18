'use client'

import { useRouter } from 'next/navigation'

function TopBackBtn() {
    const router = useRouter()
    return (
        <div className='flex items-center py-1 px-4 gap-10 fixed z-20 bg-black/65 md:w-[600px] w-full backdrop-sepia backdrop-blur-md'>
            <button onClick={() => router.back()} className='text-xl font-bold'>
                {'<-'}
            </button>
            <div>
                <p className='text-xl font-bold'>Name</p>
                <p className='text-sm text-[#71767b]'>0 Tweets</p>
            </div>
        </div>
    )
}

export default TopBackBtn
