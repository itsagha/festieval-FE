"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardDoughnutProps {
  activeEvent: number;
  draftEvent: number;
  totalTransaction: number;
  ticketSold: number;
  totalSales: number;
  totalVisitor: number;
}

export default function DashboardDoughnutChart({
  activeEvent,
  draftEvent,
  totalTransaction,
  ticketSold,
  totalSales,
  totalVisitor,
}: DashboardDoughnutProps) {
  const data = {
    labels: [
      "Event Aktif",
      "Event Draft",
      "Total Transaksi",
      "Tiket Terjual",
      "Total Penjualan",
      "Total Pengunjung",
    ],
    datasets: [
      {
        data: [
          activeEvent,
          draftEvent,
          totalTransaction,
          ticketSold,
          totalSales,
          totalVisitor,
        ],
        backgroundColor: [
          "#22c55e", // green
          "#f59e0b", // amber
          "#3b82f6", // blue
          "#a855f7", // purple
          "#ef4444", // red
          "#14b8a6", // teal
        ],
        borderWidth: 2,
        borderColor: "#171410",
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#e5e7eb",
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="bg-walnut border border-primary rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-4">Ringkasan Event</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
}
