import { AppButton } from "@/components/app-button";
import { FormInput, FormInputError, FormLabel } from "@/components/app-forms";
import { getLayout } from "@/components/shells/account-settings-layout";
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Laravel - ProfilePage</title>
      </Head>
      <div className="flex-1">
        <div className="w-full rounded-lg bg-white shadow-sm">
          <form method="post">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h1 className="text-lg font-medium text-gray-900">
                    Update Password
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                  </p>
                </div>
                <div className="mt-6">
                  <div className="max-w-md">
                    <FormLabel htmlFor="current-password">
                      Current Password
                    </FormLabel>
                    <FormInput
                      id="current-password"
                      type="password"
                      name="current_password"
                      className="mt-1 block w-full"
                      required
                    />
                  </div>
                  <div className="mt-4 max-w-md">
                    <FormLabel htmlFor="new-password">New Password</FormLabel>
                    <FormInput
                      id="new-password"
                      type="password"
                      name="new_password"
                      className="mt-1 block w-full"
                      required
                    />
                  </div>
                  <div className="mt-4 max-w-md">
                    <FormLabel htmlFor="confirm-password">
                      Confirm Password
                    </FormLabel>
                    <FormInput
                      id="confirm-password"
                      type="password"
                      name="password_confirm"
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
