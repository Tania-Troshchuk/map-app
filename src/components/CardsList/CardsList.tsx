import { HTMLAttributes } from "react";
import { Card } from "../Card/Card";
import "./cardsList.css";
import { useLocations } from "../../context/LocationContext";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const CardsList = (props: IProps) => {
  const { visibleLocations, selectedLocationId } = useLocations();

  return (
    <div className="cards-list" {...props}>
      {visibleLocations.length ? (
        <>
          <h2 className="cards-list__main-title">
            Цікаві місця на видимій території карти
          </h2>

          <div className="cards-list__content">
            {visibleLocations.map((item) => (
              <Card
                key={item._id}
                location={item}
                selected={item._id === selectedLocationId}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className="cards-list__title">Список локацій поки що пустий</h2>
      )}
    </div>
  );
};
