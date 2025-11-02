import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useUserStore } from "../store/useUserStore";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 ">
        <Link
          to="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition  bg-zinc-700 p-2 px-4 ml-2 rounded-full">
          <ArrowLeft className="" size={20} />
          <span className="">Back</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-[60vh] text-white">
        <h1 className="text-3xl mb-4 font-bold text-center">
          Sign in to continue
        </h1>

        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer text-zinc-400 hover:text-white  text-sm md:text-md font-semibold bg-zinc-700 py-3 px-4 ml-2 rounded-full md:rounded-full  duration-400 transition-colors  text-left ">
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default Login;
