import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./ClassSection.css";

const CLASS_DATA = [
  {
    grade: "Lớp 3",
    items: ["1.ABC", "2.XYZ", "3.BTS", "..."],
  },
  {
    grade: "Lớp 4",
    items: ["1.ABC", "2.XYZ", "3.BTS", "..."],
  },
  {
    grade: "Lớp 5",
    items: ["1.ABC", "2.XYZ", "3.BTS", "..."],
  },
];

const ClassSection = () => {
  return (
    <section className="class-section py-5">
      <Container>
        <h2 className="text-center mb-4">Sổ tay</h2>
        <h3 className="text-center mb-5">
          Bồi dưỡng năng lực số cho học sinh tiểu học thông qua môn Công nghệ
        </h3>

        {/* Thêm ảnh ở giữa */}
        <div className="text-center mb-5">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202025-06-10%20141336.png?alt=media&token=819a0be1-9d9a-4462-a2cd-05c1bbf5f663"
            alt="Class Section Image"
            fluid
            className="section-image"
            style={{
              width: "100%",
              height: "500px", // Giảm chiều cao xuống
              maxWidth: "900px", // Giới hạn chiều rộng tối đa
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "0 auto", // Căn giữa ảnh
            }}
          />
        </div>

        <Row className="justify-content-center">
          {CLASS_DATA.map((classData, index) => (
            <Col md={2} sm={4} key={index}>
              {" "}
              {/* Giảm từ md={3} xuống md={2} và sm={6} xuống sm={4} */}
              <Card
                className="class-card mb-4"
                style={{
                  maxWidth: "180px", // Giảm từ 250px xuống 180px
                  margin: "0 auto",
                  fontSize: "0.9rem", // Giảm kích thước chữ
                }}
              >
                <Card.Header className="text-center fw-bold py-1">
                  {" "}
                  {/* Giảm padding-y */}
                  {classData.grade}
                </Card.Header>
                <Card.Body className="py-1">
                  {" "}
                  {/* Giảm padding-y */}
                  <ul className="list-unstyled mb-0">
                    {classData.items.map((item, idx) => (
                      <li key={idx} className="mb-1 small">
                        {" "}
                        {/* Giảm margin-bottom */}
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ClassSection;
