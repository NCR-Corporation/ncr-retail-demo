import useSWR from 'swr';
import fetcher from './fetcher';
export default function useGroupItems(groupId, siteId) {
  if (groupId) {
    let url = `/api/groups/${siteId}/${groupId}`;
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
