import { useEffect, useState } from 'react'
import { Header } from './Header'
import styles from './StickyHeader.module.css'

export function StickyHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${styles.slot} ${visible ? styles.visible : ''}`}>
      <Header />
    </div>
  )
}
