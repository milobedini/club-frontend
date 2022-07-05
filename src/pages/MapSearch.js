import React from 'react'

import MapForm from '../components/MapForm'
import styled from 'styled-components'

const MapSearch = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Geocoding with Mapbox</Title>
        <MapForm />
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
  padding: 150px 0;
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
