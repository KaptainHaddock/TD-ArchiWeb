// login.tsx
import { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onLogin(username, password);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Identifiant:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
