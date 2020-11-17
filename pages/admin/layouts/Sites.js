function Sites({ data }) {
  // TODO: Fix if no content
  const sites = data.data.pageContent;
  return (
    <div className="mt-4">
      <ul className="list-group">
        {sites.map((site) => (
          <a key={site.id} href={`/admin/sites/${site.id}`} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{site.siteName}</h5>
              <small>{site.status}</small>
            </div>
            <small>{site.id}</small>
          </a>
        ))}
      </ul>
    </div>
  )
}



export default Sites;