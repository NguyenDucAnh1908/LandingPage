import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './LessonDetail.css';

const LESSON_DATA = {
  // Lớp 3
  '3-1': {
    title: '1. Bài 1: Giới thiệu về công nghệ',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#2c6fb2' },
      { id: 2, backgroundColor: '#dc3545' },
    ]
  },
  '3-2': {
    title: '2. Bài 2: Công nghệ trong cuộc sống',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#20c997' },
      { id: 2, backgroundColor: '#e83e8c' },
      { id: 3, backgroundColor: '#fd7e14' }
    ]
  },
  '3-3': {
    title: '3. Bài 3: Ứng dụng công nghệ',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#2c6fb2' },
      { id: 2, backgroundColor: '#28a745' }
    ]
  },
  '3-4': {
    title: '4. Bài 4: Thực hành với công nghệ',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#6610f2' },
      { id: 2, backgroundColor: '#fd7e14' }
    ]
  },

  // Lớp 4
  '4-1': {
    title: '1. Bài 1: Giới thiệu về công nghệ',
    grade: 'Lớp 4',
    images: [
      { id: 1, backgroundColor: '#2c6fb2' },
      { id: 2, backgroundColor: '#dc3545' },
      { id: 3, backgroundColor: '#28a745' }
    ]
  },
  '4-2': {
    title: '2. Bài 2: Công nghệ trong cuộc sống',
    grade: 'Lớp 4',
    images: [
      { id: 1, backgroundColor: '#ffc107' },
      { id: 2, backgroundColor: '#6610f2' }
    ]
  },
  '4-3': {
    title: '3. Bài 3: Ứng dụng công nghệ',
    grade: 'Lớp 4',
    images: [
      { id: 1, backgroundColor: '#20c997' },
      { id: 2, backgroundColor: '#e83e8c' }
    ]
  },
  '4-4': {
    title: '4. Bài 4: Thực hành với công nghệ',
    grade: 'Lớp 4',
    images: [
      { id: 1, backgroundColor: '#28a745' },
      { id: 2, backgroundColor: '#ffc107' },
      { id: 3, backgroundColor: '#dc3545' }
    ]
  }
};

const groupByGrade = (data) => {
  const result = {};
  Object.entries(data).forEach(([id, lesson]) => {
    if (!result[lesson.grade]) result[lesson.grade] = [];
    result[lesson.grade].push({ id, ...lesson });
  });
  return result;
};

const LessonDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Add new useEffect to handle initial lesson selection
  useEffect(() => {
    if (lessonId && LESSON_DATA[lessonId]) {
      const lesson = { id: lessonId, ...LESSON_DATA[lessonId] };
      setSelectedLesson(lesson);
      setExpandedGrade(lesson.grade);
    }
  }, [lessonId]);

  const groupedLessons = groupByGrade(LESSON_DATA);

  const handleGradeToggle = (grade) => {
    setExpandedGrade(expandedGrade === grade ? null : grade);
  };

  const handleLessonClick = (lessonData) => {
    setSelectedLesson(lessonData);
    navigate(`/lesson/${lessonData.id}`);
  };

  return (
    <section className="lesson-detail">
      <Container>
        <div className="lesson-container">
          <div className="lesson-tree">
            {Object.entries(groupedLessons).map(([grade, lessons]) => (
              <div key={grade} className="lesson-grade-group">
                <div
                  className="lesson-grade-title"
                  onClick={() => handleGradeToggle(grade)}
                >
                  <button className="toggle-btn">
                    {expandedGrade === grade ? "▼" : "►"}
                  </button>
                  <span>{grade}</span>
                </div>
                {expandedGrade === grade && (
                  <ul className="lesson-list">
                    {lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className={`lesson-item ${selectedLesson?.id === lesson.id ? 'active' : ''}`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        {lesson.title}
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
                <span>Hình {image.id}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonDetail;
