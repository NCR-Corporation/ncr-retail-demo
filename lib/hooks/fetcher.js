const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (res.status === 200 || res.status === 204) {
    let json = await res.json();
    // console.log('json', json);
    // if (json.status === 200 || json.status === 204 || json.length > 0) {
    return json;
    // } else {
    //   throw new Error({ status: json.status, message: json.data });
    // }
  } else {
    throw new Error({ status: res.status, message: res.json() });
  }
};

export default fetcher;
