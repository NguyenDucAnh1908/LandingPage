import { useEffect, useState } from "react";
import { Accordion, Button, Container, Form, Image, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchLessons } from "../../data";
import "./ClassSection.css";

const ClassSection = () => {
  const [grades, setGrades] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editData, setEditData] = useState([]);
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    fetchLessons()
      .then((data) => setGrades(data))
      .catch((err) => setGrades([]));
  }, []);

  // Handlers for edit modal
  const openEdit = () => {
    setShowEdit(true);
    setEditLoading(true);
    fetchLessons()
      .then(data => setEditData(data.map(g => ({
        ...g,
        title: g.title || "",
        contents: g.contents.map(l => ({
          ...l,
          contentText: l.contentText || "",
          images: l.images ? l.images.map(img => ({ ...img, imageUrl: img.imageUrl || "" })) : []
        }))
      }))))
      .finally(() => setEditLoading(false));
  };
  const closeEdit = () => setShowEdit(false);

  // Xử lý thay đổi input
  const handleGradeTitleChange = (gradeId, value) => {
    setEditData(editData.map(g => g.id === gradeId ? { ...g, title: value } : g));
  };
  const handleLessonTextChange = (gradeId, lessonId, value) => {
    setEditData(editData.map(g => g.id === gradeId ? {
      ...g,
      contents: g.contents.map(l => l.id === lessonId ? { ...l, contentText: value } : l)
    } : g));
  };
  const handleImageUrlChange = (gradeId, lessonId, imageId, value) => {
    setEditData(editData.map(g => g.id === gradeId ? {
      ...g,
      contents: g.contents.map(l => l.id === lessonId ? {
        ...l,
        images: l.images.map(img => img.id === imageId ? { ...img, imageUrl: value } : img)
      } : l)
    } : g));
  };

  // Dummy handlers for actions
  const handleAddGrade = () => {
    const newId = Date.now();
    setEditData([
      ...editData,
      { id: newId, title: "", contents: [] }
    ]);
  };
  const handleDeleteGrade = (gradeId) => {
    if (window.confirm("Xóa lớp này?")) setEditData(editData.filter(g => g.id !== gradeId));
  };
  const handleAddLesson = (gradeId) => {
    setEditData(editData.map(g => g.id === gradeId ? {
      ...g,
      contents: [
        ...g.contents,
        { id: Date.now(), contentText: "", images: [] }
      ]
    } : g));
  };
  const handleDeleteLesson = (gradeId, lessonId) => {
    if (window.confirm("Xóa bài học này?")) setEditData(editData.map(g => g.id === gradeId ? {
      ...g,
      contents: g.contents.filter(l => l.id !== lessonId)
    } : g));
  };
  const handleAddImage = (gradeId, lessonId) => {
    setEditData(editData.map(g => g.id === gradeId ? {
      ...g,
      contents: g.contents.map(l => l.id === lessonId ? {
        ...l,
        images: [...(l.images || []), { id: Date.now(), imageUrl: "" }]
      } : l)
    } : g));
  };
  const handleDeleteImage = (gradeId, lessonId, imageId) => {
    if (window.confirm("Xóa ảnh này?")) setEditData(editData.map(g => g.id === gradeId ? {
      ...g,
      contents: g.contents.map(l => l.id === lessonId ? {
        ...l,
        images: l.images.filter(img => img.id !== imageId)
      } : l)
    } : g));
  };

  // Dummy save handler
  const handleSaveGrade = (gradeId) => {
    alert("Lưu lớp: " + JSON.stringify(editData.find(g => g.id === gradeId), null, 2));
  };

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

        <div className="mb-3 text-end">
          {loggedIn && (
            <Button variant="outline-primary" onClick={openEdit}>
              Edit
            </Button>
          )}
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

        {/* Edit Modal */}
        <Modal show={showEdit} onHide={closeEdit} size="lg" scrollable>
          <Modal.Header closeButton>
            <Modal.Title>Quản lý lớp, bài học, ảnh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editLoading ? (
              <div className="text-center py-5"><Spinner /></div>
            ) : (
              <>
                <Button variant="success" className="mb-3" onClick={handleAddGrade}>
                  + Thêm lớp
                </Button>
                {editData.map(grade => (
                  <div key={grade.id} className="mb-4 border rounded p-2">
                    <div className="d-flex align-items-center mb-2">
                      <Form.Control
                        type="text"
                        value={grade.title}
                        onChange={e => handleGradeTitleChange(grade.id, e.target.value)}
                        placeholder="Tên lớp"
                        className="me-2"
                        style={{ maxWidth: 300 }}
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDeleteGrade(grade.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                    <ul className="list-unstyled">
                      {grade.contents.map(lesson => (
                        <li key={lesson.id} className="mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <Form.Control
                              type="text"
                              value={lesson.contentText}
                              onChange={e => handleLessonTextChange(grade.id, lesson.id, e.target.value)}
                              placeholder="Tên bài học"
                              className="me-2"
                              style={{ maxWidth: 400 }}
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="me-2"
                              onClick={() => handleDeleteLesson(grade.id, lesson.id)}
                            >
                              Xóa
                            </Button>
                          </div>
                          <div className="d-flex flex-wrap gap-2 mt-2">
                            {lesson.images && lesson.images.map(img => (
                              <div key={img.id} style={{ position: "relative" }}>
                                <Form.Control
                                  type="text"
                                  value={img.imageUrl}
                                  onChange={e => handleImageUrlChange(grade.id, lesson.id, img.id, e.target.value)}
                                  placeholder="Link ảnh"
                                  style={{ width: 180, marginBottom: 4 }}
                                />
                                <img
                                  src={img.imageUrl}
                                  alt=""
                                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                                />
                                <Button
                                  variant="danger"
                                  size="sm"
                                  style={{
                                    position: "absolute",
                                    top: 2,
                                    right: 2,
                                    padding: "0 6px",
                                    fontSize: 12,
                                  }}
                                  onClick={() => handleDeleteImage(grade.id, lesson.id, img.id)}
                                >
                                  X
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleAddImage(grade.id, lesson.id)}
                            >
                              + Thêm ảnh
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="text-end">
                      <Button variant="primary" size="sm" onClick={() => handleAddLesson(grade.id)}>
                        + Thêm bài học
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleSaveGrade(grade.id)}
                      >
                        Lưu
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default ClassSection;
