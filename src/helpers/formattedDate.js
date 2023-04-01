export default function FormattedDate({ unixTimestamp }) {
  const date = new Date(unixTimestamp * 1000);

  const hmm = { hour: "numeric", minute: "2-digit" };
  const mmmd = { month: "short", day: "numeric" };

  let formattedDate = new Intl.DateTimeFormat("en-US", hmm)
    .format(date)
    .replace(":", ".");
  formattedDate +=
    ", " +
    new Intl.DateTimeFormat("en-US", mmmd).format(date).replace(":", ".");

  return formattedDate;
}
