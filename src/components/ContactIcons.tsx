import { profile } from '../content/profile'
import styles from './ContactIcons.module.css'

export function ContactIcons() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email)
      alert('클립보드에 텍스트가 복사되었습니다.')
    } catch (error) {
      console.warn('클립보드 복사에 실패했습니다.', error)
    }
  }

  return (
    <ul className={styles.buttonList}>
      <li>
        <button onClick={copyEmail} className={styles.primary}>
          {profile.contact.email}
        </button>
      </li>
      <li>
        <a href={profile.contact.github} target="_blank" rel="noreferrer" className={styles.secondary}>
          GitHub
        </a>
      </li>
      <li>
        <a href={profile.contact.velog} target="_blank" rel="noreferrer" className={styles.secondary}>
          Velog
        </a>
      </li>
    </ul>
  )
}
