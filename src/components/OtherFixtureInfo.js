import React, { useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import axios from 'axios'
import { simpleSuccess } from '../helpers/toast'
import { getToken } from '../helpers/auth'
import { baseUrl } from '../helpers/api'

const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: 'orange',
      primary: 'green',
    },
  }
}

const OtherFixtureInfo = () => {
  const [isError, setIsError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [dateValue, onChange] = useState(new Date())
  const [financier, setFinancier] = useState(null)

  const [data, setData] = useState({
    total_cost: null,
    total_players: null,
  })

  const location = useLocation()
  const navigate = useNavigate()
  const { clubId } = useParams()

  const memberOptions = location.state.members.map((member) => {
    return {
      value: member.id,
      label: member.name,
    }
  })

  console.log(memberOptions)

  const handleFormChange = (event) => {
    console.log(location.state)
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(financier)
    setProcessing(true)
    try {
      await axios.post(
        `${baseUrl}events/${clubId}/`,

        {
          time: dateValue,
          total_cost: data.total_cost,
          total_players: data.total_players,
          location: location.state.label,
          latitude: location.state.lat,
          longitude: location.state.long,
          financier: financier.value,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
          },
        }
      )
      simpleSuccess(`Your event at ${location.state.label} has been created.`)
      navigate(`/clubs/${clubId}`)
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  return (
    <OtherInfoWrapper>
      <p>{location.state.lat}</p>
      <p>{location.state.long}</p>
      <p>{location.state.label}</p>
      <InfoForm onSubmit={handleSubmit}>
        <InfoInputContainer>
          {/* <InfoInputWrapper>
            <InfoInput
              type="text"
              name="name"
              onChange={handleFormChange}
              id="name"
              placeholder="Your Club's Name"
            />
            <Label htmlFor="name"></Label>
          </InfoInputWrapper> */}
          <DateTimePicker onChange={onChange} value={dateValue} disableClock />
        </InfoInputContainer>

        <InfoInputContainer>
          <InfoInputWrapper>
            <InfoInput
              type="number"
              name="total_cost"
              onChange={handleFormChange}
              id="total_cost"
              placeholder="Total cost"
            />
            <Label htmlFor="total_cost"></Label>
          </InfoInputWrapper>
        </InfoInputContainer>
        <InfoInputContainer>
          <InfoInputWrapper>
            <InfoInput
              type="number"
              name="total_players"
              onChange={handleFormChange}
              id="total_players"
              placeholder="Players required"
            />
            <Label htmlFor="total_players"></Label>
          </InfoInputWrapper>
        </InfoInputContainer>
        <SelectContainer>
          <InfoInputWrapper>
            <Select
              options={memberOptions}
              theme={customTheme}
              onChange={setFinancier}
              placeholder="Paid by..."
              isSearchable
              noOptionsMessage={() => 'No club member matches this name.'}
            />
          </InfoInputWrapper>
        </SelectContainer>
      </InfoForm>

      <InfoButtonContainer className="title-text">
        <InfoButton onClick={handleSubmit}>
          {!processing ? (
            <InfoButtonInput type={'submit'} value="Create Club" />
          ) : (
            <span>Creating Club....</span>
          )}
        </InfoButton>
      </InfoButtonContainer>
      {isError ? (
        <div>
          <p>Something went wrong. Please try again.</p>
        </div>
      ) : (
        <></>
      )}
    </OtherInfoWrapper>
  )
}

export default OtherFixtureInfo

const OtherInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;
  align-items: center;
  justify-content: center;
`

const InfoInputContainer = styled.div`
  width: 100%;
  margin-top: 1.2rem;
  min-height: 38px;

  background-color: hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  cursor: default;
  /* display: -webkit-box; */
  /* display: -webkit-flex; */
  /* display: -ms-flexbox; */
  // display: flex;
  -webkit-box-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  min-height: 38px;
  outline: 0 !important;
  position: relative;
  -webkit-transition: all 100ms;
  transition: all 100ms;
  box-sizing: border-box;
`

const SelectContainer = styled.div`
  width: 100%;
  margin-top: 1.2rem;
  min-height: 38px;
`

const InfoInputWrapper = styled.div``

const InfoInput = styled.input`
  padding: 8px 2px 2px 8px;
  margin: 2px;
  width: 99%;
`

const Label = styled.label``

const InfoButtonContainer = styled.div`
  width: 30%;
  font-size: 1.2rem;
  margin-top: 1.2rem;
`

const InfoButton = styled.button`
  width: 100%;

  border-radius: 20px;
`

const InfoButtonInput = styled.input`
  padding: 1rem;
  background-color: #0c1527;
  border-radius: 20px;
  color: #fff;

  &:hover {
    background-color: #e63946;
  }
`
