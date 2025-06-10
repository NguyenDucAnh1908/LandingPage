import {
  BookTrip,
  Destinations,
  Footer,
  Hero,
  Logos,
  Menu,
  Services,
  Subscribe,
  Testimonials,
} from "./components";
import ClassSection from "./components/ClassSection/ClassSection";
import DiagonalSection from "./components/DiagonalSection/DiagonalSection";
import HeroIntroduction from "./components/HeroIntroduction/HeroIntroduction";
import Knls from "./components/Knls/Knls";
import { TeachingProcess } from "./components/TeachingProcess/TeachingProcess";

function App() {
  return (
    <div className="app-wrapper">
      <Menu />
      <div className="app-container">
        <div className="main-content">
          <HeroIntroduction />
          <Hero />
          <Knls />
          <TeachingProcess />
          <ClassSection />
          <DiagonalSection />
          <Services />
          <Destinations />
          <BookTrip />
          <Testimonials />
          <Logos />
          <Subscribe />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
