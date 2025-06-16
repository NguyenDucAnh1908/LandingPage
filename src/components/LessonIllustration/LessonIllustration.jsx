import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchIllustrations } from "../../data";
import "./LessonIllustration.css";

const LessonIllustration = () => {
  const navigate = useNavigate();
  const [illustrations, setIllustrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchIllustrations()
      .then((data) => {
        setIllustrations(data);
        setError("");
      })
      .catch(() => {
        setError("Không thể tải danh sách minh họa.");
        setIllustrations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLessonClick = (id) => {
    navigate(`/lesson-illustration/${id}`);
  };

  return (
    <section id="lesson-illustration">
      <Container>
        <div className="full-image-container">
          <div
            className="illustration-image"
            style={{
              backgroundColor: "#2c6fb2",
              height: "500px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            <span className="text-white fs-4">Minh họa bài học</span>
            <div className="cards-container">
              {loading && (
                <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: 120 }}>
                  <Spinner animation="border" variant="light" />
                </div>
              )}
              {error && (
                <Alert variant="danger" className="w-100 text-center">
                  {error}
                </Alert>
              )}
              {!loading && !error && illustrations.map((illustration) => (
                <Card
                  key={illustration.id}
                  className="lesson-card"
                  onClick={() => handleLessonClick(illustration.id)}
                >
                  <Card.Body>
                    <Card.Title>{illustration.title}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonIllustration;
