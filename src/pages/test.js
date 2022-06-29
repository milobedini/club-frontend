import React from 'react'

const test = () => {
  return (
    <div>
      {result.map((squad) =>
        squad.members.includes(club) ? <p>Hi</p> : <p>Bye</p>
      )}
    </div>
  )
}

export default test
