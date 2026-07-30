import { profile } from '../content/profile'
import { asset } from '../lib/asset'
import styles from './About.module.css'

export function About() {
  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <img className={styles.photo} src={asset(profile.photo)} alt={profile.name} />
        <div className={styles.introText}>
          <h3 className={styles.name}>{profile.name}</h3>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
      </div>

      <div className={styles.block}>
        <h3>Education</h3>
        <ul className={styles.timeline}>
          {profile.education.map(item => (
            <li key={item.school} className={styles.timelineItem}>
              <span className={styles.timelinePeriod}>{item.period}</span>
              <strong>{item.school}</strong>
              <span className={styles.timelineDetail}>{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h3>License</h3>
        <ul>
          {profile.licenses.map(license => (
            <li key={license}>{license}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
