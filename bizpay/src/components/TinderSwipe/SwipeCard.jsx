import React from 'react';
import TinderCard from 'react-tinder-card';
import styles from './styles.module.scss';

const SwipeCard = ({ name, url }) => {
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
        style={{ backgroundImage: 'url(' + url + ')' }}
        className={`${styles.card} ${styles.bg_cover} ${styles}`}
      >
        <h3>{name}</h3>
      </div>
    </TinderCard>
  );
};

export default SwipeCard;
