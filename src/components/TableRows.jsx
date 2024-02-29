import React, { useState } from "react";
function TableRows({ rows, tableRowRemove, onValUpdate }) {
  return rows.map((rowsData, index) => {
    const { guestFirstName, guestLastName, dob,gender } = rowsData;
    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={guestFirstName}
            onChange={(event) => onValUpdate(index, event)}
            name="guestFirstName"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={guestLastName}
            onChange={(event) => onValUpdate(index, event)}
            name="guestLastName"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="date"
            value={dob}
            onChange={(event) => onValUpdate(index, event)}
            name="dob"
            className="form-control"
          />
        </td>
        <td>
          <select
            name="gender"
            onChange={(event) => onValUpdate(index, event)}
            className="form-control"
          >
            <option selected>Select Gender</option>
            <option value={gender}>Male</option>
            <option value={gender}>Female</option>
          </select>
          
        </td>
        <td>
          <button
            className="btn btn-dark"
            onClick={() => tableRowRemove(index)}
          >
            Delete Row
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;