import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useUserStore } from "../store/useUserStore";

const Logout = () => {
  const { logout } = useUserStore();

  const handleLogout = async () => {
    await signOut(auth);
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer text-zinc-400 hover:text-white  text-sm md:text-md font-semibold bg-zinc-700 py-2 px-4 ml-2 rounded-full md:rounded-full  duration-400 transition-colors w-18 md:w-20 text-left ">
      Logout
    </button>
  );
};

export default Logout;
