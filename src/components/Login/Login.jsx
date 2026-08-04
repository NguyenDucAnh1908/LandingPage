import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { login } from "../../data";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      // Đánh dấu đã đăng nhập
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
    setLoading(false);
  };

  return (
    <section className="login-section">
      <div className="login-card-wrapper">
        <h2 className="login-title-header">Đăng nhập Admin</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="adminUsername">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="adminPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Login;
