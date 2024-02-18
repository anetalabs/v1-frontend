import Link from 'next/link'
import styles from '../../styles/feedback.module.scss'
import { feedback } from '../../utils/feedback'

export default function Feedback() {

  


  return (
    <main className={styles.feedback}>
      {
        feedback.map((item, i:number) => (
          <Link href={item.url} key={i} target='_blank' rel='noreferrer' className={styles.item}>
            <p>{item.text}</p>
            {item.icon && (
              <svg width="20" height="20" className={styles.icon}>
                <use href={item.icon}></use>
              </svg>
            )}
          </Link>
        ))
      }
    </main>
  )
}