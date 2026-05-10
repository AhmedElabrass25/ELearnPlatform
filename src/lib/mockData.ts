import { Course, Lesson, Path, Instructor, User, Settings, Testimonial, FAQ } from "@/types";
export const mockData: {
  site: { name: string; logo: string; tagline: string; description: string };
  instructor: Instructor;
  categories: { levels: string[]; types: string[]; topics: string[] };
  paths: Path[];
  courses: Course[];
  lessons: Record<string, Lesson[]>;
  users: User[];
  settings: Settings;
  testimonials: Testimonial[];
  faqs: FAQ[];
} = {
  "site": {
    "name": "أكاديمية البرهان للرياضيات",
    "logo": "",
    "tagline": "طريقك نحو الإتقان في عالم الرياضيات",
    "description": "انضم إلى آلاف الطلاب الذين تفوقوا في الرياضيات مع منهجنا المبتكر الذي يجمع بين التبسيط والعمق في الجبر والهندسة والتفاضل"
  },
  "instructor": {
    "id": "1",
    "name": "محمد",
    "title": "معلم أول رياضيات",
    "avatar": "/images/instructor.jpg",
    "bio": "خبير متخصص في تبسيط مفاهيم الرياضيات للطلاب، خبرة أكثر من 10 سنوات في تدريس المناهج التعليمية بأسلوب تفاعلي يجعل المادة ممتعة وسهلة الفهم",
    "achievements": ["أفضل معلم رياضيات 2025", "أكثر من 20,000 طالب ناجح", "محاضر في كبرى المنصات التعليمية"]
  },
  "categories": {
    "levels": ["المرحلة الإعدادية", "المرحلة الثانوية", "رياضيات عامة", "مسابقات أولمبياد"],
    "types": ["أونلاين", "سنتر", "اشتراك شهري", "مراجعات نهائية"],
    "topics": ["جبر", "هندسة", "حساب مثلثات", "تفاضل وتكامل", "إحصاء", "ميكانيكا"]
  },
  "paths": [
    {
      "id": "secondary-math-1",
      "slug": "الصف-الأول-الثانوي",
      "title": "رياضيات الصف الأول الثانوي",
      "name": "رياضيات الصف الأول الثانوي",
      "description": "تغطية شاملة لمنهج الجبر، حساب المثلثات، والهندسة التحليلية بأسلوب مبسط",
      "image": "/images/math-sec1.jpg",
      "coverImage": "/images/math-sec1.jpg",
      "coursesCount": 4,
      "lessonsCount": 60,
      "examsCount": 8,
      "duration": "35 ساعة"
    },
    {
      "id": "secondary-math-2",
      "slug": "الصف-الثاني-الثانوي",
      "title": "رياضيات الصف الثاني الثانوي",
      "name": "رياضيات الصف الثاني الثانوي",
      "description": "دراسة متعمقة في التفاضل، الجبر، والميكانيكا لطلاب العلم الأدبي والعلمي",
      "image": "/images/math-sec2.jpg",
      "coverImage": "/images/math-sec2.jpg",
      "coursesCount": 5,
      "lessonsCount": 75,
      "examsCount": 10,
      "duration": "45 ساعة"
    },
    {
      "id": "secondary-math-3",
      "slug": "الصف-الثالث-الثانوي",
      "title": "رياضيات الصف الثالث الثانوي",
      "name": "رياضيات الصف الثالث الثانوي",
      "description": "المسار الأهم للوصول للدرجة النهائية في التفاضل والتكامل، الجبر والهندسة الفراغية",
      "image": "/images/math-sec3.jpg",
      "coverImage": "/images/math-sec3.jpg",
      "coursesCount": 8,
      "lessonsCount": 120,
      "examsCount": 20,
      "duration": "80 ساعة"
    }
  ],
  "courses": [
    {
      "id": "algebra-sec3-jan",
      "pathId": "secondary-math-3",
      "title": "دورة الجبر والهندسة الفراغية - يناير",
      "subtitle": "شرح الأعداد المركبة والمصفوفات",
      "price": 200,
      "currency": "ج.م",
      "level": "المرحلة الثانوية",
      "type": "أونلاين",
      "topic": "جبر",
      "lessonsCount": 12,
      "examsCount": 2,
      "duration": "10 ساعات",
      "image": "/images/course-algebra.jpg",
      "isPopular": true,
      "startDate": "2026-01-05",
      "weeks": [
        {
          "id": "w1",
          "_id": "w1",
          "title": "الأسبوع الأول: الأعداد المركبة",
          "description": "مدخل إلى الصور المختلفة للعدد المركب",
          "order": 1,
          "lessons": [
            {
              "id": "1",
              "title": "الدرس الأول: مفهوم العدد التخيلي والصورة الجبرية",
              "duration": "50 دقيقة",
              "youtubeId": "_iuxZygxz98",
              "thumbnail": "https://img.youtube.com/vi/5qap5aO7vU0/maxresdefault.jpg",
              "description": "فهم الأعداد المركبة وكيفية التعامل معها في الصورة الجبرية",
              "isFree": true,
              "order": 1
            },
            {
              "id": "2",
              "title": "الدرس الثاني: الصورة المثلثية والقطبية",
              "duration": "55 دقيقة",
              "youtubeId": "9bZkp7q19f0",
              "thumbnail": "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
              "description": "تحويل الأعداد المركبة بين الصور المختلفة واستخدام المقياس والسعة",
              "isFree": false,
              "order": 2
            }
          ],
          "materials": [
            {
              "id": "m1",
              "title": "ملخص قوانين الأعداد المركبة (PDF)",
              "type": "pdf",
              "content": "/files/complex-numbers-summary.pdf",
              "createdAt": "2026-03-01",
              "order": 1
            }
          ],
          "exams": []
        }
      ]
    }
  ],
  "lessons": {
    "algebra-sec3-jan": [
      {
        "id": "1",
        "title": "الدرس الأول: مفهوم العدد التخيلي والصورة الجبرية",
        "duration": "50 دقيقة",
        "youtubeId": "https://www.youtube.com/watch?v=_iuxZygxz98",
        "videoUrl": "https://www.youtube.com/watch?v=_iuxZygxz98",
        "thumbnail": "https://img.youtube.com/vi/5qap5aO7vU0/maxresdefault.jpg",
        "description": "فهم الأعداد المركبة وكيفية التعامل معها في الصورة الجبرية",
        "isFree": true,
        "order": 1
      },
      {
        "id": "2",
        "title": "الدرس الثاني: الصورة المثلثية والقطبية",
        "duration": "55 دقيقة",
        "youtubeId": "9bZkp7q19f0",
        "videoUrl": "https://www.youtube.com/embed/9bZkp7q19f0",
        "thumbnail": "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        "description": "تحويل الأعداد المركبة بين الصور المختلفة واستخدام المقياس والسعة",
        "isFree": false,
        "order": 2
      }
    ]
  },
  "users": [
    {
      "id": "u1",
      "fullName": "أحمد محمد علي",
      "email": "ahmed@example.com",
      "password": "hashed123",
      "phone": "+201001234567",
      "birthDate": "2005-03-15",
      "gender": "ذكر",
      "educationLevel": "ثانوية عامة",
      "governorate": "القاهرة",
      "enrolledCourses": ["algebra-sec3-jan"],
      "progress": { "algebra-sec3-jan": 65 }
    }
  ],
  "settings": {
    "darkModeEnabled": true,
    "animationsEnabled": true
  },
  "testimonials": [
    {
      "id": "t1",
      "name": "محمود عادل",
      "role": "طالب ثانوية عامة",
      "content": "الرياضيات كانت أصعب مادة بالنسبة لي حتى بدأت مع الأستاذ محمد. طريقته في تبسيط المسائل المعقدة مذهلة فعلاً.",
      "rating": 5
    },
    {
      "id": "t2",
      "name": "سارة إبراهيم",
      "role": "طالبة علمي رياضة",
      "content": "بفضل المراجعات النهائية والتمارين المكثفة، استطعت الحصول على الدرجة النهائية في التفاضل والتكامل.",
      "rating": 5
    }
  ],
  "faqs": [
    {
      "id": "q1",
      "question": "هل الشرح مناسب لطلاب الأدبي أم العلمي فقط؟",
      "answer": "نوفر دورات متخصصة لكل من القسم العلمي (رياضة وعلوم) والقسم الأدبي، بما يتناسب مع المنهج المقرر لكل منهم."
    },
    {
      "id": "q2",
      "question": "هل هناك متابعة دورية واختبارات؟",
      "answer": "نعم، بعد كل درس هناك اختبار سريع، بالإضافة إلى اختبار شامل في نهاية كل أسبوع واختبار شهري لمحاكاة نظام الامتحان النهائي."
    },
    {
      "id": "q3",
      "question": "كيف يمكنني الحصول على المذكرات والملخصات؟",
      "answer": "جميع المواد التعليمية والملخصات متاحة بصيغة PDF قابلة للتحميل والطباعة مباشرة من صفحة كل دورة."
    },
    {
      "id": "q4",
      "question": "هل تتوفر حصص مباشرة للمراجعة؟",
      "answer": "نعم، نقوم بعمل بث مباشر دوري للإجابة على أسئلة الطلاب ومراجعة الأجزاء الصعبة من المنهج."
    }
  ]
};
