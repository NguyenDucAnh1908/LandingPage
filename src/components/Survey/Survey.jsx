import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Survey.css";

export const Survey = () => {
  const [surveyLink, setSurveyLink] = useState("");
  const [newLink, setNewLink] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    // Fetch initial survey link
    const fetchSurveyLink = async () => {
      try {
        const response = await fetch(
          "https://landingpagestudy.onrender.com/api/survey-links/1"
        );
        if (!response.ok) {
          throw new Error("Không thể lấy đường dẫn khảo sát");
        }
        const data = await response.json();
        console.log("Survey Link Data:", data);
        setSurveyLink(data.url); // Changed from data.link to data.url
      } catch (error) {
        console.error("Error fetching survey link:", error);
      }
    };

    fetchSurveyLink();
  }, []);

  const handleUpdateLink = async () => {
    try {
      const response = await fetch(
        "https://landingpagestudy.onrender.com/api/survey-links",
        {
          method: "POST", // Changed to PUT for update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 1,
            title: "Link khảo sát - update",
            url: newLink,
            orderIndex: 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurveyLink(data.url); // Changed from data.link to data.url
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
      <Container className="position-relative h-100">
        <Row className="h-100">
          <Col
            md={10}
            lg={8}
            className="mx-auto d-flex flex-column justify-content-end pb-5"
          >
            <div className="text-center">
              <Button
                className="survey-button"
                href={surveyLink}
                target="_blank"
                type="submit"
                size="lg"
              >
                Đóng góp ý kiến
              </Button>
            </div>

            {loggedIn && (
              <div className="mt-4 text-center">
                {!isEditing ? (
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fas fa-edit"></i> Chỉnh sửa đường dẫn
                  </Button>
                ) : (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Nhập đường dẫn khảo sát mới"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="primary"
                        onClick={handleUpdateLink}
                        disabled={!newLink}
                      >
                        Lưu
                      </Button>
                      <Button
                        variant="secondary"
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};
