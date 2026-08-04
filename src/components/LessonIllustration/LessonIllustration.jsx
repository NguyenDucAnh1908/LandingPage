import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  deleteIllustration,
  fetchIllustrations,
  saveIllustrations,
} from "../../data";
import "./LessonIllustration.css";
import backgroundImage from "/images/image_web/3._Minh_hoa_ke_hoach_bai_day.png";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

const LessonIllustration = () => {
  const navigate = useNavigate();
  const [illustrations, setIllustrations] = useState([]);
  const [editIllustrations, setEditIllustrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    setLoading(true);
    fetchIllustrations()
      .then((data) => {
        setIllustrations(data);
        setEditIllustrations(data);
        setError("");
      })
      .catch(() => {
        setError("Không thể tải danh sách minh họa.");
        setIllustrations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLessonClick = (id) => {
    navigate(`/lesson-illustration/${id}`);
  };

  const handleChangeField = (id, field, value) => {
    setEditIllustrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteIllustration = async (illustrationId) => {
    if (!illustrationId) {
      setEditIllustrations((prev) =>
        prev.filter((item) => item.id !== illustrationId)
      );
      return;
    }
    if (!window.confirm("Bạn có chắc muốn xóa minh họa này?")) return;
    try {
      await deleteIllustration(illustrationId);
      setEditIllustrations((prev) =>
        prev.filter((item) => item.id !== illustrationId)
      );
      setIllustrations((prev) =>
        prev.filter((item) => item.id !== illustrationId)
      );
      alert("Đã xóa thành công minh họa");
    } catch (error) {
      alert("Có lỗi khi xóa minh họa: " + error.message);
    }
  };

  const handleAddIllustration = () => {
    const newItem = { title: "", fileUrl: "", id: `temp-${Date.now()}` };
    setEditIllustrations((prev) => [...prev, newItem]);
    setIllustrations((prev) => [...prev, newItem]);
  };

  const handleSaveIllustration = async (item) => {
    const payload = {
      title: item.title,
      fileUrl: item.fileUrl,
    };

    if (item.id && !item.id.toString().startsWith("temp-")) {
      payload.id = item.id;
    }

    try {
      await saveIllustrations(payload);
      alert(`Đã lưu thành công minh họa: ${item.title}`);

      const freshData = await fetchIllustrations();
      setIllustrations(freshData);
      setEditIllustrations(freshData);
    } catch (error) {
      alert(error.message || "Có lỗi khi lưu minh họa.");
    }
  };

  const handleFileUpload = async (e, itemId) => {
    const file = e.target.files[0];
    if (!file) return;
    const storage = getStorage(app);
    const storageRef = ref(storage, `illustrations/${Date.now()}_${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setEditIllustrations((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, fileUrl: url } : item
        )
      );
      alert("Upload thành công!");
    } catch (err) {
      alert("Upload thất bại: " + err.message);
    }
  };

  return (
    <section id="lesson-illustration">
      <Container>
        <div className="section-header">
          <h3>Kế Hoạch Bài Dạy</h3>
          <h4>Minh Họa Kế Hoạch Bài Dạy Phát Triển Năng Lực Số</h4>
          <p>
            Danh sách giáo án và kế hoạch giảng dạy trực quan hỗ trợ giáo viên tổ chức lớp học hiệu quả.
          </p>
        </div>

        <div className="illustration-grid">
          {/* Left panel banner */}
          <div className="illustration-banner-card">
            <img src={backgroundImage} alt="Minh họa kế hoạch bài dạy" />
          </div>

          {/* Right panel items */}
          <div className="illustration-content-card">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <h5 className="fw-bold mb-0 text-muted">Danh Sách Giáo Án</h5>
              {loggedIn && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowEditModal(true)}
                >
                  ✏️ Quản lý giáo án
                </Button>
              )}
            </div>

            <div className="illustration-scroll-area custom-scroll">
              {loading && (
                <div className="d-flex justify-content-center align-items-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              
              {!loading && !error && (
                <div>
                  {illustrations.map((illustration, index) => (
                    <div
                      key={illustration.id || `temp-${index}`}
                      className="illustration-item-card"
                      onClick={() => handleLessonClick(illustration.id)}
                    >
                      <span className="illustration-card-title">{illustration.title}</span>
                      <span className="illustration-card-icon">➔</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Admin modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa minh họa bài học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editIllustrations.map((item, index) => (
            <div
              key={item.id ? `id-${item.id}` : `temp-${item.tempId || index}`}
              className="border rounded p-3 mb-3 bg-light"
            >
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Tên minh họa</Form.Label>
                <Form.Control
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleChangeField(item.id, "title", e.target.value)
                  }
                  placeholder="Nhập tên giáo án minh họa"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">
                  Đường dẫn minh họa (fileUrl)
                </Form.Label>
                <Form.Control
                  type="text"
                  value={item.fileUrl || ""}
                  onChange={(e) =>
                    handleChangeField(item.id, "fileUrl", e.target.value)
                  }
                  placeholder="https://..."
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">
                  Tải lên tài liệu minh họa (PDF/Ảnh)
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileUpload(e, item.id)}
                />
              </Form.Group>

              <div className="text-end mt-3">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDeleteIllustration(item.id)}
                >
                  🗑 Xóa
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleSaveIllustration(item)}
                >
                  💾 Lưu thay đổi
                </Button>
              </div>
            </div>
          ))}
          <div className="text-center mt-3">
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleAddIllustration}
            >
              + Thêm minh họa mới
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default LessonIllustration;
