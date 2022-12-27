// import Navigation from "@/components/Layouts/Navigation";
import { useAuth } from "@/utils/auth";
import type { PropsWithChildren } from "react";

const AppLayout: React.FC<
  PropsWithChildren & { header: React.ReactNode | undefined }
> = ({ header, children }) => {
  const { user, isLoading } = useAuth({ middleware: "auth" });
  if (isLoading) {
    return <>is loading</>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {user?.user.name}
      {/* <Navigation user={user} /> */}

      {/* Page Heading */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
