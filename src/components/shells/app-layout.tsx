import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";
import type { PropsWithChildren } from "react";
const ActiveLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      scroll={false}
      className={`${
        router.pathname === href
          ? "border-gray-800 text-gray-900"
          : "border-transparent text-gray-600 hover:text-gray-700"
      } ${className} whitespace-no-wrap block border-b-2 pb-4 text-sm font-semibold focus:text-gray-900 focus:outline-none sm:text-base`}
    >
      {children}
    </Link>
  );
};

const AppLayout: React.FC<
  PropsWithChildren & { header?: React.ReactNode | undefined }
> = ({ header, children }) => {
  const { user, logout } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navigation user={user} /> */}
      {/* Page Heading */}
      <header className="bg-white shadow">
        <div
          className="scrollbar-none mt-6 flex space-x-4 overflow-x-auto"
          style={{ boxShadow: "inset 0 -2px 0 #edf2f7" }}
        >
          <input placeholder="sup" />
          <ActiveLink href="/dashboard">Dashboard</ActiveLink>
          <ActiveLink href="/dashboard/profile">Profile</ActiveLink>
        </div>
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

export const getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AppLayout;
