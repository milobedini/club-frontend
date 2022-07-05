import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import EventCard from '../components/EventCard'
import { getConfig } from '../helpers/api'
import styles from '../styles/EventList.module.scss'

const EventList = () => {
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    const getUserEvents = async () => {
      const config = getConfig('auth/profile')
      try {
        const res = await axios(config)
        setUserEvents(
          res.data.attending.filter((x) => new Date(x.time) > new Date())
        )
      } catch (err) {
        console.log(err)
      }
    }
    getUserEvents()
  }, [])

  if (userEvents && userEvents.length === 0) {
    return <p>No future events.</p>
  } else if (!userEvents) {
    return <p>Loading...</p>
  } else if (userEvents) {
    return (
      <div className={styles.container}>
        {userEvents.map((fixture) => (
          <EventCard key={fixture.id} {...fixture} title />
        ))}
      </div>
    )
  }
}

export default EventList
