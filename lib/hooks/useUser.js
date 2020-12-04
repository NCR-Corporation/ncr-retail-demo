import useSWR from 'swr';

export default function useUser(session) {
  let token = session.user.token;
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `AccessToken ${token}`,
      },
    }).then((r) => r.json());
  let { data, error } = useSWR(`/api/user`, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
