import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { getConfig } from '../helpers/api'
import styles from '../styles/Register.module.scss'
import { success } from '../helpers/toast'

const FindUser = ({ club, isAdmin, members, userId }) => {
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

  const checkIfUserInClub = (result) => {
    result.squads.forEach((squad) => {
      console.log(squad)
      if (squad.members.includes) {
        console.log('Already in club!')
        return true
      } else return false
    })
  }

  return (
    <div>
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
              <div key={result.id}>
                <li>
                  <p>{result.name}</p>
                  <p>{result.email}</p>
                  {checkIfUserInClub(result) ? <p>Already in Club</p> : null}
                  <button onClick={() => addUser(result.id)}>
                    Add to Club
                  </button>

                  {isError ? (
                    <div className={styles.error}>
                      <p>{errorMessage}</p>
                    </div>
                  ) : null}
                </li>
              </div>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default FindUser
