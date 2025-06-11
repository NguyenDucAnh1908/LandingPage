import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './LessonPlanDetail.css';

const LESSON_PDF_DATA = {
  "3-1": {
    title: "Minh Họa Bài 1",
    pdfUrl:
      "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/SDS%20Document.pdf?alt=media&token=2942c792-57eb-43e6-b441-8adaff091546",
  },
  "3-2": {
    title: "Minh Họa Bài 2",
    pdfUrl:
      "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/SDS%20Document.pdf?alt=media&token=2942c792-57eb-43e6-b441-8adaff091546",
  },
  "3-3": {
    title: "Minh Họa Bài 3",
    pdfUrl:
      "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/SDS%20Document.pdf?alt=media&token=2942c792-57eb-43e6-b441-8adaff091546",
  },
};

const LessonPlanDetail = () => {
  const { lessonId } = useParams();
  const lesson = LESSON_PDF_DATA[lessonId];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
            // frameBorder="0"
          />
        </div>
      </Container>
    </section>
  );
};

export default LessonPlanDetail;
