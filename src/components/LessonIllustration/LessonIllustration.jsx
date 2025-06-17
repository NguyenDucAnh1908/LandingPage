import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchIllustrations } from "../../data";
import "./LessonIllustration.css";
import backgroundImage from "/images/image_web/3._Minh_hoa_ke_hoach_bai_day.png";

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
              backgroundImage: `url(${backgroundImage})`, // đường dẫn ảnh của bạn  https://cdn.s99.vn/ss2/prod/product/af88687ac7d7bf733909ba9ea3c120b1_1700131262.jpg?at=1701807943
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
              width: "100%",
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              color: "white",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)", // lớp phủ để chữ dễ nhìn
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <span className="fs-4">Minh họa bài học</span>
              <div className="cards-container mt-3">
                {loading && (
                  <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ minHeight: 120 }}
                  >
                    <Spinner animation="border" variant="light" />
                  </div>
                )}
                {error && (
                  <Alert variant="danger" className="w-100 text-center">
                    {error}
                  </Alert>
                )}
                {!loading &&
                  !error &&
                  illustrations.map((illustration) => (
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
        </div>
      </Container>
    </section>
  );
};

export default LessonIllustration;
