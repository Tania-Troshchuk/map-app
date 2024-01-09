import { HTMLAttributes, useState } from "react";
import "./addModalBox.css";
import { ILocation, ILocationErrors } from "../../types/location";
import { useLocations } from "../../context/LocationContext";
import { Loader, MainButton, TextInput } from "..";
import { useMutation, useQueryClient } from "react-query";
import { createLocation } from "../../services/API";
import { getErrorText } from "../../utils/getErrorText";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

type TLocationTextValues = Omit<ILocation, "_id" | "lat" | "lng" | "rating"> & {
  rating: string;
};

export const AddModalBox = (props: IProps) => {
  const { onClose } = props;

  const { newMarker, setNewMarker } = useLocations();
  const queryClient = useQueryClient();
  const addLocationMutation = useMutation(createLocation);

  const [isSmallBox, setIsSmallBox] = useState(false);
  const [location, setLocation] = useState<TLocationTextValues>({
    title: "",
    info: "",
    rating: "",
    location: "",
    img: "",
  });
  const [errors, setErrors] = useState<ILocationErrors>({
    title: null,
    info: null,
    location: null,
    lat: null,
    lng: null,
    rating: null,
    img: null,
  });

  const handleTextInputs = (value: string, key: keyof TLocationTextValues) => {
    setLocation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddMarker = (value: boolean) => {
    setIsSmallBox(value);
    setNewMarker((prev) => ({
      ...prev,
      isAdded: value,
    }));
  };

  const checkLocation = (location: Omit<ILocation, "_id">) => {
    return Object.entries(location).every(([key, value]) => {
      const error = getErrorText(key as keyof ILocationErrors, value);

      setErrors((prev) => ({
        ...prev,
        [key]: error ? error : null,
      }));

      return !error;
    });
  };

  const handleSubmit = () => {
    const addedMarker: Omit<ILocation, "_id"> = {
      ...location,
      rating: +location.rating,
      lat: newMarker.position?.lat ?? 0,
      lng: newMarker.position?.lng ?? 0,
    };

    const isValidLocation = checkLocation(addedMarker);

    if (isValidLocation) {
      addLocationMutation.mutate(addedMarker, {
        onSuccess: (data) => {
          const queryData: ILocation[] | undefined =
            queryClient.getQueryData("locations");

          if (queryData) {
            queryClient.setQueryData("locations", [...queryData, data]);
          }

          setNewMarker({
            isAdded: null,
            position: null,
          });

          onClose();
        },
      });
    }
  };

  return isSmallBox ? (
    <div className="small-modal-box">
      <MainButton
        text="Розгорнути вікно"
        type="button"
        onClick={() => handleAddMarker(false)}
      />
    </div>
  ) : (
    <div className="modal-box">
      {addLocationMutation.isLoading && <Loader />}

      <div className="modal-box__content">
        <button className="modal-box__close" onClick={onClose}>
          &times;
        </button>

        <h3 className="modal-box__title">Додати нову локацію</h3>

        <form className="modal-box__form">
          <TextInput
            labelText="Назва:"
            value={location.title}
            handleInput={(value) => handleTextInputs(value, "title")}
            error={errors.title}
          />

          <TextInput
            labelText="Опис:"
            value={location.info}
            handleInput={(value) => handleTextInputs(value, "info")}
            error={errors.info}
          />

          <TextInput
            labelText={
              <>
                Рейтинг <span>(максимум 10)</span>:
              </>
            }
            value={location.rating}
            handleInput={(value) =>
              handleTextInputs(value.replace(/[^\d]+/g, ""), "rating")
            }
            error={errors.rating}
          />

          <TextInput
            labelText="Місце розташування:"
            value={location.location}
            handleInput={(value) => handleTextInputs(value, "location")}
            error={errors.location}
          />

          <TextInput
            labelText={
              <>
                Фото
                <span> (скопіюйте сюди адресу зображення)</span>:
              </>
            }
            value={location.img}
            handleInput={(value) => handleTextInputs(value, "img")}
            error={errors.img}
          />

          <div className="modal-box__btn-wrapper">
            <MainButton
              text={
                newMarker.position
                  ? "Змінити місце маркера на карті"
                  : "Додати маркер на карту"
              }
              type="button"
              onClick={() => handleAddMarker(true)}
            />

            <p className="error">{errors.lat || errors.lng}</p>
          </div>

          <button
            type="submit"
            className="modal-box__add"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Додати
          </button>
        </form>
      </div>
    </div>
  );
};
