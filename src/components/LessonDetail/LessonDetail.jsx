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
      { id: 3, backgroundColor: '#28a745' },
      { id: 4, backgroundColor: '#ffc107' },
      { id: 5, backgroundColor: '#6610f2' },
      { id: 6, backgroundColor: '#fd7e14' }
    ]
  },
  '3-2': {
    title: '2. Bài 2: Công nghệ trong cuộc sống',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#20c997' },
      { id: 2, backgroundColor: '#e83e8c' },
      { id: 3, backgroundColor: '#fd7e14' },
      { id: 4, backgroundColor: '#6610f2' }
    ]
  },
  '3-3': {
    title: '3. Bài 3: Ứng dụng công nghệ',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#2c6fb2' },
      { id: 2, backgroundColor: '#28a745' },
      { id: 3, backgroundColor: '#ffc107' },
      { id: 4, backgroundColor: '#dc3545' }
    ]
  },
  '3-4': {
    title: '4. Bài 4: Thực hành với công nghệ',
    grade: 'Lớp 3',
    images: [
      { id: 1, backgroundColor: '#6610f2' },
      { id: 2, backgroundColor: '#fd7e14' },
      { id: 3, backgroundColor: '#20c997' },
      { id: 4, backgroundColor: '#e83e8c' }
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
      { id: 2, backgroundColor: '#6610f2' },
      { id: 3, backgroundColor: '#fd7e14' }
    ]
  },
  '4-3': {
    title: '3. Bài 3: Ứng dụng công nghệ',
    grade: 'Lớp 4',
    images: [
      { id: 1, backgroundColor: '#20c997' },
      { id: 2, backgroundColor: '#e83e8c' },
      { id: 3, backgroundColor: '#2c6fb2' }
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

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = LESSON_DATA[lessonId];

  const handleLessonChange = (e) => {
    const selectedId = e.target.value;
    navigate(`/lesson/${selectedId}`);
  };

  return (
    <section className="lesson-detail">
      <Container>
        <div className="lesson-detail-layout">
          <div className="lesson-header">
            <select
              className="form-select mb-4"
              value={lessonId}
              onChange={handleLessonChange}
            >
              <option value="">Chọn bài học</option>
              {Object.entries(LESSON_DATA).map(([id, data]) => (
                <option key={id} value={id}>
                  {data.grade} - {data.title}
                </option>
              ))}
            </select>
          </div>
          <div className="lesson-images-area">
            {lesson && (
              <div className="images-grid">
                {lesson.images.map((image) => (
                  <div
                    key={image.id}
                    className="lesson-image"
                    style={{ backgroundColor: image.backgroundColor }}
                  >
                    <span>Hình {image.id}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonDetail;
