import { useEffect, useState } from "react";
import HttpRequest from "../core/HttpRequest";
import JobItem from "./JobItem";

const JobList = ({ isRefresh, setRefresh }) => {
  const [jobList, setJobList] = useState([]);
  const [params, setParams] = useState({
    location: "",
    description: "",
    full_time: false,
    page: 1,
  });
  const [url, setUrl] = useState("/job/list?page=1");
  const [endData, setEndData] = useState(false);
  const getData = async () => {
    let result = jobList;
    const todosData = await HttpRequest(process.env.REACT_APP_BASE_URL, url);
    if (todosData.length === 0) {
      setEndData(true);
    }
    result = todosData.object;
    setJobList(result);
    setRefresh(false);
    return todosData;
  };

  const searchData = () => {
    let uri = "/job/list";
    if (params.page) {
      uri += `?page=${params.page}`;
    }
    if (params.location) {
      uri += `&location=${params.location}`;
    }
    if (params.description) {
      uri += `&description=${params.description}`;
    }
    if (params.full_time) {
      uri += `&full_time=${params.full_time}`;
    }
    setUrl(uri);
    setRefresh(true);
  };

  const loadMoreJob = async() => {
    let uri = "/job/list";
    if (params.page) {
      uri += `?page=${params.page + 1}`;
    }
    if (params.location) {
      uri += `&location=${params.location}`;
    }
    if (params.description) {
      uri += `&description=${params.description}`;
    }
    if (params.full_time) {
      uri += `&full_time=${params.full_time}`;
    }
    setUrl(uri);
    handleChange(params.page + 1, "page");
    setRefresh(true);
  };

  const handleChange = (event, name) => {
    setParams({
      ...params,
      [name]: event,
    });
  };

    useEffect(() => {
        if (isRefresh) {
        getData();
        }
    }, [isRefresh, setRefresh]);

  return (
    <>
      <div className="search-box">
        <div className="search-input">
          <label className="label-search" htmlFor="fname">
            Job Description
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Filter by title, benefits, companies, expertise"
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </div>
        <div className="margin-left-10px search-input">
          <label className="label-search" htmlFor="fname">
            Location
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Filter by city, state, zip code or country"
            onChange={(e) => handleChange(e.target.value, "location")}
          />
        </div>
        <div className="checkbox-filter">
          <input
            type="checkbox"
            id="full-time"
            name="full-time"
            defaultChecked={params.full_time}
            onChange={(e) => handleChange(!params.full_time, "full_time")}
          />
          <label className="label-search" htmlFor="full-time">
            {" "}
            Full Time Only
          </label>
        </div>
        <div className="button-search">
          <button onClick={searchData}>Search</button>
        </div>
      </div>
      <div className="job-list">
        <ul className="lists">
          <li className="point">
            <h3 className="job-title">Job List</h3>
          </li>
          {jobList.map((job) => {
            if (job !== null) {
              return <JobItem job={job} key={job.id} setRefresh={setRefresh} />;
            }
          })}
        </ul>
        <div className={'load-more ' + (endData ? 'd-none' : '')}>
          <button className="btn-load-more" onClick={loadMoreJob}>More Jobs</button>
        </div>
      </div>
    </>
  );
};

export default JobList;
