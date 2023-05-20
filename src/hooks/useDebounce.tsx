import { useEffect } from 'react'
import useTimeout from './useTimeout'

// function useDebounce(callback: () => void, delay: number, dependencies: any[]) {
//     const { reset, clear } = useTimeout(callback, delay)
//     useEffect(reset, [...dependencies, reset])
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     useEffect(clear, [])
// }

// export default useDebounce

export default function useDebounce<T>(
    callback: () => void,
    delay: number,
    dependencies: T[]
) {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(clear, [])
}
