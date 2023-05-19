'use client'
import { type Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import SignupModal from './SignupModal'
import SideBarProfilePfp from './SideBarProfilePfp'
import SideBarProfileDialog from './SideBarProfileDialog'
import NewTweetModal from './NewTweetModal'

type props = {
    session: Session | null
}

function SideBar({ session }: props) {
    const [isSignupOpened, setIsSignupOpened] = useState(false)
    const [isPfpOpened, setIsPfpOpened] = useState(false)
    const [isNewTweetOpened, setIsNewTweetOpened] = useState(false)

    function handleSignupClose() {
        setIsSignupOpened(false)
    }

    function handlePfpClose() {
        setIsPfpOpened(false)
    }

    function handleNewTweetClose() {
        setIsNewTweetOpened(false)
    }

    return (
        <>
            {session?.user !== null ? (
                <NewTweetModal
                    isOpened={isNewTweetOpened}
                    handleClose={handleNewTweetClose}
                    userImg={session?.user.image}
                />
            ) : (
                <SignupModal
                    isOpened={isSignupOpened}
                    handleClose={handleSignupClose}
                />
            )}
            <nav className='w-[60px]'>
                <ul className='text-xl flex flex-col mt-3 fixed h-[95%]'>
                    {session?.user ? (
                        <>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link href={'/'}>
                                    {icon('/twitter_icon.svg', 'Twitter')}
                                </Link>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link
                                    href={'/'}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/home.svg', 'Home')}
                                    <p className='hidden lg:block'>Home</p>
                                </Link>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link
                                    href={'/explore'}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/explore.svg', 'Explore')}
                                    <p className='hidden lg:block'>Explore</p>
                                </Link>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link
                                    href={`/profile/${session.user.id}`}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/profile.svg', 'Profile')}
                                    <p className='hidden lg:block'>Profile</p>
                                </Link>
                            </li>
                            <li className='lg:w-full w-[40px]'>
                                <button
                                    className='bg-[#1d9bf0] rounded-full w-full py-2 hover:opacity-90'
                                    onClick={() => setIsNewTweetOpened(true)}
                                >
                                    <span className='lg:hidden block'>
                                        <Image
                                            src={'/tweet.svg'}
                                            alt={'Tweet'}
                                            width='24'
                                            height='24'
                                            className='m-auto'
                                        />
                                    </span>
                                    <span className='hidden lg:block'>
                                        Tweet
                                    </span>
                                </button>
                            </li>
                            <li className='mt-auto relative hover:bg-btn-hover-profile p-2 rounded-full'>
                                <SideBarProfileDialog
                                    handleClose={handlePfpClose}
                                    isOpened={isPfpOpened}
                                />
                                <button
                                    className='flex items-center gap-3'
                                    onClick={() => setIsPfpOpened(true)}
                                >
                                    <SideBarProfilePfp
                                        email={session.user.email!}
                                        name={session.user.name!}
                                        imgUrl={session.user.image}
                                    />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link href={'/'}>
                                    {icon('/twitter_icon.svg', 'Twitter')}
                                </Link>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link
                                    href={'/'}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/explore.svg', 'Explore')}
                                    <p className='hidden lg:block'>Explore</p>
                                </Link>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <button
                                    onClick={() => signIn()}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/login.svg', 'Login')}
                                    <p className='hidden lg:block'>Log in</p>
                                </button>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <button
                                    onClick={() => setIsSignupOpened(true)}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/login.svg', 'Sign up')}
                                    <p className='hidden lg:block'>Sign up</p>
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    )

    function icon(src: string, alt: string) {
        return <Image src={src} alt={alt} width='24' height='24' />
    }
}

export default SideBar
