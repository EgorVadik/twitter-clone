import { uploadImage } from '@/server/firebase'
import { defaultPfp } from '@/utils/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
    ChangeEvent,
    FormEvent,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react'

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
    const [img, setImg] = useState('')
    const [imgFile, setImgFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

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
            if (imgFile !== null) {
                setUploading(true)
                const { id } = await res.json()
                const imgUrl = await uploadImage(imgFile, id)

                await fetch('/api/upload-tweet-img', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ imgUrl, tweetId: id }),
                }).then((res) => res.json())
                setImgFile(null)
                setImg('')
                setUploading(false)
            }

            handleClose()
            router.refresh()
            setContent('')
            return
        }
    }

    function resizeTextArea(textarea: RefObject<HTMLTextAreaElement>) {
        if (!textarea.current) return
        if (textarea.current.scrollHeight < 160) return

        textarea.current.style.height = 'auto'
        textarea.current.style.height = `${textarea.current.scrollHeight + 4}px`
    }

    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files

        if (file && file.length > 0) {
            if (file[0].size >= 16 * 1024 * 1024) {
                alert('File is too large 16MB max.')
                return
            }
            setImgFile(file[0])
            setImg(URL.createObjectURL(file[0]))
        }
    }

    return (
        <dialog
            ref={modalRef}
            className={`backdrop:bg-modal-bg md:w-[600px] bg-black rounded-xl text-white pt-14 ${
                !isOpened && 'hidden'
            }`}
        >
            {uploading && (
                <p className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl font-bold'>
                    Uploading image...
                </p>
            )}
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
                <div className='flex flex-col gap-5 items-start w-full'>
                    <div className='flex gap-5 items-start w-full'>
                        <Image
                            src={userImg || defaultPfp}
                            alt='Profile Image'
                            width={48}
                            height={48}
                            className='w-12 h-12 object-cover rounded-full'
                            sizes='100%'
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
                    {img.length !== 0 && (
                        <Image
                            src={img}
                            alt={img}
                            className='rounded-2xl ml-16 mt-4 w-4/5 h-auto'
                            width='0'
                            height='0'
                            sizes='100%'
                        />
                    )}
                </div>
                <hr className='border-[#2f3336] w-full' />
                <div className='flex items-center justify-between w-full'>
                    <label
                        htmlFor='img'
                        className='rounded-full p-2 hover:bg-tweet-img-hover cursor-pointer'
                    >
                        <input
                            type='file'
                            id='img'
                            className='hidden'
                            onChange={handleImgChange}
                        />
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
