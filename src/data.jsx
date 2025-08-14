export const COLOR_STEPS = [
  {
    iconUrl: "step1.svg",
    backgroundColor: "#20c997",
  },
  {
    iconUrl: "step2.svg",
    backgroundColor: "#2c6fb2",
  },
  {
    iconUrl: "step3.svg",
    backgroundColor: "#f6c23e",
  },
  {
    iconUrl: "step4.svg",
    backgroundColor: "#28a745",
  },
  {
    iconUrl: "step5.svg",
    backgroundColor: "#fd7e14",
  },
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
        name: "Tài liệu miễn phí",
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
  { name: "Khung NLS", link: "#knls" },
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

export const fetchSteps = async (id) => {
  const response = await fetch(
    `https://landingpagestudy.onrender.com/api/lesson-step-contents`,
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch contents steps");
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

export async function saveIllustrations(illustrationData) {
  const response = await fetch(
    "https://landingpagestudy.onrender.com/api/files",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(illustrationData),
    }
  );

  if (!response.ok) {
    throw new Error("Không thể lưu minh họa");
  }

  return await response.json();
}

export const deleteIllustration = async (illustrationId) => {
  const response = await fetch(
    `https://landingpagestudy.onrender.com/api/files/${illustrationId}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete illustration");
  }
  return response.json();
};

export const createStep = async (step) => {
  const res = await fetch(
    "https://landingpagestudy.onrender.com/api/lesson-step-contents",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(step),
    }
  );
  if (!res.ok) throw new Error("Không thể tạo bước mới");
  return res.json();
};

export const updateStep = async (id, step) => {
  const res = await fetch(
    `https://landingpagestudy.onrender.com/api/lesson-step-contents/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(step),
    }
  );
  if (!res.ok) throw new Error("Không thể cập nhật bước");
  return res.json();
};

// DELETE bước theo id
export const deleteStep = async (id) => {
  const res = await fetch(
    `https://landingpagestudy.onrender.com/api/lesson-step-contents/${id}`,
    {
      method: "DELETE",
      headers: { accept: "*/*" },
    }
  );
  if (!res.ok) throw new Error("Không thể xóa bước");
};

// create knls
export const createKnls = async (step) => {
  const res = await fetch(
    "https://landingpagestudy.onrender.com/api/digital-images",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(step),
    }
  );
  if (!res.ok) throw new Error("Không thể tạo khung năng lực số mới");
  return res.json();
};

//Update knls
export const updateKnls = async (id, step) => {
  const res = await fetch(
    `https://landingpagestudy.onrender.com/api/digital-images/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(step),
    }
  );
  if (!res.ok) throw new Error("Không thể cập nhật khung năng lực số");
  return res.json();
};

// DELETE bước theo id
export const deleteKnls = async (id) => {
  const res = await fetch(
    `https://landingpagestudy.onrender.com/api/digital-images/${id}`,
    {
      method: "DELETE",
      headers: { accept: "*/*" },
    }
  );
  if (!res.ok) throw new Error("Không thể xóa khung năng lực số");
};
