import { Button, Col, Container, Row } from "react-bootstrap";

import { SubmitIcon } from "../icons";
import "./Subscribe.css";

export const Subscribe = () => {
  return (
    <section id="subscribe" className="vh-100">
      <Container className="position-relative h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col md={10} lg={8} className="text-center py-5">
            <h3 className="text-center fw-semibold mb-5">
              Góp ý để chúng tôi phát triển tốt hơn
            </h3>
            <div className="d-flex justify-content-center mt-4">
              <Button
                className="subscribe-button"
                href="https://docs.google.com/forms/d/1V53GFF3DdVIzqYu5VTnO92oAObW_scVZ7hw0YPlSIWc/edit?hl=vi"
                target="_blank"
                type="submit"
                size="lg"
              >
                Đóng góp ý kiến
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
