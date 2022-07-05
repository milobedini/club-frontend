import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getConfig } from '../helpers/api'
import { dateOptions, timeUntil } from '../helpers/date'
import MapShow from './MapShow'

const EventShow = () => {
  const [event, setEvent] = useState({})

  const { id, clubId } = useParams()

  useEffect(() => {
    const getFixture = async () => {
      const config = getConfig(`events/${clubId}/${id}`)
      const res = await axios(config)
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
        <p>{new Date(event.time).toLocaleDateString(undefined, dateOptions)}</p>
        <p>
          {event.location} in {timeUntil(new Date(event.time))}.
        </p>
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
            {event.financier.name} paid £{event.total_cost} for this event.
          </p>
        ) : (
          <p>£{event.total_cost} is due for this event.</p>
        )}
        {event.longitude && event.latitude ? (
          <>
            <h3>Location</h3>
            <MapShow
              long={event.longitude}
              lat={event.latitude}
              label={event.location}
            />
          </>
        ) : null}
      </div>
    )
  }
  return <p>Loading...</p>
}

export default EventShow
