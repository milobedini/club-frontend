import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.scss'

const Home = ({ isLoggedIn }) => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.heroWrapper}>
        <div className={styles.buttonWrapper}>
          {isLoggedIn ? (
            <>
              <Link to="/clubs/user/">
                <button>Your Clubs</button>
              </Link>
              <Link to="/events/">
                <button>Your Events</button>
              </Link>
            </>
          ) : (
            <Link to="/login/">
              <button>Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
