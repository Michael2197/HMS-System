import React from "react";

const companiesData = [
  {
    name: "ABC Inc.",
    domain: "abcinc.com",
    location: "OH",
    industry: "Manufacturing",
    status: "Active",
    lastActivity: "Oct. 20, 2023",
  },
  {
    name: "Acme Corpo,",
    domain: "acme.co",
    location: "CA",
    industry: "Retail",
    status: "Active",
    lastActivity: "Oct. 19, 2023",
  },
  {
    name: "Summit Solutions",
    domain: "mitt.com",
    location: "UT",
    industry: "Technology",
    status: "Lead",
    lastActivity: "Oct. 19, 2023",
  },
  {
    name: "Future Group",
    domain: "futuregroup.io",
    location: "NY",
    industry: "Healthcare",
    status: "Active",
    lastActivity: "Oct. 18, 2023",
  },
  {
    name: "Pinnacle Ltd.",
    domain: "salesnexus.net",
    location: "KS",
    industry: "Software",
    status: "Active",
    lastActivity: "Oct. 18, 2023",
  },
  {
    name: "SalesNexus",
    domain: "legacy.com",
    location: "TN",
    industry: "Construction",
    status: "Lead",
    lastActivity: "Oct. 17, 2023",
  },
  {
    name: "Legacy Inc.",
    domain: "vistaenterprises",
    location: "IL",
    industry: "Aerospace",
    status: "Active",
    lastActivity: "Oct. 17, 2023",
  },
  {
    name: "Vista Enterprises",
    domain: "vistacompany",
    location: "",
    industry: "",
    status: "",
    lastActivity: "Oct. 17, 2023",
  },
];

export default function Companies() {
  return (
    <div className="text-white p-6">
      {/* Header with Search */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Companies</h1>
            <p className="text-sm text-neutral-400">
              Manage and track all your CRM companies
            </p>
          </div>
        </div>

        {/* New Company Button */}
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-sm font-medium text-white">
          + New Company
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Industry</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="retail">Retail</option>
          <option value="technology">Technology</option>
          <option value="healthcare">Healthcare</option>
          <option value="software">Software</option>
          <option value="construction">Construction</option>
          <option value="aerospace">Aerospace</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Location</option>
          <option value="oh">OH</option>
          <option value="ca">CA</option>
          <option value="ut">UT</option>
          <option value="ny">NY</option>
          <option value="ks">KS</option>
          <option value="tn">TN</option>
          <option value="il">IL</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Owner</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="lead">Lead</option>
          <option value="prospect">Prospect</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Domain</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {companiesData.map((company, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {company.name}
                </td>
                <td className="px-4 py-3 text-neutral-300">{company.domain}</td>
                <td className="px-4 py-3 text-neutral-300">
                  {company.location}
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {company.industry}
                </td>
                <td className="px-4 py-3">
                  {company.status ? (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        company.status === "Active"
                          ? "bg-green-600 text-white"
                          : company.status === "Lead"
                          ? "bg-yellow-500 text-white"
                          : "bg-orange-600 text-white"
                      }`}
                    >
                      {company.status}
                    </span>
                  ) : (
                    <span className="text-neutral-500">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {company.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm text-neutral-500">
        <div className="flex gap-6">
          <span>Total Companies: 248</span>
          <span>Active: 205</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-white text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-white text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Export PDF
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>Oct. 22, 2023</span>
        </div>
      </div>
    </div>
  );
}
