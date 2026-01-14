import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ links = [] }) => {
  if (!links.length) return null;

  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-end"> {/* pull-right */}
        {links.map((link, index) => (
          <li
            key={index}
            className={`page-item ${link.active ? "active" : ""} ${
              !link.url ? "disabled" : ""
            }`}
          >
            {link.url ? (
              <Link
                href={link.url}
                className="page-link"
                preserveState
                preserveScroll
                replace
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ) : (
              <span
                className="page-link"
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
