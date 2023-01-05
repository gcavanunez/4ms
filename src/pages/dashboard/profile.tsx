import { AppButton } from "@/components/app-button";
import { FormInput, FormInputError, FormLabel } from "@/components/app-forms";
import { getLayout } from "@/components/shells/account-settings-layout";
import { useAuth } from "@/utils/auth";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth({ middleware: "auth" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setName(String(user?.user.name) || "");
    setEmail(String(user?.user.email) || "");
  }, [user]);
  return (
    <>
      <Head>
        <title>Laravel - ProfilePage</title>
      </Head>
      <div className="flex-1 space-y-6">
        <div className="w-full rounded-lg bg-white shadow-sm">
          <form method="post">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h1 className="text-lg font-medium text-gray-900">
                    Profile Information
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                  </p>
                </div>
                <div className="mt-6">
                  <div className="max-w-md">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormInput
                      id="name"
                      autoFocus
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      className="mt-1 block w-full"
                      required
                    />
                  </div>
                  <div className="mt-4 max-w-md">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormInput
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      className="mt-1 block w-full"
                      required
                    />
                    {/* <FormInputError
                      messages={error?.data?.zodError?.fieldErrors["email"] || []}
                      className="mt-2"
                    /> */}
                  </div>
                </div>
              </div>
              <div className="flex border-t bg-slate-50  px-4 py-3 text-right sm:px-6">
                <div className=" ">
                  <AppButton type="submit">Save</AppButton>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full rounded-lg bg-white shadow-sm">
          <form method="post">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h1 className="text-lg font-medium text-gray-900">
                    Delete Account
                  </h1>
                  <p className="max-w-xl text-sm text-gray-600">
                    Permanently delete your account.
                  </p>
                </div>
                <p className="mt-6 max-w-xl text-sm text-gray-600">
                  Once your account is deleted, all of its resources and data
                  will be permanently deleted. Before deleting your account,
                  please download any data or information that you wish to
                  retain.
                </p>
                <div className="mt-4 flex">
                  <div>
                    <AppButton type="button" intent={"danger"}>
                      Delete Account
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
const Header = () => {
  return (
    <h2 className="text-xl font-semibold leading-tight text-gray-800">
      Profile
    </h2>
  );
};
ProfilePage.getLayout = (page: React.ReactElement) => {
  return getLayout(page, <Header />);
};

export default ProfilePage;
