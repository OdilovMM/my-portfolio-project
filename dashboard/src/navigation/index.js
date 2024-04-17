import { allNav } from "./allNavigation";

export const getMenu = (role) => {
  const resultNav = [];

  for (let i = 0; i < allNav.length; i++) {
    if (role === allNav[i].role) {
      resultNav.push(allNav[i]);
    }
  }

  return resultNav;
};
