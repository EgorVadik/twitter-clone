import Redirect from '@/components/Redirect'
import SearchBar from '@/components/SearchBar'
import { getServerAuthSession } from '@/server/auth'

async function page() {
    const session = await getServerAuthSession()

    if (!session) {
        return <Redirect redirectTo='/' />
    }

    return (
        <div className='md:w-[600px] w-full min-h-screen border-x border-[#2f3336]'>
            <SearchBar />
        </div>
    )
}

export default page
