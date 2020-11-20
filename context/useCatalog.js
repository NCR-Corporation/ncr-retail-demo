import useSWR from 'swr'
export default function useCatalog(id, query = null) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  let url = `/api/catalog?id=${id}`;
  if (query != null) {
    url = `${url}&query=${query}`
  }
  let { data, error } = useSWR(url, fetcher)
  return {
    catalogItems: data,
    isLoading: !error && !data,
    isError: error
  }
}