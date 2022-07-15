import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import MapSearch from '../components/MapSearch'

const CreateFixture = () => {
  const { clubId } = useParams()

  return (
    <Wrapper>
      <MapSearchWrapper>
        <MapSearch clubId={clubId} />
      </MapSearchWrapper>
    </Wrapper>
  )
}

export default CreateFixture
const Wrapper = styled.div``

const MapSearchWrapper = styled.div``
