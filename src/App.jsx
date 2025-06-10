import {
  Menu,
  Hero,
  Services,
  Destinations,
  BookTrip,
  Testimonials,
  Logos,
  Subscribe,
  Footer,
} from "./components";
import HeroIntroduction from "./components/HeroIntroduction/HeroIntroduction";
import Knls_v2 from "./components/Knls_v2/Knls_v2";
import Knls from "./components/Knls/Knls";
import { TeachingProcess } from "./components/TeachingProcess/TeachingProcess";
import ClassSection from "./components/ClassSection/ClassSection";
import DiagonalSection from "./components/DiagonalSection/DiagonalSection";

function App() {
  return (
    <>
      <Menu />
      <HeroIntroduction />
      <Hero />
      {/* <Knls_v2 /> */}
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
      <Footer />
    </>
  );
}

export default App;
