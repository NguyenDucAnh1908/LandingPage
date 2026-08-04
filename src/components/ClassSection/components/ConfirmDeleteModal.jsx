import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const ConfirmDeleteModal = ({ show, onHide, onConfirm, itemName, itemType }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm" backdrop="static">
      <Modal.Body className="text-center p-4">
        <ExclamationCircleOutlined style={{ fontSize: "40px", color: "#ef4444", marginBottom: "1rem" }} />
        <h5 className="fw-bold mb-2">Xác nhận xóa {itemType}</h5>
        <p className="text-muted mb-4 small">
          Bạn có chắc chắn muốn xóa {itemType} <strong>"{itemName}"</strong>? Hành động này không thể hoàn tác.
        </p>
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="light" size="sm" onClick={onHide} className="px-3">
            Hủy bỏ
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} className="px-3">
            Xác nhận xóa
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
