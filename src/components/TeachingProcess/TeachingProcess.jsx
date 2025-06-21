import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLOR_STEPS, createStep, deleteStep, fetchSteps, updateStep } from "../../data";
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
      <Container style={{ marginTop: "2.5rem" }}>
        <ListGroup variant="flush">
          <h4 className="fw-bold text-capitalize text-center mb-3">
            Quy trình xây dựng các hoạt động học tập phát triển năng lực số cho học sinh
            thông qua các môn Công nghệ ở tiểu học
          </h4>

          {loggedIn && (
            <div className="text-end mb-2">
              <Button variant="outline-dark" size="sm" onClick={handleOpenEdit}>
                ✏️ Chỉnh sửa
              </Button>
            </div>
          )}

          {steps.map((step, idx) => (
            <ListGroup.Item
              key={step.id || idx}
              className="process-step"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              onClick={() => navigate(`/process/${step.id}`)}
            >
              <Row className="align-items-center">
                <Col xs={1}>
                  <div className="step-icon-wrapper">
                    <div
                      className="icon-box"
                      style={{
                        backgroundColor: COLOR_STEPS[idx % COLOR_STEPS.length]?.backgroundColor || "#ccc",
                      }}
                    >
                    <Image
                      src={`${import.meta.env.BASE_URL}process-icons/${COLOR_STEPS[idx % COLOR_STEPS.length]?.iconUrl}`}
                      alt={`Step ${step.id}`}
                      width={24}
                      height={24}
                    />
                    </div>
                    <span className="step-number" style={{ color: "#000000" }}>
                      Bước {step.stepNumber}
                    </span>
                  </div>
                </Col>
                <Col xs={11}>
                  <h5 className="step-title" style={{ color: "#000000" }}>
                    {step.title}
                  </h5>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      {/* Modal chỉnh sửa */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa quy trình</Modal.Title>
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
                <Form.Label className="fw-bold">Nhãn bước (label)</Form.Label>
                <Form.Control
                  type="text"
                  value={step.stepNumber || ""}
                  onChange={(e) =>
                    handleChangeField(step.id, "stepNumber", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Link ảnh (imageUrl)</Form.Label>
                <Form.Control
                  type="text"
                  value={step.imageUrl || ""}
                  onChange={(e) =>
                    handleChangeField(step.id, "imageUrl", e.target.value)
                  }
                />
              </Form.Group>

              <div className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDeleteStep(step.id, idx)}
                >
                  🗑 Xóa
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSaveStep(step)}
                >
                  💾 Lưu
                </Button>
              </div>
            </div>
          ))}

          <div className="text-center mt-3">
          <Button
            variant="success"
            size="sm"
            onClick={handleAddStep}
            disabled={editSteps.length >= 5}
          >
            + Thêm bước
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
