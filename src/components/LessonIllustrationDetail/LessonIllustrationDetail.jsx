import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIllustrationById } from '../../data';
import './LessonIllustrationDetail.css';

const LessonIllustrationDetail = () => {
  const { illustrationId } = useParams();
  const illustration = getIllustrationById(illustrationId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!illustration) return <section className="lesson-illustration-detail"><Container><h2>Illustration not found</h2></Container></section>;

  return (
    <section className="lesson-illustration-detail">
      <Container>
        <h2 className="lesson-title">{illustration.title}</h2>
        <div className="pdf-container">
          <iframe
            src={illustration.pdfUrl}
            title={illustration.title}
            className="pdf-viewer"
          />
        </div>
      </Container>
    </section>
  );
};

export default LessonIllustrationDetail;
