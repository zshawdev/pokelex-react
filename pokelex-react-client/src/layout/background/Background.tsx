import React, { useRef } from "react";
import { ONE_HOUR_MS } from "../../utils/constants";
import { getSunrise, getSunset } from "../../utils/time";

import "./Background.css";

const BASE_IMG_URL = "assets/img/bg/bg-";

const getBgImage = () => {
  const sunrise = getSunrise().getTime();
  const sunset = getSunset().getTime();
  const now = Date.now();

  let imageUrl = "viridian-forest.jpg";

  if(now < (sunrise - ONE_HOUR_MS) || now > (sunset + ONE_HOUR_MS)) {
    imageUrl = "night.png";
  } else if ((now > (sunrise - ONE_HOUR_MS) && now < (sunrise + ONE_HOUR_MS)) || (now > (sunset - ONE_HOUR_MS) && now < (sunset + ONE_HOUR_MS))) {
    imageUrl = "sunset.jpg"
  }

  return BASE_IMG_URL + imageUrl;
};

const Background: React.FC = () => {
  const bgImage = useRef(getBgImage()).current;

  return (<div style={{ backgroundImage: `url(${bgImage})` }} className="absolute h-full w-full -z-10 poke-background" />);
};

export default Background;
