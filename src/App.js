import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';

function App() {
  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
    setIsRefresh(status);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setRefresh={setRefresh} />}>
          <Route index element={<JobList isRefresh={isRefresh} setRefresh={setRefresh} />} />
          <Route path="job-detail/:id" element={<JobDetail setIsRefresh={setRefresh} />} />
          <Route path="login" isRefresh={isRefresh} setRefresh={setRefresh} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
