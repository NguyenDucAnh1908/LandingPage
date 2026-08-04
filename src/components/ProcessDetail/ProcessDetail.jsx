import { useEffect, useState } from "react";
import { Carousel, Col, Container, Image, Row, Button } from "react-bootstrap";
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

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("teaching-process");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="process-detail-section">
      <Container>
        {/* Back Button */}
        <a href="/" onClick={handleReturn} className="return-button">
          ➔ Quay lại trang chủ
        </a>

        <div className="process-detail-card">
          {/* Steps Horizontal Bar */}
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
                    width={26}
                    height={26}
                    className="step-icon"
                  />
                </div>
                <div className="process-step-label">Bước {step.stepNumber}</div>
              </div>
            ))}
          </div>

          {/* Carousel Slide Area */}
          <Row className="justify-content-center">
            <Col lg={10} md={12}>
              <div className="process-carousel-wrapper">
                <Carousel
                  activeIndex={activeIndex}
                  controls={false}
                  indicators={false}
                  interval={null}
                  slide={false}
                >
                  {steps.map((step) => (
                    <Carousel.Item key={step.id}>
                      <Image
                        className="process-detail-content"
                        src={step.imageUrl}
                        alt={step.title}
                      />
                      <div className="carousel-caption-custom">
                        <h3>{step.title}</h3>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ProcessDetail;
