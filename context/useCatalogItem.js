import useSWR from 'swr'
export default function useCatalog(id, site) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  let { data, error } = useSWR(`/api/catalog/${site}/${id}`, fetcher)

  return {
    catalogItem: data,
    isLoading: !error && !data,
    isError: error
  }
}