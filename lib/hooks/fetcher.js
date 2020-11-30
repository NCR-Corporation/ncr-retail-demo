const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (res.status === 200 || res.status === 204) {
    return res.json();
  } else {
    throw new Error({ status: res.status, message: res.json() });
  }
};

export default fetcher;
