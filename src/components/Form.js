import React from 'react'
import styled from 'styled-components'
import useInput from '../helpers/useInput'

const Form = () => {
  const address = useInput('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(address.value)
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Address"
          {...address}
          isTyping={address.value !== ''}
        />
        {address.suggestions?.length > 0 && (
          <SuggestionWrapper>
            {console.log(address.suggestions[0])}
            {address.suggestions.map((suggestion, index) => (
              <Suggestion
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name)
                  address.setSuggestions([])
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            ))}
          </SuggestionWrapper>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Wrapper>
  )
}

export default Form

const Wrapper = styled.div`
  padding: 150px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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
