import React, { useState } from "react";
import AccountsTab from "./AccountsTable";    // or your final Accounts component
import ProjectsTab from "./ProjectsTable";   // or your final Projects component
import OrganizationSetup from "./OrganizationSetup";

/** SAMPLE DATA:
 *  Each organization has:
 *    - orgId
 *    - orgName
 *    - licenseType, geoName, country, contactNumber, email, description
 *    - accounts[] (each with its own projects[] and teamMembers[])
 */
const organizationsData = [
  {
    orgId: "org1",
    orgName: "Pion Global",
    licenseType: "ENTERPRISE",
    geoName: "Asia",
    country: "India",
    contactNumber: "91-9900350123",
    email: "support@piedap.io",
    description: "Pion Global Organization",
    accounts: [
      {
        id: "acc1",
        accountName: "PIEDAP-Development",
        description: "Piedap Platform Development and Maintenance",
        createdBy: "behin@piongobal.com",
        updatedBy: "arhu.sivani@piongobal.com",
        teamMembers: [
          { name: "Alice", email: "alice@piongobal.com", role: "Developer" },
          { name: "Bob", email: "bob@piongobal.com", role: "Manager" },
        ],
        projects: [
          {
            code: "PP01",
            projectName: "PIEDAP Development",
            status: "Initiated",
          },
        ],
      },
      // ... other accounts if needed
    ],
  },
  {
    orgId: "org2",
    orgName: "Growth",
    licenseType: "PROFESSIONAL",
    geoName: "Europe",
    country: "Germany",
    contactNumber: "49-123456789",
    email: "support@growth.io",
    description: "Growth Organization",
    accounts: [
      {
        id: "acc3",
        accountName: "Growth-Main",
        description: "Main account for Growth projects",
        createdBy: "anna@growth.io",
        updatedBy: "tom@growth.io",
        teamMembers: [
          { name: "David", email: "david@growth.io", role: "Engineer" },
        ],
        projects: [
          {
            code: "GR01",
            projectName: "Growth Landing Page",
            status: "Completed",
          },
          {
            code: "GR02",
            projectName: "Growth Mobile App",
            status: "In Progress",
          },
        ],
      },
    ],
  },
];

export default function Landingpage() {
  // Which organization is selected from the dropdown
  const [selectedOrgId, setSelectedOrgId] = useState("org1");

  // Bottom tabs: "accounts" or "projects"
  const [activeTab, setActiveTab] = useState("accounts");

  // Which account is selected
  const [selectedAccountId, setSelectedAccountId] = useState("acc1");

  // Top row: "organization" vs. "setup"
  const [activetopTab, setActivetopTab] = useState("organization");

  // Find the selected org object
  const selectedOrg = organizationsData.find((o) => o.orgId === selectedOrgId);
  if (!selectedOrg) return <div className="p-4">Organization not found.</div>;

  // Org accounts
  const orgAccounts = selectedOrg.accounts || [];
  // Selected account object
  const selectedAccount = orgAccounts.find((acc) => acc.id === selectedAccountId);

  // If no account is found, fallback
  if (!selectedAccount && orgAccounts.length > 0) {
    setSelectedAccountId(orgAccounts[0].id);
  }

  // Handle org change
  const handleOrgChange = (e) => {
    const newOrgId = e.target.value;
    setSelectedOrgId(newOrgId);

    // Reset the selected account
    const newOrg = organizationsData.find((o) => o.orgId === newOrgId);
    if (newOrg && newOrg.accounts.length > 0) {
      setSelectedAccountId(newOrg.accounts[0].id);
    } else {
      setSelectedAccountId("");
    }
  };

  return (
    <div className="p-4">
      {/* ---------- Top row with dropdown + 2 clickable "tabs" ---------- */}
      <div className="flex items-center space-x-0">
        {/* Left: Organization dropdown */}
        <div
          className={`px-2 py-1 rounded cursor-pointer transition-all duration-300 ${
            activetopTab === "organization" ? "bg-blue-500" : "bg-white"
          }`}
          onClick={() => setActivetopTab("organization")}
        >
          <div className="relative border border-gray-300 rounded px-2 pt-3 pb-1 bg-white">
            <label
              htmlFor="organization"
              className="absolute -top-2 left-2 px-1 text-xs font-medium bg-white text-gray-700"
            >
              Organization:<span className="text-red-500">*</span>
            </label>
            <select
              id="organization"
              className="w-full border-none outline-none bg-transparent text-sm px-1 py-1 cursor-pointer"
              value={selectedOrgId}
              onChange={handleOrgChange}
            >
              {organizationsData.map((org) => (
                <option key={org.orgId} value={org.orgId}>
                  {org.orgName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Organization Setup title */}
        <div
          className={`px-2 py-1 rounded cursor-pointer transition-all duration-300 ${
            activetopTab === "setup" ? "bg-blue-500" : "bg-white"
          }`}
          onClick={() => setActivetopTab("setup")}
        >
          <h2
            className={`text-xl font-semibold px-3 py-2 rounded cursor-pointer transition-all duration-300 flex items-center`}
          >
            Organization Setup
          </h2>
        </div>
      </div>

      {/* ---------- Conditional Rendering: If "organization" => show Accounts/Projects, else => <OrganizationSetup /> ---------- */}
      {activetopTab === "organization" && (
        <>
          {/* Organization Info box */}
          <div className="bg-white shadow rounded p-4 mt-4">
            <h3 className="text-md font-semibold mb-2">Organization Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>License Type:</strong> {selectedOrg.licenseType}
              </p>
              <p>
                <strong>Geo Name:</strong> {selectedOrg.geoName}
              </p>
              <p>
                <strong>Country:</strong> {selectedOrg.country}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedOrg.contactNumber}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrg.email}
              </p>
              <p>
                <strong>Description:</strong> {selectedOrg.description}
              </p>
            </div>
          </div>

          {/* Tabs for Accounts / Projects */}
          <div className="mt-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`py-2 px-3 text-sm font-medium border-b-2 ${
                    activeTab === "accounts"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("accounts")}
                >
                  Accounts
                </button>
                <button
                  className={`py-2 px-3 text-sm font-medium border-b-2 ${
                    activeTab === "projects"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </button>
              </nav>
            </div>

            <div className="mt-4">
              {activeTab === "accounts" && (
                <AccountsTab
                  accounts={orgAccounts}
                  selectedAccountId={selectedAccountId}
                  setSelectedAccountId={setSelectedAccountId}
                />
              )}
              {activeTab === "projects" && (
                <ProjectsTab
                  accounts={orgAccounts}
                  selectedAccount={selectedAccount}
                  selectedAccountId={selectedAccountId}
                  setSelectedAccountId={setSelectedAccountId}
                />
              )}
            </div>
          </div>
        </>
      )}

      {activetopTab === "setup" && (
        <div className="mt-4">
          <OrganizationSetup />
        </div>
      )}
    </div>
  );
}
