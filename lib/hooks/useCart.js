import useSWR from 'swr';
import fetcher from './fetcher';
export async function addToCart(userStore, userCart, item) {
  let etag, location;
  if (!userCart.etag && !userCart.location) {
    // we need to create a cart
    let cartDetails = await createCart(userStore.id);
    etag = cartDetails.etag;
    location = cartDetails.location;
    console.log('cart details', cartDetails);
  } else {
    etag = userCart.etag;
    location = userCart.location;
  }

  // let url = `/api/catalog?id=${id}`;
  // if (query != null) {
  //   url = `${url}&query=${query}`;
  // }
  // let { data, error } = useSWR(url, fetcher);
  // return {
  //   catalogItems: data,
  //   isLoading: !error && !data,
  //   isError: error,
  // };
}

async function createCart(siteId) {
  let response = await fetch(`/api/cart`, {
    method: 'POST',
    body: JSON.stringify({ siteId: siteId }),
  });
  return response.json();
}
