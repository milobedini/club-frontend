import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ClubEvents from '../components/ClubEvents'
import { getConfig } from '../helpers/api'
import { getUserId } from '../helpers/auth'
import { success } from '../helpers/toast'
import FindUser from './FindUser'

const ClubShow = () => {
  const [club, setClub] = useState({})
  const [admin, setAdmin] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { id } = useParams()
  const userId = parseInt(getUserId())

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

  if (!club) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  } else if (club && club.members) {
    return (
      <div>
        <h2>Club Information</h2>
        <h3>{club.name}</h3>
        {club.members.length === 0 ? (
          <p>This club has no current members.</p>
        ) : (
          <div>
            <p>Currently {club.members.length} member(s).</p>
            <ul>
              {club.members.map((member) => (
                <li key={member.id}>
                  {member.name} - {member.email} -
                  {admin ? (
                    <button onClick={() => removeUser(member.id)}>
                      Remove
                    </button>
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
        {club.recurring ? (
          <p>
            Play every {club.weekday} at {club.venue}.
          </p>
        ) : (
          <p>Play based on availability.</p>
        )}
        <div>
          <div>
            <h3>Upcoming Events</h3>
            <ClubEvents id={id} />
          </div>
          <div>
            <button>Add Members</button>
            <FindUser club={id} members={club?.members} userId={userId} />
          </div>
        </div>
      </div>
    )
  }
}

export default ClubShow
