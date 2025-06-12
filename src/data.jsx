export const DATA_PROCESSING = [
  {
    id: 1,
    label: "Bước 1",
    title: "Xác định yêu cầu cần đạt của bài học",
    iconUrl: "step1.svg",
    color: "#20c997",
    backgroundColor: "#20c997"
  },
  {
    id: 2,
    label: "Bước 2",
    title: "Xác định các hoạt động tích hợp có thể bồi dưỡng năng lực số",
    iconUrl: "step2.svg",
    color: "#2c6fb2",
    backgroundColor: "#2c6fb2"
  },
  {
    id: 3,
    label: "Bước 3",
    title: "Xác định tài nguyên dạy học",
    iconUrl: "step3.svg",
    color: "#f6c23e",
    backgroundColor: "#f6c23e"
  },
  {
    id: 4,
    label: "Bước 4",
    title: "Lựa chọn phương pháp và kỹ thuật dạy học",
    iconUrl: "step4.svg",
    color: "#28a745",
    backgroundColor: "#28a745"
  },
  {
    id: 5,
    label: "Bước 5",
    title: "Thiết kế các hoạt động học tập trong bài học môn Công nghệ theo hướng phát triển năng lực số cho HS",
    iconUrl: "step5.svg",
    color: "#fd7e14",
    backgroundColor: "#fd7e14"
  }
];

