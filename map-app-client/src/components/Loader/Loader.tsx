import { useEffect } from 'react';
import './loader.css'

export const Loader = () => {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}
