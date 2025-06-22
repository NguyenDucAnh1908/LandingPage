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
    setScrolling(window.scrollY > 50);
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

  const handleScrollToTopButton = () => window.scrollTo({ top: 0 });

  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        className={`${
          scrolling ? "bg-white shadow-sm" : "bg-transparent"
        } pb-4`}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand href="/">
            <span className="fw-bold fs-4 text-dark">Home</span>
          </Navbar.Brand>
          {/* Navbar Toggler for Responsive */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border-0"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end mt-3"
          >
            <Nav className="gap-xl-5 gap-lg-4 gap-md-2">
              {/* Navbar Elements */}
              {location.pathname === "/" &&
                MENU &&
                MENU.map((menu, index) => (
                  <Nav.Link
                    href={menu.link}
                    key={index}
                    className="text-black fw-medium"
                  >
                    {menu.name}
                  </Nav.Link>
                ))}
              {/* Login and Sign up Buttons */}
              {!loggedIn ? (
                <Button variant="outline-dark fw-medium" as="a" href="/login">
                  Login
                </Button>
              ) : (
                <Button variant="outline-dark fw-medium" onClick={handleLogout}>
                  Logout
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
          className="scroll-to-top position-fixed end-0 bottom-0 border-0 p-2 m-3 rounded-circle z-1 d-flex justify-content-center align-items-center"
          onClick={handleScrollToTopButton}
        >
          <ArrowUpIcon />
        </Button>
      )}
    </>
  );
};
