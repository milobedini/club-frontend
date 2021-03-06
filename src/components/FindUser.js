import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { getConfig } from '../helpers/api'
import styles from '../styles/Forms.module.scss'
import { success } from '../helpers/toast'
import { Body, Subtitle } from '../styles/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const FindUser = ({ club, isAdmin, members, userId }) => {
  // Will use isAdmin so that only admin squad members can add or remove others.
  // Will use userId so that users can join or leave the squad.

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = getConfig(`auth/profiles/search/${searchTerm}`)
    try {
      const res = await axios(config)
      setResults(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleError = (error) => {
    if (error) {
      setIsError(true)
      setErrorMessage(error.detail)
    }
  }

  const addUser = async (userId) => {
    const config = getConfig(`squads/${club}/${userId}`, 'put')
    try {
      // eslint-disable-next-line
      const res = await axios(config)
      success('User added to club.')
    } catch (err) {
      handleError(err.response.data)
    }
  }

  const removeUser = async (userId) => {
    const config = getConfig(`squads/${club}/${userId}`, 'put')
    try {
      // eslint-disable-next-line
      const res = await axios(config)
      success('User removed from club.')
    } catch (err) {
      handleError(err.response.data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.inputDiv}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              id="name"
              placeholder="Search by name, email or username"
              className={styles.input}
            />
            <label htmlFor="name"></label>
          </div>
        </div>
        <div className={styles.submitDiv}>
          <button type="button">
            <input type="submit" value="Search" />
          </button>
        </div>
      </form>
      {results ? (
        <div>
          <ul>
            {results.map((result) => (
              <AdminListItem key={result.id}>
                <AdminNameEmail>
                  <Subtitle>{result.name}</Subtitle>
                  <Body>{result.email}</Body>
                </AdminNameEmail>

                {result?.squads.map((squad) =>
                  squad.id === club ? (
                    <div key={squad.id}>
                      <FontAwesomeIcon
                        icon={faUserSlash}
                        height="1.2rem"
                        width="1.2rem"
                        color="#e63946"
                        nClick={() => removeUser(result.id)}
                      />
                    </div>
                  ) : null
                )}
                {result.squads.length === 0 ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      height="1.2rem"
                      width="1.2rem"
                      color="#28d79a"
                      onClick={() => addUser(result.id)}
                    />
                  </div>
                ) : null}

                {isError ? (
                  <div className={styles.error}>
                    <p>{errorMessage}</p>
                  </div>
                ) : null}
              </AdminListItem>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

export default FindUser

const AdminListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`
const AdminNameEmail = styled.p`
  padding: 0 1rem;
`
