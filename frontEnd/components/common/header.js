import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = ({ title }) => {
  return (
    <>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <svg className="bi me-2" width={40} height={32}>
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">{title}</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              href="/"
              className="btn btn-outline-primary me-2"
              onClick={() => {
                Cookies.remove("loginToken");
                Cookies.remove("loginId");
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
