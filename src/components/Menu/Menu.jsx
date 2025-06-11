import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { ArrowUpIcon } from "../icons";
import "./Menu.css";
import logoSvg from "/images/logo.svg";

const INTRO_ITEMS = [
  { name: "Giới thiệu chung", link: "#hero-introduction" },
  { name: "Video giới thiệu", link: "#hero" },
  { name: "Khung năng lực số", link: "#knls" },
  { name: "Quy trình dạy học", link: "#teaching-process" },
  { name: "Lớp học", link: "#class-section" },
  { name: "Giáo án", link: "#lesson-plan" },
  { name: "Khảo sát", link: "#survey" },
];

export const Menu = () => {
  // #region Scroll To Top
  const [scrolling, setScrolling] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTopButton = () => window.scrollTo({ top: 0 });

  const handleMenuClick = (e, link) => {
    e.preventDefault();
    setShowDropdown(false); // Đóng dropdown trước khi scroll
    setTimeout(() => {
      const id = link.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  // #endregion Scroll To Top

  return (
    <>
      <Navbar
        fixed='top'
        collapseOnSelect
        expand='lg'
        className={`${
          scrolling ? "bg-white shadow-sm" : "bg-transparent"
        } pb-4`}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand href='/'>
            <Image
              src={logoSvg}
              className='d-inline-block align-top'
              alt='Jadoo Logo'
            />
          </Navbar.Brand>
          {/* Navbar Toggler for Responsive */}
          <Navbar.Toggle
            aria-controls='responsive-navbar-nav'
            className='border-0'
          />
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-end font-open-sans mt-3'
          >
            <Nav className='gap-xl-5 gap-lg-4 gap-md-2'>
              {/* Introduction Dropdown styled as Nav.Link */}
              <NavDropdown
                title={
                  <span className='text-black fw-medium'>Giới thiệu</span>
                }
                id='basic-nav-dropdown'
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                onToggle={setShowDropdown}
                className='fw-medium'
              >
                {INTRO_ITEMS.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    href={item.link}
                    className='fw-medium'
                    onClick={(e) => handleMenuClick(e, item.link)}
                  >
                    {item.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {/* Contact Link */}
              <Nav.Link
                href='#footer'
                className='text-black fw-medium'
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("footer");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Liên hệ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Scroll To Top Button */}
      {scrolling && (
        <Button
          variant='light'
          className='scroll-to-top position-fixed end-0 bottom-0 border-0 p-2 m-3 rounded-circle z-1 d-flex justify-content-center align-items-center'
          onClick={handleScrollToTopButton}
        >
          <ArrowUpIcon />
        </Button>
      )}
    </>
  );
};
