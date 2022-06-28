import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getConfig } from '../helpers/api'

const ClubShow = () => {
  const [club, setClub] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const getClub = async () => {
      const config = getConfig(`squads/${id}`)
      const res = await axios(config)
      console.log(res.data)
      setClub(res.data)
    }
    getClub()
  }, [id])

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
                  {member.name} - {member.email}
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
        <button>Club Management</button>
      </div>
    )
  }
}

export default ClubShow
