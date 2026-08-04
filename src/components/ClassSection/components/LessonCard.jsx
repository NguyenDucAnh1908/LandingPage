import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ImageThumbnail from "./ImageThumbnail";

export const LessonCard = ({
  lesson,
  lessonIndex,
  onTextChange,
  onDeleteLesson,
  onAddImage,
  onReplaceImage,
  onDeleteImage,
  onViewLarge
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await onAddImage(file);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="crud-lesson-card mb-4 border rounded p-3 bg-white shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h6 className="fw-bold mb-0 text-muted">Bài học #{lessonIndex + 1}</h6>
        <Button
          variant="link"
          className="text-danger p-0 text-decoration-none d-flex align-items-center gap-1"
          onClick={onDeleteLesson}
          title="Xóa bài học"
        >
          <DeleteOutlined /> Xóa bài học
        </Button>
      </div>

      <div className="row g-3">
        {/* Left Side: Lesson Title Info */}
        <div className="col-md-6">
          <Form.Group className="mb-2">
            <Form.Label className="form-label-small">Tên bài học</Form.Label>
            <Form.Control
              type="text"
              value={lesson.contentText || ""}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Nhập tên bài học (ví dụ: Bài 1: Làm quen với máy tính)"
              className="premium-input-field"
              required
            />
            {!(lesson.contentText || "").trim() && (
              <span className="inline-error-text">Tên bài học không được để trống</span>
            )}
          </Form.Group>
        </div>

        {/* Right Side: Visual Image Grid */}
        <div className="col-md-6">
          <Form.Label className="form-label-small">Hình ảnh minh họa</Form.Label>
          <div className="thumbnail-grid">
            {/* Image cards */}
            {(lesson.images || []).map((img, imgIndex) => (
              <ImageThumbnail
                key={img.id || imgIndex}
                imageUrl={img.imageUrl}
                onReplace={(file) => onReplaceImage(imgIndex, img.id, file)}
                onDelete={() => onDeleteImage(imgIndex, img.id)}
                onViewLarge={onViewLarge}
              />
            ))}

            {/* Dotted add visual block */}
            {uploading ? (
              <div className="thumbnail-add-placeholder loading">
                <Spinner animation="border" size="sm" variant="success" />
                <span className="text-muted small mt-1">Đang tải...</span>
              </div>
            ) : (
              <label className="thumbnail-add-placeholder" title="Thêm ảnh minh họa mới">
                <PlusOutlined style={{ fontSize: "18px", color: "var(--color-accent)", marginBottom: "4px" }} />
                <span className="add-text">Thêm ảnh</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
