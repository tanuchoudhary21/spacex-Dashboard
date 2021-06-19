import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Select, MenuItem } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ModalCard from "./ModalCard";

const Table = ({ isLoading, title, col, launches }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [launch, setLaunch] = useState({});
  const [filteredData, setFilteredData] = useState(launches);
  const [status, setStatus] = useState("all");
  const handleClose = () => setModalIsOpen(false);
  // Here we used localstorage so that on refreshing the page the theme does not get changed to the useState initial value
  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem("_tableDarkMode");
    return mode === "true" || false;
  });

  // useEffect function to enable filtering functinality based on the status...
  useEffect(() => {
    console.log(status);
    setFilteredData(
      status === "all"
        ? launches
        : launches.filter(function (launch) {
            // eslint-disable-next-line
            return launch.launch_success == status;
          })
    );
  }, [status, launches]);

  // To set the theme palette used in Table
  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? "dark" : "light",
    },
  });

  // function to handle Dark Mode changes  
  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode);
    localStorage.setItem("_tableDarkMode", !preferDarkMode);
  };

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
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            title={title}
            columns={col}
            data={filteredData}
            // This will open ModalCard on Row click
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
            // Actions for Filtering and DarkMode are defined...
            actions={[
              {
                icon: () => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ width: 100 }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value={"all"}>
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={true}>Success</MenuItem>
                    <MenuItem value={false}>Failed</MenuItem>
                    <MenuItem value={null}>Upcoming</MenuItem>
                  </Select>
                ),
                tooltip: " Filter Status",
                isFreeAction: true,
              },
              {
                icon: () =>
                  preferDarkMode ? <Brightness7Icon /> : <Brightness4Icon />,
                tooltip: "Toggle light/dark mode",
                onClick: handleDarkModeChange,
                isFreeAction: true,
              },
            ]}
          />
        </MuiThemeProvider>
      ) : (
        <div className="Loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Table;
