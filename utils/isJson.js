const isJSON = (data) => {
  data = typeof data !== "string" ? JSON.stringify(data) : data;

  try {
    data = JSON.parse(data);
  } catch (e) {
    return false;
  }

  if (typeof data === "object" && data !== null) {
    return true;
  }

  return false;
};

export default isJSON;
