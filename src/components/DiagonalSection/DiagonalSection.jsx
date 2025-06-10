import { useState } from "react";
import { Card, Image } from "react-bootstrap";
import "./DiagonalSection.css";

const LESSON_DATA = [
  {
    title: "Minh Họa Bài 1",
    subtitle: "Bài 1",
    image:
      "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202025-06-10%20141336.png?alt=media&token=819a0be1-9d9a-4462-a2cd-05c1bbf5f663",
  },
  {
    title: "Minh Họa Bài 2",
    subtitle: "Bài 2",
    image:
      "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202025-06-10%20141336.png?alt=media&token=819a0be1-9d9a-4462-a2cd-05c1bbf5f663",
  },
  {
    title: "Minh Họa Bài 3",
    subtitle: "Bài 3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
  },
];

const DiagonalSection = () => {
  const [activeImage, setActiveImage] = useState(LESSON_DATA[0].image);

  return (
    <section className="diagonal-section position-relative">
      {/* Thêm tiêu đề section */}
      <div className="section-title">
        <h2>Minh Họa Bài Học</h2>
        <p>Bấm vào các minh họa để xem chi tiết</p>
      </div>

      <div className="full-image-container">
        <Image
          src={activeImage}
          alt="Main content"
          className="full-image"
          fluid
        />
      </div>
      <div className="overlay-content">
        <div className="cards-container">
          {LESSON_DATA.map((lesson, index) => (
            <Card
              key={index}
              className={`lesson-card ${
                activeImage === lesson.image ? "active" : ""
              }`}
              onClick={() => setActiveImage(lesson.image)}
            >
              <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
                <Card.Subtitle>{lesson.subtitle}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagonalSection;
