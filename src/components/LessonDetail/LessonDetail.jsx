import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Layout, Menu, theme } from "antd";
import { BookOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessons } from "../../data";
import "./LessonDetail.css";

const { Header, Content, Sider } = Layout;

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch grades and lessons from API
  useEffect(() => {
    fetchLessons()
      .then((data) => {
        setGrades(data);

        // Tìm lesson theo id trong tất cả grades
        let foundLesson = null;
        let foundGradeTitle = null;
        for (const grade of data) {
          const lesson = grade.contents.find(
            (l) => String(l.id) === String(lessonId)
          );
          if (lesson) {
            foundLesson = lesson;
            foundGradeTitle = grade.title;
            break;
          }
        }
        setSelectedLesson(foundLesson);
        setExpandedGrade(foundGradeTitle);
      })
      .catch(() => {
        setGrades([]);
        setSelectedLesson(null);
        setExpandedGrade(null);
      });
  }, [lessonId]);

  const handleGradeToggle = (gradeTitle) => {
    setExpandedGrade(expandedGrade === gradeTitle ? null : gradeTitle);
  };

  const handleLessonClick = (lesson, gradeTitle) => {
    setSelectedLesson(lesson);
    setExpandedGrade(gradeTitle);
    navigate(`/lesson/${lesson.id}`);
  };

  // Transform grades data into menu items structure
  const menuItems = grades.map((grade) => ({
    key: `grade-${grade.id}`,
    icon: React.createElement(BookOutlined),
    label: grade.title,
    children: grade.contents.map((lesson) => ({
      key: `lesson-${lesson.id}`,
      icon: React.createElement(FileTextOutlined),
      label: lesson.contentText,
      onClick: () => handleLessonClick(lesson, grade.title),
    })),
  }));

  return (
    <section className="lesson-detail">
      <Container>
        <Layout>
          <Sider width={300} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              items={menuItems}
              defaultOpenKeys={[`grade-${grades[0]?.id}`]}
              selectedKeys={[`lesson-${selectedLesson?.id}`]}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="lesson-container">
                <div className="lesson-images-grid">
                  {selectedLesson &&
                    selectedLesson.images &&
                    selectedLesson.images.map((image) => (
                      <div
                        key={image.id}
                        className="lesson-image"
                        // Nếu có backgroundColor thì dùng, không thì bỏ qua
                        style={
                          image.backgroundColor
                            ? { backgroundColor: image.backgroundColor }
                            : {}
                        }
                      >
                        <img
                          src={image.imageUrl}
                          alt={selectedLesson.contentText}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Container>
    </section>
  );
};

export default LessonDetail;
