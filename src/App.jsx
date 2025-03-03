// App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Organization from "./components/Organization/landingpage/OrganizationInfo";
import Landingpage from "./components/Organization/landingpage/Landingpage";
import QElandingpage from "./components/NexGen_QE/landingpage.jsx/QElandingpage";
// import Project360 from "./components/Project360";
// import ComplianceIQ from "./components/ComplianceIQ";
// import NexGenQE from "./components/NexGenQE";
// import Platform from "./components/Platform";

// Map each unique key to its component.
// For subitems that belong to the same page, you can use the same component.
const pageComponents = {
  organization: <Landingpage />,
  orgDashboard: <Organization />,
  orgMyProject: <Organization />,
  // orgSetup: <Organization />,
  // p360Dashboard: <Project360 />,
  // p360Gantt: <Project360 />,
  // p360Tasks: <Project360 />,
  // ciqDashboard: <ComplianceIQ />,
  // ciqAudit: <ComplianceIQ />,
  nexGenQE: <QElandingpage />,
  // nqeDashboard: <NexGenQE />,
  // nqeTestPlan: <NexGenQE />,
  // platGlobalConfig: <Platform />,
  // platWebConfig: <Platform />,
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Default active page is set using one of the unique keys.
  const [activePage, setActivePage] = useState("orgDashboard");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Render the content based on the activePage key.
  const renderContent = () => {
    return pageComponents[activePage] || <div>Page not found</div>;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <div
          className={`flex-1 p-5 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
