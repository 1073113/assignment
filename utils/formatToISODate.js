const formatToISODate = (reqTimeStamp) => {
  return new Date(reqTimeStamp * 1000).toISOString();
};

export default formatToISODate;
