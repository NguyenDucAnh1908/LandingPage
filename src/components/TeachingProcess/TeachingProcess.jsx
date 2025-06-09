import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  OverlayTrigger,
  Popover,
  ProgressBar,
  Row,
} from "react-bootstrap";

import { BuildingIcon, HeartIcon, LeafIcon, MapIcon, SendIcon } from "../icons";
import "./TeachingProcess.css";
import { BOOK_TRIP, DATA_PROCESSING } from "../../data";

export const TeachingProcess = () => {
  // Trip to - Popover
  const popover = (
    <Popover id="popover-ongoing" className="rounded-4 border-0 shadow p-2">
      <Popover.Body className="font-poppins">
        <div className="d-flex gap-3">
          <div>
            <Image
              src={`${process.env.PUBLIC_URL}/images/rome.png`}
              roundedCircle
              className="object-fit-cover"
              alt="City"
              width={45}
              height={45}
            />
          </div>
          <div className="flex-grow-1">
            <span className="fw-medium">Ongoing</span>
            <h5 className="text-black pt-1 pb-2">Trip to rome</h5>
            <p className="mb-1 fw-medium text-black">
              <span>40%</span> completed
            </p>
            <ProgressBar now={40} />
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <section id="book-a-trip">
      <Container>
        <Row className="">
          {/* Left Column */}
          <Col>
            <h3 className="fw-semibold font-poppins">Easy and Fast</h3>
            <h4 className="font-volkhov fw-bold text-capitalize text-center">
              Đề xuất quy trình xây dựng các hoạt động học tập phát triển năng
              lực số cho học sinh thông qua môn Công nghệ ở tiểu hiểu
            </h4>
            <ListGroup variant="flush" className="mt-4">
              {/* List Items */}
              {DATA_PROCESSING &&
                DATA_PROCESSING.map((trip) => (
                  <ListGroup.Item
                    key={trip.id}
                    className="d-flex align-items-center border-bottom-0 font-poppins"
                  >
                    <Row className="w-100">
                      {/* Icons */}
                      <Col xs={1}>
                        <div className="d-flex flex-column align-items-center">
                          <div
                            className="icon-box rounded-3 d-flex justify-content-center align-items-center "
                            style={{ backgroundColor: trip.color }}
                          >
                            {trip.icon}
                          </div>
                          <span className="step-number text-center">
                            Bước {trip.id}
                          </span>
                        </div>
                      </Col>
                      {/* Descriptions */}
                      <Col xs={11} className="d-flex align-items-center">
                        <h5 className="fw-semibold mb-0">{trip.title}</h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
          {/* Right Column */}
        </Row>
      </Container>
    </section>
  );
};
