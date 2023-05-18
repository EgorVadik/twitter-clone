import ProfileBanner from '@/components/ProfileBanner'
import ProfileInfo from '@/components/ProfileInfo'
import ProfileNavBtns from '@/components/ProfileNavBtns'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession()

    return (
        <div className='md:w-[600px] w-full'>
            <div className='relative'>
                <ProfileBanner imgUrl='https://pbs.twimg.com/profile_banners/429247237/1661704703/1500x500' />
                {/* md:-bottom-36 -bottom-7 left-5 md:w-fit w-24 */}
                <div className='bg-black p-1 rounded-full relative w-fit left-4 -top-5'>
                    <Image
                        src={
                            'https://pbs.twimg.com/profile_images/1560341882420563970/dpm2vcNU_400x400.jpg'
                        }
                        className='rounded-full'
                        alt='pfp'
                        width={150}
                        height={150}
                    />
                </div>
            </div>
            <ProfileInfo
                username='Egor'
                joinedAt='July 2022'
                followers={0}
                following={3}
            />
            <ProfileNavBtns id={session?.user.id} />
            {children}
        </div>
    )
}
