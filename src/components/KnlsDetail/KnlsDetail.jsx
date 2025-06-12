import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("knls");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="knls-detail">
      <Container>
        <div className="header-section">
          <div className="header-content">
            <Link
              to="/"
              onClick={handleReturn}
              className="return-button"
            >
              Quay lại
            </Link>
            <h2 className="font-volkhov fw-bold text-center">Chi tiết Khung năng lực số</h2>
          </div>
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
