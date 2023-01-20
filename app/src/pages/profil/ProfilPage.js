import React from "react";
import { supabase } from "../../lib/api";

function ProfilPage() {
  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <div>
      <button onClick={signOut}>se déconnecter</button>
    </div>
  );
}

export default ProfilPage;
