import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../helpers/api'
import { setName, setToken, setUserId } from '../helpers/auth'
import styles from '../styles/Forms.module.scss'

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleError = (error) => {
    if (error) {
      setIsError(true)
    }
  }

  const handleSuccess = ({ token, name, id }) => {
    setToken(token)
    setName(name)
    setUserId(id)
    setIsLoggedIn(true)
    setIsError(false)
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post(`${baseUrl}auth/login/`, data)
      handleSuccess(res.data)
    } catch (err) {
      console.log(err)
      handleError(err)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.inputDiv}>
            <input
              type="email"
              name="email"
              onChange={handleFormChange}
              id="email"
              placeholder="Your Email"
              className={styles.input}
            />
            <label htmlFor="email"></label>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.inputDiv}>
            <input
              type="password"
              name="password"
              onChange={handleFormChange}
              id="password"
              placeholder="Password"
              className={styles.input}
            />
            <label className="form-label" htmlFor="password"></label>
          </div>
        </div>

        <div className={styles.submitDiv}>
          <button type="button">
            <input type="submit" value="Sign In" />
          </button>
        </div>
        {isError ? (
          // use better error messages below.
          <div className={styles.error}>
            <p>You entered invalid credentials. Please try again.</p>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  )
}

export default Login
