import React from "react";

const activitiesData = [
  {
    title: "Call with CEO",
    type: "Call",
    dueDate: "Oct 24, 2028",
    company: "Finlare Group",
    owner: "John Carter",
    status: "Scheefled",
  },
  {
    title: "Follow up",
    type: "Task",
    dueDate: "Oct 22, 2029",
    company: "PhenadeLad",
    owner: "John Carter",
    status: "Orrerties",
  },
  {
    title: "Meeting with Muc",
    type: "Meeting",
    dueDate: "Oct 24, 2021",
    company: "Sakeshmais",
    owner: "John Carter",
    status: "Donts",
  },
  {
    title: "Product Demo",
    type: "Meeting",
    dueDate: "Oct 18, 2022",
    company: "Sument sonic",
    owner: "John Carter",
    status: "Scleladed",
  },
  {
    title: "Follow up netal",
    type: "Task",
    dueDate: "Oct 15, 2028",
    company: "Lggerythc",
    owner: "John Carter",
    status: "Dome",
  },
  {
    title: "Call with CEO",
    type: "Call",
    dueDate: "Oct 13, 2026",
    company: "APS Inc",
    owner: "John Carter",
    status: "Scheertiot",
  },
  {
    title: "Presentation",
    type: "Meeting",
    dueDate: "Oct 19, 2023",
    company: "Reme Corpes",
    owner: "John Carter",
    status: "Done",
  },
  {
    title: "Sched..le Demo",
    type: "Task",
    dueDate: "Oct-5, 2023",
    company: "Vista Errarries",
    owner: "John Carter",
    status: "Scheefind",
  },
];

export default function Activities() {
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
            <h1 className="text-3xl font-bold text-white mb-2">Activities</h1>
            <p className="text-sm text-neutral-400">
              Manage cearroard all your GRM activities
            </p>
          </div>
        </div>

        {/* New Activity Button */}
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-sm font-medium text-white">
          + New Activiity
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Type</option>
          <option value="call">Call</option>
          <option value="task">Task</option>
          <option value="meeting">Meeting</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Company</option>
          <option value="finlare">Finlare Group</option>
          <option value="phenadelad">PhenadeLad</option>
          <option value="sakeshmais">Sakeshmais</option>
          <option value="sument">Sument sonic</option>
          <option value="lggerythc">Lggerythc</option>
          <option value="aps">APS Inc</option>
          <option value="reme">Reme Corpes</option>
          <option value="vista">Vista Errarries</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Duc Data</option>
          <option value="today">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Status</option>
          <option value="scheefled">Scheefled</option>
          <option value="orrerties">Orrerties</option>
          <option value="donts">Donts</option>
          <option value="scleladed">Scleladed</option>
          <option value="dome">Dome</option>
          <option value="scheertiot">Scheertiot</option>
          <option value="done">Done</option>
          <option value="scheefind">Scheefind</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Owner</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {activitiesData.map((activity, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {activity.title}
                </td>
                <td className="px-4 py-3 text-neutral-300">{activity.type}</td>
                <td className="px-4 py-3 text-neutral-300">
                  {activity.dueDate}
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {activity.company}
                </td>
                <td className="px-4 py-3 text-neutral-300">{activity.owner}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === "Scheefled"
                        ? "bg-blue-600 text-white"
                        : activity.status === "Orrerties"
                        ? "bg-purple-600 text-white"
                        : activity.status === "Donts" ||
                          activity.status === "Done"
                        ? "bg-indigo-600 text-white"
                        : "bg-sky-600 text-white"
                    }`}
                  >
                    {activity.status}
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
          <span>Total Activities Jad</span>
          <span>Overs les</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Report Gtw</span>
          <span>Oct 29, 2022</span>
        </div>
      </div>
    </div>
  );
}
