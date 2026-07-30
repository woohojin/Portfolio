import { ContactIcons } from './ContactIcons'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>같이 만들어볼까요?</h2>
      <p className={styles.description}>새로운 프로젝트나 협업 제안, 편하게 연락 주세요.</p>
      <ContactIcons />
    </div>
  )
}
