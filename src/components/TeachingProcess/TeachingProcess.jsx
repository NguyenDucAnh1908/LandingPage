import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLOR_STEPS, DATA_PROCESSING } from "../../data";
import "./TeachingProcess.css";

export const TeachingProcess = () => {
  const navigate = useNavigate();

  return (
    <section id="teaching-process">
      <Container style={{ marginTop: "2.5rem" }}>
        <ListGroup variant="flush">
          <h4 className="fw-bold text-capitalize text-center">
            Quy trình xây dựng các hoạt động học tập phát triển năng lực số cho học sinh
            thông qua các môn Công nghệ ở tiểu học
          </h4>
          {DATA_PROCESSING.map((step, idx) => (
            <ListGroup.Item
              key={step.id}
              className="process-step"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              onClick={() => navigate(`/process/${step.id}`)}
            >
              <Row className="align-items-center">
                <Col xs={1}>
                  <div className="step-icon-wrapper">
                    <div
                      className="icon-box"
                      style={{ backgroundColor: COLOR_STEPS[idx] }}
                    >
                      <Image
                        src={`${import.meta.env.BASE_URL}process-icons/${
                          step.iconUrl
                        }`}
                        alt={`Step ${step.id}`}
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="step-number" style={{ color: "#000000" }}>
                      {step.label}
                    </span>
                  </div>
                </Col>
                <Col xs={11}>
                  <h5 className="step-title" style={{ color: "#000000" }}>
                    {step.title}
                  </h5>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};
