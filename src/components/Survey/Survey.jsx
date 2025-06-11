import { Button, Col, Container, Row } from 'react-bootstrap';

import './Survey.css';

export const Survey = () => {
  return (
    <section id='feedback' className='vh-100'>
      <Container className='position-relative'>
        <Row className='d-flex justify-content-center align-items-center h-100'>
          <Col md={10} lg={8} className='text-center'>
            <h3 className='fw-semibold mb-4'>
              Góp ý để chúng tôi phát triển tốt hơn
            </h3>
            <Button
              href="https://forms.gle/your-survey-link"
              target="_blank"
              size="lg"
              className='survey-button'
            >
              Đóng góp ý kiến
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
