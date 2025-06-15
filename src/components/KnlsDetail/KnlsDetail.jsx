import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchKnlsImages } from "../../data";
import "./KnlsDetail.css";

const KnlsDetail = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchKnlsImages()
      .then(data => {
        setGallery(data.filter(item => item.id !== 1));
      })
      .catch(err => {
        setGallery([]);
      });
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
              {gallery.title}
            </h2>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="images-grid">
           {gallery.map(item => (
              <div
              key={item.id}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
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
