import { defaultPfp } from '@/utils/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
type props = {
    isOpened: boolean
    handleClose: () => void
    userImg?: string | null
}
function NewTweetModal({ handleClose, isOpened, userImg }: props) {
    const router = useRouter()
    const modalRef = useRef<HTMLDialogElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [content, setContent] = useState('')

    useEffect(() => {
        if (isOpened) {
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        }
    }, [isOpened])

    useEffect(() => {
        resizeTextArea(textareaRef)
    }, [content])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const res = await fetch('/api/new-tweet', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ content }),
        })

        if (res.ok) {
            handleClose()
            router.push('/')
            setContent('')
            return
        }

        const { err } = await res.json()

        console.log(err)
    }

    function resizeTextArea(textarea: RefObject<HTMLTextAreaElement>) {
        if (!textarea.current) return
        if (textarea.current.scrollHeight < 160) return

        textarea.current.style.height = 'auto'
        textarea.current.style.height = `${textarea.current.scrollHeight + 4}px`
    }

    return (
        <dialog
            ref={modalRef}
            className={`backdrop:bg-modal-bg md:w-[600px] bg-black rounded-xl text-white pt-14 ${
                !isOpened && 'hidden'
            }`}
        >
            <button
                onClick={() => handleClose()}
                className='absolute top-2 left-5 text-2xl'
            >
                x
            </button>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-3 items-start'
            >
                <div className='flex gap-5 items-start w-full'>
                    <Image
                        src={userImg || defaultPfp}
                        alt='Profile Image'
                        width={48}
                        height={48}
                    />
                    <textarea
                        ref={textareaRef}
                        rows={5}
                        className='resize-none bg-transparent text-xl w-full focus:outline-none'
                        placeholder='What is happening?!'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <hr className='border-[#2f3336] w-full' />
                <div className='flex items-center justify-between w-full'>
                    <label
                        htmlFor='img'
                        className='rounded-full p-2 hover:bg-tweet-img-hover cursor-pointer'
                    >
                        <input type='file' id='img' className='hidden' />
                        <Image
                            src={'/image.svg'}
                            alt='Image'
                            width={24}
                            height={24}
                        />
                    </label>
                    <div className='flex items-center gap-3'>
                        <p>
                            <span
                                className={`${
                                    content.length > 280 && 'text-red-600'
                                }`}
                            >
                                {content.length}
                            </span>
                            /280
                        </p>
                        <button
                            disabled={
                                content.trim().length === 0 ||
                                content.trim().length > 280
                            }
                            className={`disabled:bg-[#0e4e78] disabled:cursor-not-allowed disabled:text-[#808080] font-bold bg-[#1d9bf0] rounded-full px-4 py-2`}
                        >
                            Tweet
                        </button>
                    </div>
                </div>
            </form>
        </dialog>
    )
}

export default NewTweetModal
