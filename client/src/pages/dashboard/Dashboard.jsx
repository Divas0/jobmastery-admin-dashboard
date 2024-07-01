import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { User } from "lucide-react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const id = useSelector((state) => state.auth.currentUser.authorId);

  const { data: userData } = useQuery({
    queryKey: "singleUserData",
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/user/singleuserdata/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log(userData);

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "blogs",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Green", "Purple", "Orange"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ["#4CAF50", "#9C27B0", "#FF9800"],
        hoverBackgroundColor: ["#4CAF50", "#9C27B0", "#FF9800"],
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <div>
          <h1 className="flex gap-[5px] font-semibold text-gray-900">
            {" "}
            <span>
              {" "}
              <User />
            </span>{" "}
            {userData?.user?.name}
          </h1>
        </div>
      </div>

      {/* Four cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb- text-white ">
        <div className="bg-violet-900 p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total employee</h2>
          <p className="text-3xl font-bold">134</p>
        </div>
        <div className=" p-5 rounded-lg shadow bg-slate-900">
          <h2 className="text-xl font-semibold mb-2">Total Blogs</h2>
          <p className="text-3xl font-bold">222</p>
        </div>
        <div className="bg-green-800 p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">todays Blogs</h2>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-red-700 p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Admins</h2>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-[10px]">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Blogs Overview</h2>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Submission</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Blogs categories</h2>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
