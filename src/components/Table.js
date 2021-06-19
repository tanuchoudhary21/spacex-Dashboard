import React from "react";
import MaterialTable from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";

const Table = ({ isLoading, title, col, launches }) => {
  return (
    <div>
      {!isLoading ? (
        <MaterialTable
          title={title}
          columns={col}
          data={launches}
          // onRowClick={(event, rowdata) => {
          //   setModalIsOpen(true);
          //   setLaunch(rowdata);
          // }}
          options={{
            exportButton: true,
            columnsButton: true,
            search: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              zIndex: 0,
            },
          }}
        />
      ) : (
        <div className="Loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Table;
