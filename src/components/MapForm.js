import React, { useState } from 'react'
import styled from 'styled-components'
import useInput from '../helpers/useInput'
import MapShow from './MapShow'

const MapForm = () => {
  const address = useInput('')
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  // const handleSubmit = (event) => {
  //   console.log('done')

  // }

  return (
    <Wrapper>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          placeholder="Address"
          {...address}
          isTyping={address.value !== ''}
        />
        {address.suggestions?.length > 0 && (
          <SuggestionWrapper>
            {/* {console.log(address.suggestions[0])} */}
            {address.suggestions.map((suggestion, index) => (
              <Suggestion
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name)
                  address.setSuggestions([])
                  setLong(suggestion.center[0])
                  setLat(suggestion.center[1])
                  // console.log(suggestion.center[1], long, lat)
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            ))}
          </SuggestionWrapper>
        )}
        <Button type="submit">Submit</Button>
      </form>

      <ResultWrapper>
        <MapWrapper>
          <MapShow lat={lat} long={long} label="label" zoom={1} />
        </MapWrapper>
      </ResultWrapper>
    </Wrapper>
  )
}

export default MapForm

const Wrapper = styled.div`
  height: 100vh;
`
const SuggestionWrapper = styled.div`
  background: white;
  position: absolute;
  width: 400px;
  padding: 10px 20px;
  border-radius: 0px 0px 10px 10px;
`

const Input = styled.input`
  width: 400px;
  background: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  position: relative;
  display: grid;
  justify-self: center;
  &:focus {
    outline: none;
    border-radius: ${(props) => props.isTyping && '10px 10px 0px 0px'};
  }
`

const Button = styled.button`
  background: #e63946;
  padding: 12px 0;
  width: 200px;
  border: none;
  border-radius: 30px;
  color: #f1faee;
  font-weight: bold;
  font-family: Segoe UI, sans-serif;
  cursor: pointer;
  margin-top: 20px;
  :focus {
    outline: none;
  }
`

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 400px;
`

const MapWrapper = styled.div`
  height: 80%;
  width: 100%;
`

const ResultWrapper = styled.div`
  height: 100%;
  width: 90vw;
`
