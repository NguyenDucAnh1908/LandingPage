import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIllustration } from "../../data";
import "./LessonIllustrationDetail.css";

const LessonIllustrationDetail = () => {
  const { illustrationId } = useParams();
  const [illustration, setIllustration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchIllustration(illustrationId)
      .then((data) => {
        setIllustration(data);
        setError("");
      })
      .catch(() => {
        setIllustration(null);
        setError("Không thể tải minh họa.");
      })
      .finally(() => setLoading(false));
  }, [illustrationId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReturn = (e) => {
    e?.preventDefault?.();
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("lesson-illustration");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (loading) {
    return (
      <section className="lesson-illustration-detail">
        <Container className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" variant="primary" />
          <span className="mt-3 text-muted">Đang tải giáo án minh họa...</span>
        </Container>
      </section>
    );
  }

  if (error || !illustration) {
    return (
      <section className="lesson-illustration-detail">
        <Container>
          <a href="/" onClick={handleReturn} className="return-button">
            ➔ Quay lại
          </a>
          <Alert variant="danger" className="text-center mt-3">
            {error || "Không tìm thấy giáo án minh họa tương ứng."}
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="lesson-illustration-detail">
      <Container>
        <a href="/" onClick={handleReturn} className="return-button">
          ➔ Quay lại
        </a>
        
        <h2 className="lesson-title">{illustration.title}</h2>
        <div className="pdf-container">
          <iframe
            src={illustration.fileUrl}
            title={illustration.title}
            className="pdf-viewer"
          />
        </div>
      </Container>
    </section>
  );
};

export default LessonIllustrationDetail;
