import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCart(storeId, cartId) {
  console.log("cart ID (1): " + cartId);
  // Don't call this if Cart ID is/becomes null
  let url = `/api/cart/${storeId}/${cartId}`;
  console.log("cart ID (2): " + cartId);
  let { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
