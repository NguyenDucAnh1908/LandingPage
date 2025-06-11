import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LessonPlan.css";

const LESSON_DATA = [
  {
    id: "3-1",
    title: "Minh Họa Bài 1",
    subtitle: "Bài 1",
    backgroundColor: "#2c6fb2",
  },
  {
    id: "3-2",
    title: "Minh Họa Bài 2",
    subtitle: "Bài 2",
    backgroundColor: "#dc3545",
  },
  {
    id: "3-3",
    title: "Minh Họa Bài 3",
    subtitle: "Bài 3",
    backgroundColor: "#28a745",
  },
];

const LessonPlan = () => {
  const navigate = useNavigate();

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
            {LESSON_DATA.map((lesson) => (
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
