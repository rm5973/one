import React from "react";

function ProjectsTab({
  accounts,
  selectedAccount,
  selectedAccountId,
  setSelectedAccountId,
}) {
  // If no account is selected, handle gracefully
  if (!selectedAccount) {
    return (
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-md font-semibold mb-2">Projects</h3>
        <p className="text-sm text-gray-600">No account selected.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="text-md font-semibold">Projects</h3>
        {/* Account selector for switching accounts dynamically */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Account:</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.accountName}
              </option>
            ))}
          </select>
        </div>
        {/* Example "plus" icon for adding a project */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          +
        </button>
      </div>

      {/* Projects table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Account Name</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Project Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Clone</th>
          </tr>
        </thead>
        <tbody>
          {selectedAccount.projects.map((proj, idx) => (
            <tr key={idx} className="hover:bg-blue-50">
              <td className="border p-2">{selectedAccount.accountName}</td>
              <td className="border p-2">{proj.code}</td>
              <td className="border p-2">{proj.projectName}</td>
              <td className="border p-2 text-blue-600">{proj.status}</td>
              <td className="border p-2 text-center">
                <button className="text-blue-500 hover:text-blue-700">
                  Clone
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 px-4 py-2">
        Created by support@piedap.io on 07 Feb 2024 23:53:37 and updated by
        sunitha@piongobal.com on 06 Mar 2024 17:42:11
      </p>
    </div>
  );
}

export default ProjectsTab;
