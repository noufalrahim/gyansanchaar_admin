import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { UrlEnum } from "./types";
import { CollegeDetailsPage, Colleges } from "./pages/Colleges";
import { AboutApplication, Applications } from "./pages/Applications";
import { Courses } from "./pages/Courses";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { Login } from "./pages/Login";
import { Location } from "./pages/Location";
import { CourseCategory } from "./pages/CourseCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={UrlEnum.login} element={<Login />} />
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        <Route
          path={UrlEnum.home}
          element={
            <ProtectedRoute>
              <Layout><h1>Hello Text</h1></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.colleges}
          element={
            <ProtectedRoute>
              <Layout><Colleges /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.applications}
          element={
            <ProtectedRoute>
              <Layout><Applications /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.applicationDetails}
          element={
            <ProtectedRoute>
              <Layout><AboutApplication /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.courses}
          element={
            <ProtectedRoute>
              <Layout><Courses /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.courseCategory}
          element={
            <ProtectedRoute>
              <Layout><CourseCategory /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.location}
          element={
            <ProtectedRoute>
              <Layout><Location /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={UrlEnum.location}
          element={
            <ProtectedRoute>
              <Layout><Location /></Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path={UrlEnum.collegDetails}
          element={
            <ProtectedRoute>
              <Layout><CollegeDetailsPage /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
