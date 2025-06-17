import { Col, Container, Image, ListGroup, Row, Stack } from "react-bootstrap";

import { FOOTER } from "../../data";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <section id="footer">
        <Container>
          <Row className="py-3 g-3" lg={5} md={4} sm={3} xs={2}>
            <Col>
              <h2>HỌC</h2>
              <small className="fw-medium">
                trong phút chốc, làm chủ kiến thức cả đời.
              </small>
            </Col>

            {FOOTER &&
              FOOTER.map((item) => (
                <Col key={item.id}>
                  {/* Footer List Titles */}
                  <strong className="footer-title text-dark mb-0 mb-sm-3">
                    {item.name}
                  </strong>
                  <ListGroup variant="flush">
                    {/* Footer List Items */}
                    {item.children.map((child) => (
                      <ListGroup.Item
                        key={child.id}
                        action
                        href={child.link}
                        className="border-bottom-0 p-0 my-1 fw-medium"
                      >
                        {child.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              ))}

            <Col>
              {/* Social Icons */}
              <div className="social-icon d-flex flex-row gap-4">
                <div className="rounded-circle border-0 d-flex justify-content-center align-items-center">
                  <FacebookIcon />
                </div>
                <div className="rounded-circle border-0 d-flex justify-content-center align-items-center">
                  <InstagramIcon />
                </div>
                <div className="rounded-circle border-0 d-flex justify-content-center align-items-center">
                  <TwitterIcon />
                </div>
              </div>
              {/* Apps */}
              <p className="my-3">Khám phá ứng dụng của chúng tôi</p>
              <Stack direction="horizontal" gap={2}>
                <Image
                  src={`/images/google-play.svg`}
                  className="object-fit-cover"
                  alt="Google Play"
                />
                <Image
                  src={`/images/play-store.svg`}
                  className="object-fit-cover"
                  alt="Play Store"
                />
              </Stack>
            </Col>
          </Row>

          <Row className="text-center py-5">
            <small className="fw-medium">All rights NDA&DXP</small>
          </Row>
        </Container>
      </section>
    </footer>
  );
};
