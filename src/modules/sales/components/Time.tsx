import React from "react";

const timeData = [
  {
    date: "Oct: 41",
    startTime: "09:00 AM",
    endTime: "11:15 AM",
    description: "Client meeting",
    project: "Bluations",
    status: "Approved",
  },
  {
    date: "Oct: 22",
    startTime: "07:60 PM",
    endTime: "03:54 PM",
    description: "Sales-calls",
    project: "OF kespiees",
    status: "Logged",
  },
  {
    date: "Oct: 19",
    startTime: "10:00 AM",
    endTime: "01:80 PM",
    description: "Product-demo",
    project: "Tech Solutions",
    status: "Approved",
  },
  {
    date: "Oct: 17",
    startTime: "02:00 AM",
    endTime: "11:00 AM",
    description: "Follow up calls",
    project: "Summit Ems",
    status: "Logged",
  },
  {
    date: "Oct: 15",
    startTime: "07:00 PM",
    endTime: "09:50 PM",
    description: "Lead generation",
    project: "Intstand leads",
    status: "Approved",
  },
  {
    date: "Oct: 10",
    startTime: "03:19 PM",
    endTime: "11:30 AM",
    description: "Research",
    project: "Tech Solutions",
    status: "Pending",
  },
  {
    date: "Oct: 0",
    startTime: "03:16 PM",
    endTime: "04:00 PM",
    description: "Proposal prep",
    project: "Bluations",
    status: "Approved",
  },
  {
    date: "Oct: 0",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    description: "Proposal prep",
    project: "Summit Ems",
    status: "Logged",
  },
];

export default function Time() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Time</h1>
          <p className="text-sm text-neutral-400">
            Track and manage at logged hours for sales activities
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm font-medium">
          + Log Time
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Date Range</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Range</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Project</option>
          <option value="bluations">Bluations</option>
          <option value="tech-solutions">Tech Solutions</option>
          <option value="summit-ems">Summit Ems</option>
          <option value="of-kespiees">OF kespiees</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">User: T</option>
          <option value="all">All Users</option>
          <option value="current">Current User</option>
          <option value="team">Team</option>
        </select>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search time entries..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {timeData.map((entry, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium">{entry.date}</td>
                <td className="px-4 py-3 text-neutral-300">
                  {entry.startTime}
                </td>
                <td className="px-4 py-3 text-neutral-300">{entry.endTime}</td>
                <td className="px-4 py-3 text-neutral-300">
                  {entry.description}
                </td>
                <td className="px-4 py-3 text-neutral-300">{entry.project}</td>
                <td className="px-4 py-3 text-neutral-300">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-neutral-500">Oct: 22. 2022</div>
    </div>
  );
}
