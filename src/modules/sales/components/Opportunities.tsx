import React from "react";

const opportunitiesData = [
  {
    name: "Bluepointe Inc",
    status: "Qualified",
    value: "$22,300",
    created: "Oct. 16, 2023",
  },
  {
    name: "Tech Solutions",
    status: "Contacted",
    value: "Cold Call",
    created: "Sep. 27, 2023",
  },
  {
    name: "Tech Logistics",
    status: "Pending",
    value: "Website",
    created: "Oct. 16, 2023",
  },
  {
    name: "InnovCorp",
    status: "Qualified",
    value: "Sep. 7, 2023",
    created: "Sep. 7, 2023",
  },
  {
    name: "Future Innovations",
    status: "Qualified",
    value: "Advertising",
    created: "Mar. 31, 2023",
  },
  {
    name: "Nova Corporation",
    status: "Lost",
    value: "$18,700",
    created: "Apr. 6, 2023",
  },
  {
    name: "Keystone Enterprises",
    status: "Contacted",
    value: "$11,200",
    created: "Jul. 18, 2023",
  },
  {
    name: "Peterson & Sons",
    status: "Pending",
    value: "Oct. 7, 2023",
    created: "Oct. 7, 2023",
  },
];

export default function Opportunities() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-sm text-neutral-400">All deals in progress</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm font-medium">
          + New Opportunity
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search opportunities..."
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
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Created ↑</th>
            </tr>
          </thead>
          <tbody>
            {opportunitiesData.map((opportunity, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium">{opportunity.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      opportunity.status === "Lost"
                        ? "bg-red-600 text-white"
                        : "bg-purple-600 text-white"
                    }`}
                  >
                    {opportunity.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {opportunity.value}
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {opportunity.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-neutral-500">
        Total in pipeline: Oct. 31, 2023
      </div>
    </div>
  );
}
