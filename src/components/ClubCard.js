import React from 'react'
import { Link } from 'react-router-dom'

const ClubCard = ({
  id,
  members,
  admin_members,
  name,
  recurring,
  sport,
  venue,
  weekday,
}) => {
  return (
    <div>
      <Link to={`/clubs/${id}/`}>
        <h2>{name}</h2>
        <h5>{sport}</h5>
        <p>Currently {members.length} members.</p>
        {recurring ? (
          <p>
            Play every {weekday} at {venue}.
          </p>
        ) : (
          <p>Play based on availability.</p>
        )}
      </Link>
    </div>
  )
}

export default ClubCard
