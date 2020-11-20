import useSWR from 'swr'
export default function useCategory(id, siteId = null) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  if (siteId != null) {
    let { data, error } = useSWR(`/api/category/${id}/${siteId}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
  } else {
    let { data, error } = useSWR(`/api/category/${id}`, fetcher)
    return {
      category: data,
      isLoading: !error && !data,
      isError: error
    }
  }
}