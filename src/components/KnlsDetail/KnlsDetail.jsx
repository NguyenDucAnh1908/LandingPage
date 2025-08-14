import { Image, Button as AntButton } from "antd";
import { useEffect, useState } from "react";
import { Container, Modal, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchKnlsImages } from "../../data";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { createKnls, updateKnls, deleteKnls } from "../../data";
import "./KnlsDetail.css";

const KnlsDetail = () => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    imageFile: null,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    setError(null);

    fetchKnlsImages()
      .then((data) => {
        setGallery(data.filter((item) => item.id !== 0));
      })
      .catch((err) => {
        setError("Lỗi tải dữ liệu hình ảnh");
        setGallery([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("knls");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleShowModal = (item = null) => {
    if (!loggedIn) return;
    if (item) {
      setEditItem(item);
      setFormData({
        title: item.title,
        imageUrl: item.imageUrl,
      });
    } else {
      setEditItem(null);
      setFormData({
        title: "",
        imageUrl: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditItem(null);
    setFormData({ title: "", imageUrl: "" });
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `knls/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Modify handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      alert("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    }
    setUploading(true);
    try {
      let imageUrl = formData.imageUrl;

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      if (editItem) {
        // Update
        await updateKnls(editItem.id, {
          title: formData.title,
          imageUrl: imageUrl,
        });
        const updatedGallery = gallery.map((item) =>
          item.id === editItem.id
            ? { ...item, title: formData.title, imageUrl: imageUrl }
            : item
        );
        setGallery(updatedGallery);
      } else {
        // Create
        await createKnls({
          title: formData.title,
          imageUrl: imageUrl,
        });
        // Reload page after creating new item
        window.location.reload();
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Có lỗi xảy ra khi lưu dữ liệu");
    } finally {
      setUploading(false);
    }
  };

  // Modify handleDelete function
  const handleDelete = async (id) => {
    if (!loggedIn) {
      alert("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    }
    if (window.confirm("Bạn có chắc muốn xóa hình ảnh này?")) {
      try {
        await deleteKnls(id);
        // Reload page after deleting item
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Có lỗi xảy ra khi xóa");
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="knls-detail">
      <Container>
        <div className="header-section">
          <div className="header-content">
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link to="/" onClick={handleReturn} className="return-button">
                Quay lại
              </Link>
              <h2 className="fw-bold text-center mb-0">Khung năng lực số</h2>
              {loggedIn && (
                <AntButton type="primary" onClick={() => handleShowModal()}>
                  Thêm mới
                </AntButton>
              )}
              {!loggedIn && <div style={{ width: "100px" }}></div>}
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {loading && <p className="text-center">Đang tải dữ liệu...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {!loading && !error && gallery.length > 0 && (
            <div className="single-image-container">
              <div className="navigation-buttons">
                <AntButton
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={handlePrevious}
                />
                <AntButton
                  shape="circle"
                  icon={<RightOutlined />}
                  onClick={handleNext}
                />
              </div>
              <div className="image-card">
                <Image
                  preview={false}
                  src={gallery[currentIndex].imageUrl}
                  alt={gallery[currentIndex].title}
                  className="detail-image"
                />
                {loggedIn && (
                  <div className="image-actions">
                    <AntButton
                      onClick={() => handleShowModal(gallery[currentIndex])}
                    >
                      Sửa
                    </AntButton>
                    <AntButton
                      danger
                      onClick={() => handleDelete(gallery[currentIndex].id)}
                    >
                      Xóa
                    </AntButton>
                  </div>
                )}
              </div>
              <p className="text-center mt-2">
                {currentIndex + 1} / {gallery.length}
              </p>
            </div>
          )}
        </div>

        {/* Modal for Create/Edit */}
        {loggedIn && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editItem ? "Chỉnh sửa hình ảnh" : "Thêm hình ảnh mới"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tải lên hình ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, imageFile: e.target.files[0] })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>hoặc URL hình ảnh</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                  />
                </Form.Group>
                <div className="text-end">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Hủy
                  </Button>{" "}
                  <Button variant="primary" type="submit" disabled={uploading}>
                    {uploading
                      ? "Đang tải..."
                      : editItem
                      ? "Cập nhật"
                      : "Thêm mới"}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default KnlsDetail;
