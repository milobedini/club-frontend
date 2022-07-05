import React from 'react'
import { timeSince } from '../helpers/date'

const PostCard = ({ owner, text, image, created_at }) => {
  return (
    <div>
      <h4>{owner.name}</h4>
      <p>Posted {timeSince(new Date(created_at))} ago.</p>
      {/* <img src={image} alt={`post from ${owner.name}`} /> */}
      <p>{text}</p>
    </div>
  )
}

export default PostCard
