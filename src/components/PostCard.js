import React from 'react'

const PostCard = ({ owner, text, image, created_at }) => {
  return (
    <div>
      <h4>{owner.name}</h4>
      <p>{created_at}</p>
      {/* <img src={image} alt={`post from ${owner.name}`} /> */}
      <p>{text}</p>
    </div>
  )
}

export default PostCard
