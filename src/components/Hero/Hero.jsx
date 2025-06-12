import { Container } from 'react-bootstrap';
import './Hero.css';

export const Hero = () => {
  return (
    <section id='hero'>
      <Container className='video-container'>
        <video controls autoPlay>
          <source
            src={`${import.meta.env.BASE_URL}images/video.mp4`}
            type='video/mp4'
          />
        </video>
      </Container>
    </section>
  );
}
