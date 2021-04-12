const Pagination = ({
  itemsCount,
  pageSize,
  handlePageChange,
  currentPage,
}) => {
  const pages = Math.ceil(itemsCount / pageSize);

  return (
    <nav>
      <ul className="pagination">
        {[...Array(pages)].map((e, i) => (
          <li
            className={i === currentPage ? "page-item active" : "page-item"}
            key={i}
          >
            <a className="page-link" onClick={() => handlePageChange(i)}>
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
