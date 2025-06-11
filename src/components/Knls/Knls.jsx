import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./knls.css";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
];

const Knls = () => {
  return (
    <section id="knls">
      <Container>
        <h3 className="fw-semibold font-poppins">Khung năng lực số</h3>
        <h4 className="font-volkhov fw-bold text-capitalize text-center">
          Khung năng lực số
        </h4>
        <div className="position-relative mt-4">
          {images.map((image, index) => (
            <div className="slider-item" key={index}>
              <img
                src={image}
                alt={`slide-${index + 1}`}
                className="knls-image"
              />
              <Link
                to="/knls-detail"
                className="detail-button"
              >
                Next
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Knls;
