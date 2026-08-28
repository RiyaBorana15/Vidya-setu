import React, { useEffect, useState } from 'react';

export default function ReadingRuler({ isActive }) {
  const [mouseY, setMouseY] = useState(250);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="reading-ruler-bar"
      style={{
        top: `${mouseY - 24}px`
      }}
    />
  );
}
