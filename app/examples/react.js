import "./style.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useState } from "react";

function login() {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FormAddUser = (formData) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.includes("Connexion réussie,")) {
          localStorage.setItem("token", data.token);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitFormLogin = (e) => {
    e.preventDefault();
    FormAddUser({ mail, password });
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Header />
      <div>
        <h1>Connexion</h1>
        <section>
          <h2>Indiquez vos identifiants.</h2>
          <form onSubmit={handleSubmitFormLogin}>
            <label>
              Email *
              <input
                type="text"
                name="email"
                value={mail}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Mot de passe *
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div>
              <button type="submit">Se connecter</button>
            </div>
            <div>
              <a href="/inscription">
                Je n'ai pas de compte - Mot de passe oublié
              </a>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default login;
