import { Image } from "antd";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchKnlsImages } from "../../data";
import "./KnlsDetail.css";

const KnlsDetail = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setLoading(true);
  setError(null);

  fetchKnlsImages()
    .then(data => {
      setGallery(data.filter(item => item.id !== 1));
    })
    .catch(err => {
      setError("Lỗi tải dữ liệu hình ảnh");
      setGallery([]);
    })
    .finally(() => {
      setLoading(false);
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
          <Link to="/" onClick={handleReturn} className="return-button">
            Quay lại
          </Link>
          <h2 className="font-volkhov fw-bold text-center">
            Khung năng lực số
          </h2>
        </div>
      </div>

      <div className="content-wrapper">
        {loading && <p className="text-center">Đang tải dữ liệu...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <div className="images-grid ant-grid">
            {gallery.map(item => (
              <div className="image-card" key={item.id}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="detail-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  </section>

  );
};

export default KnlsDetail;
