const formatToTimeStamp = (reqTimeStamp) => {
  return Math.floor(new Date(reqTimeStamp) / 1000);
};

export default formatToTimeStamp;
