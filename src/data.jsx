export const DATA_PROCESSING = [
  {
    id: 1,
    label: "Bước 1",
    title: "Xác định yêu cầu cần đạt của bài học",
    iconUrl: "step1.svg",
    imageUrl:
      "https://cdn.s99.vn/ss2/prod/product/af88687ac7d7bf733909ba9ea3c120b1_1700131262.jpg",
  },
  {
    id: 2,
    label: "Bước 2",
    title: "Xác định các hoạt động tích hợp có thể bồi dưỡng năng lực số",
    iconUrl: "step2.svg",
    imageUrl:
      "https://cdn.s99.vn/ss2/prod/product/af88687ac7d7bf733909ba9ea3c120b1_1700131262.jpg",
  },
  {
    id: 3,
    label: "Bước 3",
    title: "Xác định tài nguyên dạy học",
    iconUrl: "step3.svg",
    imageUrl:
      "https://cdn.s99.vn/ss2/prod/product/af88687ac7d7bf733909ba9ea3c120b1_1700131262.jpg",
  },
  {
    id: 4,
    label: "Bước 4",
    title: "Lựa chọn phương pháp và kỹ thuật dạy học",
    iconUrl: "step4.svg",
    imageUrl:
      "https://cdn.s99.vn/ss2/prod/product/af88687ac7d7bf733909ba9ea3c120b1_1700131262.jpg",
  },
  {
    id: 5,
    label: "Bước 5",
    title:
      "Thiết kế các hoạt động học tập trong bài học môn Công nghệ theo hướng phát triển năng lực số cho HS",
    iconUrl: "step5.svg",
    imageUrl:
      "https://cdn.s99.vn/ss2/prod/product/af88687ac7d7bf733909ba9ea3c120b1_1700131262.jpg",
  },
];
export const COLOR_STEPS = [
  "#20c997", // Step 1
  "#2c6fb2", // Step 2
  "#f6c23e", // Step 3
  "#28a745", // Step 4
  "#fd7e14", // Step 5
];

export const FOOTER = [
  {
    id: 1,
    name: "Về chúng tôi",
    children: [
      {
        id: 11,
        name: "Giới thiệu",
        link: "#",
      },
      {
        id: 12,
        name: "Tuyển dụng",
        link: "#",
      },
      {
        id: 13,
        name: "Ứng dụng di động",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    name: "Hỗ trợ",
    children: [
      {
        id: 21,
        name: "Help/Liên hệ",
        link: "#",
      },
      {
        id: 22,
        name: "Câu hỏi thường gặp (FAQ)",
        link: "#",
      },
      {
        id: 23,
        name: "Hướng dẫn sử dụng",
        link: "#",
      },
    ],
  },
  {
    id: 3,
    name: "Tài nguyên",
    children: [
      {
        id: 31,
        name: "Blog học tập",
        link: "#",
      },
      {
        id: 32,
        name: "AirTài liệu miễn phíline",
        link: "#",
      },
      {
        id: 33,
        name: "Mẹo học hiệu quả",
        link: "#",
      },
    ],
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

export const fetchVideoLink = async () => {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/videos-link"
  );
  if (!response.ok) throw new Error("Failed to fetch video link");
  return response.json();
};

export const MENU = [
  { name: "Giới thiệu", link: "#hero" },
  { name: "KNLS", link: "#knls" },
  { name: "Quy trình dạy học", link: "#teaching-process" },
  { name: "Lớp học", link: "#class-section" },
  { name: "Giáo án", link: "#lesson-illustration" },
  { name: "Khảo sát", link: "#survey" },
  { name: "Liên hệ", link: "#footer" },
];
export const login = async (username, password) => {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
};

export const fetchKnlsImages = async () => {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/digital-images",
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch KNLS images");
  }
  return response.json();
};

export const fetchLessons = async () => {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/lessons",
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch lessons");
  }
  return response.json();
};

export const fetchIllustrations = async () => {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/files",
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch illustration images");
  }
  return response.json();
};

export const fetchIllustration = async (id) => {
  const response = await fetch(
    `https://landingpagestudy.onrender.com/api/files/${id}`,
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch illustration images");
  }
  return response.json();
};

export const deleteGrade = async (id) => {
  const response = await fetch(
    `https://landingpagestudy.onrender.com/api/lessons/${id}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete lesson");
  }
  return response.json();
};

export const deleteLessonContent = async (id) => {
  const response = await fetch(
    `https://landingpagestudy.onrender.com/api/lessons/content/${id}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete lesson content");
  }
  return response.json();
};

export const deleteLessonImage = async (id) => {
  const response = await fetch(
    `https://landingpagestudy.onrender.com/api/lessons/image/${id}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete lesson image");
  }
  return response.json();
};

export async function saveGrade(lessonData) {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/lessons/save-or-update",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    }
  );

  if (!response.ok) {
    throw new Error("Không thể lưu bài học");
  }

  return await response.json();
}

export async function saveSurveyLink(surveyData) {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/survey-links",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    }
  );

  if (!response.ok) {
    throw new Error("Không thể lưu đường dẫn khảo sát");
  }

  return await response.json();
}
