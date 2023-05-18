'use client'

import { useEffect, useRef, useState } from 'react'

type props = {
    isOpened: boolean
    handleClose: () => void
}

function SignupModal({ isOpened, handleClose }: props) {
    const modalRef = useRef<HTMLDialogElement>(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            className={`backdrop:bg-modal-bg md:w-[600px] bg-black rounded-xl text-white flex flex-col px-20 pt-20 gap-5 ${
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
            <input
                type='text'
                placeholder='Name'
                className='focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2'
            />
            <input
                type='email'
                placeholder='Email'
                className='focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2'
            />
            <input
                type='password'
                placeholder='Password'
                className='focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2'
            />
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
        </dialog>
    )
}

export default SignupModal
