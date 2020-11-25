import useSWR from 'swr';
export default function useCatalogItem(id, site = null) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  if (site !== null) {
    let { data, error } = useSWR(`/api/catalog/${site}/${id}`, fetcher);

    return {
      catalogItem: data,
      isLoading: !error && !data,
      isError: error,
    };
  } else {
    let { data, error } = useSWR(`/api/catalog/${id}`, fetcher);
    return {
      catalogItem: data,
      isLoading: !error && !data,
      isError: error,
    };
  }
}
