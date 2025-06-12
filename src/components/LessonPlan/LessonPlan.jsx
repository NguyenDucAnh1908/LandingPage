import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getLessonPlans } from "../../data";
import "./LessonPlan.css";

const LessonPlan = () => {
  const navigate = useNavigate();
  const lessonPlans = getLessonPlans();

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson-plan/${lessonId}`);
  };

  return (
    <section id="lesson-plan">
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
            {lessonPlans.map((lesson) => (
              <Card
                key={lesson.id}
                className="lesson-card"
                onClick={() => handleLessonClick(lesson.id)}
              >
                <Card.Body>
                  <Card.Title>{lesson.title}</Card.Title>
                  <Card.Subtitle>{lesson.subtitle}</Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPlan;
