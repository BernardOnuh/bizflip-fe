import React, { useState } from 'react';
import Image from 'next/image';
import header from '../../../public/images/imgs/card_stacks2.png';

const SwipeCard = () => {
  const [isClicked, setClicked] = useState(false);
  const [downPos, setDownPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });
  const [ang, setAng] = useState(0);

  const handleDown = (e) => {
    e.persist();
    setClicked(true);
    setDownPos({
      x: e.screenX,
      y: e.screenY,
    });
  };

  const handleUp = () => {
    setClicked(false);
    setDownPos({ x: 0, y: 0 });
    setAng(0);
    setOffset({ dx: 0, dy: 0 });
  };

  const handleMove = (e) => {
    e.persist();
    e.preventDefault();
    if (!isClicked) {
      return;
    }
    setAng(ang + e.movementX * 0.05);
    setOffset({
      dx: e.screenX - downPos.x,
      dy: e.screenY - downPos.y,
    });
  };

  return (
    <div>
      <div
        style={{
          transform: `translate3d(${offset.dx}px, ${offset.dy}px, 0px) rotate(${ang}deg)`,
        }}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
      >
        <span style={{ opacity: `${Math.abs(ang)}` }}>
          {ang > 0 ? 'Like' : ang < 0 ? 'Nope' : ''}
        </span>
        <Image src={header} alt="logo" />
      </div>
    </div>
  );
};

export default SwipeCard;
