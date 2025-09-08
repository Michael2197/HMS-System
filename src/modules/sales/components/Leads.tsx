import React from "react";

const leadsData = [
  {
    name: "Davidson & Co.",
    status: "Qualified",
    source: "Website",
    created: "Oct. 16, 2023",
  },
  {
    name: "Express Innovations",
    status: "Qualified",
    source: "Cold Call",
    created: "Oct. 16, 2023",
  },
  {
    name: "Evergreen",
    status: "Qualified",
    source: "Advertising",
    created: "Oct. 16, 2023",
  },
  {
    name: "Continental",
    status: "Qualified",
    source: "Advertising",
    created: "Oct. 16, 2023",
  },
  {
    name: "Precision Manufacturing",
    status: "Contacted",
    source: "Website",
    created: "Oct. 16, 2023",
  },
  {
    name: "Modular Solutions",
    status: "New",
    source: "Website",
    created: "Oct. 16, 2023",
  },
  {
    name: "Delta Inc.",
    status: "New",
    source: "Website",
    created: "Oct. 16, 2023",
  },
];

export default function Leads() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-sm text-neutral-400">All open and active leads</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm font-medium">
          + New Lead
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3 text-neutral-300">{lead.status}</td>
                <td className="px-4 py-3 text-neutral-300">{lead.source}</td>
                <td className="px-4 py-3 text-neutral-300">{lead.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-neutral-500">Date: Oct. 16, 2023</div>
    </div>
  );
}
