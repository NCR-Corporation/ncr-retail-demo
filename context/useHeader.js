import useSWR from 'swr'

export default function useHeader() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/category', fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error
  }
}