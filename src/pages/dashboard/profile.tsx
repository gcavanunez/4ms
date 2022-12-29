import { getLayout } from "@/components/shells/account-settings-layout";
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Laravel - ProfilePage</title>
      </Head>

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-200 bg-white p-6">
              Profile page
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ProfilePage.getLayout = getLayout;

export default ProfilePage;
