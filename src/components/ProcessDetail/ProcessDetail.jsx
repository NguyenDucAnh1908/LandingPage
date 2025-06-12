import { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ProcessDetail.css";

const STEPS = [
  {
    id: 1,
    label: "Bước 1",
    title: "Xác định yêu cầu cần đạt của bài học",
    image: { background: "#20c997" },
    icon: <img src="/process-icons/step1.svg" alt="Step 1" className="step-icon" />
  },
  {
    id: 2,
    label: "Bước 2",
    title: "Xác định các hoạt động tích hợp có thể bồi dưỡng năng lực số",
    image: { background: "#2c6fb2" },
    icon: <img src="/process-icons/step2.svg" alt="Step 2" className="step-icon" />
  },
  {
    id: 3,
    label: "Bước 3",
    title: "Xác định tài nguyên dạy học",
    image: { background: "#f6c23e" },
    icon: <img src="/process-icons/step3.svg" alt="Step 3" className="step-icon" />
  },
  {
    id: 4,
    label: "Bước 4",
    title: "Lựa chọn phương pháp và kỹ thuật dạy học",
    image: { background: "#28a745" },
    icon: <img src="/process-icons/step4.svg" alt="Step 4" className="step-icon" />
  },
  {
    id: 5,
    label: "Bước 5",
    title: "Thiết kế các hoạt động học tập trong bài học môn Công nghệ theo hướng phát triển năng lực số cho HS",
    image: { background: "#fd7e14" },
    icon: <img src="/process-icons/step5.svg" alt="Step 5" className="step-icon" />
  }
];

const STEP_COLORS = [
  "#20c997", // Bước 1
  "#2c6fb2", // Bước 2
  "#f6c23e", // Bước 3
  "#28a745", // Bước 4
  "#fd7e14"  // Bước 5
];

const ProcessDetail = () => {
  const { id } = useParams();
  const initialStep = Number(id) || 1;
  const [activeStep, setActiveStep] = useState(initialStep);

  // Scroll to top when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveStep(initialStep);
    // eslint-disable-next-line
  }, [id]);

  return (
    <section className="process-detail-section process-detail-compact">
      <Container>
        <div className="process-steps-bar">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="process-step-bar-item">
              <div
                className={`process-step-circle${activeStep === s.id ? " active" : ""}`}
                style={{ background: STEP_COLORS[idx] }}
                onClick={() => setActiveStep(s.id)}
              >
                {s.icon}
              </div>
              <div className="process-step-label mt-2">{s.label}</div>
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
              {STEPS.map((step) => (
                <Carousel.Item key={step.id}>
                  <div
                    style={{
                      width: "100%",
                      height: 320,
                      background: STEP_COLORS[step.id - 1],
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 28,
                      fontWeight: 600,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
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
