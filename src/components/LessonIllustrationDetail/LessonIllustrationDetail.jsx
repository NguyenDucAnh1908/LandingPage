import { useEffect, useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchIllustration } from '../../data';
import './LessonIllustrationDetail.css';

const LessonIllustrationDetail = () => {
  const { illustrationId } = useParams();
  const [illustration, setIllustration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <section className="lesson-illustration-detail">
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
          <Spinner animation="border" variant="primary" />
        </Container>
      </section>
    );
  }

  if (error || !illustration) {
    return (
      <section className="lesson-illustration-detail">
        <Container>
          <Alert variant="danger" className="text-center">{error || "Illustration not found"}</Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="lesson-illustration-detail">
      <Container>
        <h2 className="lesson-title">{illustration.title}</h2>
        <div className="pdf-container">
          <iframe
            src={illustration.pdfUrl}
            title={illustration.title}
            className="pdf-viewer"
          />
        </div>
      </Container>
    </section>
  );
};

export default LessonIllustrationDetail;
