  import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Modal,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteIllustration, fetchIllustrations, saveIllustrations } from "../../data";
import "./LessonIllustration.css";
import backgroundImage from "/images/image_web/3._Minh_hoa_ke_hoach_bai_day.png";

  const ITEMS_PER_PAGE = 5;

  const LessonIllustration = () => {
    const navigate = useNavigate();
    const [illustrations, setIllustrations] = useState([]);
    const [editIllustrations, setEditIllustrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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
      setEditIllustrations((prev) => prev.filter((item) => item.id !== illustrationId));
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

  // Nếu có id thật (số hoặc chuỗi UUID từ backend) thì thêm id vào payload
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


    const totalPages = Math.ceil(illustrations.length / ITEMS_PER_PAGE);
    const paginatedData = illustrations.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <section id="lesson-illustration">
        <Container>
          <div className="full-image-container">
            <div
              className="illustration-image"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px",
                width: "100%",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                color: "white",
              }}
            >
            <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  padding: "2rem",
                }}
              >
              <div className="text-end mb-2">
                  {loggedIn && (
                    <Button
                      variant="outline-dark" size="sm"
                      onClick={() => setShowEditModal(true)}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </div>

                <div className="cards-container mt-3">
                  {loading && (
                    <div
                      className="d-flex justify-content-center align-items-center w-100"
                      style={{ minHeight: 120 }}
                    >
                      <Spinner animation="border" variant="light" />
                    </div>
                  )}
                  {error && (
                    <Alert variant="danger" className="w-100 text-center">
                      {error}
                    </Alert>
                  )}
                  {!loading &&
                    !error &&
                    paginatedData.map((illustration, index) => (
                      <Card
                        key={illustration.id || `temp-${index}`}
                        className="lesson-card"
                        style={{ backgroundColor: `rgb(255, 255, 255, 0.25)`}}
                        onClick={() => handleLessonClick(illustration.id)}
                      >
                        <Card.Body>
                          <Card.Title>{illustration.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    ))}
                  {!loading && totalPages > 1 && (
                    <Pagination className="justify-content-center mt-3">
                      {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item
                          key={idx + 1}
                          active={idx + 1 === currentPage}
                          onClick={() => setCurrentPage(idx + 1)}
                        >
                          {idx + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
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
                    onChange={(e) => handleChangeField(item.id, "title", e.target.value)}
                    placeholder="Tên minh họa"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="fw-bold">Đường dẫn minh họa (fileUrl)</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.fileUrl || ""}
                    onChange={(e) => handleChangeField(item.id, "fileUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </Form.Group>

                <div className="text-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteIllustration(item.id)}
                  >
                    🗑 Xóa
                  </Button>{" "}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSaveIllustration(item)}
                  >
                    💾 Lưu
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-center">
              <Button variant="outline-success" size="sm" onClick={handleAddIllustration}>
                + Thêm minh họa
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Hủy
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  };

  export default LessonIllustration;
