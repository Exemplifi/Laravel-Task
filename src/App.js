import React, { lazy, Suspense } from "react";
import "./App.scss";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MobileHeader from "./Layout/MobileHeader/MobileHeader";
import Login from "./Pages/Login/Login";

function App() {
  const Home = lazy(() => import("./Pages/Home/Home"));
  const CreateTask = lazy(() => import("./Pages/CreateTask/CreateTask"));
  const TaskDetails = lazy(() =>
    import("./Pages/TaskDetails/TaskDetails")
  );

  // Component to conditionally render Sidebar and MobileHeader
  const LayoutWrapper = ({ children }) => {
    const location = useLocation();

    // Routes where Sidebar should NOT be shown
    const noSidebarRoutes = ["/"];

    const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

    return (
      <>
        {shouldShowSidebar && <Sidebar />}
        {shouldShowSidebar && <MobileHeader />}
        {children}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/task-board" element={<Home />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/task-details" element={<TaskDetails />} />
            <Route path="/card-details/:id" element={<TaskDetails />} />
          </Routes>
        </LayoutWrapper>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
