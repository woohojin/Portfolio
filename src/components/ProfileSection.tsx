import { profile } from '../content/profile'
import { asset } from '../lib/asset'
import { ContactIcons } from './ContactIcons'
import styles from './ProfileSection.module.css'

export function ProfileSection() {
  return (
    <div className={styles.wrap}>
      <img className={styles.photo} src={asset(profile.photo)} alt={profile.name} />
      <h3 className={styles.name}>{profile.name}</h3>
      <ContactIcons />
      <p className={styles.bio}>{profile.bio}</p>

      <div className={styles.block}>
        <h3>Tech Stack</h3>
        {profile.techStack.map(group => (
          <p key={group.category}>
            <strong>{group.category}</strong>: {group.items.join(', ')}
          </p>
        ))}
      </div>

      <div className={styles.block}>
        <h3>Education</h3>
        <ul>
          {profile.education.map(item => (
            <li key={item.school}>
              {item.school} — {item.detail} ({item.period})
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
