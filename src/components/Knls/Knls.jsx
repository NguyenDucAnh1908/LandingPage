// import "./knls.css";
import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  // Image,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const images = [
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
  "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/c3bdfcba-d9ca-4fbf-b14d-b0eb4121f611.jpg?alt=media&token=97721798-9a39-4826-b70d-bdbace394b8b",
];

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
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <section id="book-a-trip">
      <Container>
        <Row className="g-5">
          <Col>
            <h3 className="fw-semibold font-poppins">Khung năng lực số</h3>
            <h4 className="font-volkhov fw-bold text-capitalize text-center">
              Khung năng lực số
            </h4>

            <div className="position-relative mt-4">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div className="slider-item" key={index}>
                    <img
                      src={image}
                      alt={`slide-${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Knls;
