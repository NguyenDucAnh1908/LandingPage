import { Container } from "react-bootstrap";
import { fetchVideoLink } from "../../data";
import "./Hero.css";
import ReactPlayer from "react-player";
export const Hero = () => {
  const videoLink = fetchVideoLink();

  return (
    <section id="hero">
      <Container className="video-container">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=u20ACw45_N8&feature=youtu.be"
          controls
          width="100%"
          height="100%"
        />
      </Container>
    </section>
  );
};
