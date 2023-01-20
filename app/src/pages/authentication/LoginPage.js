import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/api";
import { selectUser } from "../../store/slice/AuthSlice";

function LoginPage() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async (event) => {
    event.preventDefault();

    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signUpWithEmail = async (event) => {
    event.preventDefault();

    const res = await supabase.auth.signUpWithEmail({
      email,
      password,
    });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form onSubmit={signInWithEmail}>
        <input type='email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <button>Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;
