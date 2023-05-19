'use client'

import { signIn } from 'next-auth/react'
import { FormEvent, useEffect, useRef, useState } from 'react'

type props = {
    isOpened: boolean
    handleClose: () => void
}

function SignupModal({ isOpened, handleClose }: props) {
    const modalRef = useRef<HTMLDialogElement>(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailErr, setEmailErr] = useState('')
    const [nameErr, setNameErr] = useState('')

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (!validateEmail(email)) return

        setEmailErr('')
        setNameErr('')

        const res = await fetch('/api/signup', {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        if (res.ok) {
            console.log('ok')

            await signIn()
            return
        }

        const err = await res.json()
        if (err.err.toLowerCase().includes('user_name_key')) {
            setNameErr('Name already exists.')
        }

        if (err.err.toLowerCase().includes('user_email_key')) {
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

    useEffect(() => {
        if (isOpened) {
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        }
    }, [isOpened])

    return (
        <dialog
            ref={modalRef}
            className={`backdrop:bg-modal-bg md:w-[600px] bg-black rounded-xl text-white px-20 pt-20 ${
                !isOpened && 'hidden'
            }`}
        >
            <button
                onClick={() => handleClose()}
                className='absolute top-1 left-3 text-2xl'
            >
                x
            </button>
            <h1 className='text-3xl font-bold mb-3'>Create your account</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='w-full relative'>
                    <input
                        type='text'
                        placeholder='Name'
                        className={`${
                            nameErr.length !== 0 && 'focus:border-[#f4212e]'
                        } focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2 w-full`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <p className='text-[#f4212e] text-sm'>{nameErr}</p>
                    <span className='absolute top-1 right-2 text-sm text-[#71767b]'>
                        {name.length}/50
                    </span>
                </div>
                <div className='w-full relative'>
                    <input
                        type='email'
                        placeholder='Email'
                        className={`${
                            emailErr.length !== 0 && 'focus:border-[#f4212e]'
                        } focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2 w-full`}
                        value={email}
                        onChange={(e) => {
                            validateEmail(e.target.value)
                            setEmail(e.target.value)
                            if (e.target.value.trim().length === 0) {
                                setEmailErr('')
                            }
                        }}
                        required
                    />
                    <p className='text-[#f4212e] text-sm'>{emailErr}</p>
                </div>
                <div className='w-full relative'>
                    <input
                        type='password'
                        placeholder='Password'
                        className='focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2 w-full'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    disabled={
                        name.trim().length === 0 ||
                        email.trim().length === 0 ||
                        password.trim().length === 0
                    }
                    className='w-full mt-20 py-4 text-black font-bold bg-white rounded-full disabled:bg-[#787a7a] disabled:cursor-not-allowed'
                >
                    Create account
                </button>
            </form>
        </dialog>
    )
}

export default SignupModal
