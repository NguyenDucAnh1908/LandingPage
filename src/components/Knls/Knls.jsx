import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchKnlsImages } from "../../data";
import "./knls.css";
import { Image } from "antd";

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
        setThumbnail(
          "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7"
        );
      });
  }, []);
  return (
    <section id="knls">
      <Container>
        {/* <h3 className="fw-semibold font-poppins">Khung năng lực số</h3> */}
        <h4 className="font-volkhov fw-bold text-capitalize text-center">
          Khung năng lực số
        </h4>
        <div className="position-relative mt-4">
          <div className="slider-item">
            {thumbnail && (
              // <img
              //   // src={thumbnail.imageUrl}
              //   src="public\images\image_web\1.1. Khung_nang_luc_so_Home.png"
              //   alt={thumbnail.title}
              //   className="knls-image"
              // />
              <Image
                // width={1000}
                width="100%"
                height={600}
                src="public\images\image_web\1.1.Khung_nang_luc_so_Home.png"
              />
            )}
            <Link to="/knls-detail" className="detail-button">
              Chi tiết
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Knls;
