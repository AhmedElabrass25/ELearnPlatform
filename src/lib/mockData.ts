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
    "name": "أكاديمية محمد للغة العربية",
    "logo": "/logo.svg",
    "tagline": "تعلم اللغة العربية بطريقة سهلة وممتعة",
    "description": "انضم إلى آلاف الطلاب الذين أتقنوا اللغة العربية مع أفضل منهج متكامل في النحو والصرف والبلاغة والأدب"
  },
  "instructor": {
    "id": "1",
    "name": "محمد",
    "title": "مدرس اللغة العربية والنحو",
    "avatar": "/images/mohamed.jpg",
    "bio": "مدرس متخصص في تدريس اللغة العربية لكل المستويات بطريقة مبسطة وتفاعلية، 8 سنوات خبرة في تدريس الثانوية والجامعات",
    "achievements": ["أفضل مدرس نحو 2025", "أكثر من 15000 طالب ناجح", "دورات أونلاين وسنتر"]
  },
  "categories": {
    "levels": ["مبتدئ", "متوسط", "متقدم", "ناطقين بغير العربية", "أطفال"],
    "types": ["أونلاين", "سنتر", "الترم كامل", "شهري"],
    "topics": ["نحو", "صرف", "بلاغة", "إملاء وتعبير", "أدب عربي", "قرآني", "لهجات"]
  },
  "paths": [
    {
      "id": "beginner-arabic",
      "slug": "المبتدئين",
      "title": "اللغة العربية للمبتدئين",
      "description": "من الصفر إلى مستوى متوسط – النحو الأساسي، المفردات، القراءة والكتابة",
      "image": "/images/path-beginner.jpg",
      "coursesCount": 6,
      "lessonsCount": 85,
      "examsCount": 12,
      "duration": "48 ساعة"
    },
    {
      "id": "intermediate",
      "slug": "المتوسط",
      "title": "اللغة العربية المتوسطة",
      "description": "تعميق النحو والصرف + البلاغة + التعبير الكتابي",
      "image": "/images/path-intermediate.jpg",
      "coursesCount": 5,
      "lessonsCount": 72,
      "examsCount": 10,
      "duration": "42 ساعة"
    },
    {
      "id": "advanced",
      "slug": "المتقدم",
      "title": "اللغة العربية المتقدمة",
      "description": "البلاغة العالية، الأدب، النقد الأدبي، والإعداد للجامعة والمناصب",
      "image": "/images/path-advanced.jpg",
      "coursesCount": 4,
      "lessonsCount": 65,
      "examsCount": 15,
      "duration": "38 ساعة"
    },
    {
      "id": "non-arabic-speakers",
      "slug": "ناطقين-بغيرها",
      "title": "اللغة العربية لغير الناطقين بها",
      "description": "منهج خاص بالأجانب – فصحى + محادثة + ثقافة عربية",
      "image": "/images/path-non-arabic.jpg",
      "coursesCount": 3,
      "lessonsCount": 55,
      "examsCount": 8,
      "duration": "35 ساعة"
    }
  ],
  "courses": [
    {
      "id": "jan-beginner-online",
      "pathId": "beginner-arabic",
      "title": "يناير 2026 – مبتدئين أونلاين",
      "subtitle": "الكورس الشهري الكامل",
      "price": 140,
      "currency": "ج.م",
      "level": "مبتدئ",
      "type": "أونلاين",
      "topic": "نحو + إملاء",
      "lessonsCount": 16,
      "examsCount": 3,
      "duration": "14 ساعة",
      "image": "/images/course-jan-beginner.jpg",
      "isPopular": true,
      "startDate": "2026-01-10",
      "weeks": [
        {
          "id": "w1",
          "title": "الأسبوع الأول: مدخل إلى اللغة العربية",
          "order": 1,
          "lessons": [
            {
              "id": "1",
              "title": "الدرس الأول: الحروف العربية ونطقها الصحيح",
              "duration": "45 دقيقة",
              "youtubeId": "_iuxZygxz98",
              "thumbnail": "https://img.youtube.com/vi/5qap5aO7vU0/maxresdefault.jpg",
              "description": "تعلم الحروف العربية من الصفر مع نطقها الصحيح وطريقة الكتابة",
              "isFree": true,
              "order": 1
            },
            {
              "id": "2",
              "title": "الدرس الثاني: الكلمات الأساسية والتحية اليومية",
              "duration": "52 دقيقة",
              "youtubeId": "9bZkp7q19f0",
              "thumbnail": "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
              "description": "أول 50 كلمة عربية يومية + جمل التحية والسلام",
              "isFree": false,
              "order": 2
            }
          ],
          "materials": [
            {
              "id": "m1",
              "title": "دليل الحروف الهجائية (PDF)",
              "type": "pdf",
              "content": "/files/arabic-alphabet.pdf",
              "createdAt": "2026-03-01",
              "order": 1
            },
            {
              "id": "m2",
              "title": "ملاحظات حول نطق الحروف",
              "type": "note",
              "content": "تأكد من ممارسة نطق الحروف الحلقية يومياً لمدة 10 دقائق.",
              "createdAt": "2026-03-02",
              "order": 2
            }
          ],
          "exams": []
        },
        {
          "id": "w2",
          "title": "الأسبوع الثاني: القواعد الأساسية",
          "order": 2,
          "lessons": [
            {
              "id": "3",
              "title": "الدرس الثالث: الاسم والنكرة والمعرفة",
              "duration": "61 دقيقة",
              "youtubeId": "3Z3Z3Z3Z3Z",
              "thumbnail": "https://img.youtube.com/vi/3Z3Z3Z3Z3Z/maxresdefault.jpg",
              "description": "قواعد النكرة والمعرفة مع أمثلة عملية كثيرة",
              "isFree": false,
              "order": 3
            }
          ],
          "materials": [
            {
              "id": "m3",
              "title": "جدول الأسماء النكرة والمعرفة",
              "type": "attachment",
              "content": "/files/noun-table.xlsx",
              "createdAt": "2026-03-10",
              "order": 1
            }
          ],
          "exams": [
            {
              "id": "ex1",
              "title": "اختبار القواعد القصير",
              "description": "اختبار سريع لقياس فهمك لدرس النكرة والمعرفة",
              "createdAt": "2026-03-12",
              "questions": [
                {
                  "id": "q1",
                  "text": "ما هو تعريف النكرة؟",
                  "type": "mcq",
                  "options": ["اسم يدل على شيء معين", "اسم يدل على شيء غير معين", "فعل ماضي", "حرف جر"],
                  "correctAnswer": "اسم يدل على شيء غير معين",
                  "score": 5
                },
                {
                  "id": "q2",
                  "text": "كلمة 'الكتاب' هي معرفة.",
                  "type": "true-false",
                  "correctAnswer": true,
                  "score": 5
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "feb-intermediate-center",
      "pathId": "intermediate",
      "title": "فبراير 2026 – متوسط سنتر",
      "price": 220,
      "level": "متوسط",
      "type": "سنتر",
      "topic": "صرف + بلاغة",
      "lessonsCount": 18,
      "examsCount": 4,
      "duration": "16 ساعة",
      "image": "/images/course-feb-intermediate.jpg",
      "weeks": []
    },
    {
      "id": "full-term-advanced",
      "pathId": "advanced",
      "title": "الترم الثاني كامل – متقدم",
      "price": 480,
      "level": "متقدم",
      "type": "الترم كامل",
      "topic": "أدب + بلاغة",
      "lessonsCount": 42,
      "examsCount": 8,
      "duration": "38 ساعة",
      "image": "/images/course-full-advanced.jpg",
      "weeks": []
    },
    {
      "id": "quranic-arabic",
      "pathId": "non-arabic-speakers",
      "title": "اللغة العربية القرآنية",
      "price": 180,
      "level": "متوسط",
      "type": "أونلاين",
      "topic": "قرآني",
      "lessonsCount": 20,
      "examsCount": 2,
      "duration": "18 ساعة",
      "image": "/images/course-quranic.jpg",
      "weeks": []
    }
  ],
  "lessons": {
    "jan-beginner-online": [
      {
        "id": "1",
        "title": "الدرس الأول: الحروف العربية ونطقها الصحيح",
        "duration": "45 دقيقة",
        "youtubeId": "https://www.youtube.com/watch?v=_iuxZygxz98",
        "videoUrl": "https://www.youtube.com/watch?v=_iuxZygxz98",
        "thumbnail": "https://img.youtube.com/vi/5qap5aO7vU0/maxresdefault.jpg",
        "description": "تعلم الحروف العربية من الصفر مع نطقها الصحيح وطريقة الكتابة",
        "isFree": true,
        "order": 1
      },
      {
        "id": "2",
        "title": "الدرس الثاني: الكلمات الأساسية والتحية اليومية",
        "duration": "52 دقيقة",
        "youtubeId": "9bZkp7q19f0",
        "videoUrl": "https://www.youtube.com/embed/9bZkp7q19f0",
        "thumbnail": "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        "description": "أول 50 كلمة عربية يومية + جمل التحية والسلام",
        "isFree": false,
        "order": 2
      },
      {
        "id": "3",
        "title": "الدرس الثالث: الاسم والنكرة والمعرفة",
        "duration": "61 دقيقة",
        "youtubeId": "3Z3Z3Z3Z3Z",
        "videoUrl": "https://www.youtube.com/embed/3Z3Z3Z3Z3Z",
        "thumbnail": "https://img.youtube.com/vi/3Z3Z3Z3Z3Z/maxresdefault.jpg",
        "description": "قواعد النكرة والمعرفة مع أمثلة عملية كثيرة",
        "isFree": false,
        "order": 3
      },
      {
        "id": "4",
        "title": "الدرس الرابع: الإعراب الأساسي (الرفع والنصب والجر)",
        "duration": "58 دقيقة",
        "youtubeId": "abc123def45",
        "videoUrl": "https://www.youtube.com/embed/abc123def45",
        "thumbnail": "https://img.youtube.com/vi/abc123def45/maxresdefault.jpg",
        "description": "شرح الإعراب بالتفصيل مع تمارين",
        "isFree": false,
        "order": 4
      },
      {
        "id": "5",
        "title": "الدرس الخامس: الفعل الماضي والمضارع",
        "duration": "49 دقيقة",
        "youtubeId": "xyz789abc12",
        "videoUrl": "https://www.youtube.com/embed/xyz789abc12",
        "thumbnail": "https://img.youtube.com/vi/xyz789abc12/maxresdefault.jpg",
        "description": "تصريف الأفعال الثلاثة مع أمثلة",
        "isFree": false,
        "order": 5
      },
      {
        "id": "6",
        "title": "الدرس السادس: الضمائر والموصولات",
        "duration": "55 دقيقة",
        "youtubeId": "def456ghi78",
        "videoUrl": "https://www.youtube.com/embed/def456ghi78",
        "thumbnail": "https://img.youtube.com/vi/def456ghi78/maxresdefault.jpg",
        "description": "الضمائر المتصلة والمنفصلة",
        "isFree": false,
        "order": 6
      },
      {
        "id": "7",
        "title": "الدرس السابع: الجملة الاسمية والفعلية",
        "duration": "63 دقيقة",
        "youtubeId": "ghi789jkl01",
        "videoUrl": "https://www.youtube.com/embed/ghi789jkl01",
        "thumbnail": "https://img.youtube.com/vi/ghi789jkl01/maxresdefault.jpg",
        "description": "بناء الجملة بالكامل",
        "isFree": false,
        "order": 7
      },
      {
        "id": "8",
        "title": "امتحان شامل + مراجعة الوحدة الأولى",
        "duration": "75 دقيقة",
        "youtubeId": "jkl012mno34",
        "videoUrl": "https://www.youtube.com/embed/jkl012mno34",
        "thumbnail": "https://img.youtube.com/vi/jkl012mno34/maxresdefault.jpg",
        "description": "امتحان تفاعلي + تصحيح + نصائح",
        "isFree": false,
        "order": 8
      }
    ],
    "feb-intermediate-center": [
      {
        "id": "1",
        "title": "الصرف: الماضي والمضارع والأمر",
        "duration": "68 دقيقة",
        "youtubeId": "mno345pqr67",
        "videoUrl": "https://www.youtube.com/embed/mno345pqr67",
        "thumbnail": "https://img.youtube.com/vi/mno345pqr67/maxresdefault.jpg",
        "description": "شرح كامل للأزمنة الثلاثة مع تصريف",
        "isFree": false,
        "order": 1
      },
      {
        "id": "2",
        "title": "البلاغة: الاستعارة والكناية",
        "duration": "59 دقيقة",
        "youtubeId": "pqr678stu90",
        "videoUrl": "https://www.youtube.com/embed/pqr678stu90",
        "thumbnail": "https://img.youtube.com/vi/pqr678stu90/maxresdefault.jpg",
        "description": "الصور البلاغية الأساسية",
        "isFree": false,
        "order": 2
      },
      {
        "id": "3",
        "title": "الإملاء والتعبير الكتابي",
        "duration": "64 دقيقة",
        "youtubeId": "stu901vwx23",
        "videoUrl": "https://www.youtube.com/embed/stu901vwx23",
        "thumbnail": "https://img.youtube.com/vi/stu901vwx23/maxresdefault.jpg",
        "description": "قواعد الإملاء + كتابة فقرات",
        "isFree": false,
        "order": 3
      },
      {
        "id": "4",
        "title": "الجمل المعقدة والموصولات",
        "duration": "57 دقيقة",
        "youtubeId": "vwx234yza56",
        "videoUrl": "https://www.youtube.com/embed/vwx234yza56",
        "thumbnail": "https://img.youtube.com/vi/vwx234yza56/maxresdefault.jpg",
        "description": "الجمل الاسمية والفعلية المتقدمة",
        "isFree": false,
        "order": 4
      },
      {
        "id": "5",
        "title": "الأفعال الخمسة والمبني للمجهول",
        "duration": "71 دقيقة",
        "youtubeId": "yza567bcd89",
        "videoUrl": "https://www.youtube.com/embed/yza567bcd89",
        "thumbnail": "https://img.youtube.com/vi/yza567bcd89/maxresdefault.jpg",
        "description": "تصريف الأفعال الخمسة",
        "isFree": false,
        "order": 5
      },
      {
        "id": "6",
        "title": "العدد والمعدود في اللغة العربية",
        "duration": "53 دقيقة",
        "youtubeId": "bcd890efg12",
        "videoUrl": "https://www.youtube.com/embed/bcd890efg12",
        "thumbnail": "https://img.youtube.com/vi/bcd890efg12/maxresdefault.jpg",
        "description": "قواعد العدد الكاملة",
        "isFree": false,
        "order": 6
      },
      {
        "id": "7",
        "title": "النحو المتقدم: الحال والتمييز",
        "duration": "66 دقيقة",
        "youtubeId": "efg123hij45",
        "videoUrl": "https://www.youtube.com/embed/efg123hij45",
        "thumbnail": "https://img.youtube.com/vi/efg123hij45/maxresdefault.jpg",
        "description": "الحال والتمييز مع أمثلة",
        "isFree": false,
        "order": 7
      },
      {
        "id": "8",
        "title": "امتحان منتصف الكورس + مراجعة",
        "duration": "78 دقيقة",
        "youtubeId": "hij456klm78",
        "videoUrl": "https://www.youtube.com/embed/hij456klm78",
        "thumbnail": "https://img.youtube.com/vi/hij456klm78/maxresdefault.jpg",
        "description": "امتحان شامل + تصحيح",
        "isFree": false,
        "order": 8
      }
    ],
    "full-term-advanced": [
      {
        "id": "1",
        "title": "البلاغة العالية: التشبيه والمجاز",
        "duration": "70 دقيقة",
        "youtubeId": "klm789nop01",
        "videoUrl": "https://www.youtube.com/embed/klm789nop01",
        "thumbnail": "https://img.youtube.com/vi/klm789nop01/maxresdefault.jpg",
        "description": "الصور البلاغية المتقدمة",
        "isFree": false,
        "order": 1
      },
      {
        "id": "2",
        "title": "الأدب العربي: العصر الجاهلي",
        "duration": "65 دقيقة",
        "youtubeId": "nop012qrs34",
        "videoUrl": "https://www.youtube.com/embed/nop012qrs34",
        "thumbnail": "https://img.youtube.com/vi/nop012qrs34/maxresdefault.jpg",
        "description": "شعراء الجاهلية وأشهر قصائدهم",
        "isFree": false,
        "order": 2
      },
      {
        "id": "3",
        "title": "النقد الأدبي والتحليل",
        "duration": "72 دقيقة",
        "youtubeId": "qrs345tuv67",
        "videoUrl": "https://www.youtube.com/embed/qrs345tuv67",
        "thumbnail": "https://img.youtube.com/vi/qrs345tuv67/maxresdefault.jpg",
        "description": "كيفية تحليل النصوص الأدبية",
        "isFree": false,
        "order": 3
      },
      {
        "id": "4",
        "title": "الإعراب المتقدم: المفعول المطلق",
        "duration": "59 دقيقة",
        "youtubeId": "tuv678wxy90",
        "videoUrl": "https://www.youtube.com/embed/tuv678wxy90",
        "thumbnail": "https://img.youtube.com/vi/tuv678wxy90/maxresdefault.jpg",
        "description": "قواعد إعرابية متقدمة",
        "isFree": false,
        "order": 4
      },
      {
        "id": "5",
        "title": "الشعر العباسي والأموي",
        "duration": "68 دقيقة",
        "youtubeId": "wxy901zab23",
        "videoUrl": "https://www.youtube.com/embed/wxy901zab23",
        "thumbnail": "https://img.youtube.com/vi/wxy901zab23/maxresdefault.jpg",
        "description": "أشهر الشعراء والقصائد",
        "isFree": false,
        "order": 5
      },
      {
        "id": "6",
        "title": "الأسلوب البلاغي في القرآن",
        "duration": "74 دقيقة",
        "youtubeId": "zab234cde56",
        "videoUrl": "https://www.youtube.com/embed/zab234cde56",
        "thumbnail": "https://img.youtube.com/vi/zab234cde56/maxresdefault.jpg",
        "description": "الإعجاز البلاغي في القرآن الكريم",
        "isFree": false,
        "order": 6
      },
      {
        "id": "7",
        "title": "كتابة المقال والتقرير",
        "duration": "61 دقيقة",
        "youtubeId": "cde567fgh89",
        "videoUrl": "https://www.youtube.com/embed/cde567fgh89",
        "thumbnail": "https://img.youtube.com/vi/cde567fgh89/maxresdefault.jpg",
        "description": "مهارات الكتابة المتقدمة",
        "isFree": false,
        "order": 7
      },
      {
        "id": "8",
        "title": "امتحان نهائي + مراجعة شاملة",
        "duration": "80 دقيقة",
        "youtubeId": "fgh890ijk12",
        "videoUrl": "https://www.youtube.com/embed/fgh890ijk12",
        "thumbnail": "https://img.youtube.com/vi/fgh890ijk12/maxresdefault.jpg",
        "description": "امتحان الترم كامل + تصحيح",
        "isFree": false,
        "order": 8
      }
    ],
    "quranic-arabic": [
      {
        "id": "1",
        "title": "اللغة العربية القرآنية – المقدمة",
        "duration": "50 دقيقة",
        "youtubeId": "ijk123lmn45",
        "videoUrl": "https://www.youtube.com/embed/ijk123lmn45",
        "thumbnail": "https://img.youtube.com/vi/ijk123lmn45/maxresdefault.jpg",
        "description": "مقدمة في فهم القرآن بالعربية",
        "isFree": true,
        "order": 1
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
      "educationalLevel": "ثانوية عامة",
      "governorate": "القاهرة",
      "enrolledCourses": ["jan-beginner-online", "feb-intermediate-center"],
      "progress": { "jan-beginner-online": 65, "feb-intermediate-center": 30 }
    },
    {
      "id": "u2",
      "fullName": "سارة أحمد حسن",
      "email": "sara@example.com",
      "password": "hashed123",
      "phone": "+201112345678",
      "birthDate": "2006-07-22",
      "gender": "أنثى",
      "educationalLevel": "جامعي",
      "governorate": "الإسكندرية",
      "enrolledCourses": ["quranic-arabic"],
      "progress": { "quranic-arabic": 45 }
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
      "role": "طالب ثانوي",
      "content": "من أفضل الدروات التي حضرتها، شرح المعلم محمد للنحو مبسط جداً وتحسنت درجاتي بشكل ملحوظ.",
      "rating": 5
    },
    {
      "id": "t2",
      "name": "سارة إبراهيم",
      "role": "طالبة جامعية",
      "content": "الكورس ساعدني في تحضير مشروع التخرج، البلاغة أصبحت مادة ممتعة ولم تعد كابوساً كما في الماضي.",
      "rating": 5
    },
    {
      "id": "t3",
      "name": "أحمد حسن",
      "role": "مهندس",
      "content": "دراسة اللغة العربية كهواية كانت صعبة حتى وجدت هذه المنصة. ترتيب الدروس والمادة العلمية ممتاز جداً.",
      "rating": 4
    }
  ],
  "faqs": [
    {
      "id": "q1",
      "question": "هل الشرح مناسب للمبتدئين تماماً؟",
      "answer": "نعم، لدينا مسار كامل يبدأ من الحروف والأصوات ومناسب للمبتدئين من الصفر."
    },
    {
      "id": "q2",
      "question": "كيف يمكنني التواصل مع المعلم لطرح أسئلة؟",
      "answer": "نقدم جروبات دعم عبر الواتساب والتليجرام للطلبة المشتركين للرد على استفساراتهم بشكل يومي."
    },
    {
      "id": "q3",
      "question": "هل تتوفر شهادات بعد إتمام الدورة؟",
      "answer": "بالطبع! بمجرد إكمال أي مسار تعليمي بنجاح واجتياز الاختبار النهائي ستحصل على شهادة إتمام إلكترونية."
    },
    {
      "id": "q4",
      "question": "هل يمكنني المشاهدة من الهاتف؟",
      "answer": "بالتأكيد، المنصة تدعم جميع الشاشات الذكية بدءاً من الهواتف وحتى شاشات التلفاز."
    }
  ]
};
