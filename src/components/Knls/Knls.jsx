import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { DIGITAL_FRAMEWORK } from "../../data";
import "./knls.css";

const Knls = () => {
  return (
    <section id="knls">
      <Container>
        <h3 className="fw-semibold font-poppins">Khung năng lực số</h3>
        <h4 className="font-volkhov fw-bold text-capitalize text-center">
          Khung năng lực số
        </h4>
        <div className="position-relative mt-4">
            <div className="slider-item">
              <img
                src={DIGITAL_FRAMEWORK[0].thumbnailUrl}
                alt={DIGITAL_FRAMEWORK[0].title}
                className="knls-image"
              />
              <Link
                to="/knls-detail"
                className="detail-button"
              >
                Chi tiết
              </Link>
            </div>
        </div>
      </Container>
    </section>
  );
};

export default Knls;
