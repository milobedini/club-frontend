import React from 'react'
import { Link } from 'react-router-dom'
import { Body, CardWrapper, Subtitle, Title } from '../styles/styled'

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
    <CardWrapper>
      <Link to={`/clubs/${id}/`}>
        <Title>{name}</Title>
        <Subtitle>{sport}</Subtitle>
        <Body>Currently {members.length} members.</Body>
        {recurring ? (
          <Body>
            Play every {weekday} at {venue}.
          </Body>
        ) : (
          <Body>Play based on availability.</Body>
        )}
      </Link>
    </CardWrapper>
  )
}

export default ClubCard
