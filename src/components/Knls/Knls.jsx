import { Image } from "antd";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchKnlsImages } from "../../data";
import "./knls.css";

const Knls = () => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchKnlsImages()
      .then((data) => {
        const thumb = data.find((item) => item.id === 1);
        setThumbnail(
          thumb.imageUrl
            ? { imageUrl: thumb.imageUrl, title: thumb.title }
            : null
        );
      })
      .catch((err) => {
        setThumbnail({
          imageUrl: "images/image_web/1.1.Khung_nang_luc_so_Home.png",
          title: "Khung năng lực số"
        });
      });
  }, []);

  return (
    <section id="knls">
      <Container className="knls-container">
        <div className="section-header">
          <h3>Khung Năng Lực Số</h3>
          <h4>Khung Năng Lực Số Dành Cho Học Sinh Tiểu Học</h4>
          <p>Tìm hiểu các nhóm năng lực số cốt lõi giúp các em tự tin hội nhập thời đại công nghệ.</p>
        </div>
        
        <div className="knls-card">
          <div className="knls-image-wrapper">
            <Image
              width="100%"
              preview={false}
              alt={thumbnail?.title || "Khung năng lực số"}
              src="images/image_web/1.1.Khung_nang_luc_so_Home.png"
            />
          </div>
          <Link to="/knls-detail" className="detail-floating-btn">
            Xem chi tiết khung ➔
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Knls;
