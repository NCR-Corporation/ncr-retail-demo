import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCatalogItem(id, site = null) {
  if (id) {
    if (site !== null) {
      let { data, error } = useSWR(`/api/catalog/${site}/${id}`, fetcher);
      return {
        catalogItem: data ? data.data : data,
        isLoading: !error && !data,
        isError: error,
      };
    } else {
      let { data, error } = useSWR(`/api/catalog/${id}`, fetcher);
      return {
        catalogItem: data ? data.data : data,
        isLoading: !error && !data,
        isError: error,
      };
    }
  } else {
    return {
      catalogItem: null,
      isLoading: false,
      isError: false,
    };
  }
}
