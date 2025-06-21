import { useEffect, useState } from "react";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLOR_STEPS, fetchSteps } from "../../data";
import "./ProcessDetail.css";

const ProcessDetail = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  // Scroll to top when id changes
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSteps();
        setSteps(result);
      } catch (err) {
        console.error("Lỗi khi tải quy trình:", err);
      }
    };
    loadData();
  }, []);
const handleStepChange = (index) => {
  setActiveIndex(index);
  navigate(`/process/${steps[index].id}`);
};
  return (
    <section id="process-detail" className="process-detail-section process-detail-compact">
      <Container>
        <div className="process-steps-bar">
        {steps.map((step, idx) => (
          <div key={step.id} className="process-step-bar-item">
            <div
              className={`process-step-circle${activeIndex === idx ? " active" : ""}`}
              style={{ background: COLOR_STEPS[idx % COLOR_STEPS.length].backgroundColor }}
              onClick={() => handleStepChange(idx)}
            >
              <Image
                src={`${import.meta.env.BASE_URL}process-icons/${COLOR_STEPS[idx % COLOR_STEPS.length].iconUrl}`}
                alt={`Step ${step.id}`}
                width={24}
                height={24}
                className="step-icon"
              />
            </div>
            <div className="process-step-label mt-2">Bước {step.stepNumber}</div>
          </div>
        ))}
        </div>
        <Row className="justify-content-center mb-3">
          <Col md={8} className="text-center">
            <Carousel
              activeIndex={activeIndex}
              controls={false}
              indicators={false}
              interval={null}
              slide={false}
              className="process-detail-carousel"
            >
            {steps.map((step, idx) => (
                <Carousel.Item key={step.id}>
                  <Image
                    className="process-detail-content"
                    src={step.imageUrl}
                    alt={step.title}
                  />
                  <Carousel.Caption>
                    <h3>{step.title}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
            ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProcessDetail;
