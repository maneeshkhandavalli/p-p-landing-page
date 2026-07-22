import { useEffect } from 'react'

/**
 * Attaches a wheel hijack to every element marked [data-horizontal-section].
 * Looks for a [data-scroll-track] child inside each section to control scrollLeft.
 *
 * Calls preventDefault only when there is actually horizontal scroll remaining,
 * so the page resumes naturally at the start and end of the card track.
 */
export function useHorizontalScroll() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-horizontal-section]'),
    )

    const cleanups: (() => void)[] = []

    sections.forEach(section => {
      const track = section.querySelector<HTMLElement>('[data-scroll-track]')
      if (!track) return

      const onWheel = (e: WheelEvent) => {
        const maxScroll = track.scrollWidth - track.clientWidth
        const canForward  = e.deltaY > 0 && track.scrollLeft < maxScroll - 1
        const canBackward = e.deltaY < 0 && track.scrollLeft > 0

        if (canForward || canBackward) {
          e.preventDefault()
          track.scrollLeft += e.deltaY
        }
        // At start or end — fall through so the page scrolls normally
      }

      section.addEventListener('wheel', onWheel, { passive: false })
      cleanups.push(() => section.removeEventListener('wheel', onWheel))
    })

    return () => cleanups.forEach(fn => fn())
  }, [])
}
