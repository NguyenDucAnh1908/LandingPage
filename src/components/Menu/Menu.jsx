import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MENU } from "../../data";
import { ArrowUpIcon } from "../icons";
import "./Menu.css";

export const Menu = () => {
  const [scrolling, setScrolling] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const location = useLocation();

  const handleScroll = () => {
    setScrolling(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Để cập nhật trạng thái khi chuyển trang hoặc logout
  useEffect(() => {
    const onStorage = () =>
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    window.location.href = "/"; // hoặc reload lại trang
  };

  const handleScrollToTopButton = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        className={scrolling ? "navbar-scrolled" : "bg-transparent"}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand href="/">
            <span className="fw-bold fs-4">Năng Lực Số</span>
          </Navbar.Brand>
          {/* Navbar Toggler for Responsive */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border-0"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="gap-xl-4 gap-lg-3 gap-md-2 align-items-center">
              {/* Navbar Elements */}
              {location.pathname === "/" &&
                MENU &&
                MENU.map((menu, index) => (
                  <Nav.Link
                    href={menu.link}
                    key={index}
                  >
                    {menu.name}
                  </Nav.Link>
                ))}
              {/* Login and Sign up Buttons */}
              {!loggedIn ? (
                <Button className="btn-nav" as="a" href="/login">
                  Đăng Nhập
                </Button>
              ) : (
                <Button className="btn-nav" onClick={handleLogout}>
                  Đăng Xuất
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Scroll To Top Button */}
      {scrolling && (
        <Button
          variant="light"
          className="scroll-to-top"
          onClick={handleScrollToTopButton}
        >
          <ArrowUpIcon />
        </Button>
      )}
    </>
  );
};
