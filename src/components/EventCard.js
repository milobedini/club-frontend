import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({
  id,
  club,
  time,
  location,
  total_cost,
  total_players,
  participants,
  financier,
  title,
}) => {
  return (
    <div>
      <Link to={`/events/${club.id}/${id}/`}>
        {title ? <h2>{club.name}'s fixture.</h2> : null}
        <h5>
          {location} at {time}
        </h5>
        <p>
          Currently {participants.length} spots out of {total_players} have been
          filled.
        </p>
        {financier ? (
          <p>
            {financier} paid £{total_cost} for this event.
          </p>
        ) : (
          <p>£{total_cost} is due for this event.</p>
        )}
      </Link>
    </div>
  )
}

export default EventCard
