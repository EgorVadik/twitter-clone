import Image from 'next/image'
import TopBackBtn from './TopBackBtn'

type props = {
    imgUrl?: string
}

function ProfileBanner({ imgUrl }: props) {
    return (
        <>
            <TopBackBtn />
            <div className='w-full h-[200px] pt-[60px]'>
                {imgUrl ? (
                    <Image
                        src={imgUrl}
                        alt='media'
                        className='w-full h-auto object-contain'
                        width='0'
                        height='0'
                        sizes='100%'
                    />
                ) : (
                    <div className='bg-[#333639] w-full h-full'></div>
                )}
            </div>
        </>
    )
}

export default ProfileBanner
