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
                {/* md:-bottom-36 -bottom-7 left-5 md:w-fit w-24 */}
                <div className='bg-black p-1 rounded-full relative w-fit left-4 -top-5'>
                    <Image
                        src={user?.image || defaultPfp}
                        className='rounded-full'
                        alt='pfp'
                        width={150}
                        height={150}
                    />
                </div>
                <div className='absolute bottom-16 right-5'>
                    <ProfileBtn session={session} />
                </div>
            </div>
            <ProfileInfo
                username={user.name!}
                joinedAt={moment(user.createdAt).format('MMMM YYYY')}
                followers={user._count.followedBy}
                following={user._count.following}
            />
            <ProfileNavBtns id={params.id} />
            {children}
        </div>
    )
}
