import { Link } from "react-router-dom";
import { timeDiff } from "../core/Helper";

const JobItem = ({ job, setRefresh }) => {
  return (
    <li className="point">
      <div className="job">
        <div className="display-flex-between">
          <label className="label-title">
            <Link style={{textDecoration: "none", color: "#3C7FB9"}} to={`/job-detail/${job.id}`}>{job.title}</Link>
          </label>
          <label className="label-location">{job.location}</label>
        </div>
        <div className="display-flex-between">
          <div>
            <span className="label-company">{job.company} - </span>
            <span className="label-type">{job.type}</span>
          </div>
          <span className="label-date">{timeDiff(job.created_at)}</span>
        </div>
      </div>
    </li>
  );
};

export default JobItem;
