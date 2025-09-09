import React from "react";

const dealsData = [
  {
    title: "Website Redesign",
    company: "Future Group",
    value: "$69,000",
    status: "Active",
    stage: "New",
    owner: "John Carter",
    closeDate: "Oct. 21, 2023",
  },
  {
    title: "Sales Software",
    company: "SalesNexus",
    value: "$46,000",
    status: "Lead",
    stage: "New",
    owner: "John Carter",
    closeDate: "Oct. 20, 2023",
  },
  {
    title: "IT Services",
    company: "Summit Solu.",
    value: "$45,000",
    status: "Active",
    stage: "Qualified",
    owner: "John Carter",
    closeDate: "Oct. 19, 2023",
  },
  {
    title: "Cloud Migration",
    company: "Pinnacle Ltd.",
    value: "$69,000",
    status: "Lead",
    stage: "Qualified",
    owner: "John Carter",
    closeDate: "Oct. 18, 2023",
  },
  {
    title: "Mobile App",
    company: "ABC Inc.",
    value: "$69,000",
    status: "Proposal",
    stage: "Proposal",
    owner: "John Carter",
    closeDate: "Nov. 1, 2023",
  },
  {
    title: "Marketing Services",
    company: "Legacy Inc.",
    value: "$24,000",
    status: "Active",
    stage: "New",
    owner: "John Carter",
    closeDate: "Nov. 7, 2023",
  },
  {
    title: "CRM Implementation",
    company: "Acme Corpor.",
    value: "$69,000",
    status: "Lead",
    stage: "Proposal",
    owner: "John Carter",
    closeDate: "Nov. 14, 2023",
  },
  {
    title: "Product Development",
    company: "Vista Enterpr",
    value: "$69,000",
    status: "Proposal",
    stage: "Proposal",
    owner: "John Carter",
    closeDate: "Oct. 11, 2023",
  },
];

export default function Deals() {
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
                placeholder="Search by title, company, or owner..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Deals</h1>
            <p className="text-sm text-neutral-400">
              Manage and track all your CRM deals
            </p>
          </div>
        </div>

        {/* New Deal Button */}
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-sm font-medium text-white">
          + New Deal
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Company</option>
          <option value="future">Future Group</option>
          <option value="salesnexus">SalesNexus</option>
          <option value="summit">Summit Solu.</option>
          <option value="pinnacle">Pinnacle Ltd.</option>
          <option value="abc">ABC Inc.</option>
          <option value="legacy">Legacy Inc.</option>
          <option value="acme">Acme Corpor.</option>
          <option value="vista">Vista Enterpr</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="lead">Lead</option>
          <option value="proposal">Proposal</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Stage</option>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Owner</option>
          <option value="john">John Carter</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Close Date</option>
          <option value="oct">October 2023</option>
          <option value="nov">November 2023</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Stage</th>
              <th className="px-4 py-2 text-left">Owner</th>
              <th className="px-4 py-2 text-left">Close Date</th>
            </tr>
          </thead>
          <tbody>
            {dealsData.map((deal, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {deal.title}
                </td>
                <td className="px-4 py-3 text-neutral-300">{deal.company}</td>
                <td className="px-4 py-3 text-neutral-300 font-semibold">
                  {deal.value}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deal.status === "Active"
                        ? "bg-green-600 text-white"
                        : deal.status === "Lead"
                        ? "bg-yellow-500 text-white"
                        : deal.status === "Proposal"
                        ? "bg-teal-600 text-white"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    {deal.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-300">{deal.stage}</td>
                <td className="px-4 py-3 text-neutral-300">{deal.owner}</td>
                <td className="px-4 py-3 text-neutral-300">{deal.closeDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm text-neutral-500">
        <div className="flex gap-6">
          <span>Total Deals: 8</span>
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
          <span>Oct 22, 2023</span>
        </div>
      </div>
    </div>
  );
}
