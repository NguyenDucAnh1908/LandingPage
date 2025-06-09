import "./knls_v2.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const images = [
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/c3bdfcba-d9ca-4fbf-b14d-b0eb4121f611.jpg?alt=media&token=97721798-9a39-4826-b70d-bdbace394b8b",
];

const knls_v2 = () => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <section className="hero-section">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div className="slider-item" key={index}>
              <img
                src={image}
                alt={`slide-${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default knls_v2;
