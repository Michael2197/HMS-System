import React from "react";

const accountsData = [
  {
    name: "Elt.opeama me",
    email: "miamlh@kiku..",
    phone: "(889) 363-0141",
    location: "MT",
    industry: "Technology",
    status: "Active",
  },
  {
    name: "Tenk Solutions",
    email: "Info@mecRollu.",
    phone: "(869) 363-0167",
    location: "CA",
    industry: "Technology",
    status: "Active",
  },
  {
    name: "Sunnxal Inter:",
    email: "contact@samn:i",
    phone: "(884) 363-0103",
    location: "AL.",
    industry: "Manufacturing",
    status: "On Hold",
  },
  {
    name: "GP Logistce",
    email: "anaxerjaRiques:",
    phone: "(788) 366-0103",
    location: "FL",
    industry: "Logistics",
    status: "Active",
  },
  {
    name: "Centrol Infg",
    email: "support@semali",
    phone: "(449) 363-0103",
    location: "NE",
    industry: "Manufacturing",
    status: "Prospect",
  },
  {
    name: "InnovCorp",
    email: "ajachmor@inns:",
    phone: "(788) 262-0145",
    location: "H",
    industry: "Technology",
    status: "Active",
  },
  {
    name: "Willitana & Co.",
    email: "Info@williemao:",
    phone: "(869) 266-0100",
    location: "TK",
    industry: "Legal Services",
    status: "Pending",
  },
  {
    name: "Future Insone",
    email: "Indic@liatetesa:",
    phone: "(865) 363-0141",
    location: "NJ",
    industry: "Technology",
    status: "Prospect",
  },
];

export default function Accounts() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-sm text-neutral-400">
            Managed trash all active customer accounts.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm font-medium">
          + New Account
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Industry</option>
          <option value="technology">Technology</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="logistics">Logistics</option>
          <option value="legal">Legal Services</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Region</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Account Status</option>
          <option value="active">Active</option>
          <option value="prospect">Prospect</option>
          <option value="onhold">On Hold</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search accounts..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {accountsData.map((account, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium">{account.name}</td>
                <td className="px-4 py-3 text-neutral-300">{account.email}</td>
                <td className="px-4 py-3 text-neutral-300">{account.phone}</td>
                <td className="px-4 py-3 text-neutral-300">
                  {account.location}
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {account.industry}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      account.status === "Active"
                        ? "bg-blue-600 text-white"
                        : account.status === "Prospect" ||
                          account.status === "Pending"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {account.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm text-neutral-500">
        <div className="flex gap-6">
          <span>Total Accounts: 9</span>
          <span>Active Accounts: 5</span>
          <span>Prospects: 7</span>
          <span>On Hold: 1</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>Oct 22, 2023</span>
        </div>
      </div>
    </div>
  );
}
