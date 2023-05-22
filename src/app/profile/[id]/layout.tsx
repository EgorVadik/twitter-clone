import ProfileBanner from '@/components/ProfileBanner'
import ProfileBtn from '@/components/ProfileBtn'
import ProfileInfo from '@/components/ProfileInfo'
import ProfileNavBtns from '@/components/ProfileNavBtns'
import Redirect from '@/components/Redirect'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { defaultPfp } from '@/utils/constants'
import moment from 'moment'
import Image from 'next/image'

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: any
}) {
    const session = await getServerAuthSession()
    const user = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
        select: {
            _count: {
                select: {
                    tweets: true,
                    following: true,
                    followedBy: true,
                },
            },
            name: true,
            image: true,
            bannerImg: true,
            createdAt: true,
            following: true,
        },
    })

    if (!user) {
        return <Redirect redirectTo='/' />
    }

    return (
        <div className='md:w-[600px] w-full border-x border-[#2f3336]'>
            <div className='relative'>
                <ProfileBanner
                    name={user.name!}
                    tweetCount={user._count.tweets}
                    imgUrl={user.bannerImg}
                />
                <div className='bg-black p-1 rounded-full relative w-fit left-4 -top-5'>
                    <Image
                        src={user?.image || defaultPfp}
                        className='rounded-full w-[150px] h-[150px] object-cover'
                        alt='pfp'
                        width={150}
                        height={150}
                    />
                </div>
                <ProfileBtn session={session} profileId={params.id} />
            </div>
            <ProfileInfo
                username={user.name!}
                joinedAt={moment(user.createdAt).format('MMMM YYYY')}
                followers={user._count.followedBy}
                following={user.following.length}
            />
            <ProfileNavBtns id={params.id} />
            {children}
        </div>
    )
}
