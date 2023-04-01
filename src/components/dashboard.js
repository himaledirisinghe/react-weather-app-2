import { Link } from "react-router-dom";
import DashboardCity from "./dashboardCity";

export default function Dashboard({ weatherData }) {
  return (
    <>
      <div className="main-content">
        <div className="main-content-inner">
          {weatherData.map((city, index) => (
            <Link
              to="/view"
              key={city.id}
              onClick={() => {
                sessionStorage.setItem(
                  "selectedCity",
                  JSON.stringify({ cityId: city.id, index: index })
                );
              }}
            >
              <DashboardCity city={city} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
