import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer, Hero, Menu } from "./components";
import ClassSection from "./components/ClassSection/ClassSection";
import HeroIntroduction from "./components/HeroIntroduction/HeroIntroduction";
import Knls from "./components/Knls/Knls";
import KnlsDetail from "./components/KnlsDetail/KnlsDetail";
import LessonDetail from "./components/LessonDetail/LessonDetail";
import LessonPlan from "./components/LessonPlan/LessonPlan";
import LessonPlanDetail from "./components/LessonPlanDetail/LessonPlanDetail";
import ProcessDetail from "./components/ProcessDetail/ProcessDetail";
import { Subscribe } from "./components/Subscribe/Subscribe";
import { TeachingProcess } from "./components/TeachingProcess/TeachingProcess";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <HeroIntroduction />
                <Hero />
                <Knls />
                <TeachingProcess />
                <ClassSection />
                <LessonPlan />
                <Subscribe />
                {/* <Survey /> */}
              </main>
            }
          />
          <Route
            path="/knls-detail"
            element={<KnlsDetail />}
          />
          <Route
            path="/lesson/:lessonId"
            element={<LessonDetail/>}
          />
          <Route path="/lesson-plan/:lessonId" element={<LessonPlanDetail />} />
          <Route path="/process/:id" element={<ProcessDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
