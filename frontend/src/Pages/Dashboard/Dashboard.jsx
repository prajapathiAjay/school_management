import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for all charts
  const dashboardData = {
    // 1. Student Attendance Trend
    attendanceTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      present: [95, 92, 94, 96, 93, 95],
      absent: [5, 8, 6, 4, 7, 5],
    },

    // 2. Grade Distribution
    gradeDistribution: {
      labels: ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (<60)'],
      data: [25, 35, 20, 15, 5],
    },

    // 3. Teacher Performance
    teacherPerformance: {
      labels: ['Math', 'Science', 'English', 'History', 'Arts', 'PE'],
      ratings: [4.8, 4.6, 4.9, 4.7, 4.5, 4.8],
    },

    // 4. Subject Performance
    subjectPerformance: {
      labels: ['Algebra', 'Biology', 'Literature', 'World History', 'Art', 'Physics'],
      averages: [85, 78, 82, 75, 88, 80],
    },

    // 5. Student Enrollment
    enrollment: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      students: [800, 950, 1100, 1200, 1250, 1300],
    },

    // 6. Classroom Utilization
    classroomUtilization: {
      labels: ['Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105', 'Lab 1'],
      utilization: [85, 90, 75, 95, 80, 70],
    },

    // 7. Gender Distribution
    genderDistribution: {
      labels: ['Male', 'Female', 'Other'],
      data: [52, 46, 2],
    },

    // 8. Sports Participation
    sportsParticipation: {
      labels: ['Basketball', 'Soccer', 'Swimming', 'Track', 'Tennis', 'Volleyball'],
      participants: [45, 60, 35, 50, 25, 40],
    },

    // 9. Library Book Circulation
    libraryCirculation: {
      labels: ['Fiction', 'Science', 'History', 'Arts', 'Technology', 'Literature'],
      circulation: [120, 85, 65, 45, 90, 75],
    },

    // 10. Student Behavior
    studentBehavior: {
      labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
      data: [40, 35, 20, 5],
    },
  };

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 1. Attendance Trend Chart (Line)
  const attendanceChartData = {
    labels: dashboardData.attendanceTrend.labels,
    datasets: [
      {
        label: 'Present (%)',
        data: dashboardData.attendanceTrend.present,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Absent (%)',
        data: dashboardData.attendanceTrend.absent,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // 2. Grade Distribution (Pie)
  const gradeDistributionData = {
    labels: dashboardData.gradeDistribution.labels,
    datasets: [
      {
        data: dashboardData.gradeDistribution.data,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 3. Teacher Performance (Radar)
  const teacherPerformanceData = {
    labels: dashboardData.teacherPerformance.labels,
    datasets: [
      {
        label: 'Performance Rating',
        data: dashboardData.teacherPerformance.ratings,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
      },
    ],
  };

  // 4. Subject Performance (Bar)
  const subjectPerformanceData = {
    labels: dashboardData.subjectPerformance.labels,
    datasets: [
      {
        label: 'Average Score',
        data: dashboardData.subjectPerformance.averages,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  // 5. Student Enrollment (Line)
  const enrollmentData = {
    labels: dashboardData.enrollment.labels,
    datasets: [
      {
        label: 'Total Students',
        data: dashboardData.enrollment.students,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // 6. Classroom Utilization (Bar)
  const classroomUtilizationData = {
    labels: dashboardData.classroomUtilization.labels,
    datasets: [
      {
        label: 'Utilization Rate (%)',
        data: dashboardData.classroomUtilization.utilization,
        backgroundColor: 'rgba(234, 179, 8, 0.8)',
        borderColor: 'rgba(234, 179, 8, 1)',
        borderWidth: 2,
      },
    ],
  };

  // 7. Gender Distribution (Doughnut)
  const genderDistributionData = {
    labels: dashboardData.genderDistribution.labels,
    datasets: [
      {
        data: dashboardData.genderDistribution.data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 8. Sports Participation (Polar Area)
  const sportsParticipationData = {
    labels: dashboardData.sportsParticipation.labels,
    datasets: [
      {
        data: dashboardData.sportsParticipation.participants,
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(234, 179, 8, 0.7)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 9. Library Circulation (Horizontal Bar)
  const libraryCirculationData = {
    labels: dashboardData.libraryCirculation.labels,
    datasets: [
      {
        label: 'Books Circulated',
        data: dashboardData.libraryCirculation.circulation,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
    ],
  };

  // 10. Student Behavior (Doughnut)
  const studentBehaviorData = {
    labels: dashboardData.studentBehavior.labels,
    datasets: [
      {
        data: dashboardData.studentBehavior.data,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const horizontalBarOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">School Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive overview of school performance metrics</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,350</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <span className="text-green-600">↑ 12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">94.2%</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <span className="text-blue-600">↑ 2.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Teachers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">68</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <span className="text-purple-600">+3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">87.5%</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <span className="text-yellow-600">↑ 5.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid - 10 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Chart 1: Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend</h3>
          <div className="h-80">
            <Line data={attendanceChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Chart 2: Grade Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <div className="h-80">
            <Pie data={gradeDistributionData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 3: Teacher Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Performance</h3>
          <div className="h-80">
            <Radar data={teacherPerformanceData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 4: Subject Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
          <div className="h-80">
            <Bar data={subjectPerformanceData} options={barChartOptions} />
          </div>
        </div>

        {/* Chart 5: Student Enrollment */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Enrollment Growth</h3>
          <div className="h-80">
            <Line data={enrollmentData} options={lineChartOptions} />
          </div>
        </div>

        {/* Chart 6: Classroom Utilization */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Classroom Utilization</h3>
          <div className="h-80">
            <Bar data={classroomUtilizationData} options={barChartOptions} />
          </div>
        </div>

        {/* Chart 7: Gender Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
          <div className="h-80">
            <Doughnut data={genderDistributionData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 8: Sports Participation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sports Participation</h3>
          <div className="h-80">
            <PolarArea data={sportsParticipationData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 9: Library Circulation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Library Book Circulation</h3>
          <div className="h-80">
            <Bar data={libraryCirculationData} options={horizontalBarOptions} />
          </div>
        </div>

        {/* Chart 10: Student Behavior */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Behavior Analysis</h3>
          <div className="h-80">
            <Doughnut data={studentBehaviorData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Last updated: {new Date().toLocaleDateString()} | Data refreshes every 24 hours</p>
      </div>
    </div>
  );
};

export default Dashboard;