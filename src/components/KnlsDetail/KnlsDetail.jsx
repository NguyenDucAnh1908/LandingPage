import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DIGITAL_FRAMEWORK } from "../../data";
import "./KnlsDetail.css";

const KnlsDetail = () => {
  const navigate = useNavigate();
  const knlsData = DIGITAL_FRAMEWORK[0]; // Get the first (and only) item

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
            <h2 className="font-volkhov fw-bold text-center">
              {knlsData.title}
            </h2>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="images-grid">
            {knlsData.images.map(image => (
              <div
                key={image.id}
                className="image-placeholder"
                style={{ backgroundColor: image.backgroundColor }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${image.url}`}
                  alt={`${knlsData.title} - Hình ${image.id}`}
                  className="detail-image"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default KnlsDetail;
