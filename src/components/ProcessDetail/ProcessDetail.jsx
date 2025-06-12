import { useEffect, useState } from "react";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR_STEPS, DATA_PROCESSING } from "../../data";
import "./ProcessDetail.css";

const ProcessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialStep = Number(id) || 1;
  const [activeStep, setActiveStep] = useState(initialStep);

  // Scroll to top when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveStep(initialStep);
  }, [id, initialStep]);

  const handleStepChange = (stepId) => {
    setActiveStep(stepId);
    navigate(`/process/${stepId}`);
  };

  return (
    <section className="process-detail-section process-detail-compact">
      <Container>
        <div className="process-steps-bar">
          {DATA_PROCESSING.map((step, idx) => (
            <div key={step.id} className="process-step-bar-item">
              <div
                className={`process-step-circle${activeStep === step.id ? " active" : ""}`}
                style={{ background: COLOR_STEPS[idx] }}
                onClick={() => handleStepChange(step.id)}
              >
                <Image
                  src={`${import.meta.env.BASE_URL}process-icons/${step.iconUrl}`}
                  alt={`Step ${step.id}`}
                  width={24}
                  height={24}
                  className="step-icon"
                />
              </div>
              <div className="process-step-label mt-2">{step.label}</div>
            </div>
          ))}
        </div>
        <Row className="justify-content-center mb-3">
          <Col md={8} className="text-center">
            <Carousel
              activeIndex={activeStep - 1}
              controls={false}
              indicators={false}
              interval={null}
              slide={false}
              className="process-detail-carousel"
            >
              {DATA_PROCESSING.map((step, idx) => (
                <Carousel.Item key={step.id}>
                  <div
                    className="process-detail-content"
                    style={{
                      backgroundColor: COLOR_STEPS[idx]
                    }}
                  >
                    {step.title}
                  </div>
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
