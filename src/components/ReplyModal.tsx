import { defaultPfp } from '@/utils/constants'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
type props = {
    isOpened: boolean
    handleClose: () => void
    userName: string
    tweetId: string
    replyToUserImg: string | null
    replyToContent: string
    createdAt: string
}
function ReplyModal({
    handleClose,
    isOpened,
    userName,
    tweetId,
    replyToUserImg,
    replyToContent,
    createdAt,
}: props) {
    const router = useRouter()
    const modalRef = useRef<HTMLDialogElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [content, setContent] = useState('')
    const { data, status } = useSession()

    if (status == 'unauthenticated') {
        handleClose()
    }

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

        const res = await fetch('/api/tweet/reply', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ tweetId, content }),
        })

        if (res.ok) {
            handleClose()
            router.refresh()
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
            } cursor-default`}
        >
            <button
                onClick={(e) => {
                    e.preventDefault()
                    handleClose()
                }}
                className='absolute top-2 left-5 text-2xl'
            >
                x
            </button>

            <div className='flex gap-5 items-start w-full mb-7'>
                <Image
                    src={replyToUserImg || defaultPfp}
                    alt='Profile Image'
                    width={48}
                    height={48}
                />
                <div>
                    <p>
                        {userName}{' '}
                        <span className='text-sm font-normal text-[#71767b]'>
                            {createdAt}
                        </span>
                    </p>
                    <p>{replyToContent}</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-3 items-start'
            >
                <div className='flex gap-5 items-start w-full'>
                    <Image
                        src={data?.user.image || defaultPfp}
                        alt='Profile Image'
                        width={48}
                        height={48}
                    />
                    <textarea
                        ref={textareaRef}
                        rows={5}
                        className='resize-none bg-transparent text-xl w-full focus:outline-none pt-3'
                        placeholder='Tweet your reply!'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className='flex items-center justify-end w-full'>
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
                            type='submit'
                            disabled={
                                content.trim().length === 0 ||
                                content.trim().length > 280
                            }
                            className={`disabled:bg-[#0e4e78] disabled:cursor-not-allowed disabled:text-[#808080] font-bold bg-[#1d9bf0] rounded-full px-4 py-2`}
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </form>
        </dialog>
    )
}

export default ReplyModal
