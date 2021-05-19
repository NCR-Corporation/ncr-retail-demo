import useSWR from 'swr';
import fetcher from './fetcher';
export default function useGroup(groupId) {
  if (groupId) {
    let url = `/api/groups/${groupId}`;
    let { data, error } = useSWR(url, fetcher);
    return {
      data,
      isLoading: !error && !data,
      isError: error
    };
  } else {
    return {
      group: null,
      isLoading: false,
      isError: false
    };
  }
}
