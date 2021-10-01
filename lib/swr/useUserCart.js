import useSWR from 'swr';
import fetcher from './fetcher';
export default function useUserCart(userCart, userStore) {
  if (userCart.etag && userCart.location) {
    const { location } = userCart;
    const { data, error } = useSWR(`/api/cart/${userStore.id}/${location}`, fetcher);
    return {
      data,
      isLoading: !error && !data,
      isError: error
    };
  } else {
    return {
      data: null,
      isError: false,
      isLoading: false
    };
  }
}
