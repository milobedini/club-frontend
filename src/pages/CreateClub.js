import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              name="name"
              onChange={handleFormChange}
              id="name"
              placeholder="Your Club's Name"
            />
            <label htmlFor="name"></label>
          </div>
        </div>
        <div>
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
        </div>
        <div>
          <Select
            options={yesNo}
            theme={customTheme}
            onChange={setRecurring}
            placeholder="Recurring?"
          />
        </div>
        <div>
          <div>
            <input
              type="text"
              name="venue"
              onChange={handleFormChange}
              id="venue"
              placeholder="Club Venue - leave blank if not applicable"
            />
            <label htmlFor="venue"></label>
          </div>
        </div>
        <div>
          <Select
            options={weekdays}
            theme={customTheme}
            onChange={setWeekday}
            placeholder="Regular weekday?"
          />
        </div>
        <div>
          <div>
            <input
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
            <label className="form-label" htmlFor="image"></label>
          </div>
        </div>
      </form>

      <div>
        <button onClick={handleSubmit}>
          {!processing ? (
            <input type={'submit'} value="Create Club" />
          ) : (
            <span>Creating Club....</span>
          )}
        </button>
      </div>
      {isError ? (
        <div>
          <p>Something went wrong. Please try again.</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default CreateClub
