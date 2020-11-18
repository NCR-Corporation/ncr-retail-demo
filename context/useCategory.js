import useSWR from 'swr'
export default function useCategory(id, siteId) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  let { data, error } = useSWR(`/api/category/${id}/${siteId}`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}