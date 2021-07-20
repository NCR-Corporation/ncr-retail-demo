import useSWR from 'swr';
import fetcher from './fetcher';

export default function useSite(id) {
  let { data, error } = useSWR(`/api/sites/${id}`, fetcher);
  console.log('use site singlular');
  return {
    site: data,
    isLoading: !error && !data,
    isError: error
  };
}
