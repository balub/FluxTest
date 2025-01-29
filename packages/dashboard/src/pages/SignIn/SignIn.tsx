import React from "react";

const SignIn: React.FC = () => {
  const handleSignIn = (endpoint: string) => {
    const url = `http://localhost:3170/v1/auth/${endpoint}`;
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontWeight: 600, marginBottom: "16px" }}>
        Login to continue
      </h2>
      <div style={{ display: "flex", gap: "16px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            cursor: "pointer",
          }}
          onClick={() => handleSignIn("google")}
        >
          Sign in with Google
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            cursor: "pointer",
          }}
          onClick={() => handleSignIn("github")}
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignIn;
