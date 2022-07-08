import React from 'react'
import styled from 'styled-components'
import { timeSince } from '../helpers/date'
import { Body, Subtitle } from '../styles/styled'

const PostCard = ({ owner, text, image, created_at }) => {
  return (
    <div>
      <Post>
        <PostContent>
          <PostDetails>
            <Owner>
              <Subtitle>{owner.name}</Subtitle>
            </Owner>
            <Created>Posted {timeSince(new Date(created_at))} ago.</Created>
          </PostDetails>
          {/* <img src={image} alt={`post from ${owner.name}`} /> */}
          <PostText>
            <Body>{text}</Body>
          </PostText>
        </PostContent>
      </Post>
    </div>
  )
}

export default PostCard

const Post = styled.div`
  margin: 1.5rem 0;
  border-radius: 8px;
  background-color: white;
  width: 100%;
`
const PostContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.75rem;
  background: #f1faee;
`
const Owner = styled.p`
  font-weight: bold;
`
const Created = styled.p`
  font-size: small;
`
const PostDetails = styled.div`
  flex: 0.3;
`

const PostText = styled.div`
  flex: 0.7;
`
