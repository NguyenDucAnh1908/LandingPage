import { useEffect, useState } from "react";
import { Accordion, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchLessons } from "../../data";
import "./ClassSection.css";

const ClassSection = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchLessons()
      .then((data) => setGrades(data))
      .catch((err) => setGrades([]));
  }, []);

  return (
    <section id="class-section">
      <Container>
        <div className="text-center mb-4 mt-5">
          <h2>Sổ tay</h2>
          <h3>
            Bồi dưỡng năng lực số cho học sinh tiểu học thông qua môn Công nghệ
          </h3>
        </div>

        <div className="text-center mb-5">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202025-06-10%20141336.png?alt=media&token=819a0be1-9d9a-4462-a2cd-05c1bbf5f663"
            alt="Class Section Image"
            fluid
            className="section-image"
            style={{
              width: "100%",
              height: "500px",
              maxWidth: "1318px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "0 auto",
            }}
          />
        </div>

        <div className="class-accordion-container">
          <div className="horizontal-accordion-wrapper">
            {grades.map((grade) => (
              <Accordion key={grade.id} className="class-item">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{grade.title}</Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled mb-0">
                      {grade.contents.map((lesson) => (
                        <Link
                          to={`/lesson/${lesson.id}`}
                          key={lesson.id}
                          className="lesson-link"
                        >
                          <li className="lesson-item">{lesson.contentText}</li>
                        </Link>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClassSection;
