import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  } else if (event && event.club) {
    return (
      <div>
        <div>
          <h2>Event Information</h2>
          <h3>
            <Link to={`/clubs/${clubId}/`}>
              <span>{event.club.name}'s </span>
            </Link>
            fixture.
          </h3>
        </div>
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
