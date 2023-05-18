'use client'
import { type Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import SignupModal from './SignupModal'

type props = {
    session: Session | null
}

function SideBar({ session }: props) {
    const [isOpened, setIsOpened] = useState(false)

    function handleClose() {
        setIsOpened(false)
    }

    return (
        <>
            <SignupModal isOpened={isOpened} handleClose={handleClose} />
            <nav className='w-[60px]'>
                <ul className='text-xl flex flex-col mt-3 fixed'>
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
                                    href={'/'}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/explore.svg', 'Explore')}
                                    <p className='hidden lg:block'>Explore</p>
                                </Link>
                            </li>
                            <li className='hover:bg-btn-hover-profile lg:w-fit w-[40px] lg:mx-0 lg:p-3 p-2 rounded-full'>
                                <Link
                                    href={'/'}
                                    className='flex items-center gap-3'
                                >
                                    {icon('/profile.svg', 'Profile')}
                                    <p className='hidden lg:block'>Profile</p>
                                </Link>
                            </li>
                            <li className=''>Tweet</li>
                            <li>prof..</li>
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
                                    onClick={() => setIsOpened(true)}
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
