import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer, Hero, Menu, Survey, TeachingProcess } from "./components";
import ClassSection from "./components/ClassSection/ClassSection";
import Dashboard from "./components/Dashboard/Dashboard";
import Knls from "./components/Knls/Knls";
import KnlsDetail from "./components/KnlsDetail/KnlsDetail";
import LessonDetail from "./components/LessonDetail/LessonDetail";
import LessonIllustration from "./components/LessonIllustration/LessonIllustration";
import LessonIllustrationDetail from "./components/LessonIllustrationDetail/LessonIllustrationDetail";
import Login from "./components/Login/Login";
import ProcessDetail from "./components/ProcessDetail/ProcessDetail";
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
                <Hero />
                <Knls />
                <TeachingProcess />
                <ClassSection />
                <LessonIllustration />
                <Survey />
              </main>
            }
          />
          <Route path="/knls-detail" element={<KnlsDetail />} />
          <Route path="/lesson/:lessonId" element={<LessonDetail />} />
          <Route path="/lesson-illustration/:illustrationId" element={<LessonIllustrationDetail />} />
          <Route path="/process/:id" element={<ProcessDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
