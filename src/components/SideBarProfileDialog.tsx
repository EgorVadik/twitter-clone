import { signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'

type props = {
    isOpened: boolean
    handleClose: () => void
}

function SideBarProfileDialog({ isOpened, handleClose }: props) {
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
            className={`w-[200px] shadow-pfp-dialog bg-black rounded-xl text-white -top-20 ${
                !isOpened && 'hidden '
            }`}
        >
            <button
                onClick={() => handleClose()}
                className='absolute top-1 left-3 text-2xl'
            >
                x
            </button>
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
