import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faClock } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>PMSP</h1>
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