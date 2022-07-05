import React from 'react'

import Form from '../components/Form'
import styled from 'styled-components'

const MapSearch = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Geocoding with Mapbox</Title>
        <Form />
      </ContentWrapper>
    </Wrapper>
  )
}

export default MapSearch

const Wrapper = styled.div`
  background: #1a1433;
  height: 100vh;
  margin: 0 auto;
`
const ContentWrapper = styled.div`
  padding: 150px 0;
  display: grid;
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
