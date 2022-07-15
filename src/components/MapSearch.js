import React from 'react'

import MapForm from './MapForm'
import styled from 'styled-components'
import { Subtitle } from '../styles/styled'

const MapSearch = ({ clubId }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Register Fixture</Title>
        <Subtitle style={{ color: '#ffffff' }}>
          Please enter the location:
        </Subtitle>
        <MapForm clubId={clubId} />
      </ContentWrapper>
    </Wrapper>
  )
}

export default MapSearch

const Wrapper = styled.div`
  background: #1a1433;
  height: 100%;
  width: 100%;
`
const ContentWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
`
