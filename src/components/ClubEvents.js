import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getConfig } from '../helpers/api'
import EventCard from './EventCard'
import styles from '../styles/EventList.module.scss'

const ClubEvents = ({ id }) => {
  const [clubEvents, setClubEvents] = useState([])

  useEffect(() => {
    const getClubEvents = async () => {
      const config = getConfig(`events/${id}`)
      try {
        const res = await axios(config)
        setClubEvents(res.data.filter((x) => new Date(x.time) > new Date()))
      } catch (err) {}
    }
    getClubEvents()
  }, [id])

  if (clubEvents && clubEvents.length === 0) {
    return <p>No scheduled fixtures.</p>
  } else if (!clubEvents) {
    return <p>Loading...</p>
  } else if (clubEvents) {
    return (
      <div className={styles.container}>
        {clubEvents.map((fixture) => (
          <EventCard key={fixture.id} {...fixture} title={false} />
        ))}
      </div>
    )
  }
}

export default ClubEvents
