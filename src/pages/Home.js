import axios from 'axios'
import React, { useEffect } from 'react'
import { baseUrl } from '../helpers/api'

const Home = () => {
  useEffect(() => {
    const getProfiles = async () => {
      const res = await axios.get(`${baseUrl}auth/profiles/`)
      console.log(res.data)
    }
    getProfiles()
  }, [])

  return (
    <div>
      <h1>Welcome to Club</h1>
    </div>
  )
}

export default Home
