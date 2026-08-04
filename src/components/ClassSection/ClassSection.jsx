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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import {
  deleteGrade,
  deleteLessonContent,
  deleteLessonImage,
  fetchLessons,
  saveGrade,
} from "../../data";
import LessonCard from "./components/LessonCard";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import "./ClassSection.css";

const ClassSection = () => {
  const [grades, setGrades] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(null); // gradeId currently saving
  const [editData, setEditData] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  
  // Custom states for visual lightbox and confirms
  const [lightboxShow, setLightboxShow] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    onConfirm: null,
    itemName: "",
    itemType: "",
  });

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
    setIsDirty(false);
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
  const closeEdit = () => {
    if (isDirty) {
      if (!window.confirm("Bạn có các thay đổi chưa lưu. Bạn vẫn muốn đóng?")) return;
    }
    setShowEdit(false);
  };

  const uploadImageFile = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `lessons/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // State update helpers
  const handleGradeTitleChange = (gradeId, value) => {
    setEditData(
      editData.map((g) => (g.id === gradeId ? { ...g, title: value } : g))
    );
    setIsDirty(true);
  };

  const handleLessonTextChange = (gradeId, lessonIndex, value) => {
    setEditData(
      editData.map((g) =>
        g.id === gradeId
          ? {
              ...g,
              contents: g.contents.map((l, idx) =>
                idx === lessonIndex ? { ...l, contentText: value } : l
              ),
            }
          : g
      )
    );
    setIsDirty(true);
  };

  const handleAddUploadedImage = async (gradeId, lessonIndex, file) => {
    try {
      const url = await uploadImageFile(file);
      if (!url) return;
      setEditData((prev) =>
        prev.map((g) => {
          if (g.id !== gradeId) return g;
          return {
            ...g,
            contents: g.contents.map((l, lIdx) => {
              if (lIdx !== lessonIndex) return l;
              return {
                ...l,
                images: [...(l.images || []), { imageUrl: url }],
              };
            }),
          };
        })
      );
      setIsDirty(true);
    } catch (err) {
      alert("Tải lên hình ảnh thất bại: " + err.message);
    }
  };

  const handleReplaceUploadedImage = async (gradeId, lessonIndex, imgIndex, imageId, file) => {
    try {
      const url = await uploadImageFile(file);
      if (!url) return;
      setEditData((prev) =>
        prev.map((g) => {
          if (g.id !== gradeId) return g;
          return {
            ...g,
            contents: g.contents.map((l, lIdx) => {
              if (lIdx !== lessonIndex) return l;
              return {
                ...l,
                images: l.images.map((img, iIdx) => {
                  if (iIdx !== imgIndex) return img;
                  return { ...img, imageUrl: url };
                }),
              };
            }),
          };
        })
      );
      setIsDirty(true);
    } catch (err) {
      alert("Tải lên hình ảnh thất bại: " + err.message);
    }
  };

  const handleAddGrade = () => {
    const newGrade = { title: "", contents: [] };
    setEditData((prev) => [...prev, newGrade]);
    setIsDirty(true);

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
    setIsDirty(true);
  };

  // Styled Confirmation triggers
  const triggerDeleteGrade = (gradeId, gradeTitle) => {
    setDeleteConfirm({
      show: true,
      itemType: "khối lớp",
      itemName: gradeTitle || "Lớp mới chưa đặt tên",
      onConfirm: async () => {
        if (!gradeId) {
          setEditData(editData.filter((g) => g.id !== gradeId));
          setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" });
          return;
        }
        try {
          await deleteGrade(gradeId);
          setEditData(editData.filter((g) => g.id !== gradeId));
          setGrades(grades.filter((g) => g.id !== gradeId));
          setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" });
        } catch (err) {
          alert("Xóa lớp thất bại");
        }
      },
    });
  };

  const triggerDeleteLesson = (gradeId, lessonId, lessonIndex) => {
    setDeleteConfirm({
      show: true,
      itemType: "bài học",
      itemName: `Bài học số ${lessonIndex + 1}`,
      onConfirm: async () => {
        if (!lessonId) {
          setEditData(
            editData.map((g) =>
              g.id === gradeId
                ? {
                    ...g,
                    contents: g.contents.filter((_, idx) => idx !== lessonIndex),
                  }
                : g
            )
          );
          setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" });
          return;
        }
        try {
          await deleteLessonContent(lessonId);
          setEditData(
            editData.map((g) =>
              g.id === gradeId
                ? {
                    ...g,
                    contents: g.contents.filter((_, idx) => idx !== lessonIndex),
                  }
                : g
            )
          );
          setGrades(
            grades.map((g) =>
              g.id === gradeId
                ? {
                    ...g,
                    contents: g.contents.filter((_, idx) => idx !== lessonIndex),
                  }
                : g
            )
          );
          setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" });
        } catch (err) {
          alert("Xóa bài học thất bại");
        }
      },
    });
  };

  const triggerDeleteImage = (gradeId, lessonIndex, imgIndex, imageId) => {
    setDeleteConfirm({
      show: true,
      itemType: "hình ảnh",
      itemName: `Ảnh minh họa #${imgIndex + 1}`,
      onConfirm: async () => {
        if (!imageId) {
          setEditData((prev) =>
            prev.map((g) => {
              if (g.id !== gradeId) return g;
              return {
                ...g,
                contents: g.contents.map((l, lIdx) => {
                  if (lIdx !== lessonIndex) return l;
                  return {
                    ...l,
                    images: l.images.filter((_, idx) => idx !== imgIndex),
                  };
                }),
              };
            })
          );
          setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" });
          return;
        }
        try {
          await deleteLessonImage(imageId);
          setEditData((prev) =>
            prev.map((g) => {
              if (g.id !== gradeId) return g;
              return {
                ...g,
                contents: g.contents.map((l, lIdx) => {
                  if (lIdx !== lessonIndex) return l;
                  return {
                    ...l,
                    images: l.images.filter((_, idx) => idx !== imgIndex),
                  };
                }),
              };
            })
          );
          setGrades((prev) =>
            prev.map((g) => {
              if (g.id !== gradeId) return g;
              return {
                ...g,
                contents: g.contents.map((l, lIdx) => {
                  if (lIdx !== lessonIndex) return l;
                  return {
                    ...l,
                    images: l.images.filter((_, idx) => idx !== imgIndex),
                  };
                }),
              };
            })
          );
          setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" });
        } catch (err) {
          alert("Xóa ảnh thất bại");
        }
      },
    });
  };

  const handleSaveGrade = async (gradeId) => {
    const grade = editData.find((g) => g.id === gradeId);
    if (!grade) return;

    setSaveLoading(gradeId);
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
      alert("Lưu thay đổi thành công!");
      setIsDirty(false);

      const freshData = await fetchLessons();
      setGrades(freshData);
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
      );
    } catch (err) {
      alert("Lỗi khi lưu: " + (err.message || "Không rõ lỗi"));
    } finally {
      setSaveLoading(null);
    }
  };

  const triggerLightbox = (url) => {
    setLightboxUrl(url);
    setLightboxShow(true);
  };

  return (
    <section id="class-section">
      <Container>
        <div className="section-header">
          <h3>Sổ Tay Bài Học</h3>
          <h4>Sổ tay bồi dưỡng năng lực số cho học sinh tiểu học thông qua môn Công nghệ</h4>
          <p>
            Chọn khối lớp tương ứng để khám phá giáo án, bài học tương tác và hình ảnh minh họa chi tiết.
          </p>
        </div>

        <div className="class-section-banner">
          <Image
            src="images/image_web/Back_so_tay.png"
            alt="Sổ tay học tập"
            fluid
          />
        </div>

        {loggedIn && (
          <div className="text-center mb-4">
            <Button variant="outline-primary" className="px-4" onClick={openEdit}>
              ✏️ Quản lý sổ tay bài học
            </Button>
          </div>
        )}

        <div className="class-accordion-container">
          <div className="horizontal-accordion-wrapper">
            {grades.map((grade) => (
              <Accordion key={grade.id} className="class-item">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{grade.title}</Accordion.Header>
                  <Accordion.Body className="custom-scroll">
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

        {/* Core CRUD Modal */}
        <Modal
          show={showEdit}
          onHide={closeEdit}
          className="class-crud-modal"
          scrollable
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Quản lý Khối lớp & Bài học</Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-scroll">
            {editLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-muted mt-2 small">Đang lấy dữ liệu sổ tay...</p>
              </div>
            ) : editData.length === 0 ? (
              <div className="text-center py-5">
                <h6 className="text-muted">Chưa có thông tin khối lớp nào. Hãy thêm lớp mới!</h6>
              </div>
            ) : (
              <>
                {editData.map((grade, gradeIndex) => (
                  <div
                    key={grade.id || gradeIndex}
                    className="mb-5 p-4 border rounded shadow-sm bg-light"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                      <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: 360 }}>
                        <Form.Label className="form-label-small mb-0">Tên Lớp:</Form.Label>
                        <Form.Control
                          type="text"
                          value={grade.title}
                          onChange={(e) =>
                            handleGradeTitleChange(grade.id, e.target.value)
                          }
                          placeholder="ví dụ: Khối Lớp 3"
                          className="premium-input-field fw-bold flex-grow-1"
                        />
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => triggerDeleteGrade(grade.id, grade.title)}
                        className="d-flex align-items-center gap-1"
                      >
                        🗑 Xóa lớp
                      </Button>
                    </div>

                    <div className="lessons-list-wrapper">
                      {grade.contents.length === 0 ? (
                        <p className="text-muted small text-center my-4">Chưa có bài học nào trong khối lớp này.</p>
                      ) : (
                        grade.contents.map((lesson, lessonIndex) => (
                          <LessonCard
                            key={lesson.id || lessonIndex}
                            lesson={lesson}
                            lessonIndex={lessonIndex}
                            onTextChange={(val) => handleLessonTextChange(grade.id, lessonIndex, val)}
                            onDeleteLesson={() => triggerDeleteLesson(grade.id, lesson.id, lessonIndex)}
                            onAddImage={(file) => handleAddUploadedImage(grade.id, lessonIndex, file)}
                            onReplaceImage={(imgIdx, imgId, file) => handleReplaceUploadedImage(grade.id, lessonIndex, imgIdx, imgId, file)}
                            onDeleteImage={(imgIdx, imgId) => triggerDeleteImage(grade.id, lessonIndex, imgIdx, imgId)}
                            onViewLarge={triggerLightbox}
                          />
                        ))
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleAddLesson(grade.id)}
                      >
                        + Thêm bài học mới
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSaveGrade(grade.id)}
                        disabled={saveLoading === grade.id || !isDirty}
                      >
                        {saveLoading === grade.id ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Đang lưu...
                          </>
                        ) : (
                          "💾 Lưu thay đổi lớp"
                        )}
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="text-center mt-4">
                  <Button variant="success" className="px-4" onClick={handleAddGrade}>
                    + Thêm Lớp Mới
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Đóng quản lý
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Global Lightbox Modal */}
        <Modal
          show={lightboxShow}
          onHide={() => setLightboxShow(false)}
          className="lightbox-modal"
          centered
          size="lg"
        >
          <Modal.Body className="p-0 text-center" onClick={() => setLightboxShow(false)}>
            <img src={lightboxUrl} alt="Visual Lightbox" className="lightbox-image" />
          </Modal.Body>
        </Modal>

        {/* Global Confirm Delete Modal */}
        <ConfirmDeleteModal
          show={deleteConfirm.show}
          onHide={() => setDeleteConfirm({ show: false, onConfirm: null, itemName: "", itemType: "" })}
          onConfirm={deleteConfirm.onConfirm}
          itemName={deleteConfirm.itemName}
          itemType={deleteConfirm.itemType}
        />
      </Container>
    </section>
  );
};

export default ClassSection;
