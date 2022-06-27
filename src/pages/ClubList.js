import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ClubCard from '../components/ClubCard'
import { getSquads } from '../helpers/api'
import styles from '../styles/ClubList.module.scss'

const ClubList = () => {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    const getClubs = async () => {
      const config = getSquads()
      try {
        const res = await axios(config)
        console.log(res.data)
        setClubs(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getClubs()
  }, [])
  return (
    <div className={styles.container}>
      {clubs.map((club) => (
        <ClubCard key={club.id} {...club} />
      ))}
    </div>
  )
}

export default ClubList
