import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/api";
import { selectUser } from "../../store/slice/AuthSlice";

function LoginPage() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();

  const changeAuthMode = (type) => {
    setAuthMode(type);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const signInWithEmail = async (event) => {
    event?.preventDefault();

    if (!email) {
      toast.error("Remplissez le champ email");
      return;
    } else if (!password) {
      toast.error("Remplissez le champ Mot de passe");
      return;
    }

    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      navigate("/profil");
    }
  };

  const signUpWithEmail = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Remplissez le champ Email");
      return;
    } else if (!password) {
      toast.error("Remplissez le champ Mot de passe");
      return;
    } else if (!confirmPassword) {
      toast.error("Remplissez le champ Confirmer Mot de passe");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Le mot de passe de confirmation ne correspond pas");
      return;
    }

    const res = await supabase.auth.signUp({
      email,
      password,
    });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      navigate("/profil");
    }
  };

  const forgotPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Remplissez le champ Email");
      return;
    }

    const res = await supabase.auth.resetPasswordForEmail(email);
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("L'email de récupération du mot de passe a été envoyé.");
      changeAuthMode("signin");
      setEmail(email);
    }
  };

  const handleSocialLogin = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      toast.error(error.message);
    }
  };

  const SocialLogin = (
    <>
      <div className='w-full flex space-x-2 justify-center flex-wrap'>
        <button
          aria-label='Login with Google'
          type='button'
          className='px-4 py-2 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-blue-400'
          onClick={() => handleSocialLogin("google")}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            className='w-5 h-5 fill-current'>
            <path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
          </svg>
        </button>
        <button
          aria-label='Login with GitHub'
          role='button'
          className='px-4 py-2 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-blue-400'
          onClick={() => handleSocialLogin("github")}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            className='w-5 h-5 fill-current'>
            <path d='M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z'></path>
          </svg>
        </button>
      </div>
    </>
  );

  useEffect(() => {}, []);

  if (authMode === "signup") {
    return (
      <div className='w-full'>
        <Toaster />
        <div className='flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50'>
          <div>
            <h3 className='text-2xl font-bold'>Création de mon compte</h3>
          </div>
          <div className='w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg'>
            <form onSubmit={signUpWithEmail}>
              <div className='mt-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 undefined'>
                  ADRESSE E-MAIL
                </label>
                <div className='flex flex-col items-start'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full mt-1 p-2 border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 undefined'>
                  MOT DE PASSE
                </label>
                <div className='flex flex-col items-start'>
                  <input
                    type='password'
                    name='password'
                    min='6'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full mt-1 p-2 border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='password_confirmation'
                  className='block text-sm font-medium text-gray-700 undefined'>
                  CONFIRMER MOT DE PASSE
                </label>
                <div className='flex flex-col items-start'>
                  <input
                    type='password'
                    name='password_confirmation'
                    value={confirmPassword}
                    min='6'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='block w-full mt-1 p-2 border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600'>
                  Je crée mon compte
                </button>
              </div>
            </form>
            <div className='mt-4 text-grey-600'>
              vous avez déjà un compte ?{" "}
              <span>
                <a
                  className='text-blue-600 hover:underline'
                  href='#'
                  onClick={() => changeAuthMode("signin")}>
                  Je me connecte
                </a>
              </span>
            </div>
            <div className='flex items-center w-full my-4'>
              <hr className='w-full' />
              <p className='px-3 '>Ou</p>
              <hr className='w-full' />
            </div>

            {SocialLogin}
          </div>
        </div>
      </div>
    );
  }

  if (authMode === "forgot_password") {
    return (
      <div className='w-full'>
        <Toaster />
        <div className='flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50'>
          <div>
            <h3 className='text-2xl font-bold'>J'ai oublié mon mot de passe</h3>
          </div>
          <div className='w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg'>
            <form onSubmit={forgotPassword}>
              <div className='mt-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 undefined'>
                  ADRESSE E-MAIL
                </label>
                <div className='flex flex-col items-start'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full mt-1 p-2 border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
              </div>

              <div className='flex items-center mt-4'>
                <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600'>
                  Valider
                </button>
              </div>
            </form>
            <div className='flex items-center mt-4'>
              <button
                className='w-full px-4 py-2 tracking-wide text-blue-600 transition-colors duration-200 transform rounded-md border-2 border-blue-600'
                onClick={() => changeAuthMode("signin")}>
                Retour à la page de connexion
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Toaster />
      <div className='flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50'>
        <div>
          <h3 className='text-2xl font-bold'>Je me connecte</h3>
        </div>
        <div className='w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg'>
          <form onSubmit={signInWithEmail}>
            <div className='mt-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 undefined'>
                ADRESSE E-MAIL
              </label>
              <div className='flex flex-col items-start'>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full mt-1 p-2 border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 undefined'>
                MOT DE PASSE
              </label>
              <div className='flex flex-col items-start'>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full mt-1 p-2 border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                />
              </div>
            </div>
            <a
              href='#'
              className='text-xs text-blue-600 hover:underline'
              onClick={() => changeAuthMode("forgot_password")}>
              Mot de passe oublié?
            </a>
            <div className='flex items-center mt-4'>
              <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600'>
                Je me connecte
              </button>
            </div>
          </form>
          <div className='mt-4 text-grey-600'>
            Pas encore de compte ?{" "}
            <span>
              <a
                className='text-blue-600 hover:underline'
                href='#'
                onClick={() => changeAuthMode("signup")}>
                Créer un compte
              </a>
            </span>
          </div>
          <div className='flex items-center w-full my-4'>
            <hr className='w-full' />
            <p className='px-3 '>Ou</p>
            <hr className='w-full' />
          </div>

          {SocialLogin}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
