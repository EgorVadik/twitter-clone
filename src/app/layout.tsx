import SideBar from '@/components/SideBar'
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/context/Provider'
import { getServerAuthSession } from '@/server/auth'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Twitter Clone',
    description:
        'A web app that mimics the features and design of Twitter, such as posting tweets, following users, liking and more.',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerAuthSession()
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <main
                        className={`${inter.className} flex md:mx-14 lg:mx-10 mx-5`}
                    >
                        <div className='md:grow relative'>
                            <SideBar session={session} />
                        </div>
                        <div className='m-auto grow'>{children}</div>
                    </main>
                </Provider>
            </body>
        </html>
    )
}
