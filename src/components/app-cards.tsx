import { type FC, type PropsWithChildren } from "react";

export const CommonCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full rounded-lg bg-white px-8 py-6 shadow-sm sm:max-w-md">
      {children}
    </div>
  );
};
