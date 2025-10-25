export const ThreeColRow = ({
  wrapBelowDesktop = false,
  children,
}: React.PropsWithChildren<{ wrapBelowDesktop?: boolean }>) => (
  <div
    className={`grid grid-cols-1  ${wrapBelowDesktop ? "lg:grid-cols-3" : "md:grid-cols-3"} gap-x-4 md:gap-x-8 mb-3 gap-y-2`}
  >
    {children}
  </div>
);
