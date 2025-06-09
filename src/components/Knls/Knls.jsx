import "./knls.css";
import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export const KNLS_DATA = [
  {
    id: 1,
    title: "1 Sử dụng các thiết bị kỹ thuật số",
    items: [
      "1.1 Sử dụng thiết bị phần cứng",
      "1.2 Sử dụng phần mềm thiết bị số",
      "1.1 Sử dụng thiết bị phần cứng",
      "1.2 Sử dụng phần mềm thiết bị số",
      "1.1 Sử dụng thiết bị phần cứng",
      "1.2 Sử dụng phần mềm thiết bị số",
      "1.1 Sử dụng thiết bị phần cứng",
      "1.2 Sử dụng phần mềm thiết bị số",
    ],
  },
  {
    id: 2,
    title: "2 Tìm kiếm thông tin",
    items: [
      "2.1 Tìm kiếm trên internet",
      "2.2 Sử dụng công cụ tìm kiếm hiệu quả",
    ],
  },
  {
    id: 3,
    title: "3 Giao tiếp và hợp tác",
    items: [
      "3.1 Sử dụng email và lịch trực tuyến",
      "3.2 Tham gia họp trực tuyến",
    ],
  },
  {
    id: 4,
    title: "4 Quản lý dữ liệu và thông tin",
    items: ["4.1 Lưu trữ và sao lưu dữ liệu", "4.2 Bảo mật thông tin cá nhân"],
  },
  {
    id: 5,
    title: "5 Giải quyết vấn đề và ra quyết định",
    items: [
      "5.1 Phân tích và đánh giá thông tin",
      "5.2 Đưa ra quyết định dựa trên dữ liệu",
    ],
  },
  {
    id: 6,
    title: "6 Sáng tạo và đổi mới",
    items: [
      "6.1 Sử dụng công nghệ để tạo ra ý tưởng mới",
      "6.2 Thử nghiệm và triển khai ý tưởng",
    ],
  },
  {
    id: 7,
    title: "7 Lập kế hoạch và tổ chức",
    items: [
      "7.1 Xác định mục tiêu và lập kế hoạch hành động",
      "7.2 Quản lý thời gian và tài nguyên",
    ],
  },
  {
    id: 8,
    title: "8 Phát triển bản thân",
    items: [
      "8.1 Đánh giá năng lực bản thân",
      "8.2 Lập kế hoạch phát triển cá nhân",
    ],
  },
];

const Knls = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? KNLS_DATA.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((current) =>
      current === KNLS_DATA.length - 1 ? 0 : current + 1
    );
  };

  const currentItem = KNLS_DATA[currentIndex];

  return (
    <section id="book-a-trip">
      <Container>
        <Row className="g-5">
          <Col>
            <h3 className="fw-semibold font-poppins">Khung năng lực số</h3>
            <h4 className="font-volkhov fw-bold text-capitalize">
              Khung năng lực số
            </h4>

            <div className="position-relative mt-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <Button
                  variant="light"
                  className="rounded-circle shadow-sm"
                  onClick={handlePrevious}
                >
                  <ChevronLeft />
                </Button>
                <h5 className="fw-semibold mb-0">{currentItem.title}</h5>
                <Button
                  variant="light"
                  className="rounded-circle shadow-sm"
                  onClick={handleNext}
                >
                  <ChevronRight />
                </Button>
              </div>

              <ListGroup variant="flush" className="w-100">
                <ListGroup.Item className="border-0 font-poppins w-100">
                  <Row className="w-100">
                    <Col xs={12}>
                      <ul className="list-unstyled w-100">
                        {currentItem.items.map((subItem, index) => (
                          <li
                            key={index}
                            className="topic-item w-100"
                            style={{
                              fontSize: "16px",
                              color: "#2F4F4F",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              padding: "15px 20px",
                              marginBottom: "10px",
                            }}
                          >
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          {/* Right Column */}
        </Row>
      </Container>
    </section>
  );
};

export default Knls;
