import React, { useState,  } from "react";
import MaterialTable from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";
import ModalCard from "./ModalCard";

const Table = ({ isLoading, title, col, launches }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [launch, setLaunch] = useState({});
  const handleClose = () => setModalIsOpen(false);


  return (
    <div>
      {modalIsOpen ? (
        <ModalCard
          modalStatus={modalIsOpen}
          handleClose={handleClose}
          launch={launch}
        />
      ) : (
        ""
      )}

      {!isLoading ? (
        <MaterialTable
          title={title}
          columns={col}
          data={launches}
          onRowClick={(event, rowdata) => {
            setModalIsOpen(true);
            setLaunch(rowdata);
          }}
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
