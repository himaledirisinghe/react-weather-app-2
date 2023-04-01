export default function Capitalize(str) {
  const capitalizedStr = str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return capitalizedStr;
}
