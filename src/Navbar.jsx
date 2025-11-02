import React from "react";
import Search from "./components/Searchbar";
import ToggleTemp from "./components/ToggleTemp";
import Logout from "./components/Logout";
import { useUserStore } from "./store/useUserStore";

const Topbar = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
      <Search />
      <div className="flex items-center ">
        <ToggleTemp />
        {user ? <Logout /> : ""}
      </div>
    </div>
  );
};

export default Topbar;