export const GRADES = [
  {
    id: 3,
    name: "Lớp 3",
    description: "Chương trình lớp 3",
    lessons: [
      {
        id: "3-1",
        order: 1,
        title: "Giới thiệu về công nghệ",
        description: "Bài 1: Giới thiệu về công nghệ",
        images: [
          {
            id: 1,
            url: "/lesson-images/3-1-1.jpg",
            title: "Hình 1",
            backgroundColor: "#2c6fb2"
          },
          {
            id: 2,
            url: "/lesson-images/3-1-2.jpg",
            title: "Hình 2",
            backgroundColor: "#dc3545"
          }
        ],
        plan: {
          title: "Minh Họa Bài 1",
          subtitle: "Bài 1",
          backgroundColor: "#2c6fb2",
          pdfUrl: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/SDS%20Document.pdf?alt=media&token=2942c792-57eb-43e6-b441-8adaff091546"
        }
      },
      {
        id: "3-2",
        order: 2,
        title: "Công nghệ trong cuộc sống",
        description: "Bài 2: Công nghệ trong cuộc sống",
        images: [
          {
            id: 1,
            url: "/lesson-images/3-2-1.jpg",
            title: "Hình 1",
            backgroundColor: "#20c997"
          },
          {
            id: 2,
            url: "/lesson-images/3-2-2.jpg",
            title: "Hình 2",
            backgroundColor: "#e83e8c"
          },
          {
            id: 3,
            url: "/lesson-images/3-2-3.jpg",
            title: "Hình 3",
            backgroundColor: "#fd7e14"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Lớp 4",
    description: "Chương trình lớp 4",
    lessons: [
      {
        id: "4-1",
        order: 1,
        title: "Khám phá công nghệ",
        description: "Bài 1: Khám phá công nghệ",
        images: [
          {
            id: 1,
            url: "/lesson-images/4-1-1.jpg",
            title: "Hình 1",
            backgroundColor: "#6610f2"
          },
          {
            id: 2,
            url: "/lesson-images/4-1-2.jpg",
            title: "Hình 2",
            backgroundColor: "#6f42c1"
          }
        ]
      },
      {
        id: "4-2",
        order: 2,
        title: "Công nghệ và môi trường",
        description: "Bài 2: Công nghệ và môi trường",
        images: [
          {
            id: 1,
            url: "/lesson-images/4-2-1.jpg",
            title: "Hình 1",
            backgroundColor: "#20c997"
          },
          {
            id: 2,
            url: "/lesson-images/4-2-2.jpg",
            title: "Hình 2",
            backgroundColor: "#fd7e14"
          },
          {
            id: 3,
            url: "/lesson-images/4-2-3.jpg",
            title: "Hình 3",
            backgroundColor: "#dc3545"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Lớp 5",
    description: "Chương trình lớp 5",
    lessons: [
      {
        id: "5-1",
        order: 1,
        title: "Tìm hiểu về công nghệ thông tin",
        description: "Bài 1: Tìm hiểu về công nghệ thông tin",
        images: [
          {
            id: 1,
            url: "/lesson-images/5-1-1.jpg",
            title: "Hình 1",
            backgroundColor: "#007bff"
          },
          {
            id: 2,
            url: "/lesson-images/5-1-2.jpg",
            title: "Hình 2",
            backgroundColor: "#6610f2"
          }
        ]
      },
      {
        id: "5-2",
        order: 2,
        title: "Ứng dụng công nghệ trong cuộc sống",
        description: "Bài 2: Ứng dụng công nghệ trong cuộc sống",
        images: [
          {
            id: 1,
            url: "/lesson-images/5-2-1.jpg",
            title: "Hình 1",
            backgroundColor: "#28a745"
          },
          {
            id: 2,
            url: "/lesson-images/5-2-2.jpg",
            title: "Hình 2",
            backgroundColor: "#fd7e14"
          },
          {
            id: 3,
            url: "/lesson-images/5-2-3.jpg",
            title: "Hình 3",
            backgroundColor: "#dc3545"
          }
        ]
      }
    ]
  }
];

export const LESSONS = [
  {
    id: "3-1",
    gradeId: 3,
    order: 1,
    title: "Giới thiệu về công nghệ",
    description: "Bài 1: Giới thiệu về công nghệ",
    images: [
      {
        id: 1,
        url: "/lesson-images/3-1-1.jpg",
        title: "Hình 1",
        backgroundColor: "#2c6fb2"
      },
      {
        id: 2,
        url: "/lesson-images/3-1-2.jpg",
        title: "Hình 2",
        backgroundColor: "#dc3545"
      }
    ],
    plan: {
      title: "Minh Họa Bài 1",
      subtitle: "Bài 1",
      pdfUrl: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/SDS%20Document.pdf?alt=media&token=2942c792-57eb-43e6-b441-8adaff091546"
    }
  },
  {
    id: "3-2",
    gradeId: 3,
    order: 2,
    title: "Công nghệ trong cuộc sống",
    description: "Bài 2: Công nghệ trong cuộc sống",
    images: [
      {
        id: 1,
        url: "/lesson-images/3-2-1.jpg",
        title: "Hình 1",
        backgroundColor: "#20c997"
      },
      {
        id: 2,
        url: "/lesson-images/3-2-2.jpg",
        title: "Hình 2",
        backgroundColor: "#e83e8c"
      },
      {
        id: 3,
        url: "/lesson-images/3-2-3.jpg",
        title: "Hình 3",
        backgroundColor: "#fd7e14"
      }
    ],
        plan: {
      title: "Minh Họa Bài 2",
      subtitle: "Bài 2",
      pdfUrl: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/SDS%20Document.pdf?alt=media&token=2942c792-57eb-43e6-b441-8adaff091546"
    }
  },
  {
    id: "4-1",
    gradeId: 4,
    order: 1,
    title: "Khám phá công nghệ",
    description: "Bài 1: Khám phá công nghệ",
    images: [
      {
        id: 1,
        url: "/lesson-images/4-1-1.jpg",
        title: "Hình 1",
        backgroundColor: "#6610f2"
      },
      {
        id: 2,
        url: "/lesson-images/4-1-2.jpg",
        title: "Hình 2",
        backgroundColor: "#6f42c1"
      }
    ]
  },
  {
    id: "4-2",
    gradeId: 4,
    order: 2,
    title: "Công nghệ và môi trường",
    description: "Bài 2: Công nghệ và môi trường",
    images: [
      {
        id: 1,
        url: "/lesson-images/4-2-1.jpg",
        title: "Hình 1",
        backgroundColor: "#20c997"
      },
      {
        id: 2,
        url: "/lesson-images/4-2-2.jpg",
        title: "Hình 2",
        backgroundColor: "#fd7e14"
      },
      {
        id: 3,
        url: "/lesson-images/4-2-3.jpg",
        title: "Hình 3",
        backgroundColor: "#dc3545"
      }
    ]
  },
  {
    id: "5-1",
    gradeId: 5,
    order: 1,
    title: "Tìm hiểu về công nghệ thông tin",
    description: "Bài 1: Tìm hiểu về công nghệ thông tin",
    images: [
      {
        id: 1,
        url: "/lesson-images/5-1-1.jpg",
        title: "Hình 1",
        backgroundColor: "#007bff"
      },
      {
        id: 2,
        url: "/lesson-images/5-1-2.jpg",
        title: "Hình 2",
        backgroundColor: "#6610f2"
      }
    ]
  },
  {
    id: "5-2",
    gradeId: 5,
    order: 2,
    title: "Ứng dụng công nghệ trong cuộc sống",
    description: "Bài 2: Ứng dụng công nghệ trong cuộc sống",
    images: [
      {
        id: 1,
        url: "/lesson-images/5-2-1.jpg",
        title: "Hình 1",
        backgroundColor: "#28a745"
      },
      {
        id: 2,
        url: "/lesson-images/5-2-2.jpg",
        title: "Hình 2",
        backgroundColor: "#fd7e14"
      },
      {
        id: 3,
        url: "/lesson-images/5-2-3.jpg",
        title: "Hình 3",
        backgroundColor: "#dc3545"
      }
    ]
  }
];

export const DIGITAL_FRAMEWORK = [
  {
    title: "Khung năng lực số",
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/6112666.jpg?alt=media&token=71465b4a-aa75-48c8-95cb-e956cf93d8e7",
    images: [
      {
        id: 1,
        url: "/knls/1-1.jpg",
        backgroundColor: "#2c6fb2"
      },
      {
        id: 2,
        url: "/knls/1-2.jpg",
        backgroundColor: "#2c6fb2"
      }
    ]
  }
];

// Helper function to get lessons by grade
export const getLessonsByGrade = (gradeId) => {
  return LESSONS.filter(lesson => lesson.gradeId === gradeId);
};

// Helper function to get lesson by id
export const getLessonById = (lessonId) => {
  return LESSONS.find(lesson => lesson.id === lessonId);
};

// Add helper functions for lesson plans
export const getLessonPlan = (lessonId) => {
  const lesson = LESSONS.find(lesson => lesson.id === lessonId);
  return lesson?.plan;
};

export const getLessonPlans = () => {
  return LESSONS.filter(lesson => lesson.plan)
    .map(lesson => ({
      id: lesson.id,
      title: lesson.plan.title,
      subtitle: lesson.plan.subtitle,
      backgroundColor: lesson.plan.backgroundColor
    }));
};


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
