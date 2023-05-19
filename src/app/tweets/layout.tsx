import ExploreBar from '@/components/ExploreBar'
import { getServerAuthSession } from '@/server/auth'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerAuthSession()
    return (
        <div className='md:w-[600px] w-full'>
            <ExploreBar session={session} />
            {children}
        </div>
    )
}
