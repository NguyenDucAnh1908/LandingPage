import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIllustration } from "../../data";
import "./LessonIllustrationDetail.css";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 200 }}
        >
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleReturn}
            style={{ padding: 0, fontWeight: 500, marginBottom: 16 }}
          >
            Quay lại
          </Button>
          <Spinner animation="border" variant="primary" />
        </Container>
      </section>
    );
  }

  if (error || !illustration) {
    return (
      <section className="lesson-illustration-detail">
        <Container>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleReturn}
            style={{ padding: 0, fontWeight: 500, marginBottom: 16 }}
          >
            Quay lại
          </Button>
          <Alert variant="danger" className="text-center">
            {error || "Illustration not found"}
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="lesson-illustration-detail">
      <Container>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={handleReturn}
          style={{ padding: 0, fontWeight: 500, marginBottom: 16 }}
        >
          Quay lại
        </Button>
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
