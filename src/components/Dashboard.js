import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import FormatDate from "./FormatDate";

// Added Column to the table
const comonscol = [
  { title: "Flight No.", field: "flight_number" },
  { title: "Mission", field: "mission_name" },
  { title: "Orbit", field: "rocket.second_stage.payloads[0].orbit" },
  { title: "Rocket", field: "rocket.rocket_name" },
  {
    title: "Date",
    field: "launch_date_utc",
    // Conditional rendering of date using FormatDate component so that the date is formatted
    render: (row) => <FormatDate date={row.launch_date_utc} />,
  },
  {
    title: "Status",
    field: "launch_success",
    // Conditional rendering of Status feild in table
    render: (row) => (
      <div
        className={
          row.launch_success === null
            ? "upcoming"
            : row.launch_success === true
            ? "success"
            : "failed"
        }
      >
        {row.launch_success === null
          ? "Upcoming"
          : row.launch_success === true
          ? "Success"
          : "Failed"}
      </div>
    ),
  },
];

export default function Dashboard() {
  const [launches, setlaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);

  // Fetched data from space-x v3 api using axios
  useEffect(() => {
    try {
      setIsLoading(true);
      axios.get(`https://api.spacexdata.com/v3/launches`).then((res) => {
        setlaunches(res.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
        <div className="table-style">
        {/* rendered Table Component */}
          <Table
            isLoading={isLoading}
            title="Space-x Table"
            col={comonscol}
            launches={launches}
          />
        </div>
    </>
  );
}
