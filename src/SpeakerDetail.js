import ImageToggleOnScroll from "./ImageToggleOnScroll";
import ConfigContext from "./ConfigContext";
import { useContext } from "react";

const SpeakerDetail = React.memo(
  ({
    id,
    firstName,
    lastName,
    favorite,
    sat,
    sun,
    bio,
    onHeartFavoriteHandler,
  }) => {
    const { context } = useContext(ConfigContext);

    return (
      <div className="card col-4 cardmin">
        <ImageToggleOnScroll
          className="card-img-top"
          primaryImg={`/speakers/bw/Speaker-${id}.jpg`}
          secondaryImg={`/speakers/Speaker-${id}.jpg`}
          alt="{firstName} {lastName}"
        />
        <div className="card-body">
          <h4 className="card-title">
            {context.loggedInUser ? (
              <button
                data-sessionid={id}
                className={favorite ? "heartredbutton" : "heartdarkbutton"}
                onClick={(e) => {
                  onHeartFavoriteHandler(e, {
                    id,
                    firstName,
                    lastName,
                    favorite,
                    sat,
                    sun,
                    bio,
                  });
                }}
              />
            ) : null}
            <span>
              {firstName} {lastName}
            </span>
          </h4>

          <span>{bio}</span>
        </div>
      </div>
    );
  }
);

export default SpeakerDetail;
