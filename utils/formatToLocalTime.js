const formatToLocalTime = (date) => {
  return new Date(date).toLocaleTimeString(
    {},
    { hour12: true, hour: "numeric", minute: "numeric" }
  );
};
export default formatToLocalTime;
