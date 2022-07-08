import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getConfig } from '../helpers/api'
import { dateOptions, timeUntil } from '../helpers/date'
import MapShow from '../components/MapShow'
import { Body, Subtitle, Title } from '../styles/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

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
      <Wrapper>
        <InfoWrapper>
          <Title>
            <Link to={`/clubs/${clubId}/`}>
              <ClubLink>{event.club.name}'s </ClubLink>
            </Link>
            fixture
          </Title>
          <Subtitle>
            {event.location},{' '}
            {new Date(event.time).toLocaleDateString(undefined, dateOptions)} -
            in {timeUntil(new Date(event.time))} time.
          </Subtitle>
          <Body>
            Currently {event.participants.length} spots out of{' '}
            {event.total_players} have been filled.
          </Body>
          <Subtitle>Participating:</Subtitle>
          <ul>
            {event.participants.map((player) => (
              <ParticipantItem key={player.id}>
                <p>
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    height="1.2rem"
                    width="1.2rem"
                    color="#28d79a"
                    style={{ marginRight: '0.5rem' }}
                  />
                </p>
                <Body>
                  {player.name} - {player.email}
                </Body>
              </ParticipantItem>
            ))}
          </ul>
          {event.financier ? (
            <Body>
              {event.financier.name} paid £{event.total_cost} for this event.
            </Body>
          ) : (
            <Body>£{event.total_cost} is due for this event.</Body>
          )}
        </InfoWrapper>
        {event.longitude && event.latitude ? (
          <MapWrapper>
            <MapContainer>
              <Title>Location</Title>
              <MapShow
                long={event.longitude}
                lat={event.latitude}
                label={event.location}
                zoom={12}
              />
            </MapContainer>
          </MapWrapper>
        ) : null}
      </Wrapper>
    )
  }
  return <p>Loading...</p>
}

export default EventShow

const Wrapper = styled.div`
  height: 100vh;
`

const InfoWrapper = styled.div`
  margin-left: 10px;
`

const MapWrapper = styled.div`
  height: 75vh;
`

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`
const ParticipantItem = styled.li`
  display: flex;
  align-items: center;
`
const ClubLink = styled.span`
  &:hover {
    color: #e63946;
  }
`
