import styled from 'styled-components'

export const Wrapper = styled.div``

export const Title = styled.h2`
  font-family: 'Londrina Solid', cursive;
  font-size: 2.5rem;
  text-transform: capitalize;
`
export const CardWrapper = styled.div`
  &:nth-child(odd) {
    background: #f1faee;
  }
  &:nth-child(even) {
    background: #a8dadc;
  }
  padding: 1rem 2rem;
`

export const Subtitle = styled.h3`
  font-family: 'Londrina Solid', cursive;
  font-style: italic;
  font-size: 1.2rem;
`

export const Body = styled.p`
  font-size: 0.85rem;
`
