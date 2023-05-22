import Image from 'next/image'
import TopBackBtn from './TopBackBtn'

type props = {
    imgUrl: string | null
    name: string
    tweetCount: number
}

function ProfileBanner({ imgUrl, name, tweetCount }: props) {
    return (
        <>
            <TopBackBtn name={name} tweetCount={tweetCount} />
            <div className='w-full h-[200px] pt-[60px]'>
                {imgUrl ? (
                    <Image
                        src={imgUrl}
                        alt='media'
                        className='w-full h-[200px] object-fill'
                        width='0'
                        height='0'
                        sizes='100%'
                    />
                ) : (
                    <div className='bg-[#333639] w-full h-[200px]'></div>
                )}
            </div>
        </>
    )
}

export default ProfileBanner
