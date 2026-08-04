import { Container } from "react-bootstrap";
import { fetchVideoLink } from "../../data";
import "./Hero.css";
import ReactPlayer from "react-player";

export const Hero = () => {
  const videoLink = fetchVideoLink();

  return (
    <section id="hero">
      <Container>
        <div className="hero-grid">
          {/* Left content block */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              🎓 Giáo Dục Tiểu Học
            </div>
            <h1 className="hero-headline">
              Phát Triển <span>Năng Lực Số</span> Cho Học Sinh Tiểu Học
            </h1>
            <p className="hero-subtext">
              Sổ tay hướng dẫn phát triển năng lực số thông qua môn Công nghệ cấp tiểu học, giúp làm chủ kỹ thuật số.
            </p>
            <div className="hero-ctas">
              <a href="#class-section" className="btn btn-hero-primary d-inline-flex align-items-center justify-content-center">
                Sổ tay bài học
              </a>
              <a href="#knls" className="btn btn-hero-secondary d-inline-flex align-items-center justify-content-center">
                Khung năng lực số
              </a>
            </div>
          </div>

          {/* Right visual video block */}
          <div className="video-frame-wrapper">
            <div className="video-frame-inner">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=vCAOGPCO6dQ8&feature=youtu.be"
                controls
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
