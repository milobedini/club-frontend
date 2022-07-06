import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ClubCard from '../components/ClubCard'
import { getConfig } from '../helpers/api'

import styles from '../styles/Forms.module.scss'

const FindClub = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = getConfig(`squads/search/${searchTerm}`)
    try {
      const res = await axios(config)
      setResults(res.data)
    } catch (err) {
      console.log(err)
      handleError(err)
    }
  }

  const handleError = (error) => {
    if (error) {
      setIsError(true)
      setErrorMessage(error.detail)
    }
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
              placeholder="Search by club name"
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
                <ClubCard key={result.id} {...result} />
              </div>
            ))}
            {isError ? (
              <div className={styles.error}>
                <p>{errorMessage}</p>
              </div>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default FindClub
