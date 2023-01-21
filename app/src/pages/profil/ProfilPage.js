import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/api";
import { selectUser } from "../../store/slice/AuthSlice";

function ProfilPage() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className='w-full'>
      <div className='w-full p-4 py-8 flex flex-col justify-center items-center bg-gradient-to-r from-red-500 to-amber-500 text-white'>
        <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500'>
          <svg
            className='absolute w-12 h-12 text-gray-100 -left-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
              clipRule='evenodd'></path>
          </svg>
        </div>

        <p className='mt-2'>{user?.email}</p>
      </div>
      <button
        className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 hover:bg-red-500 focus:outline-none focus:bg-red-500'
        onClick={signOut}>
        se déconnecter
      </button>
    </div>
  );
}

export default ProfilPage;
