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
      setErrorMessage(error.detail)
      console.log(error.detail)
    }
  }

  useEffect(() => {
    const getClubFeed = async () => {
      const config = getConfig(`posts/${id}`)
      try {
        const res = await axios(config)
        console.log(res.data)
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
          <PostCard key={post.id} {...post} errorMessage={errorMessage} />
        ))}
      </div>
    )
  }
}

export default ClubFeed
