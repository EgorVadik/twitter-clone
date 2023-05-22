import { signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'

type props = {
    isOpened: boolean
    handleClose: () => void
    email: string
}

function SideBarProfileDialog({ isOpened, handleClose, email }: props) {
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpened) {
            modalRef.current?.show()
        } else {
            modalRef.current?.close()
        }
    }, [isOpened])

    return (
        <dialog
            ref={modalRef}
            className={`w-[200px] shadow-pfp-dialog bg-black rounded-xl text-white -top-28 ${
                !isOpened && 'hidden '
            }`}
        >
            <button
                onClick={() => handleClose()}
                className='absolute top-1 left-3 text-2xl'
            >
                x
            </button>
            <p className='text-center mt-1'>{email}</p>
            <button
                className='text-center w-full'
                onClick={async () => await signOut()}
            >
                Log out
            </button>
        </dialog>
    )
}

export default SideBarProfileDialog
