import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHomepage(param) {
  if (param) {
    const { data, error } = useSWR(`/api/admin/dashboard/${param}`, fetcher);
    return {
      data,
      isLoading: !error && !data,
      isError: error
    };
  } else {
    const { data, error } = useSWR(`/api/admin/dashboard`, fetcher);
    return {
      data,
      isLoading: !error && !data,
      isError: error
    };
  }
}
