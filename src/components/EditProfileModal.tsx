'use client'
import { defaultPfp } from '@/utils/constants'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'

type props = {
    handleClose: () => void
    isOpened: boolean
    session: Session | null
}

function EditProfileModal({ handleClose, isOpened, session }: props) {
    const router = useRouter()
    const modalRef = useRef<HTMLDialogElement>(null)
    const { update } = useSession()

    if (!session) {
        router.push('/')
    }

    const [name, setName] = useState(session?.user.name)
    const [email, setEmail] = useState(session?.user.email)
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState<string | null>(null)

    const [emailErr, setEmailErr] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [passErr, setPassErr] = useState('')

    useEffect(() => {
        setName(session?.user.name)
        setEmail(session?.user.email)
    }, [session])

    useEffect(() => {
        if (isOpened) {
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        }
    }, [isOpened])

    useEffect(() => {
        if (!email) return
        validateEmail(email!)
        if (email!.trim().length === 0) {
            setEmailErr('')
        }
    }, [email])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (!validateEmail(email!)) return
        console.log(newPass)

        setEmailErr('')
        setNameErr('')
        setPassErr('')

        const { err } = await fetch('/api/user/profile/update', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                name,
                email,
                oldPass,
                newPass,
            }),
        }).then((res) => res.json())

        if (err === null) {
            await update({
                user: {
                    name,
                    email,
                },
            })

            router.refresh()
            handleClose()
            return
        }

        if (err.toLowerCase().includes('user_name_key')) {
            setNameErr('Name already exists.')
        }

        if (err.toLowerCase().includes('user_email_key')) {
            setEmailErr('Email already exists.')
        }

        if (err.toLowerCase().includes('invalid password')) {
            setPassErr('Invalid password')
        }
    }

    function validateEmail(email: string) {
        const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        if (!emailReg.test(email)) {
            setEmailErr('Please enter a valid email.')
            return false
        }
        setEmailErr('')
        return true
    }

    return (
        <dialog
            ref={modalRef}
            className={`backdrop:bg-modal-bg md:w-[600px] w-full h-[700px] bg-black rounded-xl text-white ${
                !isOpened && 'hidden'
            }`}
        >
            <form onSubmit={handleSubmit}>
                <div className='flex items-center w-full gap-5'>
                    <button
                        type='button'
                        onClick={() => handleClose()}
                        className='text-2xl'
                    >
                        x
                    </button>
                    <h2 className='font-bold text-xl grow'>Edit profile</h2>
                    <button
                        type='submit'
                        className='text-black bg-white rounded-full px-4 py-1 font-semibold'
                    >
                        Save
                    </button>
                </div>
                <div className='w-full h-[200px] relative'>
                    {session?.user.bannerImg &&
                        session.user.bannerImg.length > 0 && (
                            <Image
                                src={session.user.bannerImg}
                                alt={session.user.name!}
                                className='w-full h-[200px]'
                                width='0'
                                height={200}
                                sizes='100%'
                            />
                        )}
                    {addImgBtn()}
                </div>
                <div className='relative w-fit'>
                    {addImgBtn()}
                    <Image
                        src={session?.user.image || defaultPfp}
                        alt={session?.user.name!}
                        className='opacity-75'
                        width='120'
                        height='120'
                    />
                </div>
                <div className='py-3 flex flex-col gap-5'>
                    {inputField(
                        'text',
                        'Name',
                        name!,
                        setName,
                        `${nameErr.length !== 0 && 'focus:border-[#f4212e]'}`
                    )}
                    <p
                        className={`text-[#f4212e] text-sm ${
                            nameErr.length === 0 && 'hidden'
                        } `}
                    >
                        {nameErr}
                    </p>

                    {inputField(
                        'email',
                        'Email',
                        email!,
                        setEmail,
                        `${emailErr.length !== 0 && 'focus:border-[#f4212e]'}`
                    )}
                    <p
                        className={`text-[#f4212e] text-sm ${
                            emailErr.length === 0 && 'hidden'
                        } `}
                    >
                        {emailErr}
                    </p>

                    {inputField(
                        'password',
                        'Old Password',
                        oldPass,
                        setOldPass,
                        `${passErr.length !== 0 && 'focus:border-[#f4212e]'}`
                    )}
                    <p
                        className={`text-[#f4212e] text-sm ${
                            passErr.length === 0 && 'hidden'
                        } `}
                    >
                        {passErr}
                    </p>

                    {inputField(
                        'password',
                        'New Password',
                        newPass!,
                        setNewPass,
                        '',
                        false
                    )}
                </div>
            </form>
        </dialog>
    )

    function addImgBtn() {
        return (
            <label
                htmlFor='bannerImg'
                className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-[#080b0d] rounded-full w-[45px] h-[45px] cursor-pointer hover:bg-add-img-hover z-20'
            >
                <Image
                    src={'/add-img.svg'}
                    alt={'Add Image'}
                    className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                    width='24'
                    height={24}
                />
                <input type='file' id='bannerImg' className='hidden' />
            </label>
        )
    }

    function inputField(
        type: string,
        placeholder: string,
        value: string,
        setVal: any,
        classNames: string = '',
        required: boolean = true
    ) {
        return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setVal(e.target.value)}
                className={`${classNames} focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2 w-full`}
                required={required}
            />
        )
    }
}

export default EditProfileModal
