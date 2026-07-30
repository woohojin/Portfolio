import { profile } from '../content/profile'
import styles from './Skills.module.css'

const ICONS: Record<string, string> = {
  Backend: '{ }',
  Frontend: '</>',
  'Infra / Tools': '☁',
}

export function Skills() {
  return (
    <div className={styles.grid}>
      {profile.techStack.map(group => (
        <div key={group.category} className={styles.card}>
          <span className={styles.icon}>{ICONS[group.category] ?? '#'}</span>
          <h3>{group.category}</h3>
          <ul className={styles.pills}>
            {group.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
