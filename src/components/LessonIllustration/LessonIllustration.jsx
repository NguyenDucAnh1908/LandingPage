import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getLessonIllustrations } from "../../data";
import "./LessonIllustration.css";

const LessonIllustration = () => {
  const navigate = useNavigate();
  const illustrations = getLessonIllustrations();

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
              height: "400px",
              borderRadius: "12px",
            }}
          >
            <span className="text-white fs-4">Minh họa bài học</span>
            <div className="cards-container">
              {illustrations.map((illustration) => (
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
