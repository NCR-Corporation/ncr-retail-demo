const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (res.status === 200 || res.status === 204) {
    let json = await res.json();
    return json;
  } else if (res.status === 404) {
    console.log("IT IS A 404");
  } else {
    const error = new Error('An error occurred while fetching the data');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
};

export default fetcher;
