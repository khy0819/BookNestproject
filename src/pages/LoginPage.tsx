import React, { useState, useCallback } from "react";
import "./LoginPage.css";

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      // 실제로는 API 호출이 여기 들어갑니다. 예시로 setTimeout 사용
      setTimeout(() => {
        if (username === "admin" && password === "1234") {
          onLoginSuccess(username);
        } else {
          setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        setIsLoading(false);
      }, 1000);
    },
    [username, password, onLoginSuccess]
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          className={error ? "error-input" : ""}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            required
            className={error ? "error-input" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
