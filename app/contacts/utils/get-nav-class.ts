interface LinkParams {
  isActive: boolean;
}

export const getNavClass = (params: LinkParams) => {
  const { isActive } = params;
  let activeClass = "bg-blue-20 text-white w-full rounded-md  ";
  let linkClass = "pl-2 flex justify-between py-2 pr-4";

  if (isActive) {
    linkClass += ` ${activeClass}`;
  }
  return linkClass;
};
