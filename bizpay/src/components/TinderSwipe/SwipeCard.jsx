import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './styles.module.scss';
import CommentSection from './CommentSection';

const SwipeCard = ({ name, url, age, description, onSwipeRight }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e) => {
    // Prevent card flip when clicking inside textarea, input, or comment section
    if (
      e.target.tagName === 'TEXTAREA' ||
      e.target.tagName === 'INPUT' ||
      e.target.closest(`.${styles.commentSection}`)
    ) {
      e.stopPropagation();
      return;
    }

    e.preventDefault();
    setIsFlipped((prev) => !prev);
  };

  const swiped = (direction, nameToDelete) => {
    if (direction === 'right') {
      onSwipeRight();
    }
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
        className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleCardClick}
        onTouchEnd={(e) => {
          if (e.changedTouches.length === 1 && !e.defaultPrevented) {
            handleCardClick(e);
          }
        }}
        style={{ touchAction: 'manipulation' }}
      >
        <div className={styles.cardFront} style={{ backgroundImage: `url(${url})` }}>
          <h3>{name}</h3>
        </div>
        <div className={styles.cardBack}>
          <h3>{name}</h3>
          <p>Age: {age}</p>
          <p>{description}</p>
        </div>
      </div>
      {/* Ensure CommentSection is outside of the flipping card */}
      <div className={styles.commentWrapper}>
        <CommentSection nftId={name} />
      </div>
    </TinderCard>
  );
};

export default SwipeCard;
