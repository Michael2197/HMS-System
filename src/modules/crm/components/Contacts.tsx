import React from "react";

const contactsData = [
  {
    name: "Jacob Jones",
    email: "jacobjones@ex...",
    phone: "(406) 555-0141",
    company: "ABC Inc.",
    status: "Active",
    lastActivity: "Oct. 21, 2023",
  },
  {
    name: "Kelly Williams",
    email: "kelly@abcinc.co",
    phone: "(229) 555-0164",
    company: "Acme Corporation",
    status: "Lead",
    lastActivity: "Oct. 20, 2023",
  },
  {
    name: "Darlene Stewart",
    email: "(220) 555-0144",
    phone: "(229) 555-0128",
    company: "Summit Solutions",
    status: "Active",
    lastActivity: "Oct. 19, 2023",
  },
  {
    name: "Wanda Baker",
    email: "contact@summit",
    phone: "(204) 555-0132",
    company: "Future Group",
    status: "Prospect",
    lastActivity: "Oct. 17, 2023",
  },
  {
    name: "Darrell Roberts",
    email: "sales@gplogistics",
    phone: "(736) 555-0183",
    company: "Pinnacle",
    status: "Active",
    lastActivity: "Oct. 13, 2023",
  },
  {
    name: "Jacob Klein",
    email: "support@centralm",
    phone: "(402) 555-0192",
    company: "SalesNexus",
    status: "Active",
    lastActivity: "Oct. 10, 2023",
  },
  {
    name: "Jane Cooper",
    email: "djohnson@innov",
    phone: "(708) 555-0145",
    company: "Legacy Inc",
    status: "Lead",
    lastActivity: "Oct. 9, 2023",
  },
  {
    name: "Cody Willis",
    email: "info@williamsco.c",
    phone: "(305) 555-0100",
    company: "Legacy inc",
    status: "Orrlent",
    lastActivity: "Oct. 6, 2023",
  },
];

export default function Contacts() {
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
            <h1 className="text-3xl font-bold text-white mb-2">Contacts</h1>
            <p className="text-sm text-neutral-400">
              Manage and track all your CRM contacts
            </p>
          </div>
        </div>

        {/* New Contact Button */}
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-sm font-medium text-white">
          + New Contact
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Company</option>
          <option value="abc">ABC Inc.</option>
          <option value="acme">Acme Corporation</option>
          <option value="summit">Summit Solutions</option>
          <option value="future">Future Group</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="lead">Lead</option>
          <option value="prospect">Prospect</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Owner</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
        <select className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Last Activity</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {contactsData.map((contact, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {contact.name}
                </td>
                <td className="px-4 py-3 text-neutral-300">{contact.email}</td>
                <td className="px-4 py-3 text-neutral-300">{contact.phone}</td>
                <td className="px-4 py-3 text-neutral-300">
                  {contact.company}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contact.status === "Active"
                        ? "bg-green-600 text-white"
                        : contact.status === "Lead"
                        ? "bg-yellow-500 text-white"
                        : contact.status === "Prospect"
                        ? "bg-orange-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {contact.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm text-neutral-500">
        <div className="flex gap-6">
          <span>Total Contacts: 248</span>
          <span>Active: 132</span>
          <span>Leads: 56</span>
          <span>Prospects: 60</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>Oct. 22, 2023</span>
        </div>
      </div>
    </div>
  );
}
