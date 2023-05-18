type props = {
    username: string
    joinedAt: string
    followers: number
    following: number
}

function ProfileInfo({ username, joinedAt, followers, following }: props) {
    return (
        <div>
            <p className='text-lg font-bold mb-4'>{username}</p>
            <p className='text-[#666a6f]'>Joined {joinedAt}</p>
            <div className='flex text-[#666a6f] gap-4 mt-2'>
                <p>
                    <span className='text-white font-bold'>
                        {following.toString()}
                    </span>{' '}
                    Following
                </p>
                <p>
                    <span className='text-white font-bold'>
                        {followers.toString()}
                    </span>{' '}
                    Followers
                </p>
            </div>
        </div>
    )
}

export default ProfileInfo
