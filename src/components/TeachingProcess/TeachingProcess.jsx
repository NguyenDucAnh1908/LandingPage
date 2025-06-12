import {
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLOR_STEPS, DATA_PROCESSING } from "../../data";
import "./TeachingProcess.css";

export const TeachingProcess = () => {
  const navigate = useNavigate();

  return (
    <section id="teaching-process">
      <Container>
        <h4 className="font-volkhov fw-bold text-capitalize text-center mb-5">
          Đề xuất quy trình xây dựng các hoạt động học tập phát triển năng
          lực số cho học sinh thông qua môn Công nghệ ở tiểu học
        </h4>
        <ListGroup variant="flush">
          {DATA_PROCESSING.map((step, idx) => (
            <ListGroup.Item
              key={step.id}
              className="process-step"
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
                        src={`${import.meta.env.BASE_URL}process-icons/${step.iconUrl}`}
                        alt={`Step ${step.id}`}
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="step-number">{step.label}</span>
                  </div>
                </Col>
                <Col xs={11}>
                  <h5 className="step-title">{step.title}</h5>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};
