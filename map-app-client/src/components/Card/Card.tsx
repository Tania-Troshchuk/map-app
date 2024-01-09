import { HTMLAttributes, useEffect, useRef } from "react";
import marker from "../../assets/marker.svg";
import { ILocation } from "../../types/location";

import "./card.css";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  location: ILocation;
  selected: boolean;
}

export const Card = (props: IProps) => {
  const { location, selected, ...rest } = props;
  
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && cardRef.current) {
      cardRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [selected]);

  return (
    <section
      className={`card ${selected ? "card__selected" : ""}`}
      {...rest}
      ref={cardRef}
    >
      <img className="card__photo" src={location.img} alt={location.title} />

      <div className="card__text-wrapper">
        <div className="card__main-text">
          <h3>{location.title}</h3>
          <p>{location.info}</p>
        </div>

        <div className="card__text">
          <p>Рейтинг: {location.rating}</p>

          <p>
            <img
              className="card__location-icon"
              src={marker}
              alt="location marker"
            />

            <span>{location.location}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
