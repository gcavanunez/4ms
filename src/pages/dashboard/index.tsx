import { getLayout } from "@/components/shells/app-layout";
// import AppLayout from "@/components/app-layout";
import Head from "next/head";
import { useState } from "react";

const Dashboard = () => {
  return (
    <>
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
    </>
  );
};
let renderCount = 0;
const Header = () => {
  const [count, setCount] = useState(0);
  console.log("header render count", renderCount++);
  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
};
Dashboard.getLayout = (page: React.ReactElement) => {
  return getLayout(page, <Header />);
};

export default Dashboard;
