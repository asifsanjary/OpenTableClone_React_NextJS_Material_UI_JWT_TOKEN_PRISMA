"use client"

import React from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        {loading ? null :
          <div className="flex">
            {data ?
              <button
                className="bg-blue-400 
                  text-white 
                  border 
                  p-1 
                  px-4 
                  rounded 
                  mr-3"
                onClick={signout}
              >
                Sign Out
              </button> : (
                <>
                  <AuthModal isSignIn={true} />
                  <AuthModal isSignIn={false} />
                </>
              )
            }
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;
