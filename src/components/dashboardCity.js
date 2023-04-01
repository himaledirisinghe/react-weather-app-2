import windDirec from "../images/wind-direc.png";
import { colors } from "../styles/colors";
import FormattedDate from "../helpers/formattedDate";
import Capitalize from "../helpers/capitalize";

export default function DashboardCity({ city, index }) {
  return (
    <div key={city.id} className="city-weather">
      <div
        className="city-weather-header"
        style={{
          backgroundColor: `rgb(${colors[index % colors.length].join(",")})`,
        }}
      >
        <div className="first-row"></div>
        <div className="second-row">
          <div className="third-row">
            <span className="cityName">{city.name}</span>
            {/* <span className="cityId">{city.id}</span> */}
            <br />
            <span className="timeStamp">
              <FormattedDate unixTimestamp={city.dt} />
            </span>
          </div>
          <div className="temp">{Math.round(city.main.temp)}&deg;c</div>
        </div>
        <div className="fourth-row">
          <div className="fifth-row">
            <div className="des-row">
              <i
                className={`owi owi-${city.weather[0].icon}`}
                style={{ fontSize: " 18px" }}
              ></i>
              &nbsp;&nbsp;
              <span className="des">
                {Capitalize(city.weather[0].description)}
              </span>
            </div>
          </div>
          <div className="min-max">
            Temp Min: 00°c
            <br />
            Temp Max: 00°c
          </div>
        </div>
      </div>
      <div className="sixth-row">
        <div className="pressure">
          Pressure: 1018hPa
          <br />
          Humidity: 78%
          <br />
          Visibility: 8.0km
        </div>
        <div className="wind">
          <img className="wind-img" src={windDirec} alt="wind direction" />
          <br />
          4.0m/s 120 Degree
        </div>
        <div className="sun">
          Sunrise: 6:05am
          <br />
          Sunset: 6:05am
        </div>
      </div>
    </div>
  );
}
