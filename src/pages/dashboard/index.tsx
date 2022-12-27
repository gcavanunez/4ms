import AppLayout from "@/components/app-layout";
import Head from "next/head";

const Dashboard = () => {
  return (
    <AppLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-200 bg-white p-6">
              You are logged in!
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
