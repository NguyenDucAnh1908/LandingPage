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
import Knls from "./components/Knls/Knls";
import { TeachingProcess } from "./components/TeachingProcess/TeachingProcess";

function App() {
  return (
    <>
      <Menu />
      <HeroIntroduction />
      <Hero />
      <Knls />
      <TeachingProcess />
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
