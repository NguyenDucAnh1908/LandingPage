import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { EyeOutlined, UploadOutlined, DeleteOutlined, PictureOutlined } from "@ant-design/icons";

export const ImageThumbnail = ({ imageUrl, onReplace, onDelete, onViewLarge }) => {
  const [hasError, setHasError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await onReplace(file);
      setHasError(false);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-thumbnail-wrapper">
      {uploading ? (
        <div className="thumbnail-loading">
          <Spinner animation="border" size="sm" variant="primary" />
          <span className="text-muted small mt-1">Đang tải...</span>
        </div>
      ) : hasError || !imageUrl ? (
        <div className="thumbnail-error">
          <PictureOutlined style={{ fontSize: "20px", color: "#94a3b8", marginBottom: "4px" }} />
          <span className="error-text">Lỗi tải ảnh</span>
          
          <div className="error-actions">
            <label className="action-icon-btn" title="Thay thế ảnh">
              <UploadOutlined />
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            <button className="action-icon-btn delete" onClick={onDelete} title="Xóa ảnh">
              <DeleteOutlined />
            </button>
          </div>
        </div>
      ) : (
        <div className="thumbnail-image-container">
          <img
            src={imageUrl}
            alt="Minh họa"
            onError={() => setHasError(true)}
            className="thumbnail-img"
          />
          {/* Action Hover Overlay */}
          <div className="thumbnail-overlay">
            <button className="overlay-btn" onClick={() => onViewLarge(imageUrl)} title="Xem ảnh lớn">
              <EyeOutlined />
            </button>
            <label className="overlay-btn" title="Thay thế ảnh">
              <UploadOutlined />
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            <button className="overlay-btn delete" onClick={onDelete} title="Xóa ảnh">
              <DeleteOutlined />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageThumbnail;
