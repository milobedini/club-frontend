import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'
import { getToken } from '../helpers/auth'
import { cloudinaryUploadPreset } from '../helpers/environment'
import { sports, weekdays, yesNo } from '../helpers/select'
import { simpleSuccess } from '../helpers/toast'

const CreateClub = () => {
  // Name, sport (select), recurring (boolean), venue (optional), weekday (optional), image (optional)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    name: '',
    venue: '',
    image: '',
  })
  const [publicId, setPublicId] = useState('')

  const [sport, setSport] = useState({})
  const [recurring, setRecurring] = useState(false)
  const [weekday, setWeekday] = useState({})
  const [processing, setProcessing] = useState(false)

  const navigate = useNavigate()

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setProcessing(true)
    const formData = new FormData()
    formData.append('file', data.image)
    formData.append('upload_preset', cloudinaryUploadPreset)
    axios
      .post('https://api.cloudinary.com/v1_1/dvgbdioec/image/upload', formData)
      .then((response) => {
        setPublicId(response.data.public_id)
      })
  }

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

  useEffect(() => {
    if (!publicId) {
      return
    }

    const createClub = async () => {
      try {
        await axios.post(
          'https://club-mb.herokuapp.com/api/squads/',
          {
            name: data.name,
            sport: sport.value,
            recurring: recurring.value,
            venue: data.venue,
            weekday: weekday.value,
            image: publicId,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              'Content-Type': 'application/json',
            },
          }
        )
        simpleSuccess(`Your club, ${data.name}, has successfully been created.`)
        navigate('/')
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    createClub()
    // eslint-disable-next-line
  }, [publicId])

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputWrapper>
            <Input
              type="text"
              name="name"
              onChange={handleFormChange}
              id="name"
              placeholder="Your Club's Name"
            />
            <Label htmlFor="name"></Label>
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Select
              options={sports}
              theme={customTheme}
              onChange={setSport}
              placeholder="Select Sport"
              noOptionsMessage={() =>
                'Please contact us if you wish to add another sport!'
              }
              isSearchable
            />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Select
              options={yesNo}
              theme={customTheme}
              onChange={setRecurring}
              placeholder="Recurring?"
            />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Input
              type="text"
              name="venue"
              onChange={handleFormChange}
              id="venue"
              placeholder="Club Venue - leave blank if not applicable"
            />
            <Label htmlFor="venue"></Label>
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Select
              options={weekdays}
              theme={customTheme}
              onChange={setWeekday}
              placeholder="Regular weekday?"
            />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Input
              type="file"
              name="image"
              onChange={(event) => {
                setData({
                  ...data,
                  image: event.target.files[0],
                })
              }}
              id="image"
              placeholder="Image"
            />
            <Label className="form-Label" htmlFor="image"></Label>
          </InputWrapper>
        </InputContainer>
      </Form>

      <ButtonContainer className="title-text">
        <Button onClick={handleSubmit}>
          {!processing ? (
            <Input type={'submit'} value="Create Club" />
          ) : (
            <span>Creating Club....</span>
          )}
        </Button>
      </ButtonContainer>
      {isError ? (
        <div>
          <p>Something went wrong. Please try again.</p>
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

export default CreateClub

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;
  align-items: center;
  justify-content: center;
`

const InputContainer = styled.div`
  width: 100%;
  margin-top: 1.2rem;
`

const InputWrapper = styled.div``

const Input = styled.input``

const Label = styled.label``

const ButtonContainer = styled.div``

const Button = styled.button``
