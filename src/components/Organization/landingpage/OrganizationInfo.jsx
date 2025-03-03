import React from "react";

function OrganizationInfo() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-md font-semibold mb-2">Organization Info</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
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
    </div>
  );
}

export default OrganizationInfo;
