// import Navigation from "@/components/Layouts/Navigation";
import { useAuth } from "@/utils/auth";
import type { PropsWithChildren } from "react";

const AppLayout: React.FC<
  PropsWithChildren & { header: React.ReactNode | undefined }
> = ({ header, children }) => {
  const { user, isLoading, logout } = useAuth({ middleware: "auth" });
  if (isLoading) {
    return <>is loading</>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navigation user={user} /> */}

      {/* Page Heading */}
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl justify-between py-6 px-4 sm:px-6 lg:px-8">
          <div>{header}</div>
          <div className="flex items-center space-x-4">
            <div>{user?.user.email}</div>
            <button
              type="button"
              className="rounded bg-gray-100 px-4 py-2 text-sm shadow-sm"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
