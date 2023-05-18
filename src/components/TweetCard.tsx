import Image from 'next/image'

function TweetCard() {
    return (
        <div className='grid p-3 border-t-0 border border-[#2f3336]'>
            <div className='flex items-start gap-4'>
                <Image
                    src={
                        'https://pbs.twimg.com/profile_images/1560341882420563970/dpm2vcNU_400x400.jpg'
                    }
                    className='rounded-full'
                    alt='pfp'
                    width={48}
                    height={48}
                />

                <div>
                    <p className='font-bold'>
                        Some Name{' '}
                        <span className='text-sm font-normal text-[#71767b]'>
                            10h
                        </span>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quasi accusantium saepe sunt perferendis in sed nobis.
                        Explicabo aperiam ipsum sed!
                    </p>
                </div>
            </div>
            <Image
                src={
                    'https://pbs.twimg.com/media/FwXIVpjXoAMKRu_?format=jpg&name=small'
                }
                alt='media'
                className='rounded-2xl ml-16 mt-4 w-4/5 h-auto'
                width='0'
                height='0'
                sizes='100%'
            />

            <ul className='flex items-center justify-evenly my-3 text-[#71767b]'>
                <li>
                    <button className='flex items-center gap-3'>
                        <Image
                            src={'/reply.svg'}
                            alt='Reply'
                            className=''
                            width='24'
                            height='24'
                        />
                        200
                    </button>
                </li>
                <li className='hover:text-like-hover'>
                    <button className='flex items-center gap-3'>
                        <Image
                            src={'/like.svg'}
                            alt='Like'
                            className='hover:fill-like-hover'
                            width='24'
                            height='24'
                        />
                        200
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TweetCard

// https://pbs.twimg.com/media/FwXIVpjXoAMKRu_?format=jpg&name=small
// https://pbs.twimg.com/profile_images/1560341882420563970/dpm2vcNU_400x400.jpg
