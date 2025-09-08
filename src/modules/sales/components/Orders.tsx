import React from "react";

const ordersData = [
  {
    order: "#1001",
    customer: "Bluestipe Inc",
    amount: "$19,500",
    date: "Oct. 22, 2023",
  },
  {
    order: "#1002",
    customer: "Tech Solutions",
    amount: "$5,300",
    date: "Oct. 19, 2023",
  },
  {
    order: "#1003",
    customer: "Summit Enterps",
    amount: "$16,550",
    date: "Oct. 17, 2023",
  },
  {
    order: "#1004",
    customer: "GP Logistics",
    amount: "$12,000",
    date: "Oct. 16, 2023",
  },
  {
    order: "#1005",
    customer: "InnovCorp",
    amount: "$7,900",
    date: "Oct. 12, 2023",
  },
  {
    order: "#1006",
    customer: "Central Manufac.",
    amount: "$9,200",
    date: "Oct. 9, 2023",
  },
  {
    order: "#1007",
    customer: "InnovCorp",
    amount: "$7,300",
    date: "Oct. 8, 2023",
  },
  {
    order: "#1008",
    customer: "Williams & Co",
    amount: "$4,600",
    date: "Oct. 8, 2023",
  },
  {
    order: "#1009",
    customer: "Future Innovations",
    amount: "$3,200",
    date: "Oct. 4, 2023",
  },
];

export default function Orders() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-sm text-neutral-400">Recent customer orders</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm font-medium">
          + New Order
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-sm">
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, index) => (
              <tr
                key={index}
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-indigo-400">
                  {order.order}
                </td>
                <td className="px-4 py-3 text-neutral-300">{order.customer}</td>
                <td className="px-4 py-3 text-neutral-300">{order.amount}</td>
                <td className="px-4 py-3 text-neutral-300">{order.date}</td>
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
