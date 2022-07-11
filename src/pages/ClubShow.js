import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ClubEvents from '../components/ClubEvents'
import { getConfig } from '../helpers/api'
import { getName, getUserId } from '../helpers/auth'
import { success } from '../helpers/toast'
import FindUser from '../components/FindUser'
import ClubFeed from '../components/ClubFeed'
import styled from 'styled-components'
import { Body, Subtitle, Title } from '../styles/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const ClubShow = () => {
  const [club, setClub] = useState({})
  const [admin, setAdmin] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { id } = useParams()
  const userId = parseInt(getUserId())
  const username = getName()

  useEffect(() => {
    const userId = parseInt(getUserId())
    const getClub = async () => {
      const config = getConfig(`squads/${id}`)
      const res = await axios(config)
      res.data.admin_members.forEach((member) => {
        if (member.id === userId) {
          setAdmin(true)
        }
      })
      setClub(res.data)
      console.log(res.data)
    }
    getClub()
  }, [id])

  const handleError = (error) => {
    if (error) {
      setIsError(true)
      setErrorMessage(error.detail)
    }
  }

  const removeUser = async (userId) => {
    const config = getConfig(`squads/${id}/${userId}`, 'put')
    try {
      // eslint-disable-next-line
      const res = await axios(config)
      success('User removed from club.')
    } catch (err) {
      handleError(err.response.data)
    }
  }

  const addAsAdmin = async (userId, add = true) => {
    const config = getConfig(`squads/${id}/${userId}/admin`, 'put')

    try {
      // eslint-disable-next-line
      const res = await axios(config)
      if (add) {
        success('User added as admin.')
      } else if (!add) {
        success('User removed from admin.')
      }
    } catch (err) {
      console.log(err)
      handleError(err.response.data)
    }
  }

  if (!club) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  } else if (club && club.members) {
    return (
      <Wrapper>
        <ContentWrapper>
          <TopSection>
            <InfoWrapper>
              <Title>Club Information</Title>
              <Title>{club.name}</Title>
              {club.recurring ? (
                <p>
                  Play every {club.weekday} at {club.venue}.
                </p>
              ) : (
                <p>Play based on availability.</p>
              )}
              {club.members.length === 0 ? (
                <p>This club has no current members.</p>
              ) : (
                <div>
                  <p>Currently {club.members.length} member(s).</p>
                  <ul>
                    {club.members.map((member) => (
                      <li key={member.id}>
                        {member.name} - {member.email}
                        {admin ? (
                          <FontAwesomeIcon
                            icon={faUserSlash}
                            height="1.2rem"
                            width="1.2rem"
                            color="#e63946"
                            onClick={() => removeUser(member.id)}
                            style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                          />
                        ) : null}
                        {isError ? (
                          <div>
                            <p>{errorMessage}</p>
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!admin ? (
                <div>
                  <p>
                    Please contact any admin member if you wish to join or leave{' '}
                    {club.name}:
                  </p>
                  <ul>
                    {club.admin_members.map((admin) => (
                      <li key={admin.id}>
                        {admin.name} - {admin.email}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </InfoWrapper>
            <EventsWrapper>
              <div>
                <Title>Upcoming Events</Title>
                <ClubEvents id={id} />
              </div>
            </EventsWrapper>
          </TopSection>
          <FeedWrapper>
            <Title>Club Feed</Title>
            <ClubFeed id={id} />
          </FeedWrapper>

          {admin ? (
            <AdminWrapper>
              <AddMemberWrapper>
                <Title>{username}, control your club below:</Title>
                <p>Add Members</p>
                <FindUser
                  club={parseInt(id)}
                  members={club?.members}
                  userId={userId}
                />
              </AddMemberWrapper>
              <AddAdminWrapper>
                <Title>Manage Admin Control</Title>
                <AdminListWrapper>
                  {club.members.map((member) => (
                    <AdminListItem key={member.id}>
                      <AdminNameEmail>
                        <Subtitle>{member.name}</Subtitle>
                        <Body>{member.email}</Body>
                      </AdminNameEmail>
                      {member?.admin_squads.map((squad) =>
                        squad === club.id ? (
                          <div key={squad}>
                            <FontAwesomeIcon
                              icon={faUserSlash}
                              height="1.2rem"
                              width="1.2rem"
                              color="#e63946"
                              onClick={() => addAsAdmin(member.id, false)}
                              style={{
                                cursor: 'pointer',
                              }}
                            />
                          </div>
                        ) : null
                      )}
                      {member.admin_squads.length === 0 ? (
                        <div key={member.id}>
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            height="1.2rem"
                            width="1.2rem"
                            color="#28d79a"
                            onClick={() => addAsAdmin(member.id, false)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ) : null}
                      {isError ? (
                        <div>
                          <p>{errorMessage}</p>
                        </div>
                      ) : null}
                    </AdminListItem>
                  ))}
                </AdminListWrapper>
              </AddAdminWrapper>
            </AdminWrapper>
          ) : null}
        </ContentWrapper>
      </Wrapper>
    )
  }

  return null
}

export default ClubShow
const Wrapper = styled.div``

const ContentWrapper = styled.div``

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem 2rem 0 2rem;
`
const InfoWrapper = styled.div`
  flex: 1;
`
const EventsWrapper = styled.div`
  flex: 1;
  text-align: right;
`
const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  background: #a8dadc;
`
const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`
const AddMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
`
const AddAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const AdminListWrapper = styled.ul`
  text-align: center;
`
const AdminListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`
const AdminNameEmail = styled.p`
  padding: 0 1rem;
`
