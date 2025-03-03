import React, { useState } from "react";
import OrchestrateTab from "./OrchestrateTab";

export default function QElandingpage() {
  // Track which top-level tab is active
  const [activeTab, setActiveTab] = useState("strategy");

  // Track dropdown selections
  const [productName, setProductName] = useState("Project360");
  const [moduleName, setModuleName] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [milestone, setMilestone] = useState("");
  
  // Track Testing Type (used only on certain tabs)
  const [testingType, setTestingType] = useState("");

  // Testing types presumably created in Strategy
  const strategyTestingTypes = ["Functional", "Regression", "Performance"];

  // Handle top tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Render the body content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "strategy":
        return <StrategyTab />;
      case "orchestrate":
        return <OrchestrateTab />;
      case "manage":
        return <ManageTab />;
      case "assure":
        return <AssureTab />;
      case "reports":
        return <ReportsTab />;
      case "analyze":
        return <AnalyzeTab />;
      default:
        return <StrategyTab />;
    }
  };

  // Check if the active tab requires the Testing Type dropdown
  const showTestingTypeDropdown = ["orchestrate", "assure", "reports", "analyze"].includes(activeTab);

  return (
    <div className="p-4 space-y-4">
      {/* --- Top Navigation Bar (Tabs) --- */}
      <div className="flex space-x-2 border-b border-gray-300 pb-1">
        <TabButton
          label="Strategy"
          active={activeTab === "strategy"}
          onClick={() => handleTabClick("strategy")}
        />
        <TabButton
          label="Orchestrate"
          active={activeTab === "orchestrate"}
          onClick={() => handleTabClick("orchestrate")}
        />
        <TabButton
          label="Manage"
          active={activeTab === "manage"}
          onClick={() => handleTabClick("manage")}
        />
        <TabButton
          label="Assure"
          active={activeTab === "assure"}
          onClick={() => handleTabClick("assure")}
        />
        <TabButton
          label="Reports"
          active={activeTab === "reports"}
          onClick={() => handleTabClick("reports")}
        />
        <TabButton
          label="Analyze"
          active={activeTab === "analyze"}
          onClick={() => handleTabClick("analyze")}
        />
      </div>

      {/* --- Second Row: Dropdowns --- */}
      <div className="flex flex-wrap items-center space-x-4">
        {/* Product Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">
            Product Name
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          >
            <option>Project360</option>
            <option>PIEDAP</option>
            <option>Global-Solutions</option>
          </select>
        </div>

        {/* Module Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">
            Module Name
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          >
            <option value="">--Select--</option>
            <option>Module A</option>
            <option>Module B</option>
          </select>
        </div>

        {/* Release Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">
            Release Name
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={releaseName}
            onChange={(e) => setReleaseName(e.target.value)}
          >
            <option value="">--Select--</option>
            <option>Release 1.0</option>
            <option>Release 2.0</option>
          </select>
        </div>

        {/* Milestone */}
        <div>
          <label className="text-sm font-medium text-gray-700 block">
            Milestone
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
          >
            <option value="">--Select--</option>
            <option>Alpha</option>
            <option>Beta</option>
            <option>Final</option>
          </select>
        </div>

        {/* Testing Type (only show if activeTab is orchestrate/assure/reports/analyze) */}
        {showTestingTypeDropdown && (
          <div>
            <label className="text-sm font-medium text-gray-700 block">
              Testing Type
            </label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={testingType}
              onChange={(e) => setTestingType(e.target.value)}
            >
              <option value="">--Select--</option>
              {strategyTestingTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* --- Show NEW Button only if Strategy tab is active --- */}
      {activeTab === "strategy" && (
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded mt-2">
            NEW
          </button>
        </div>
      )}

      {/* --- Main Body Content (based on active tab) --- */}
      <div>{renderTabContent()}</div>
    </div>
  );
}

/* =========================
     REUSABLE TAB BUTTON
   ========================= */
function TabButton({ label, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium border-b-2 ${
        active
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* =========================
    STRATEGY TAB CONTENT
   ========================= */
function StrategyTab() {
  return (
    <div className="bg-white shadow rounded">
      <div className="px-4 py-2 text-md font-semibold border-b flex items-center justify-between">
        <span>Testing</span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Testing Type</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Functional Testing</td>
            <td className="border p-2 text-blue-600">New</td>
            <td className="border p-2">nishataba@piongloab.com</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

/* =========================
   PLACEHOLDER TABS BELOW
   ========================= */
function ManageTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Manage</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Manage tab content.
      </p>
    </div>
  );
}

function AssureTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Assure</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Assure tab content.
      </p>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Reports</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Reports tab content.
      </p>
    </div>
  );
}

function AnalyzeTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Analyze</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Analyze tab content.
      </p>
    </div>
  );
}
