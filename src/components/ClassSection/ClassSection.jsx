import { Accordion, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ClassSection.css";

const CLASS_DATA = [
  {
    grade: "Lớp 3",
    items: [
      { id: "3-1", title: "1. Bài 1: Giới thiệu về công nghệ" },
      { id: "3-2", title: "2. Bài 2: Công nghệ trong cuộc sống" },
      { id: "3-3", title: "3. Bài 3: Ứng dụng công nghệ" },
      { id: "3-4", title: "4. Bài 4: Thực hành với công nghệ" },
    ],
  },
  {
    grade: "Lớp 4",
    items: [
      { id: "4-1", title: "1. Bài 1: Giới thiệu về công nghệ" },
      { id: "4-2", title: "2. Bài 2: Công nghệ trong cuộc sống" },
      { id: "4-3", title: "3. Bài 3: Ứng dụng công nghệ" },
      { id: "4-4", title: "4. Bài 4: Thực hành với công nghệ" },
    ],
  },
  {
    grade: "Lớp 5",
    items: [
      { id: "5-1", title: "1. Bài 1: Giới thiệu về công nghệ" },
      { id: "5-2", title: "2. Bài 2: Công nghệ trong cuộc sống" },
      { id: "5-3", title: "3. Bài 3: Ứng dụng công nghệ" },
      { id: "5-4", title: "4. Bài 4: Thực hành với công nghệ" },
    ],
  },
];

const ClassSection = () => {
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
            maxWidth: "900px",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            margin: "0 auto",
          }}
        />
      </div>

      <div className="class-accordion-container">
        <div className="horizontal-accordion-wrapper">
          {CLASS_DATA.map((classData, index) => (
            <Accordion key={index} className="class-item">
              <Accordion.Item eventKey="0">
                <Accordion.Header>{classData.grade}</Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled mb-0">
                    {classData.items.map((item) => (
                      <Link
                        to={`/lesson/${item.id}`}
                        key={item.id}
                        className="lesson-link"
                      >
                        <li className="lesson-item">{item.title}</li>
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
