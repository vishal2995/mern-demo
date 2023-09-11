import { useEffect, useState } from "react";
import { getAllUsers, getSortData, userDelete } from "../../pages/api/userApi";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingPage from "../common/loadingPage";
import { toast } from "react-toastify";
import Pagiantion from "../common/paginantion/pagiantion";
import Table from "../common/table";
import Link from "next/link";

function User() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalReacords, setTotalReacords] = useState(0);
  const [input, setInput] = useState("");
  const perPageArr = [5, 10, 15, 20, 25, 30, 35];
  const [sorting, setSorting] = useState({ column: "name", order: "asc" });
  const isDescSorting = sorting.order === "desc";
  const isAscSorting = sorting.order === "asc";
  const futureSortingOrder = isAscSorting ? "desc" : "asc";
  const tableHeader = [
    { value: "name", name: "Name" },
    { value: "email", name: "Email" },
    { value: "role", name: "Role" },
  ];

  const getAllData = async (value) => {
    setLoading(true);
    return getAllUsers(page, recordsPerPage, value)
      .then((res) => {
        setLoading(false);
        const totalPages1 = Math.ceil(res.data.total / recordsPerPage);

        setData(res.data.users);
        setTotalPages(totalPages1);
        setTotalReacords(res.data.total);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const deleteItem = async (e, _id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete # 12?")) {
      return userDelete(_id)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
          }
          getAllData(input);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  //Sorting

  const sortTable = async (newSorting) => {
    setSorting(newSorting);
    setLoading(true);
    try {
      const res = await getSortData(
        page,
        recordsPerPage,
        sorting.column,
        sorting.order
      );
      const totalPages1 = Math.ceil(res.data.total / recordsPerPage);
      setData(res.data.users);
      setTotalPages(totalPages1);
      setLoading(false);
      setTotalReacords(res.data.total);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onPageChanged = (page) => {
    setPage(page);
  };

  //Filtering

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      getAllData(e.target.value);
    }
    setPage(1);
  };

  const onkeyDown = (e) => {
    if (e.keyCode === 13) {
      getAllData(e.target.value);
    }
    setPage(1);
  };

  const onChangeRecordsPerPage = (event) => {
    setRecordsPerPage(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    getAllData(input);
  }, [recordsPerPage, page, input]);

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  <b>Users</b>
                </h2>
              </div>
              <div className="col-sm-6 ms-auto">
                <Link href="/users/add" className="btn btn-success">
                  <FontAwesomeIcon icon={faCirclePlus} className="plusicon" />
                  <span>Add New User</span>
                </Link>
              </div>
            </div>
          </div>
          {loading ? <LoadingPage /> : null}
          <div
            id="students_table_wrapper"
            className="dataTables_wrapper dt-bootstrap5 no-footer"
          >
            <div className="row px-lg-5">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length" id="students_table_length">
                  <label>
                    Show{" "}
                    <select
                      name="students_table_length"
                      className="form-select form-select-sm"
                      onChange={(e) => {
                        onChangeRecordsPerPage(e);
                      }}
                    >
                      {perPageArr.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>{" "}
                    entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div id="students_table_filter" className="dataTables_filter">
                  <label>
                    Search:
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="students_table"
                      name="name"
                      value={input || ""}
                      onChange={handleChange}
                      onKeyDown={onkeyDown}
                    />
                  </label>
                </div>
              </div>
            </div>
            <Table
              data={data}
              tableHeader={tableHeader}
              isAscSorting={isAscSorting}
              isDescSorting={isDescSorting}
              deleteItem={(e, _id) => deleteItem(e, _id)}
              sortTable={(e) => sortTable(e)}
              sorting={sorting}
              futureSortingOrder={futureSortingOrder}
            />
            <Pagiantion
              data={data}
              totalPages={totalPages}
              currentPage={page}
              maxVisibleButtons={3}
              recordsPerPage={recordsPerPage}
              totalReacords={totalReacords}
              length={data?.length}
              onPageChanged={(e) => onPageChanged(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
