function Categories({ data }) {
  const categories = data.data.pageContent;
  // TODO: Fix if no content
  return (
    <div className="mt-4">
      <ul className="list-group">
        {categories.map((category) => (
          <a key={category.nodeCode} href='#' className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{category.title.value}</h5>
              <small>{category.status}</small>
            </div>
            <small>{category.nodeCode}</small>
          </a>
        ))}
      </ul>
    </div>
  )
}



export default Categories;