import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import FormatDate from "./FormatDate";

const comonscol = [
  { title: "Flight No.", field: "flight_number" },
  { title: "Mission", field: "mission_name" },
  { title: "Orbit", field: "rocket.second_stage.payloads[0].orbit" },
  { title: "Rocket", field: "rocket.rocket_name" },
  {
    title: "Date",
    field: "launch_date_utc",
    render: (row) => <FormatDate date={row.aunch_date_utc} />,
  },
  {
    title: "Status",
    field: "launch_success",
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
      <div >
        <div className="table-style">
          <Table
            isLoading={isLoading}
            title="Space-x Table"
            col={comonscol}
            launches={launches}
          />
        </div>
      </div>
    </>
  );
}
