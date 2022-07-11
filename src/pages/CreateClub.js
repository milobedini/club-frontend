import React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { sports, weekdays, yesNo } from '../helpers/select'

const CreateClub = () => {
  // Name, sport (select), recurring (boolean), venue (optional), weekday (optional), image (optional)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    name: '',
    venue: '',
    weekday: '',
    image: '',
  })
  const [sport, setSport] = useState({})
  const [recurring, setRecurring] = useState(false)
  const [weekday, setWeekday] = useState({})
  const [processing, setProcessing] = useState(false)

  const handleFormChange = () => {}
  const handleSubmit = () => {}

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
        {/* <div> CLOUDINARY IMAGE
          <div>
            <input
              type="password"
              name="password"
              onChange={handleFormChange}
              id="password"
              placeholder="Password"
            />
            <label className="form-label" htmlFor="password"></label>
          </div>
        </div> */}
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
