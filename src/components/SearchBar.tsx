'use client'

import useDebounce from '@/hooks/useDebounce'
import { useState } from 'react'
import SearchUserCard from './SearchUserCard'

function SearchBar() {
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')
    const [people, setPeople] = useState<
        {
            id: string
            name: string
            email: string
            img: string | null
        }[]
    >([])

    useDebounce(() => querySearch(), 400, [search])

    async function querySearch() {
        if (search.trim().length === 0) return

        const { users } = await fetch('/api/user/search', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ search }),
        }).then((res) => res.json())

        setPeople(users)
    }

    return (
        <div className='text-center py-2'>
            <div className='relative'>
                <input
                    type='text'
                    placeholder='Search Twitter'
                    className='peer mx-auto w-[90%] rounded-full px-14 py-2 bg-[#202327] focus:bg-transparent focus:outline-none focus:border-[#1d9bf0] border border-transparent placeholder:text-[#71767b]'
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShow(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setShow(false)
                        }, 100)
                    }}
                />
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 96 960 960'
                    width='24'
                    fill='#71767b'
                    className='peer-focus:fill-[#1d9bf0] absolute top-2 left-12'
                >
                    <path d='M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z' />
                </svg>
                {show && (
                    <div
                        className={`peer-focus:block w-[90%] m-auto rounded-lg shadow-pfp-dialog pt-5 pb-16 ${
                            search.trim().length === 0 &&
                            'text-[#71767b] text-[15px]'
                        } ${people.length > 0 && 'pb-5'}`}
                    >
                        {search.trim().length === 0 ? (
                            'Try searching for people, topics, or keywords'
                        ) : (
                            <>
                                <p className='text-start px-5'>
                                    Search for &quot;{search}&quot;
                                </p>
                                <div className='max-h-[550px] overflow-y-scroll'>
                                    {people.length > 0 &&
                                        people.map((person) => (
                                            <SearchUserCard
                                                key={person.id}
                                                {...person}
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar
