import axios from 'axios'
import { useState } from 'react'
import { mapboxToken } from './environment'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])

  const handleChange = async (event) => {
    setValue(event.target.value)
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${mapboxToken}&autocomplete=true`
      const res = await axios.get(endpoint)
      setSuggestions(res.data.features)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  }
}

export default useInput
