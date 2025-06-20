import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  Image,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  deleteGrade,
  deleteLessonContent,
  deleteLessonImage,
  fetchLessons,
  saveGrade,
} from "../../data";
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
      .catch(() => setGrades([]));
  }, []);

  // Handlers for edit modal
  const openEdit = () => {
    setShowEdit(true);
    setEditLoading(true);
    fetchLessons()
      .then((data) =>
        setEditData(
          data.map((g) => ({
            ...g,
            title: g.title || "",
            contents: g.contents.map((l) => ({
              ...l,
              contentText: l.contentText || "",
              images: l.images
                ? l.images.map((img) => ({
                    ...img,
                    imageUrl: img.imageUrl || "",
                  }))
                : [],
            })),
          }))
        )
      )
      .finally(() => setEditLoading(false));
  };
  const closeEdit = () => setShowEdit(false);

  // Xử lý thay đổi input
  const handleGradeTitleChange = async (gradeId, value) => {
    setEditData(
      editData.map((g) => (g.id === gradeId ? { ...g, title: value } : g))
    );
    // Cập nhật tiêu đề lớp học
  };
  const handleLessonTextChange = (gradeId, lessonId, value) => {
    setEditData(
      editData.map((g) =>
        g.id === gradeId
          ? {
              ...g,
              contents: g.contents.map((l) =>
                l.id === lessonId ? { ...l, contentText: value } : l
              ),
            }
          : g
      )
    );
  };
  const handleImageUrlChange = (gradeId, lessonId, imageId, value) => {
    setEditData(
      editData.map((g) =>
        g.id === gradeId
          ? {
              ...g,
              contents: g.contents.map((l) =>
                l.id === lessonId
                  ? {
                      ...l,
                      images: l.images.map((img) =>
                        img.id === imageId ? { ...img, imageUrl: value } : img
                      ),
                    }
                  : l
              ),
            }
          : g
      )
    );
  };

  // Dummy handlers for actions
  const handleAddGrade = () => {
    const newGrade = { title: "", contents: [] };
    setEditData((prev) => [...prev, newGrade]);

    setTimeout(() => {
      const modalBody = document.querySelector(".modal-body");
      if (modalBody) modalBody.scrollTop = modalBody.scrollHeight;
    }, 100);
  };

  const handleAddLesson = (gradeId) => {
    setEditData(
      editData.map((g) =>
        g.id === gradeId
          ? {
              ...g,
              contents: [...g.contents, { contentText: "", images: [] }],
            }
          : g
      )
    );
  };

  const handleDeleteGrade = async (gradeId) => {
    if (!window.confirm("Xóa lớp này?")) return;

    // Nếu là lớp chưa có ID (tức chưa lưu vào DB)
    if (!gradeId) {
      setEditData(editData.filter((g) => g.id !== gradeId));
      return;
    }

    try {
      await deleteGrade(gradeId);
      setEditData(editData.filter((g) => g.id !== gradeId));
      setGrades(grades.filter((g) => g.id !== gradeId));
    } catch (err) {
      alert("Xóa lớp không thành công");
    }
  };

  // const handleDeleteLesson = (gradeId, lessonId) => {
  //   if (window.confirm("Xóa bài học này?")) return;
  //   setEditData(
  //     editData.map((g) =>
  //       g.id === gradeId
  //         ? {
  //             ...g,
  //             contents: g.contents.filter((l) => l.id !== lessonId),
  //           }
  //         : g
  //     )
  //   );
  // };

  const handleDeleteLesson = async (gradeId, lessonId) => {
    if (!window.confirm("Xóa bài học này?")) return;

    // Nếu là bài học chưa có ID
    if (!lessonId) {
      setEditData(
        editData.map((g) =>
          g.id === gradeId
            ? {
                ...g,
                contents: g.contents.filter((l) => l.id !== lessonId),
              }
            : g
        )
      );
      return;
    }

    try {
      await deleteLessonContent(lessonId);
      setEditData(
        editData.map((g) =>
          g.id === gradeId
            ? {
                ...g,
                contents: g.contents.filter((l) => l.id !== lessonId),
              }
            : g
        )
      );
      setGrades(
        grades.map((g) =>
          g.id === gradeId
            ? {
                ...g,
                contents: g.contents.filter((l) => l.id !== lessonId),
              }
            : g
        )
      );
    } catch (err) {
      alert("Xóa bài học không thành công");
    }
  };

  // const handleDeleteImage = (gradeId, lessonId, imageId) => {
  //   if (window.confirm("Xóa ảnh này?")) setEditData(editData.map(g => g.id === gradeId ? {
  //     ...g,
  //     contents: g.contents.map(l => l.id === lessonId ? {
  //       ...l,
  //       images: l.images.filter(img => img.id !== imageId)
  //     } : l)
  //   } : g));
  // };

  const handleDeleteImage = async (gradeId, lessonId, imageId) => {
    if (!window.confirm("Xóa ảnh này?")) return;

    // Nếu là ảnh chưa có ID
    if (!imageId) {
      setEditData(
        editData.map((g) =>
          g.id === gradeId
            ? {
                ...g,
                contents: g.contents.map((l) =>
                  l.id === lessonId
                    ? {
                        ...l,
                        images: l.images.filter((img) => img.id !== imageId),
                      }
                    : l
                ),
              }
            : g
        )
      );
      return;
    }

    try {
      await deleteLessonImage(imageId);
      setEditData(
        editData.map((g) =>
          g.id === gradeId
            ? {
                ...g,
                contents: g.contents.map((l) =>
                  l.id === lessonId
                    ? {
                        ...l,
                        images: l.images.filter((img) => img.id !== imageId),
                      }
                    : l
                ),
              }
            : g
        )
      );
      setGrades(
        grades.map((g) =>
          g.id === gradeId
            ? {
                ...g,
                contents: g.contents.map((l) =>
                  l.id === lessonId
                    ? {
                        ...l,
                        images: l.images.filter((img) => img.id !== imageId),
                      }
                    : l
                ),
              }
            : g
        )
      );
    } catch (err) {
      alert("Xóa ảnh không thành công");
    }
  };

  const handleAddImage = (gradeId, lessonId) => {
    setEditData(
      editData.map((g) =>
        g.id === gradeId
          ? {
              ...g,
              contents: g.contents.map((l) =>
                l.id === lessonId
                  ? {
                      ...l,
                      images: [...(l.images || []), { imageUrl: "" }],
                    }
                  : l
              ),
            }
          : g
      )
    );
  };

  const handleSaveGrade = async (gradeId) => {
    const grade = editData.find((g) => g.id === gradeId);
    if (!grade) return;

    const payload = {
      ...(grade.id ? { id: grade.id } : {}),
      title: grade.title || "",
      grade: grade.title || "",
      lessonNumber: grade.contents.length,
      orderIndex: 0,
      contents: grade.contents.map((lesson, index) => ({
        ...(lesson.id ? { id: lesson.id } : {}),
        contentText: lesson.contentText || "",
        contentType: "TEXT",
        orderIndex: index,
        backgroundColor: "#ffffff",
        images: (lesson.images || []).map((img) => ({
          ...(img.id ? { id: img.id } : {}),
          imageUrl: img.imageUrl || "",
        })),
      })),
    };

    try {
      await saveGrade(payload);
      alert("Lưu lớp thành công");

      // ✅ Load lại dữ liệu mới nhất
      const freshData = await fetchLessons();
      setGrades(freshData); // cập nhật bên ngoài
      setEditData(
        freshData.map((g) => ({
          ...g,
          title: g.title || "",
          contents: g.contents.map((l) => ({
            ...l,
            contentText: l.contentText || "",
            images: l.images
              ? l.images.map((img) => ({
                  ...img,
                  imageUrl: img.imageUrl || "",
                }))
              : [],
          })),
        }))
      ); // cập nhật trong modal
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      alert("Lỗi khi lưu: " + (err.message || "Không rõ lỗi"));
    }
  };

  return (
    <section id="class-section">
      <Container>
        <div className="text-center mb-4 mt-5">
          {/* <h2>Sổ tay</h2> */}
          {/* <h4 className="fw-bold text-capitalize text-center">Sổ tay</h4> */}
          {/* <h3>
            Bồi dưỡng năng lực số cho học sinh tiểu học thông qua môn Công nghệ
          </h3> */}
        </div>

        <div className="text-center mb-5">
          <Image
            src="images/image_web/Back_so_tay.png"
            // src="https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202025-06-10%20141336.png?alt=media&token=819a0be1-9d9a-4462-a2cd-05c1bbf5f663"
            alt="Class Section Image"
            fluid
            className="section-image"
            style={{
              width: "100%",
              height: "100%",
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
              Chỉnh sửa
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
              <div className="text-center py-5">
                <Spinner />
              </div>
            ) : (
              <>
                {editData.map((grade, gradeIndex) => (
                  <div
                    key={grade.id || gradeIndex}
                    className="mb-4 p-3 border rounded shadow-sm bg-light"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Form.Control
                        type="text"
                        value={grade.title}
                        onChange={(e) =>
                          handleGradeTitleChange(grade.id, e.target.value)
                        }
                        placeholder="Tên lớp"
                        className="me-2 fw-bold"
                        style={{ maxWidth: 300 }}
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteGrade(grade.id)}
                      >
                        🗑 Xóa lớp
                      </Button>
                    </div>

                    <ul className="list-unstyled">
                      {grade.contents.map((lesson, lessonIndex) => (
                        <li
                          key={lesson.id || lessonIndex}
                          className="mb-3 bg-white p-2 rounded shadow-sm border"
                        >
                          <div className="row">
                            {/* Tên bài học + nút xóa */}
                            <div className="col-md-6 d-flex align-items-start flex-column gap-2">
                              <Form.Control
                                type="text"
                                value={lesson.contentText}
                                onChange={(e) =>
                                  handleLessonTextChange(
                                    grade.id,
                                    lesson.id,
                                    e.target.value
                                  )
                                }
                                placeholder="Tên bài học"
                                className="w-100"
                              />
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  handleDeleteLesson(grade.id, lesson.id)
                                }
                              >
                                ❌ Xóa bài học
                              </Button>
                            </div>

                            {/* Danh sách ảnh */}
                            <div className="col-md-6">
                              <div className="d-flex flex-column gap-2">
                                {(lesson.images || []).map((img, imgIndex) => (
                                  <div
                                    key={img.id || imgIndex}
                                    className="d-flex align-items-start gap-2"
                                  >
                                    <Form.Control
                                      type="text"
                                      value={img.imageUrl}
                                      onChange={(e) =>
                                        handleImageUrlChange(
                                          grade.id,
                                          lesson.id,
                                          img.id,
                                          e.target.value
                                        )
                                      }
                                      placeholder="Link ảnh"
                                      className="flex-grow-1"
                                    />
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      className="px-1 py-0"
                                      onClick={() =>
                                        handleDeleteImage(
                                          grade.id,
                                          lesson.id,
                                          img.id
                                        )
                                      }
                                      style={{ fontSize: 12 }}
                                    >
                                      ✕
                                    </Button>
                                  </div>
                                ))}

                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() =>
                                    handleAddImage(grade.id, lesson.id)
                                  }
                                >
                                  + Thêm ảnh
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="text-end">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddLesson(grade.id)}
                      >
                        + Thêm bài học
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleSaveGrade(grade.id)}
                      >
                        💾 Lưu
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="text-center mt-4">
                  <Button variant="success" onClick={handleAddGrade}>
                    + Thêm lớp
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default ClassSection;
