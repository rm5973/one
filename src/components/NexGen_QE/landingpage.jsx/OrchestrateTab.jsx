import React, { useState } from "react";
import { FaTrash, FaFileAlt } from "react-icons/fa";

export default function OrchestratorTab() {
  // Dropdown states
  const [productName, setProductName] = useState("Project360");
  const [moduleName, setModuleName] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [milestone, setMilestone] = useState("");
  const [testingType, setTestingType] = useState("");

  // Sub-navigation within Orchestrator
  const [activeOrchTab, setActiveOrchTab] = useState("testData");

  // Sample data for "Test Data" table
  const testDataRows = [
    {
      id: 1,
      tableName: "TD_create_Backlog_and_assign_to_RCTM",
      dataFile: "", // Could be a file link or icon
      comment: "Test Data Created along with Test Case Recording",
    },
    {
      id: 2,
      tableName: "TD_create_Backlog_and_assign_to_RCTM_FV",
      dataFile: "",
      comment: "Test Data Created along with Test Case Recording",
    },
    {
      id: 3,
      tableName: "TD_create_Task_and_create_Sub_Task",
      dataFile: "",
      comment: "Test Data Created along with Test Case Recording",
    },
    {
      id: 4,
      tableName: "TD_DummyTestcase",
      dataFile: "",
      comment: "Test Data Created along with Test Case Recording",
    },
    {
      id: 5,
      tableName: "TD_NEW01",
      dataFile: "",
      comment: "Test Data Created along with Test Case Recording",
    },
  ];

  // Handle sub-tab clicks
  const handleOrchTabClick = (tab) => {
    setActiveOrchTab(tab);
  };

  // Render sub-tab content
  const renderOrchTabContent = () => {
    switch (activeOrchTab) {
      case "backlogs":
        return <BacklogsTab />;
      case "features":
        return <FeaturesTab />;
      case "useCases":
        return <UseCasesTab />;
      case "testSuites":
        return <TestSuitesTab />;
      case "process":
        return <ProcessTab />;
      case "testData":
      default:
        return (
          <TestDataTab
            testDataRows={testDataRows}
          />
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* --------- TOP ROW of DROPDOWNS --------- */}
      

      {/* --------- SUB-NAV TABS for Orchestrator --------- */}
      <div className="flex space-x-2 border-b border-gray-300 pb-1">
        <OrchTabButton
          label="Backlogs"
          active={activeOrchTab === "backlogs"}
          onClick={() => handleOrchTabClick("backlogs")}
        />
        <OrchTabButton
          label="Features"
          active={activeOrchTab === "features"}
          onClick={() => handleOrchTabClick("features")}
        />
        <OrchTabButton
          label="Use Cases"
          active={activeOrchTab === "useCases"}
          onClick={() => handleOrchTabClick("useCases")}
        />
        <OrchTabButton
          label="Test Suites"
          active={activeOrchTab === "testSuites"}
          onClick={() => handleOrchTabClick("testSuites")}
        />
        <OrchTabButton
          label="Process"
          active={activeOrchTab === "process"}
          onClick={() => handleOrchTabClick("process")}
        />
        <OrchTabButton
          label="Test Data"
          active={activeOrchTab === "testData"}
          onClick={() => handleOrchTabClick("testData")}
        />
      </div>

      {/* --------- MAIN CONTENT for the active sub-tab --------- */}
      <div>{renderOrchTabContent()}</div>
    </div>
  );
}

/* ===========================================================
   SUB-TAB BUTTON COMPONENT
   =========================================================== */
function OrchTabButton({ label, active, onClick }) {
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

/* ===========================================================
   TEST DATA TAB COMPONENT
   =========================================================== */
function TestDataTab({ testDataRows }) {
  return (
    <div className="bg-white shadow rounded">
      <div className="px-4 py-2 text-md font-semibold border-b flex items-center justify-between">
        <span>Test Data</span>
        {/* Example: an "add" button if needed */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          +
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Test Data table Name</th>
            <th className="border p-2">Data File</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {testDataRows.map((row) => (
            <tr key={row.id} className="hover:bg-blue-50">
              <td className="border p-2">{row.tableName}</td>
              <td className="border p-2">
                {/* If you have a file or link, render it. For now, a placeholder icon. */}
                <FaFileAlt className="text-gray-600 inline-block mr-1" />
              </td>
              <td className="border p-2">
                <button className="text-red-500 hover:text-red-700 mr-2">
                  <FaTrash />
                </button>
              </td>
              <td className="border p-2">{row.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bottom button row */}
      <div className="px-4 py-2 border-t flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          View Data
        </button>
      </div>
    </div>
  );
}

/* ===========================================================
   PLACEHOLDER COMPONENTS FOR OTHER SUB-TABS
   =========================================================== */
function BacklogsTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Backlogs</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Backlogs tab content.
      </p>
    </div>
  );
}

function FeaturesTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Features</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Features tab content.
      </p>
    </div>
  );
}

function UseCasesTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Use Cases</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Use Cases tab content.
      </p>
    </div>
  );
}

function TestSuitesTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Test Suites</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Test Suites tab content.
      </p>
    </div>
  );
}

function ProcessTab() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-semibold">Process</h2>
      <p className="text-sm text-gray-600 mt-2">
        Placeholder for Process tab content.
      </p>
    </div>
  );
}
