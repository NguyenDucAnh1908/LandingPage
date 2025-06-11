import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './LessonPlanDetail.css';

const LESSON_PDF_DATA = {
  '3-1': {
    title: 'Minh Họa Bài 1',
    pdfUrl: 'https://example.com/path/to/lesson1.pdf'
  },
  '3-2': {
    title: 'Minh Họa Bài 2',
    pdfUrl: 'https://example.com/path/to/lesson2.pdf'
  },
  '3-3': {
    title: 'Minh Họa Bài 3',
    pdfUrl: 'https://example.com/path/to/lesson3.pdf'
  }
};

const LessonPlanDetail = () => {
  const { lessonId } = useParams();
  const lesson = LESSON_PDF_DATA[lessonId];

  if (!lesson) return <div>Không tìm thấy bài học</div>;

  return (
    <section className="lesson-plan-detail">
      <Container>
        <h2 className="lesson-title">{lesson.title}</h2>
        <div className="pdf-container">
          <iframe
            src={lesson.pdfUrl}
            title={lesson.title}
            className="pdf-viewer"
            frameBorder="0"
          />
        </div>
      </Container>
    </section>
  );
};

export default LessonPlanDetail;
