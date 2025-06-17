import { Container } from "react-bootstrap";
import { fetchVideoLink } from "../../data";
import "./Hero.css";

export const Hero = () => {
  const videoLink = fetchVideoLink();

  return (
    <section id="hero">
      <Container className="video-container">
        <video controls autoPlay>
          <source src="images/videoplayback.mp4" type="video/mp4" />
        </video>
      </Container>
    </section>
  );
};
