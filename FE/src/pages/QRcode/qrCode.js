// import { useState } from "react";
import QRcode_1 from "../../assets/imgs/QRcode_1.png";
import QRcode_2 from "../../assets/imgs/QRcode_2.png";
import QRcode_3 from "../../assets/imgs/QRcode_3.png";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import "./qrCode.scss";

const QrCode = () => {
  return (
    <div className="Qrcode">
      <Container className="mb-5 mt-5">
        <div className="qr-code">
          <Row>
            <Col xs={6} md={4}>
              <Image src={QRcode_1} thumbnail />
            </Col>
            <Col xs={6} md={4}>
              <Image src={QRcode_2} thumbnail />
            </Col>
            <Col xs={6} md={4}>
              <Image src={QRcode_3} thumbnail />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={6} md={4}>
              {" "}
              Place ID 1
            </Col>
            <Col xs={6} md={4}>
              {" "}
              Place ID 2
            </Col>
            <Col xs={6} md={4}>
              {" "}
              Place ID 3
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default QrCode;
