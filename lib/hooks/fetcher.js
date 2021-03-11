const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (res.status === 200 || res.status === 204) {
    let json = await res.json();
    if (json.status === 200 || json.status === 204 || json.length > 0) {
      return json;
    } else {
      throw new Error({ status: json.status, message: json.data });
    }
  } else {
    const error = new Error('An error occurred while fetching the data');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
};

export default fetcher;
