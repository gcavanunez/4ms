import Link from "next/link";
import { getLayout as getSiteLayout } from "./app-layout";
import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import React from "react";

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
    <Link href={href} scroll={false}>
      <a
        className={`${
          router.pathname === href
            ? "border-gray-800 text-gray-900"
            : "border-transparent text-gray-600 hover:text-gray-700"
        } ${className} whitespace-no-wrap block border-b-2 pb-4 text-sm font-semibold focus:text-gray-900 focus:outline-none sm:text-base`}
      >
        {children}
      </a>
    </Link>
  );
};

const AccountSettingsLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto max-w-xl px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>

      <div
        className="scrollbar-none mt-6 flex overflow-x-auto"
        style={{ boxShadow: "inset 0 -2px 0 #edf2f7" }}
      >
        <ActiveLink href="/account-settings/basic-information">
          Basic Information
        </ActiveLink>

        <ActiveLink href="/account-settings/profile" className="ml-10">
          Profile
        </ActiveLink>

        <ActiveLink href="/account-settings/team-settings" className="ml-10">
          Team Settings
        </ActiveLink>

        <ActiveLink href="/account-settings/billing" className="ml-10">
          Billing
        </ActiveLink>

        <ActiveLink href="/account-settings/notifications" className="ml-10">
          Notifications
        </ActiveLink>

        <ActiveLink href="/account-settings/security" className="ml-10">
          Security
        </ActiveLink>
      </div>

      <div>{children}</div>
    </div>
  );
};

export const getLayout = (page: React.ReactNode) =>
  getSiteLayout(<AccountSettingsLayout>{page}</AccountSettingsLayout>);

export default AccountSettingsLayout;
