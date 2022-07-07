import React from 'react'
import { Link } from 'react-router-dom'
import { dateOptions, timeUntil } from '../helpers/date'
import { Body, CardWrapper, Subtitle, Title } from '../styles/styled'

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
    <CardWrapper>
      <Link to={`/events/${club.id}/${id}/`}>
        {title ? <Title>{club.name}'s fixture</Title> : null}
        <Subtitle>
          {location},{' '}
          {new Date(time).toLocaleDateString(undefined, dateOptions)} - in{' '}
          {timeUntil(new Date(time))} time.
        </Subtitle>
        <Body>
          Currently {participants.length} spots out of {total_players} have been
          filled.
        </Body>
        {financier ? (
          <Body>
            {financier.name} paid £{total_cost} for this event.
          </Body>
        ) : (
          <Body>£{total_cost} is due for this event.</Body>
        )}
      </Link>
    </CardWrapper>
  )
}

export default EventCard
