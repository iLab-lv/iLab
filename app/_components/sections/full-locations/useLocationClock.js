'use client';
import { useEffect, useState } from 'react';
export default function useLocationClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
