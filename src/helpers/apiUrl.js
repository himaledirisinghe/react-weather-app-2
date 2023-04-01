const BASE_URL = "https://api.openweathermap.org/data/2.5/group";

export default function APIUrl(cityCodes, API_KEY) {
  const url = `${BASE_URL}?id=${cityCodes}&units=metric&appid=${API_KEY}`;
  return url;
}
