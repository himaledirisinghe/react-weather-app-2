import { Link } from "react-router-dom";
import backBtn from "../images/back.png";
import windDirec from "../images/wind-direc.png";
import { colors } from "../styles/colors";
import FormattedDate from "../helpers/formattedDate";
import Capitalize from "../helpers/capitalize";

export default function View({ index, city, refreshData }) {
  return (
    <>
      <div className="info-main-content">
        <div className="info-row">
          <div className="info-column">
            <div
              className="info-city-weather-header"
              style={{
                backgroundColor: `rgb(${colors[index].join(",")})`,
              }}
            >
              <div className="info-row1">
                <span className="fa" onClick={refreshData}>
                  &#xf021;
                </span>
                <Link to="/">
                  <img src={backBtn} alt="back button" className="back-btn" />
                </Link>
              </div>

              <div className="info-main-content-inner">
                <span className="info-cityName">{city.name}</span>
                {/* <span className="cityId">{id}</span> */}
                <br />
                <span className="info-timeStamp">
                  <FormattedDate unixTimestamp={city.dt} />
                </span>
              </div>

              <div className="info-row3">
                <div className="info-des">
                  <i
                    className={`owi owi-${city.weather[0].icon}`}
                    style={{ fontSize: "40px" }}
                  ></i>

                  <br />

                  {Capitalize(city.weather[0].description)}
                </div>

                <div className="info-temp-sec">
                  <div className="info-temp">
                    {Math.round(city.main.temp)}
                    &deg;c
                    <br />
                  </div>

                  <div className="info-min-max">
                    Temp Min: 00°c
                    <br />
                    Temp Max: 00°c
                  </div>
                </div>
              </div>
            </div>

            <div className="info-row4">
              <div className="info-pressure">
                Pressure: 1018hPa
                <br />
                Humidity: 78%
                <br />
                Visibility: 8.0km
              </div>

              <div className="info-wind">
                <img src={windDirec} alt="Wind-Direction" />
                <br />
                4.0m/s 120 Degree
              </div>

              <div className="info-sun">
                Sunrise: 6:05am
                <br />
                Sunset: 6:05am
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
