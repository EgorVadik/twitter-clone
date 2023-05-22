import Image from 'next/image'
import { ChangeEvent } from 'react'

type props = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    id: string
}

function AddImgBtn({ handleChange, id }: props) {
    return (
        <label
            htmlFor={id}
            className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-[#080b0d] rounded-full w-[45px] h-[45px] cursor-pointer hover:bg-add-img-hover z-20'
        >
            <Image
                src={'/add-img.svg'}
                alt={'Add Image'}
                className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                width='24'
                height={24}
            />
            <input
                type='file'
                id={id}
                className='opacity-0'
                onChange={handleChange}
            />
        </label>
    )
}

export default AddImgBtn
