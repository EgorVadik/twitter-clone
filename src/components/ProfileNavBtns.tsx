import Link from 'next/link'

type props = {
    id?: string
}

function ProfileNavBtns({ id }: props) {
    return (
        <div className='flex'>
            <Link
                href={`/profile/${id}/`}
                className='grow hover:bg-btn-hover-profile py-4 text-center border-b border-[#2f3336]'
            >
                Tweets
            </Link>
            <Link
                href={`/profile/${id}/likes`}
                className='grow hover:bg-btn-hover-profile py-4 text-center border-b border-[#2f3336]'
            >
                Likes
            </Link>
        </div>
    )
}

export default ProfileNavBtns
