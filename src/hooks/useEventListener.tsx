import { useEffect, useRef } from 'react'

function useEventListener(
    eventType: string,
    callback: (event: Event) => void,
    element: HTMLElement | null
) {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (!element) return
        const handler = (e: Event) => callbackRef.current(e)
        element.addEventListener(eventType, handler)

        return () => element.removeEventListener(eventType, handler)
    }, [element, eventType])
}

export default useEventListener
