import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { fetchSurveyLink, saveSurveyLink } from "../../data";
import "./Survey.css";

export const Survey = () => {
  const [surveyLink, setSurveyLink] = useState("");
  const [newLink, setNewLink] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    const loadSurveyLink = async () => {
      try {
        const data = await fetchSurveyLink();
        setSurveyLink(data.url);
      } catch (error) {
        console.error("Error fetching survey link:", error);
      }
    };

    loadSurveyLink();
  }, []);

  const handleUpdateLink = async () => {
    try {
      const data = await saveSurveyLink({
        id: 1,
        title: "Link khảo sát - update",
        url: newLink,
        orderIndex: 0,
      });
      setSurveyLink(data.url);
      setNewLink("");
      setIsEditing(false);
      alert("Cập nhật đường dẫn thành công!");
    } catch (error) {
      console.error("Error updating survey link:", error);
      alert(`Không thể cập nhật đường dẫn! Lỗi: ${error.message}`);
    }
  };

  return (
    <section id="survey">
      <Container>
        <div className="section-header">
          <h3>Ý Kiến Khảo Sát</h3>
          <h4>Đóng Góp Ý Kiến & Khảo Sát Chuyên Môn</h4>
          <p>
            Ý kiến phản hồi quý báu của quý thầy cô giúp hoàn thiện sổ tay và nâng cao chất lượng dạy học.
          </p>
        </div>

        <div className="survey-grid">
          {/* Left panel text contents */}
          <div className="survey-content-panel">
            <h5 className="fw-bold mb-3">Phiếu Khảo Sát & Đóng Góp Ý Kiến</h5>
            <p className="survey-desc">
              Nhằm đánh giá và cải tiến phương pháp giáo dục kỹ năng số cho học sinh tiểu học, chúng tôi rất mong nhận được các ý kiến phản hồi về tính thực tế và hiệu quả của các giáo án được đề xuất.
            </p>
            <Button
              className="survey-button-link"
              href={surveyLink}
              target="_blank"
            >
              Đóng góp ý kiến của bạn ➔
            </Button>

            {/* Admin section */}
            {loggedIn && (
              <div className="survey-admin-box">
                <h6 className="fw-bold text-muted mb-2">Cấu hình link khảo sát</h6>
                {!isEditing ? (
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Chỉnh sửa đường dẫn
                  </Button>
                ) : (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Dán link khảo sát Google Form mới..."
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleUpdateLink}
                        disabled={!newLink}
                      >
                        Lưu lại
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false);
                          setNewLink("");
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right panel graphic */}
          <div className="survey-image-card">
            <img src="images/image_web/4_Phieu_khao_sat_main.png" alt="Phiếu khảo sát" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Survey;
