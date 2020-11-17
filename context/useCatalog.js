import useSWR from 'swr'
export default function useCatalog(id) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  let { data, error } = useSWR(`/api/catalog?id=${id}`, fetcher)
  return {
    catalogItems: data,
    isLoading: !error && !data,
    isError: error
  }
}