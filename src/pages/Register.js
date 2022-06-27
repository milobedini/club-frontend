import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../helpers/api'
import styles from '../styles/Register.module.scss'

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  const handleSuccess = () => {
    setIsError(false)
    navigate('/login')
  }

  const handleError = (error) => {
    if (error) {
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post(`${baseUrl}auth/register/`, data)
      handleSuccess()
      console.log(res.data)
    } catch (err) {
      console.log(err)
      handleError()
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.inputDiv}>
            <input
              type="text"
              name="name"
              onChange={handleFormChange}
              id="name"
              placeholder="Your Name"
              className={styles.input}
            />
            <label htmlFor="email"></label>
          </div>
        </div>
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
              type="text"
              name="username"
              onChange={handleFormChange}
              id="username"
              placeholder="Your Username"
              className={styles.input}
            />
            <label className="form-label" htmlFor="username"></label>
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
        <div className={styles.inputContainer}>
          <div className={styles.inputDiv}>
            <input
              type="password"
              name="password_confirmation"
              onChange={handleFormChange}
              id="password_confirmation"
              placeholder="Repeat your password"
              className={styles.input}
            />
            <label
              className="form-label"
              htmlFor="password_confirmation"
            ></label>
          </div>
        </div>
        <div className={styles.submitDiv}>
          <button type="button">
            <input type="submit" value="Register" />
          </button>
        </div>
        {isError ? (
          // use better error messages below.
          <div className={styles.error}>
            <p>Something went wrong. Please try again.</p>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  )
}

export default Register
