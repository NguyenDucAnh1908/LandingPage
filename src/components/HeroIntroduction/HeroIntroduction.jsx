import "./HeroIntroduction.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const images = [
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/c3bdfcba-d9ca-4fbf-b14d-b0eb4121f611.jpg?alt=media&token=97721798-9a39-4826-b70d-bdbace394b8b",
];

const HeroIntroduction = () => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <button className="slick-prev">←</button>,
    nextArrow: <button className="slick-next">→</button>,
  };
  return (
    <>
      <section className="hero-introduction-section pt-2 mt-3">
        {" "}
        {/* Thêm class riêng */}
        <Slider {...settings} className="hero-introduction-slider">
          {" "}
          {/* Thêm class riêng */}
          {images.map((image, index) => (
            <div className="hero-introduction-item" key={index}>
              {" "}
              {/* Thêm class riêng */}
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

export default HeroIntroduction;
