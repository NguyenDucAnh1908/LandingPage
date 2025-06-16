import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLessons } from '../../data';
import './LessonDetail.css';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch grades and lessons from API
  useEffect(() => {
    fetchLessons()
      .then((data) => {
        setGrades(data);

        // Tìm lesson theo id trong tất cả grades
        let foundLesson = null;
        let foundGradeTitle = null;
        for (const grade of data) {
          const lesson = grade.contents.find(l => String(l.id) === String(lessonId));
          if (lesson) {
            foundLesson = lesson;
            foundGradeTitle = grade.title;
            break;
          }
        }
        setSelectedLesson(foundLesson);
        setExpandedGrade(foundGradeTitle);
      })
      .catch(() => {
        setGrades([]);
        setSelectedLesson(null);
        setExpandedGrade(null);
      });
  }, [lessonId]);

  const handleGradeToggle = (gradeTitle) => {
    setExpandedGrade(expandedGrade === gradeTitle ? null : gradeTitle);
  };

  const handleLessonClick = (lesson, gradeTitle) => {
    setSelectedLesson(lesson);
    setExpandedGrade(gradeTitle);
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <section className="lesson-detail">
      <Container>
        <div className="lesson-container">
          <div className="lesson-tree">
            {grades.map((grade) => (
              <div key={grade.id} className="lesson-grade-group">
                <div
                  className="lesson-grade-title"
                  onClick={() => handleGradeToggle(grade.title)}
                >
                  <button className="toggle-btn">
                    {expandedGrade === grade.title ? "▼" : "►"}
                  </button>
                  <span>{grade.title}</span>
                </div>
                {expandedGrade === grade.title && (
                  <ul className="lesson-list">
                    {grade.contents.map((lesson) => (
                      <li
                        key={lesson.id}
                        className={`lesson-item ${selectedLesson?.id === lesson.id ? 'active' : ''}`}
                        onClick={() => handleLessonClick(lesson, grade.title)}
                      >
                        {lesson.contentText}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="lesson-images-grid">
            {selectedLesson && selectedLesson.images && selectedLesson.images.map((image) => (
              <div
                key={image.id}
                className="lesson-image"
                // Nếu có backgroundColor thì dùng, không thì bỏ qua
                style={image.backgroundColor ? { backgroundColor: image.backgroundColor } : {}}
              >
                <img
                  src={image.imageUrl}
                  alt={selectedLesson.contentText}
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
