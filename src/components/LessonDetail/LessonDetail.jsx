import {
  ArrowLeftOutlined,
  BookOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLessons } from "../../data";
import "./LessonDetail.css";

const { Content, Sider } = Layout;

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

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("class-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="lesson-detail">
      <Container>
        {/* Nút quay lại */}

        <Layout>
          <Sider
            width={300}
            style={{
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              height: "100vh",
              // overflow: "auto",
            }}
          >
            {/* Nút Back */}
            <div
              style={{
                padding: "24px 16px 0 16px",
                background: colorBgContainer,
              }}
            >
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={handleReturn}
                style={{ padding: 0, fontWeight: 500 }}
              >
                Quay lại
              </Button>
            </div>
            <Menu
              mode="inline"
              style={{
                height: "100%",
                borderRight: 0,
                paddingTop: "24px", // Giảm padding vì đã có nút back
              }}
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
                      <Image
                        key={image.id}
                        src={image.imageUrl}
                        alt={selectedLesson.contentText}
                        className="lesson-image"
                      />
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
