'use client';

import { useEffect } from 'react';

export default function ClickSpark() {
  useEffect(() => {
    const handleClick = (e: any) => {
      const numSparks = 8;
      for (let i = 0; i < numSparks; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';

        const angle = (Math.PI * 2 * i) / numSparks;
        const distance = 40 + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.setProperty('--x', `${x}px`);
        spark.style.setProperty('--y', `${y}px`);

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}