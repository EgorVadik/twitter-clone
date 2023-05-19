import { type Session } from 'next-auth'

type props = {
    session: Session | null
}

function ProfileBtn({ session }: props) {
    if (session) {
        return <div>Enter</div>
    }

    return <></>
}

export default ProfileBtn
