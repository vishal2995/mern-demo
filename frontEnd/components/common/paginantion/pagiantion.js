function Pagiantion({
  totalPages,
  currentPage,
  maxVisibleButtons,
  recordsPerPage,
  onPageChanged,
  length,
  totalReacords,
  data,
}) {
  const isInFirstPage = () => {
    return currentPage === 1;
  };

  const isInLastPage = () => {
    if (totalPages === 0) {
      return true;
    }
    return currentPage === totalPages;
  };

  const onClickPreviousPage = () => {
    if (isInFirstPage()) {
      return false;
    }
    onPageChanged(currentPage - 1);
  };

  const onClickPage = (page) => {
    onPageChanged(page);
  };

  const onClickNextPage = () => {
    if (isInLastPage()) {
      return false;
    }
    onPageChanged(currentPage + 1);
  };

  const startPage = () => {
    if (currentPage === 1) {
      return 1;
    }
    // When on the last page
    if (totalPages < maxVisibleButtons) {
      return 1;
    }
    if (currentPage === totalPages) {
      return totalPages - maxVisibleButtons + 1;
    }
    // When in between
    return currentPage - 1;
  };

  const endPage = () => {
    if (totalPages === 0) {
      return 1;
    }
    if (totalPages < maxVisibleButtons) {
      return totalPages;
    }
    return Math.min(startPage() + maxVisibleButtons - 1, totalPages);
  };

  const isPageActive = (page) => {
    return currentPage === page;
  };

  var pages = [];
  for (let i = startPage(); i <= endPage(); i++) {
    pages.push(
      <li
        className={`paginate_button page-item ${
          isPageActive(i) ? "active" : ""
        }`}
        key={i}
      >
        <a
          aria-controls="students_table"
          aria-current="page"
          data-dt-idx={0}
          tabIndex={0}
          className="page-link"
          onClick={() => {
            onClickPage(i);
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <>
      <div className="row px-lg-5">
        <div className="col-sm-12 col-md-5">
          <div
            className="dataTables_info"
            id="students_table_info"
            role="status"
            aria-live="polite"
          >
            Showing{" "}
            {data?.length === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1} to{" "}
            {(currentPage - 1) * recordsPerPage + length} of {totalReacords}{" "}
            entries
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="students_table_paginate"
          >
            <ul className="pagination">
              <li
                className={`paginate_button page-item previous ${
                  isInFirstPage() ? "disabled" : ""
                }`}
                id="students_table_prePreviousvious"
                onClick={() => onClickPreviousPage()}
              >
                <a tabIndex={0} className="page-link">
                  Previous
                </a>
              </li>
              {data?.length === 0 ? null : pages}
              <li
                className={`paginate_button page-item next ${
                  isInLastPage() ? "disabled" : ""
                }`}
                id="students_table_next"
                onClick={() => onClickNextPage()}
              >
                <a tabIndex={0} className="page-link">
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagiantion;
