import { type Session } from 'next-auth'
import Link from 'next/link'

type props = {
    session: Session | null
}

function ExploreBar({ session }: props) {
    if (session === null) {
        return (
            <div className='flex items-center py-3 border-[#2f3336] border-x px-4 gap-10 fixed z-20 bg-black/65 md:w-[600px] w-full backdrop-sepia backdrop-blur-md'>
                <div>
                    <Link href={'/'} className='text-xl font-bold'>
                        Explore
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='flex items-center py-3 border-[#2f3336] border-x px-4 gap-10 fixed z-20 bg-black/65 md:w-[600px] w-full backdrop-sepia backdrop-blur-md'>
            <div className='w-full'>
                <Link href={'/'} className='text-xl font-bold'>
                    Home
                </Link>
                <div className='flex'>
                    <Link
                        href={`/tweets/`}
                        className='grow hover:bg-btn-hover-profile py-4 text-center border-b border-[#2f3336] font-bold'
                    >
                        All Tweets
                    </Link>
                    <Link
                        href={`/tweets/following`}
                        className='grow hover:bg-btn-hover-profile py-4 text-center border-b border-[#2f3336] font-bold'
                    >
                        Following
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ExploreBar
