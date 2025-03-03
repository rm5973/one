// OrganizationSetup.jsx
import React, { useState } from "react";

export default function OrganizationSetup() {
  const [activeSetupTab, setActiveSetupTab] = useState("businessProfile");

  // Switch the displayed content based on the active sub-tab
  const renderSetupContent = () => {
    switch (activeSetupTab) {
      case "businessProfile":
        return <BusinessProfile />;
      case "orgTeam":
        return <OrgTeam />;
      case "licenseDetails":
        return <LicenseDetails />;
      case "address":
        return <Address />;
      default:
        return <BusinessProfile />;
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-md font-semibold mb-2">Organization Info</h3>
      {/* Top "Organization Info" summary row (like your screenshot) */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <p>
          <strong>License Type:</strong> ENTERPRISE
        </p>
        <p>
          <strong>Geo Name:</strong> Asia
        </p>
        <p>
          <strong>Country:</strong> India
        </p>
        <p>
          <strong>Contact Number:</strong> 91-9900350123
        </p>
        <p>
          <strong>Email:</strong> support@piedap.io
        </p>
        <p>
          <strong>Description:</strong> Pion Global Organization
        </p>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        Created by support@piedap.io on 07 Feb 2024 23:53:37 and updated by
        sunitha@piongobal.com on 06 Mar 2024 17:42:11
      </p>

      {/* Tabs: Business Profile, Org Team, License Details, Address */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-3 text-sm font-medium border-b-2 ${
              activeSetupTab === "businessProfile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveSetupTab("businessProfile")}
          >
            Business Profile
          </button>
          <button
            className={`py-2 px-3 text-sm font-medium border-b-2 ${
              activeSetupTab === "orgTeam"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveSetupTab("orgTeam")}
          >
            Org Team
          </button>
          <button
            className={`py-2 px-3 text-sm font-medium border-b-2 ${
              activeSetupTab === "licenseDetails"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveSetupTab("licenseDetails")}
          >
            License Details
          </button>
          <button
            className={`py-2 px-3 text-sm font-medium border-b-2 ${
              activeSetupTab === "address"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveSetupTab("address")}
          >
            Address
          </button>
        </nav>
      </div>

      {/* Render sub-tab content */}
      <div className="mt-4">{renderSetupContent()}</div>
    </div>
  );
}

/* ---------- Sub-Components for Each Tab ---------- */
function BusinessProfile() {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Business Profile</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>
          <strong>Company Name:</strong> Pion Global Pvt Ltd
        </p>
        <p>
          <strong>Industry:</strong> IT
        </p>
        <p>
          <strong>Company Type:</strong> Private
        </p>
        <p>
          <strong>Products & Solutions:</strong> PIEDAP - Pion Intelligence
          Enterprise Digital Assurance Platform
        </p>
        <p>
          <strong>Website:</strong> pionglobal.com
        </p>
        <p>
          <strong>Team Size:</strong> 50
        </p>
        <p>
          <strong>Services:</strong> Consulting, QA Automation
        </p>
        <p>
          <strong>Logo:</strong> <span className="text-blue-500">[Pion]</span>
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Created by bebin@piongobal.com on 06 May 2024 08:37:50 and updated by
        omprakash@piongobal.com on 10 May 2024 18:42:15
      </p>
    </div>
  );
}

function OrgTeam() {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Org Team</h4>
      <p className="text-sm">[Display or manage organization team details]</p>
    </div>
  );
}

function LicenseDetails() {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">License Details</h4>
      <p className="text-sm">[Display or manage license information]</p>
    </div>
  );
}

function Address() {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Address</h4>
      <p className="text-sm">[Display or manage address details]</p>
    </div>
  );
}
