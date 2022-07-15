import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getConfig } from '../helpers/api'
import useInput from '../helpers/useInput'
import MapShow from './MapShow'

const MapForm = ({ clubId }) => {
  const address = useInput('')
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [label, setLabel] = useState('')
  const [members, setMembers] = useState([])

  //https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/

  const navigate = useNavigate()

  useEffect(() => {
    const getClubMembers = async () => {
      const config = getConfig(`squads/${clubId}`)
      try {
        const res = await axios(config)
        console.log(res.data.members)
        setMembers(res.data.members)
      } catch (err) {
        console.log(err)
      }
    }
    getClubMembers()
  }, [clubId])

  return (
    <Wrapper>
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          console.log(clubId)
          navigate(`/events/${clubId}/create/info/`, {
            state: {
              lat: lat.toFixed(7),
              long: long.toFixed(7),
              label,
              members,
            },
          })
        }}
      >
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
                  setZoom(13)
                  setLabel(suggestion.place_name)
                  // console.log(suggestion.center[1], long, lat)
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            ))}
          </SuggestionWrapper>
        )}
        <Button type="submit">Submit</Button>
      </Form>
      <ResultWrapper>
        <MapWrapper>
          <MapShow
            lat={lat}
            long={long}
            label={label}
            zoom={zoom}
            search={true}
          />
        </MapWrapper>
      </ResultWrapper>
    </Wrapper>
  )
}

export default MapForm

const Wrapper = styled.div`
  height: 100vh;
`

const Form = styled.form`
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SuggestionWrapper = styled.div`
  background: white;
  width: 60%;
  padding: 10px 20px;
  border-radius: 0px 0px 10px 10px;
`

const Input = styled.input`
  width: 60%;
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
  &:focus {
    outline: none;
  }
  &:hover {
    outline: 2px solid white;
  }
`

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 400px;
`

const MapWrapper = styled.div`
  height: 50%;
  width: 100%;
`

const ResultWrapper = styled.div`
  height: 100%;
  width: 90vw;
`
