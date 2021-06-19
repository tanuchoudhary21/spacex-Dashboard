import React, { useState, useEffect  } from "react";
import MaterialTable from "material-table";
import { Select, MenuItem } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import ModalCard from "./ModalCard";

const Table = ({ isLoading, title, col, launches }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [launch, setLaunch] = useState({});
  const [filteredData, setFilteredData] = useState(launches);
  const [status, setStatus] = useState('all');
  const handleClose = () => setModalIsOpen(false);

  useEffect(() => {
    console.log(status);
    setFilteredData(
      status === 'all'
        ? launches
        : launches.filter(function (launch) {
            // eslint-disable-next-line
            return launch.launch_success == status;
          })
    );
  }, [status, launches]);


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
          data={filteredData}
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
          actions={[
            {
              icon: () => (
                <Select
                  // className="select"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: 100 }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={'all'}>
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={true}>Success</MenuItem>
                  <MenuItem value={false}>Failed</MenuItem>
                  <MenuItem value={null}>Upcoming</MenuItem>
                </Select>
              ),
              tooltip: ' Filter Status',
              isFreeAction: true,
            },
          ]}
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
