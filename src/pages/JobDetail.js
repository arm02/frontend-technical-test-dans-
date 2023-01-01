import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HttpRequest from "../core/HttpRequest";

function JobDetail({ setIsRefresh }) {
  const [job, setJob] = useState({});
  const [isRefresh, setRefresh] = useState(true);
  const [path, setPath] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    const jobData = await HttpRequest(
      process.env.REACT_APP_BASE_URL,
      "/job/" + id
    );
    setJob(jobData.object);
    setRefresh(false);
    return jobData;
  };

  const goTo = (url) => {
    setIsRefresh(true);
    return setPath(url);
  };

  const redirect = () => {
    if (path) {
      return navigate(path);
    }
  };

  useEffect(() => {
    if (isRefresh) {
      getData();
    }
  }, [isRefresh, setRefresh]);

  useEffect(() => {
    redirect();
  }, [path, setPath]);
  return (
    <>
      <div className="search-box">
        <span className="label-back" onClick={() => goTo("/")}>
          Back
        </span>
      </div>
      <div className="job-detail">
        <div className="title">
          <span className="label-type">
            {job.type} / {job.location}
          </span>
          <span className="label-title">{job.title}</span>
        </div>
        <div className="content-container">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></div>
          <div className="ads">
            <div className="card-ads">
              <div className="title">
                <span className="label">{job.company}</span>
                <span className="other-jobs">1 Other Job</span>
              </div>
              <div className="images">
                <img src={job.company_logo} width={"100%"} />
              </div>
              <div className="link">
                <a href={job.company_url} target="_blank">
                  {job.company_url}
                </a>
              </div>
            </div>
            <div className="card-ads bg-yellow">
              <div className="title">
                <span className="label">How to apply</span>
              </div>
              <div
                className="images"
                dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
