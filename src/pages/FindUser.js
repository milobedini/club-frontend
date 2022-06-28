import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { getConfig } from '../helpers/api'
import styles from '../styles/Register.module.scss'
import { toast } from 'react-toastify'

const FindUser = ({ club }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
  }

  const success = () =>
    toast.success('User added to club.', {
      position: 'bottom-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = getConfig(`auth/profiles/search/${searchTerm}`)
    try {
      const res = await axios(config)
      setResults(res.data)
      console.log(res.data)
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
      success()

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      //   console.log(err.response.data)
      handleError(err.response.data)
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
