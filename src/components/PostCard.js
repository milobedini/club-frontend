import React from 'react'

const PostCard = ({ errorMessage, owner, text, image, created_at }) => {
  console.log(errorMessage)
  return (
    <div>
      {!errorMessage ? (
        <>
          <h4>{owner.name}</h4>
          <p>{created_at}</p>
          {/* <img src={image} alt={`post from ${owner.name}`} /> */}
          <p>{text}</p>
        </>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  )
}

export default PostCard
