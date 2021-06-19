import React from "react";
import Button from "@material-ui/core/Button";
import moment from "moment";

const getStatusLabel = (launch_success) => {
  if (launch_success === null) {
    return (
      <Button variant="contained" color="primary">
        Upcoming
      </Button>
    );
  } else if (launch_success) {
    return (
      <Button style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}>
        Successful
      </Button>
    );
  } else {
    return (
      <Button variant="contained" color="secondary">
        Failed
      </Button>
    );
  }
};

const getFormattedDate = (utcDate) => {
  return moment(utcDate).utc().format("DD MMMM YYYY HH:mm");
};

export { getStatusLabel, getFormattedDate };
