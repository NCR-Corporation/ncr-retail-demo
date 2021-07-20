import useSWR from 'swr';

export default function useUser(session) {
  if (!session || !session.user) {
    return {
      user: null,
      isError: true,
      isLoading: false
    };
  }
  let token = session.user.token;
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `AccessToken ${token}`
      }
    }).then((r) => r.json());
  let { data, error } = useSWR(`/api/user`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error || (data && data.status == 500)
  };
}
