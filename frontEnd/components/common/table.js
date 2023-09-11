import Link from "next/link";
import { faPencil, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

function Table({
  data,
  tableHeader,
  isAscSorting,
  isDescSorting,
  deleteItem,
  sortTable,
  sorting,
  futureSortingOrder,
}) {
  return (
    <div className="row dt-row px-lg-5 mb-lg-4">
      <div className="col-sm-12">
        <table
          className="table table-striped table-hover dataTable no-footer"
          id="students_table"
          aria-describedby="students_table_info"
        >
          <thead>
            <tr>
              <th style={{ width: 60 }}>Id</th>
              {tableHeader.map((item, index) => {
                return (
                  <th
                    key={index}
                    className={`sorting ${
                      sorting.column === item.value && isAscSorting
                        ? "sorting_asc"
                        : "sorting" &&
                          sorting.column === item.value &&
                          isDescSorting
                        ? "sorting_desc"
                        : "sorting"
                    } `}
                    tabIndex={0}
                    aria-controls="students_table"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 167 }}
                    onClick={() => {
                      sortTable({
                        column: item.value,
                        order: futureSortingOrder,
                      });
                    }}
                  >
                    {item.name}
                  </th>
                );
              })}
              <th>Action</th>
            </tr>
          </thead>
          {data?.length > 0 ? (
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr className={index % 2 ? "even" : "odd"} key={index}>
                    <td className="sorting_1">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <Link href={`/users/view/${item._id}`} className="view">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="mx-2 eye-btn"
                        />
                      </Link>
                      <Link href={`users/edit/${item._id}`} className="edit">
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="mx-2 edit-btn"
                        />
                      </Link>
                      {item && item._id !== Cookies.get("loginId") ? (
                        <Link
                          href="/users"
                          className="delete"
                          data-confirm-message="Are you sure you want to delete # 2?"
                          onClick={(e) => deleteItem(e, item._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="mx-2 delete-btn"
                          />
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr className="odd">
                <td valign="top" colSpan="6" className="dataTables_empty">
                  No data available in table
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Table;
