import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLOR_STEPS, createStep, deleteStep, fetchSteps, updateStep } from "../../data";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import "./TeachingProcess.css";

export const TeachingProcess = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [editSteps, setEditSteps] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSteps();
        setSteps(result);
        setEditSteps(result);
      } catch (err) {
        console.error("Lỗi khi tải quy trình:", err);
      }
    };
    loadData();
  }, []);

  const handleOpenEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const handleChangeField = (id, field, value) => {
    setEditSteps((prev) =>
      prev.map((step) =>
        step.id === id || (!step.id && field in step)
          ? { ...step, [field]: value }
          : step
      )
    );
  };

  const handleSaveStep = async (step) => {
    try {
      if (!step.id && steps.length >= 5) {
        alert("Không thể thêm quá 5 bước.");
        return;
      }
      if (step.id) {
        await updateStep(step.id, step);
      } else {
        const created = await createStep(step);
        step.id = created.id;
      }
      alert(`Đã lưu bước: ${step.title}`);
      const updatedList = await fetchSteps();
      setSteps(updatedList);
      setEditSteps(updatedList);
    } catch (err) {
      alert("Lỗi khi lưu bước: " + (err.message || "Không rõ lỗi"));
    }
  };

  const handleAddStep = () => {
    if (editSteps.length >= 5) {
      alert("Chỉ cho phép tối đa 5 bước.");
      return;
    }
    const newStep = {
      title: "",
      stepNumber: "",
      imageUrl: ""
    };
    setEditSteps((prev) => [...prev, newStep]);
  };

  const handleDeleteStep = async (id, index) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bước này?")) return;

    if (!id) {
      setEditSteps((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    try {
      await deleteStep(id);
      const updatedList = await fetchSteps();
      setSteps(updatedList);
      setEditSteps(updatedList);
    } catch (err) {
      alert("Xóa bước không thành công: " + (err.message || "Không rõ lỗi"));
    }
  };

  return (
    <section id="teaching-process">
      <Container>
        <div className="section-header">
          <h3>Quy Trình Hoạt Động</h3>
          <h4>Quy trình xây dựng hoạt động phát triển năng lực số thông qua môn Công nghệ tiểu học</h4>
          <p>
            Các bước hệ thống hóa kiến thức và kỹ năng số cốt lõi cho học sinh.
          </p>
        </div>

        {loggedIn && (
          <div className="text-center mb-4">
            <Button className="btn-edit-trigger" onClick={handleOpenEdit}>
              ✏️ Quản lý các bước quy trình
            </Button>
          </div>
        )}

        <div className="process-timeline">
          {steps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="process-step-card"
              onClick={() => navigate(`/process/${step.id}`)}
            >
              <div className="step-badge-wrapper">
                <div
                  className="step-icon-box"
                  style={{
                    backgroundColor: COLOR_STEPS[idx % COLOR_STEPS.length]?.backgroundColor || "#ccc",
                  }}
                >
                  <Image
                    src={`${import.meta.env.BASE_URL}process-icons/${COLOR_STEPS[idx % COLOR_STEPS.length]?.iconUrl}`}
                    alt={`Step ${step.id}`}
                    width={26}
                    height={26}
                  />
                </div>
                <div className="step-meta">
                  <span className="step-number-lbl">Bước {step.stepNumber}</span>
                </div>
              </div>
              <h5 className="step-title-txt">
                {step.title}
              </h5>
            </div>
          ))}
        </div>
      </Container>

      {/* Modal chỉnh sửa */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa quy trình dạy học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSteps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="border rounded p-3 mb-3 bg-light shadow-sm"
            >
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Tiêu đề bước</Form.Label>
                <Form.Control
                  type="text"
                  value={step.title || ""}
                  onChange={(e) =>
                    handleChangeField(step.id, "title", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Nhãn bước (stepNumber)</Form.Label>
                <Form.Control
                  type="text"
                  value={step.stepNumber || ""}
                  onChange={(e) =>
                    handleChangeField(step.id, "stepNumber", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Ảnh minh họa quy trình</Form.Label>
                <div className="d-flex align-items-center gap-3 p-2 border rounded bg-white">
                  {step.imageUrl ? (
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      style={{
                        width: "120px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0"
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "120px",
                      height: "90px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "8px",
                      border: "1px dashed #cbd5e1",
                      color: "#94a3b8",
                      fontSize: "12px"
                    }}>Trống</div>
                  )}
                  <div className="d-flex flex-column gap-2 flex-grow-1">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      size="sm"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        try {
                          const storageRef = ref(storage, `process/${Date.now()}_${file.name}`);
                          await uploadBytes(storageRef, file);
                          const url = await getDownloadURL(storageRef);
                          handleChangeField(step.id, "imageUrl", url);
                        } catch (err) {
                          alert("Tải lên ảnh thất bại: " + err.message);
                        }
                      }}
                    />
                    <Form.Control
                      type="text"
                      value={step.imageUrl || ""}
                      onChange={(e) => handleChangeField(step.id, "imageUrl", e.target.value)}
                      placeholder="Hoặc dán URL hình ảnh..."
                      size="sm"
                    />
                  </div>
                </div>
              </Form.Group>

              <div className="text-end mt-3">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDeleteStep(step.id, idx)}
                >
                  🗑 Xóa
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleSaveStep(step)}
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
              onClick={handleAddStep}
              disabled={editSteps.length >= 5}
            >
              + Thêm bước mới
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};
