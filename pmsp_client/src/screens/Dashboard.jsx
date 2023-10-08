import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faClock,
  faCalendarCheck,
  faCalendarXmark,
  faExclamation,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="drawer">
        <div className="navigation-container">
          <Link
            to="/"
            className="create-link"
            data-tooltip-id="create-link"
            data-tooltip-content="Create Link">
            <FontAwesomeIcon icon={faLink} />
          </Link>
          <Tooltip id="create-link" place="right" />
          <Link
            to="/"
            className="confirmed-meetings"
            data-tooltip-id="confirmed-meetings"
            data-tooltip-content="Confirmed Meetings">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </Link>
          <Tooltip id="confirmed-meetings" place="right" />
          <Link
            to="/"
            className="canceled-meetings"
            data-tooltip-id="canceled-meetings"
            data-tooltip-content="Canceled Meetings">
            <FontAwesomeIcon icon={faCalendarXmark} />
          </Link>
          <Tooltip id="canceled-meetings" place="right" />
          <Link
            to="/"
            className="RSVP-meetings"
            data-tooltip-id="RSVP-meetings"
            data-tooltip-content="Waiting List">
            <FontAwesomeIcon icon={faExclamation} />
          </Link>
          <Tooltip id="RSVP-meetings" place="right" />
        </div>
      </div>
      <div className="sidebar">
        <h1>PMSP</h1>
        <div className="buttons-container">
          <Link to="/" className="google-calendar-btn">
            <FontAwesomeIcon icon={faGoogle} /> <span>&nbsp;Calendar</span>
          </Link>
          <Link to="/" className="microsoft-calendar-btn">
            <FontAwesomeIcon icon={faMicrosoft} /> <span>&nbsp;Calendar</span>
          </Link>
        </div>
      </div>
      <div className="meetings-container">
        <div className="top-nav">
          <p>Meetings</p>
          <p>Username</p>
        </div>
        <div className="date-time-container">
          <h1>Your Meetings</h1>
          <div className="date-time">
            <p className="meeting-day">Saturday</p>
            <p className="meeting-date">
              <span>07&nbsp;</span>October
            </p>
          </div>
        </div>
        <div className="meetings">
          <div className="meeting">
            <div className="meeting-data">
              <div className="meeting-time">
                <h4 className="meeting-start">10:00 am</h4>
                <p className="meeting-end">11:00 am</p>
              </div>
              <div className="vertical-bar"></div>
              <div className="meeting-duration">
                <FontAwesomeIcon className="icon" icon={faClock} />
                <p className="duration">40 mins</p>
              </div>
              <h3 className="meeting-title">Topic One</h3>
            </div>
            <FontAwesomeIcon className="menu" icon={faEllipsisVertical} />
          </div>
          <div className="meeting">
            <div className="meeting-data">
              <div className="meeting-time">
                <h4 className="meeting-start">10:00 am</h4>
                <p className="meeting-end">11:00 am</p>
              </div>
              <div className="vertical-bar"></div>
              <div className="meeting-duration">
                <FontAwesomeIcon className="icon" icon={faClock} />
                <p className="duration">40 mins</p>
              </div>
              <h3 className="meeting-title">Topic One</h3>
            </div>
            <FontAwesomeIcon className="menu" icon={faEllipsisVertical} />
          </div>
          <div className="meeting">
            <div className="meeting-data">
              <div className="meeting-time">
                <h4 className="meeting-start">10:00 am</h4>
                <p className="meeting-end">11:00 am</p>
              </div>
              <div className="vertical-bar"></div>
              <div className="meeting-duration">
                <FontAwesomeIcon className="icon" icon={faClock} />
                <p className="duration">40 mins</p>
              </div>
              <h3 className="meeting-title">Topic One</h3>
            </div>
            <FontAwesomeIcon className="menu" icon={faEllipsisVertical} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
