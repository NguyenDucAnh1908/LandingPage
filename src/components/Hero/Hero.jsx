import './Hero.css';

export const Hero = () => {
  return (
    <section id='hero'>
      <div className="video-container">
        <video controls autoPlay>
          <source
            src={`${import.meta.env.BASE_URL}images/video.mp4`}
            type='video/mp4'
          />
        </video>
      </div>
    </section>
  );
}
