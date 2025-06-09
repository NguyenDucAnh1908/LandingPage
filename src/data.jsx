import {
  MicrophoneIcon,
  PlaneIcon,
  SatelitteIcon,
  SelectionIcon,
  SettingsIcon,
  TaxiIcon,
  WaterSportIcon,
} from "./components/icons";

export const MENU = [
  {
    id: 1,
    name: "Destinations",
    link: "#destinations",
  },
  {
    id: 2,
    name: "Hotels",
    link: "#",
  },
  {
    id: 3,
    name: "Flights",
    link: "#",
  },
  {
    id: 4,
    name: "Bookings",
    link: "#",
  },
];

export const SERVICES = [
  {
    id: 1,
    title: "Calculated Weather ",
    description: "Built Wicket longer admire do barton vanity itself do in it.",
    icon: <SatelitteIcon />,
  },
  {
    id: 2,
    title: "Best Flights",
    description: "Engrossed listening. Park gate sell they west hard for the.",
    icon: <PlaneIcon />,
  },
  {
    id: 3,
    title: "Local Events",
    description:
      "Barton vanity itself do in it. Preferd to men it engrossed listening. ",
    icon: <MicrophoneIcon />,
  },
  {
    id: 4,
    title: "Customization",
    description:
      "We deliver outsource aviation services for military customers",
    icon: <SettingsIcon />,
  },
];

export const DESTINATIONS = [
  {
    id: 1,
    name: "Rome, Italy",
    price: "$5,42k",
    description: "10 Days Trip",
    image: "images/italy.png",
  },
  {
    id: 2,
    name: "London, UK",
    price: "$4,2k",
    description: "12 Days Trip",
    image: "images/london.png",
  },
  {
    id: 3,
    name: "Full Europe",
    price: "$15k",
    description: "28 Days Trip",
    image: "images/europe.png",
  },
];

export const BOOK_TRIP = [
  {
    id: 1,
    title: "Choose Destination",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    icon: <SelectionIcon />,
    color: "#F0BB1F",
  },
  {
    id: 2,
    title: "Make Payment",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    icon: <WaterSportIcon />,
    color: "#F15A2B",
  },
  {
    id: 3,
    title: "Reach Airport on Selected Date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. ",
    icon: <TaxiIcon />,
    color: "#006380",
  },
];

export const DATA_PROCESSING = [
  {
    id: 1,
    title: "Xác định yêu cầu cần đạt của bài học",
    icon: <SelectionIcon />,
    color: "#F0BB1F",
  },
  {
    id: 2,
    title: "Xác định các hoạt động tích có thể bồi dưỡng năng lực số",
    icon: <WaterSportIcon />,
    color: "#F15A2B",
  },
  {
    id: 3,
    title: "Xác định tài nguyên dạy học",
    icon: <TaxiIcon />,
    color: "#006380",
  },
  {
    id: 4,
    title: "Lựa chọn phương pháp dạy học và kỹ thuật dạy học",
    icon: <SelectionIcon />,
    color: "#F0BB1F",
  },
  {
    id: 5,
    title:
      "Thiết kế các hoạt động học tập trong bài học môn công nghệ theo hướng phát triển năng lực số cho HS",
    icon: <WaterSportIcon />,
    color: "#F15A2B",
  },
];

export const KNLS_DATA = [
  {
    id: 1,
    title: "Sử dụng các thiết bị kỹ thuật số",
    items: [
      "1.1 Sử dụng thiết bị phần cứng",
      "1.2 Sử dụng phần mềm thiết bị số",
    ],
  },
  {
    id: 2,
    title: "Kỹ năng về thông tin dữ liệu",
    items: [
      "2.1 Duyệt, tìm kiếm và lọc dữ liệu, thông tin và nội dung số",
      "2.2 Đánh giá dữ liệu, thông tin và nội dung số",
      "2.3 Quản lí dữ liệu, thông tin và nội dung số",
    ],
  },
  {
    id: 3,
    title: "Giao tiếp và hợp tác",
    items: [
      "3.1 Tương tác thông qua các thiết bị số",
      "3.2 Chia sẻ thông qua công nghệ số",
      "3.3 Tham gia với tư cách công dân thông qua công nghệ số",
      "3.4 Hợp tác thông qua công nghệ số",
      "3.5 Chuẩn mực trong giao tiếp",
      "3.6 Quản lí định danh cá nhân",
    ],
  },
  {
    id: 4,
    title: "Tạo sản phẩm số",
    items: [
      "4.1 Phát triển nội dung số",
      "4.2 Tích hợp và tinh chỉnh nội dung số",
      "4.3 Bản quyền",
      "4.4 Lập trình",
    ],
  },
  {
    id: 5,
    title: "An toàn kỹ thuật số",
    items: [
      "5.1 Bảo vệ thiết bị",
      "5.2 Bảo vệ dữ liệu cá nhân và quyền riêng tư",
      "5.3 Bảo vệ sức khoẻ tinh thần và thể chất",
      "5.4 Bảo vệ môi trường",
    ],
  },
  {
    id: 6,
    title: "Giải quyết vấn đề",
    items: [
      "6.1 Giải quyết các vấn đề kĩ thuật",
      "6.2 Xác định nhu cầu và phản hồi công nghệ",
      "6.3 Sử dụng sáng tạo thiết bị số",
      "6.4 Xác định thiếu hụt về năng lực số",
      "6.5 Tư duy máy tính",
    ],
  },
  {
    id: 7,
    title: "Năng lực định hướng nghề nghiệp liên quan",
    items: [
      "7.1 Vận hành những công nghệ số đặc trưng trong một lĩnh vực đặc thù",
      "7.2 Diễn giải, thao tác với dữ liệu và nội dung kĩ thuật số cho một lĩnh vực đặc thù",
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Mike Taylor",
    text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    location: "Lahore, Pakistan",
    image: "images/person1.jpg",
  },
  {
    id: 2,
    name: "Chris Thomas",
    text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    location: "CEO of Red Button",
    image: "images/person2.jpg",
  },
  {
    id: 3,
    name: "Isabella Rossi",
    text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    location: "Rome, Italy",
    image: "images/person3.jpg",
  },
];

export const LOGOS = [
  {
    id: 1,
    name: "Axon Airlanes",
    logo: "images/logos/axon.png",
  },
  {
    id: 2,
    name: "Jetstar",
    logo: "images/logos/jetstar.png",
  },
  {
    id: 3,
    name: "Expedia",
    logo: "images/logos/expedia.png",
  },
  {
    id: 4,
    name: "Qantas",
    logo: "images/logos/qantas.png",
  },
  {
    id: 5,
    name: "Alitalia",
    logo: "images/logos/alitalia.png",
  },
];

export const FOOTER = [
  {
    id: 1,
    name: "Company",
    children: [
      {
        id: 11,
        name: "About",
        link: "#",
      },
      {
        id: 12,
        name: "Careers",
        link: "#",
      },
      {
        id: 13,
        name: "Mobile",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    name: "Contact",
    children: [
      {
        id: 21,
        name: "Help/FAQ",
        link: "#",
      },
      {
        id: 22,
        name: "Press",
        link: "#",
      },
      {
        id: 23,
        name: "Affilates",
        link: "#",
      },
    ],
  },
  {
    id: 3,
    name: "More",
    children: [
      {
        id: 31,
        name: "Airlinefees",
        link: "#",
      },
      {
        id: 32,
        name: "Airline",
        link: "#",
      },
      {
        id: 33,
        name: "Low fare tips",
        link: "#",
      },
    ],
  },
];
