import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCart(storeId, cartId) {
  let url = `/api/cart/${storeId}/${cartId}`;
  let { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
