import React, { useState } from 'react'
import styled from 'styled-components'
import MapSearch from '../components/MapSearch'

const CreateFixture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Wrapper>
      <MapSearchWrapper>
        <MapSearch />
      </MapSearchWrapper>
      {isModalOpen ? <p>Other Info</p> : null}
    </Wrapper>
  )
}

export default CreateFixture
const Wrapper = styled.div``

const MapSearchWrapper = styled.div``
