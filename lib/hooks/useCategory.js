import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCategory(id, siteId = null) {
  if (siteId != null) {
    let { data, error } = useSWR(`/api/category/${siteId}/${id}/`, fetcher);
    console.log('data', data);
    return {
      data,
      isLoading: !error && !data,
      isError: error,
    };
  } else {
    let { data, error } = useSWR(`/api/category/${id}`, fetcher);
    return {
      category: data,
      isLoading: !error && !data,
      isError: error,
    };
  }
}
