import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./HeroIntroduction.css";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-prev" onClick={onClick}>
      ←
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-next" onClick={onClick}>
      →
    </button>
  );
};

const images = [
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/c3bdfcba-d9ca-4fbf-b14d-b0eb4121f611.jpg?alt=media&token=97721798-9a39-4826-b70d-bdbace394b8b",
];

const HeroIntroduction = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <>
      <section className="hero-introduction-section pt-2 mt-5" id="hero-introduction">
        <Slider {...settings} className="hero-introduction-slider">
          {images.map((image, index) => (
            <div className="hero-introduction-item" key={index}>
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
