import React, { useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

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

  const location = useLocation()

  const handleSubmit = () => {}
  const handleFormChange = () => {
    console.log(location.state)
  }

  return (
    <OtherInfoWrapper>
      <p>{location.state.lat}</p>
      <p>{location.state.long}</p>
      <p>{location.state.label}</p>
      <InfoForm onSubmit={handleSubmit}>
        <InfoInputContainer>
          <InfoInputWrapper>
            <InfoInput
              type="text"
              name="name"
              onChange={handleFormChange}
              id="name"
              placeholder="Your Club's Name"
            />
            <Label htmlFor="name"></Label>
          </InfoInputWrapper>
        </InfoInputContainer>
        <SelectContainer>
          <InfoInputWrapper>
            <Select
              // options={sports}
              theme={customTheme}
              // onChange={setSport}
              placeholder="Select Sport"
              noOptionsMessage={() =>
                'Please contact us if you wish to add another sport!'
              }
              isSearchable
            />
          </InfoInputWrapper>
        </SelectContainer>
        <SelectContainer>
          <InfoInputWrapper>
            <Select
              // options={yesNo}
              theme={customTheme}
              // onChange={setRecurring}
              placeholder="Recurring?"
            />
          </InfoInputWrapper>
        </SelectContainer>
        <InfoInputContainer>
          <InfoInputWrapper>
            <InfoInput
              type="text"
              name="venue"
              onChange={handleFormChange}
              id="venue"
              placeholder="Club Venue - leave blank if not applicable"
            />
            <Label htmlFor="venue"></Label>
          </InfoInputWrapper>
        </InfoInputContainer>
        <SelectContainer>
          <InfoInputWrapper>
            <Select
              // options={weekdays}
              theme={customTheme}
              // onChange={setWeekday}
              placeholder="Regular weekday?"
            />
          </InfoInputWrapper>
        </SelectContainer>
        <InfoInputContainer>
          <InfoInputWrapper>
            <InfoInput
              type="file"
              name="image"
              // onChange={(event) => {
              //   setData({
              //     ...data,
              //     image: event.target.files[0],
              //   })
              // }}
              id="image"
              placeholder="Image"
            />
            <Label className="form-Label" htmlFor="image"></Label>
          </InfoInputWrapper>
        </InfoInputContainer>
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
