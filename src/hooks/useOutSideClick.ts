import { useEffect } from 'react'

/** Identifing the outside clicks from the given ref */
const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
  const handleClick = (event: TouchEvent) => {
    if ((ref.current != null) && !ref.current.contains((event.target) as Node)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('touchstart', handleClick)
    }
  }, [ref, callback])
}

export default useOutsideClick
