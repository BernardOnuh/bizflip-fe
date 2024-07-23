import React from 'react'
import TinderCard from 'react-tinder-card'

const SwipeCard = ({ name, url }) => {
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <TinderCard
      className="swipe"
      key={name}
      onSwipe={(dir) => swiped(dir, name)}
      onCardLeftScreen={() => outOfFrame(name)}
    >
      <div
        style={{ backgroundImage: 'url(' + url + ')' }}
        className="card bg-cover bg-center"
      >
        <h3 className="text-white text-2xl">{name}</h3>
      </div>
    </TinderCard>
  )
}

export default SwipeCard
