import React, { useState, useContext, useCallback } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerDetail from "./SpeakerDetail";

import ConfigContext from "./ConfigContext";
import useAxiosFetch from "./useAxiosFetch";
import axios from "axios";

const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  const { context } = useContext(ConfigContext);

  const {
    isLoading,
    isError,
    errorMessage,
    data,
    updateDataRecord,
  } = useAxiosFetch("http://localhost:4000/speakers", []);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const speakerListFiltered = isLoading
    ? []
    : data
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
  const heartFavoriteHandler = useCallback(
    (e, speakerRec) => {
      e.preventDefault();
      const speaker = { ...speakerRec, favorite: !speakerRec.favorite };
      axios
        .put(`http://localhost:4000/speakers/${speaker.id}`, speaker)
        .then((res) => {
          updateDataRecord(speaker);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [data]
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <div>{errorMessage}</div>;
  }
  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        {context.showSpeakerSpeakingDay ? (
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
              ({ id, firstName, lastName, bio, favorite, sat, sun }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    sat={sat}
                    sun={sun}
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
