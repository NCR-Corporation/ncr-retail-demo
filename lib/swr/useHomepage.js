import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHomepage(siteId) {
  if (siteId) {
    const { data, error } = useSWR(`/api/groups`, fetcher);
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    };
  } else {
    return {
      data: {},
      isLoading: false,
      isError: false
    };
  }
}
