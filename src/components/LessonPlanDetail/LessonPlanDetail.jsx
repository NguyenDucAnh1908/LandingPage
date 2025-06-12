import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getLessonById } from '../../data';
import './LessonPlanDetail.css';

const LessonPlanDetail = () => {
  const { lessonId } = useParams();
  const lesson = getLessonById(lessonId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!lesson?.plan) return <div>Không tìm thấy bài học</div>;

  return (
    <section className="lesson-plan-detail">
      <Container>
        <h2 className="lesson-title">{lesson.plan.title}</h2>
        <div className="pdf-container">
          <iframe
            src={lesson.plan.pdfUrl}
            title={lesson.plan.title}
            className="pdf-viewer"
          />
        </div>
      </Container>
    </section>
  );
};

export default LessonPlanDetail;
