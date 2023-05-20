import { RefObject, useState } from 'react'
import useEventListener from './useEventListener'

function useHover(ref: RefObject<any>) {
    const [hovered, setHovered] = useState(false)

    useEventListener('mouseover', () => setHovered(true), ref.current)
    useEventListener('mouseout', () => setHovered(false), ref.current)

    return hovered
}

export default useHover
