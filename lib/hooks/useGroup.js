import useSWR from 'swr';
import fetcher from './fetcher';
export default function useGroup(groupId) {
  let url = `/api/groups/${groupId}`;
  let { data, error } = useSWR(url, fetcher);
  return {
    group: data,
    isLoading: !error && !data,
    isError: error,
  };
}
