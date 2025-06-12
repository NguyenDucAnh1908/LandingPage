import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { GRADES, getLessonById, getLessonsByGrade } from '../../data';
import './LessonDetail.css';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle initial lesson selection
  useEffect(() => {
    if (lessonId) {
      const lesson = getLessonById(lessonId);
      if (lesson) {
        setSelectedLesson(lesson);
        const grade = GRADES.find(g => g.id === lesson.gradeId);
        setExpandedGrade(grade?.name);
      }
    }
  }, [lessonId]);

  const handleGradeToggle = (gradeName) => {
    setExpandedGrade(expandedGrade === gradeName ? null : gradeName);
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <section className="lesson-detail">
      <Container>
        <div className="lesson-container">
          <div className="lesson-tree">
            {GRADES.map((grade) => (
              <div key={grade.id} className="lesson-grade-group">
                <div
                  className="lesson-grade-title"
                  onClick={() => handleGradeToggle(grade.name)}
                >
                  <button className="toggle-btn">
                    {expandedGrade === grade.name ? "▼" : "►"}
                  </button>
                  <span>{grade.name}</span>
                </div>
                {expandedGrade === grade.name && (
                  <ul className="lesson-list">
                    {getLessonsByGrade(grade.id).map((lesson) => (
                      <li
                        key={lesson.id}
                        className={`lesson-item ${selectedLesson?.id === lesson.id ? 'active' : ''}`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        {lesson.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="lesson-images-grid">
            {selectedLesson && selectedLesson.images.map((image) => (
              <div
                key={image.id}
                className="lesson-image"
                style={{ backgroundColor: image.backgroundColor }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${image.url}`}
                  alt={image.title}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonDetail;
