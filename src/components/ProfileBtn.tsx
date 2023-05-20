'use client'
import { type Session } from 'next-auth'
import { useEffect, useState } from 'react'
import EditProfileModal from './EditProfileModal'

type props = {
    session: Session | null
    profileId: string
}

function ProfileBtn({ session, profileId }: props) {
    const [following, setFollowing] = useState(false)
    const [followingIds, setFollowingIds] = useState<string[]>([])
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        const getIds = async () => {
            const ids = await fetch('/api/user/following-ids', {
                method: 'GET',
            }).then((res) => res.json())

            setFollowingIds(ids.followingIds)
        }
        if (session && session.user.id !== profileId) getIds()
    }, [profileId, session])

    useEffect(() => {
        if (session && session.user.id !== profileId) {
            if (followingIds.includes(profileId)) {
                setFollowing(true)
            }
        }
    }, [followingIds, profileId, session])

    async function toggleFollow() {
        await fetch('/api/user/follow', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                profileId,
            }),
        })
    }

    function handleClose() {
        setIsOpened(false)
    }

    if (session && session.user.id === profileId) {
        return (
            <>
                {isOpened && (
                    <EditProfileModal
                        isOpened={isOpened}
                        handleClose={handleClose}
                        session={session}
                    />
                )}
                <button
                    className='rounded-full border border-[#536471] py-2 px-4 font-bold hover:bg-slate-500/10 absolute bottom-[45px] right-4'
                    onClick={() => {
                        setIsOpened(true)
                    }}
                >
                    Edit profile
                </button>
            </>
        )
    } else if (session && session.user.id !== profileId) {
        if (followingIds.includes(profileId) && following) {
            return (
                <button
                    className='rounded-full border border-[#536471] py-2 px-4 font-bold absolute bottom-[45px] right-4 before:content-["Following"] before:hover:content-["Unfollow"] hover:bg-unfollow-bg hover:text-unfollow-text hover:border-unfollow-border'
                    onClick={async () => {
                        setFollowing(false)
                        setFollowingIds((prev) =>
                            prev.filter((ids) => ids !== profileId)
                        )
                        await toggleFollow()
                    }}
                ></button>
            )
        } else {
            return (
                <button
                    className='rounded-full text-black bg-white py-2 px-4 font-semibold hover:opacity-90 absolute bottom-[45px] right-4'
                    onClick={async () => {
                        setFollowing(true)
                        setFollowingIds((prev) => [...prev, profileId])
                        await toggleFollow()
                    }}
                >
                    Follow
                </button>
            )
        }
    }

    return (
        <button className='rounded-full text-black bg-white py-2 px-4 font-semibold hover:opacity-90 absolute bottom-[45px] right-4'>
            Follow
        </button>
    )
}

export default ProfileBtn
// 6467227bf204bc0be7008d9e
