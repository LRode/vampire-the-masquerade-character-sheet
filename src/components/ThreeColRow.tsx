export const ThreeColRow = ({
  wrapBelowDesktop = false,
  children,
}: React.PropsWithChildren<{ wrapBelowDesktop?: boolean }>) => (
  <div
    className={`grid grid-cols-1  ${wrapBelowDesktop ? "lg:grid-cols-3" : "md:grid-cols-3"} gap-4 md:gap-8 mb-3`}
  >
    {children}
  </div>
);
