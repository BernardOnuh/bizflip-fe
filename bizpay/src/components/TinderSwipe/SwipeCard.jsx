import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './styles.module.scss';

const SwipeCard = ({ name, url, age, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <TinderCard
      className={styles.swipe}
      key={name}
      onSwipe={(dir) => swiped(dir, name)}
      onCardLeftScreen={() => outOfFrame(name)}
      preventSwipe={['up', 'down']}
    >
      <div
        className={`${styles.card} ${styles.bg_cover} ${styles.bg_center} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleCardClick}
      >
        <div className={styles.cardFront} style={{ backgroundImage: 'url(' + url + ')' }}>
          <h3>{name}</h3>
        </div>
        <div className={styles.cardBack}>
          <h3>{name}</h3>
          <p>Age: {age}</p>
          <p>{description}</p>
        </div>
      </div>
    </TinderCard>
  );
};

export default SwipeCard;
