import { Col, Container, Image, ListGroup, Row, Stack } from "react-bootstrap";
import { FOOTER } from "../../data";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="g-4 py-2" lg={5} md={3} sm={2} xs={1}>
          {/* Brand Panel */}
          <Col lg={3} md={12} sm={12} className="pe-lg-4">
            <h2 className="footer-brand-title">Năng Lực Số</h2>
            <p className="footer-brand-desc">
              Kiến tạo kiến thức số vững chắc và làm chủ các kỹ năng tương lai cho học sinh tiểu học.
            </p>
          </Col>

          {/* Footer Navigation Columns */}
          {FOOTER &&
            FOOTER.map((item) => (
              <Col key={item.id} lg={2} md={3} sm={4}>
                <strong className="footer-title">
                  {item.name}
                </strong>
                <ListGroup variant="flush" className="bg-transparent">
                  {item.children.map((child) => (
                    <ListGroup.Item
                      key={child.id}
                      action
                      href={child.link}
                      className="footer-link-item bg-transparent"
                    >
                      {child.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            ))}

          {/* Socials & Apps Block */}
          <Col lg={3} md={3} sm={12}>
            <strong className="footer-title">Kết nối với chúng tôi</strong>
            <div className="footer-socials">
              <div className="footer-social-icon facebook">
                <FacebookIcon />
              </div>
              <div className="footer-social-icon instagram">
                <InstagramIcon />
              </div>
              <div className="footer-social-icon twitter">
                <TwitterIcon />
              </div>
            </div>
            
            <p className="footer-apps-lbl">Tải ứng dụng học tập</p>
            <Stack direction="horizontal" gap={2}>
              <Image
                src={`/images/google-play.svg`}
                className="footer-app-badge"
                alt="Google Play Store"
              />
              <Image
                src={`/images/play-store.svg`}
                className="footer-app-badge"
                alt="Apple App Store"
              />
            </Stack>
          </Col>
        </Row>

        {/* Copyright Line */}
        <Row className="footer-copyright">
          <Col>
            <small>Bản quyền thuộc về NDA và DXP © 2026</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
