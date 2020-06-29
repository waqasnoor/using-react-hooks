import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";

import ConfigContext from "./ConfigContext";
import { SpeakerReducer } from "./SpeakerReducer";

const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  const [speakerList, dispatch] = useReducer(SpeakerReducer, []);
  const [isLoading, setIsLoading] = useState(true);

  const AppContext = useContext(ConfigContext);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
      const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      });
      dispatch({ type: "setSpeakerList", data: speakerListServerFilter });
    });
    return () => {
      console.log("cleanup");
    };
  }, []);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  // const speakerMemoizedList = useMemo(() => {
  //   return speakerList
  //     .filter(
  //       ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
  //     )
  //     .sort(function (a, b) {
  //       if (a.firstName < b.firstName) {
  //         return -1;
  //       }
  //       if (a.firstName > b.firstName) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  // }, [speakerList, speakingSaturday, speakingSunday]);

  const speakerListFiltered = isLoading
    ? []
    : speakerList
        .filter(
          ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
        )
        .sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };
  console.log("parent rendering");
  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    dispatch({
      type: favoriteValue ? "favorite" : "unfavorite",
      sessionId,
    });
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        {AppContext.showSpeakerSpeakingDay ? (
          <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          </div>
        ) : null}
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
