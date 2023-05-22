'use client'
import { defaultPfp } from '@/utils/constants'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import AddImgBtn from './AddImgBtn'
import InputField from './InputField'
import { addBanner, addPfp } from '@/server/firebase'

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

    const [imgFile, setImgFile] = useState<File | null>(null)
    const [bannerImgFile, setBannerImgFile] = useState<File | null>(null)
    const [img, setImg] = useState<string | null>(null)
    const [bannerImg, setBannerImg] = useState<string | null>(null)

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

        if (!session) return

        if (!validateEmail(email!)) return

        setEmailErr('')
        setNameErr('')
        setPassErr('')

        const auth = await fetch('/api/user/profile/authenticate', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                oldPass,
            }),
        }).then((res) => res.json())

        if (
            auth.err !== null &&
            auth.err.toLowerCase().includes('invalid password')
        ) {
            setPassErr('Invalid password')
            return
        }

        let bannerImgUrl: string | null = null
        let imgUrl: string | null = null

        if (bannerImgFile !== null) {
            bannerImgUrl = await addBanner(bannerImgFile, session.user.id)
        }
        if (imgFile !== null) imgUrl = await addPfp(imgFile, session.user.id)

        const { err } = await fetch('/api/user/profile/update', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                name,
                email,
                newPass,
                bannerImgUrl,
                imgUrl,
            }),
        }).then((res) => res.json())

        if (err === null) {
            await update({
                user: {
                    name,
                    email,
                    bannerImg:
                        bannerImgUrl !== null
                            ? bannerImgUrl
                            : session.user.bannerImg,
                    image: imgUrl !== null ? imgUrl : session.user.image,
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

    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files

        if (file && file.length > 0) {
            if (file[0].size >= 4 * 1024 * 1024) {
                alert('File is too large 4MB max.')
                return
            }
            setImgFile(file[0])
            setImg(URL.createObjectURL(file[0]))
        }
    }

    const handleBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files

        if (file && file.length > 0) {
            if (file[0].size >= 4 * 1024 * 1024) {
                alert('File is too large 4MB max.')
                return
            }
            setBannerImgFile(file[0])
            setBannerImg(URL.createObjectURL(file[0]))
        }
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
                <div className='w-full h-[200px] relative my-2'>
                    {((session?.user.bannerImg &&
                        session.user.bannerImg.length > 0) ||
                        bannerImg) && (
                        <Image
                            src={bannerImg || session?.user.bannerImg!}
                            alt={session?.user.name!}
                            className='w-full h-[200px] object-fill'
                            width='0'
                            height={200}
                            sizes='100%'
                        />
                    )}
                    <AddImgBtn
                        handleChange={handleBannerChange}
                        id='bannerImg'
                    />
                </div>
                <div className='relative w-fit'>
                    <Image
                        src={img || session?.user.image || defaultPfp}
                        alt={session?.user.name!}
                        className='opacity-75 w-[120px] h-[120px] rounded-full object-cover'
                        width='120'
                        height='120'
                        sizes='100%'
                    />
                    <AddImgBtn handleChange={handleImgChange} id='img' />
                </div>
                <div className='py-3 flex flex-col gap-5'>
                    <InputField
                        type={'text'}
                        placeholder={'name'}
                        value={name!}
                        setVal={setName}
                        classNames={`${
                            nameErr.length !== 0 && 'focus:border-[#f4212e]'
                        }`}
                        err={nameErr}
                    />

                    <InputField
                        type={'email'}
                        placeholder={'Email'}
                        value={email!}
                        setVal={setEmail}
                        classNames={`${
                            emailErr.length !== 0 && 'focus:border-[#f4212e]'
                        }`}
                        err={emailErr}
                    />

                    <InputField
                        type={'password'}
                        placeholder={'Old Password'}
                        value={oldPass}
                        setVal={setOldPass}
                        classNames={`${
                            passErr.length !== 0 && 'focus:border-[#f4212e]'
                        }`}
                        err={passErr}
                    />

                    <InputField
                        type={'password'}
                        placeholder={'New Password'}
                        value={newPass!}
                        setVal={setNewPass}
                        classNames={''}
                        required={false}
                    />
                </div>
            </form>
        </dialog>
    )
}

export default EditProfileModal
