import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getConfig } from '../helpers/api'
import PostCard from './PostCard'

const ClubFeed = ({ id }) => {
  const [posts, setPosts] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleError = (error) => {
    if (error) {
      setIsError(true)
      setErrorMessage(error.response.data.detail)
      console.log(error)
    }
  }

  useEffect(() => {
    const getClubFeed = async () => {
      const config = getConfig(`posts/${id}`)
      try {
        const res = await axios(config)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
        handleError(err)
      }
    }
    getClubFeed()
  }, [id])

  if (isError) {
    return <p>{errorMessage}</p>
  } else if (posts && posts.length === 0) {
    return <p>No club posts.</p>
  } else if (!posts) {
    return <p>Loading...</p>
  } else if (posts) {
    return (
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    )
  }
}

export default ClubFeed
