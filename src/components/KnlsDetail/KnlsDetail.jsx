import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./KnlsDetail.css";

const tempImages = [
  {
    id: 1,
    backgroundColor: '#2c6fb2',
    title: 'Khung năng lực số 1'
  },
  {
    id: 2,
    backgroundColor: '#dc3545',
    title: 'Khung năng lực số 2'
  }
];

const KnlsDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="knls-detail">
      <Container>
        <div className="header-section">
          <h2 className="font-volkhov fw-bold">Chi tiết Khung năng lực số</h2>
          <Link to="/" className="return-button">
            Quay lại
          </Link>
        </div>
        <div className="content-wrapper">
          <div className="images-grid">
            {tempImages.map(image => (
              <div
                key={image.id}
                className="image-placeholder"
                style={{ backgroundColor: image.backgroundColor }}
              >
                <span>{image.title}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default KnlsDetail;
