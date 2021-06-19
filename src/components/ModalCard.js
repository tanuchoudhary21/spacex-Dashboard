import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import BookIcon from "@material-ui/icons/Book";
import LanguageIcon from "@material-ui/icons/Language";
import { getFormattedDate, getStatusLabel } from "../utils/index";

Modal.setAppElement("#root");
function ModalCard({ modalStatus, handleClose, launch }) {
  console.log("Launches inside Modal", launch);
  return (
    <div className="overlay">
      <Modal isOpen={modalStatus} onRequestClose={handleClose}>
        <div className="model">
          <h2>{launch.mission_name}</h2>
          <div className="model-info">
            <img src={launch.links.mission_patch} alt={launch.mission_name} />
            <div className="info-div">
              <p>
                <span className="field-name">Orbit</span>
                {launch.rocket.second_stage.payloads[0].orbit}
              </p>
              <p>
                <span className="field-name">Date </span>
                {getFormattedDate(launch.launch_date_utc)}
              </p>
              <p>
                <span className="field-name"> Status </span>
                {getStatusLabel(launch.launch_success)}
              </p>
            </div>
          </div>

          <p className="launch-description">{launch.details}</p>

          <div className="details-row">
            <div>
              <p>
                <span className="field-name">Rocket Used </span>
                {launch.rocket.rocket_name}
              </p>
              <p>
                <span className="field-name">Payload</span>
                {launch.rocket.second_stage.payloads[0].payload_id}
              </p>
              <p>
                <span className="field-name">Location</span>
                {launch.launch_site.site_name}
              </p>
            </div>
            <div>
              <p>
                <span className="field-name">Rocket Type</span>
                {launch.rocket.rocket_type}
              </p>
              <p>
                <span className="field-name">Nation</span>
                {launch.rocket.second_stage.payloads[0].nationality}
              </p>
              <p>
                <span className="field-name">Regime</span>
                {launch.rocket.second_stage.payloads[0].orbit_params.regime}
              </p>
            </div>
            <div>
              <p>
                <span className="field-name">Manufacturer</span>
                {launch.rocket.second_stage.payloads[0].manufacturer}
              </p>
              <p>
                <span className="field-name">Payload Type</span>
                {launch.rocket.second_stage.payloads[0].payload_type}
              </p>
              <p>
                <span className="field-name">Payload Mass</span>
                {launch.rocket.second_stage.payloads[0].payload_mass_kg} kgs
              </p>
            </div>
          </div>

          <div className="social-links">
            {launch.links.article_link ? (
              <a href={launch.links.article_link}>
                <BookIcon fontSize="large" />
              </a>
            ) : null}
            {launch.links.wikipedia ? (
              <a href={launch.links.wikipedia}>
                {/* <Icon name="wikipedia w" /> */}
                <LanguageIcon fontSize="large" />
              </a>
            ) : null}

            {launch.links.video_link ? (
              <a href={launch.links.video_link}>
                <YouTubeIcon fontSize="large" />
              </a>
            ) : null}
          </div>

          <Button
            className="btn"
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCard;
