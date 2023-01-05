import type { HTMLAttributes, PropsWithChildren } from "react";
import { useState } from "react";
import classNames from "clsx";
// import JetApplicationMark from "./application-mark";
import JetDropdown from "../app-dropdown";
// import JetDropdownLink from "./dropdown-link";
// import JetNavigationLink from "./navigation-link";
// import JetResponsiveNavigationLink from "./responsive-navigation-link";
import { useRouter } from "next/router";

// import { useFeatures, useUser } from "../helpers/auth";

import type { LinkProps } from "next/link";
import Link from "next/link";
import { useAuth } from "@/utils/auth";

interface Props extends LinkProps {
  className?: Pick<HTMLAttributes<HTMLAnchorElement>, "className">;
}

const JetDropdownLink = ({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Link
      {...props}
      className={classNames(
        "block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
        className
      )}
    >
      {children}
    </Link>
  );
};

const jetActiveClass =
  "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out";
const jetAnactiveClass =
  "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out";

interface Props extends LinkProps {
  active?: boolean;
  className?: Pick<HTMLAttributes<HTMLAnchorElement>, "className">;
}

const JetNavigationLink = ({
  children,
  active,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Link
      {...props}
      className={classNames(
        active ? jetActiveClass : jetAnactiveClass,
        className
      )}
    >
      {children}
    </Link>
  );
};

const activeClass =
  "block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out";
const inactiveClass =
  "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out";

interface Props extends LinkProps {
  active?: boolean;
  className?: Pick<HTMLAttributes<HTMLAnchorElement>, "className">;
}

const JetResponsiveNavigationLink = ({
  children,
  className,
  active,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Link
      {...props}
      className={classNames(active ? activeClass : inactiveClass, className)}
    >
      {children}
    </Link>
  );
};

export default function JetNavigation() {
  const { user, logout } = useAuth({ middleware: "auth" });

  const [mobileOpen, setMobileOpen] = useState(false);
  // const { hasProfilePhotoFeatures, hasApiFeatures } = useFeatures();
  const router = useRouter();

  return (
    <nav className="border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link
                className="text-primary rounded"
                aria-label="Go to dashboard"
                href="/"
              >
                <img src={"/static/next.svg"} className="h-8 w-full" />
              </Link>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <JetNavigationLink
                href={"/dashboard"}
                active={router.pathname === "/dashboard"}
              >
                Dashboard
              </JetNavigationLink>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative ml-3">
              <JetDropdown
                renderTrigger={({ Trigger }) => (
                  <span className="inline-flex rounded-md">
                    <Trigger className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                      {user?.user.name}
                      <svg
                        className="ml-2 -mr-0.5 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Trigger>
                  </span>
                )}
              >
                {({ DropdownItem }) => (
                  <>
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Account
                    </div>
                    <DropdownItem>
                      <JetDropdownLink href="/dashboard/profile">
                        Settings
                      </JetDropdownLink>
                    </DropdownItem>
                    {/* {hasApiFeatures && (
                      <DropdownItem>
                        <JetDropdownLink href="/settings/api-tokens">
                          API Tokens
                        </JetDropdownLink>
                      </DropdownItem> */}

                    <div className="border-t border-gray-100"></div>
                    <DropdownItem>
                      <button
                        onClick={logout}
                        className={
                          "block w-full px-4 py-2 text-left  text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        }
                      >
                        Logout
                      </button>
                    </DropdownItem>
                  </>
                )}
              </JetDropdown>
            </div>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={classNames({
                    hidden: mobileOpen,
                    "inline-flex": !mobileOpen,
                  })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={classNames({
                    hidden: !mobileOpen,
                    "inline-flex": mobileOpen,
                  })}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={classNames("sm:hidden", {
          block: mobileOpen,
          hidden: !mobileOpen,
        })}
      >
        <div className="space-y-1 pt-2 pb-3">
          {/* "request()->routeIs('dashboard')" */}
          <JetResponsiveNavigationLink
            href={"/"}
            active={router.pathname === "/"}
          >
            Dashboard
          </JetResponsiveNavigationLink>
        </div>

        <div className="border-t border-gray-200 pt-4 pb-1">
          <div className="flex items-center px-4">
            {/* {hasProfilePhotoFeatures && user.profile_photo_url && (
              <div className="mr-3 flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.profile_photo_url}
                  alt={user.name}
                />
              </div>
            )} */}

            <div>
              <div className="text-base font-medium text-gray-800">
                {user?.user.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user?.user.email}
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            {/* "request()->routeIs('profile.show')" */}
            <JetResponsiveNavigationLink href="/settings" active={false}>
              Settings
            </JetResponsiveNavigationLink>

            <a
              href="/logout"
              className={
                "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 transition duration-150 ease-in-out hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 focus:outline-none"
              }
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
