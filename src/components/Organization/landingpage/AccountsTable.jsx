import React from "react";

function AccountsTab({ accounts, selectedAccountId, setSelectedAccountId }) {
  // The user wants to show team members for the selected account
  // so let's find that account
  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  return (
    <div className="bg-white shadow rounded">
      <div className="px-4 py-2 text-md font-semibold border-b">Accounts</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Account Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Created By</th>
            <th className="border p-2">Updated By</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr
              key={acc.id}
              className={`cursor-pointer ${
                acc.id === selectedAccountId ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedAccountId(acc.id)}
            >
              <td className="border p-2">{acc.accountName}</td>
              <td className="border p-2">{acc.description}</td>
              <td className="border p-2">{acc.createdBy}</td>
              <td className="border p-2">{acc.updatedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 px-4 py-2">
        Created by support@piedap.io on 07 Feb 2024 23:53:37 and updated by
        sunitha@piongobal.com on 06 Mar 2024 17:42:11
      </p>

      {/* Account Team Members section */}
      <div className="px-4 py-2 text-sm font-semibold bg-gray-50 border-t">
        Account Team Members
      </div>
      {selectedAccount && selectedAccount.teamMembers && (
        <div className="px-4 py-2 text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {selectedAccount.teamMembers.map((member, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{member.name}</td>
                  <td className="border p-2">{member.email}</td>
                  <td className="border p-2">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AccountsTab;
