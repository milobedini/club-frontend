import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getConfig } from '../helpers/api'

const EventShow = () => {
  const [event, setEvent] = useState({})

  const { id, clubId } = useParams()

  useEffect(() => {
    const getFixture = async () => {
      const config = getConfig(`events/${clubId}/${id}`)
      const res = await axios(config)
      console.log(res.data)
      setEvent(res.data)
    }
    getFixture()
  }, [clubId, id])

  if (!event) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  } else if (event) {
    return (
      <div>
        <h2>Event Information</h2>
        <h3>{event.club.name}'s fixture.</h3>
        <h5>
          {event.location} at {event.time}
        </h5>
        <p>
          Currently {event.participants.length} spots out of{' '}
          {event.total_players} have been filled.
        </p>
        <ul>
          {event.participants.map((player) => (
            <li key={player.id}>
              {player.name} - {player.email}
            </li>
          ))}
        </ul>
        {event.financier ? (
          <p>
            {event.financier} paid £{event.total_cost} for this event.
          </p>
        ) : (
          <p>£{event.total_cost} is due for this event.</p>
        )}
      </div>
    )
  }
}

export default EventShow
