import { Article } from '../types';

export const articles: Article[] = [
  // ... مقالات قبلی (۰۱ تا ۰۵) همان‌طور که بودند ...

  // ==================== مقالات جدید ====================

  {
    id: '06',
    title: 'ساختار داده‌های سلسله‌مراتبی در مستندات فنی',
    date: '2026/08/06',
    excerpt: 'بررسی الگوهای مدیریت داده‌های درختی و نحوه نمایش آن‌ها در مستندات نرم‌افزاری با استفاده از بلاک‌های کد و نمودارهای کاراکتری.',
    readTime: '۵ دقیقه',
    tags: ['داده', 'ساختار', 'درخت', 'الگوریتم'],
    featured: false,
    blocks: [
      {
        type: 'markdown',
        content: `## بازنمایی درختان داده در قالب متنی

ساختارهای درختی (Tree Data Structures) پایه‌ی بسیاری از سیستم‌های فایل، پایگاه‌های داده و الگوریتم‌های جستجو هستند. نمایش بصری آن‌ها در متون فنی نیازمند دقت و ظرافت خاصی است.

### نمایش ساده با کاراکترهای خطی:`
      },
      {
        type: 'ascii',
        title: 'DIRECTORY TREE STRUCTURE',
        align: 'left',
        content: `
📁 root/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── 📁 utils/
│   │   └── helpers.ts
│   └── index.ts
├── 📁 public/
│   ├── favicon.ico
│   └── index.html
└── package.json
`
      },
      {
        type: 'markdown',
        content: `### پیاده‌سازی بازگشتی در جاوااسکریپت`
      },
      {
        type: 'code',
        language: 'javascript',
        filename: 'treeTraversal.js',
        code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    return this;
  }
}

function depthFirstTraversal(node, level = 0) {
  console.log('  '.repeat(level) + '├─ ' + node.value);
  for (const child of node.children) {
    depthFirstTraversal(child, level + 1);
  }
}

// ساخت درخت نمونه
const root = new TreeNode('پروژه')
  .addChild(new TreeNode('ماژول ورودی'))
  .addChild(new TreeNode('هسته پردازش'))
  .addChild(new TreeNode('خروجی‌ها'));

depthFirstTraversal(root);`,
        caption: 'پیاده‌سازی پیمایش عمقی درخت با جاوااسکریپت'
      }
    ]
  },
  {
    id: '07',
    title: 'زیبایی‌شناسی رنگ‌ها در رابط‌های متنی',
    date: '2026/08/04',
    excerpt: 'تأثیر ترکیب رنگ‌های گرم و سرد بر خوانایی و تجربه‌ی کاربری در محیط‌های ترمینال و وب‌سایت‌های مینیمال.',
    readTime: '۴ دقیقه',
    tags: ['رنگ', 'طراحی رابط', 'ترمینال', 'تجربه کاربری'],
    blocks: [
      {
        type: 'markdown',
        content: `## پالت‌های رنگی در فضای ترمینال

رنگ‌ها نه تنها به زیبایی بصری کمک می‌کنند، بلکه می‌توانند سلسله‌مراتب اطلاعاتی و وضعیت‌های مختلف را به کاربر منتقل کنند.`
      },
      {
        type: 'ansi',
        title: 'COLOR PALETTE SHOWCASE',
        content: `\x1b[1;37m═══════════════════════════════════════════════════════════\x1b[0m
\x1b[1;36m  🎨 色 \x1b[1;37mCOLOR PSYCHOLOGY IN TERMINAL ENVIRONMENTS  \x1b[1;36m🎨\x1b[0m
\x1b[1;37m═══════════════════════════════════════════════════════════\x1b[0m

\x1b[1;31m  🔴 RED     \x1b[0mخطر، خطا، توقف، اهمیت بالا
\x1b[1;32m  🟢 GREEN   \x1b[0mموفقیت، تأیید، پیشرفت، امنیت
\x1b[1;33m  🟡 YELLOW  \x1b[0mهشدار، توجه، صبر، تأخیر
\x1b[1;34m  🔵 BLUE    \x1b[0mاطلاعات، آرامش، اعتماد، لینک‌ها
\x1b[1;35m  🟣 MAGENTA \x1b[0mخلاقیت، ویژه، برجسته، کاربری
\x1b[1;36m  🩵 CYAN    \x1b[0mمکمل، تعادل، پس‌زمینه، دستورات

\x1b[2;37m  ═══════════════════════════════════════════════════════════\x1b[0m
\x1b[3;33m  ✦ هر رنگ داستانی روایت می‌کند ✦\x1b[0m
\x1b[2;37m  ═══════════════════════════════════════════════════════════\x1b[0m`
      },
      {
        type: 'markdown',
        content: `### مقایسه‌ی تأثیر رنگ‌ها بر خستگی چشم`
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1000&q=80',
        align: 'center',
        caption: 'طیف‌های رنگی با طول‌موج $\\lambda = \\frac{c}{f}$ و تأثیر آن بر ادراک بصری'
      }
    ]
  },
  {
    id: '08',
    title: 'مبانی نظریه اعداد در رمزنگاری مدرن',
    date: '2026/08/02',
    excerpt: 'مروری بر مفاهیم پایه‌ای نظریه اعداد و کاربرد آن‌ها در الگوریتم‌های رمزنگاری کلید عمومی.',
    readTime: '۷ دقیقه',
    tags: ['رمزنگاری', 'نظریه اعداد', 'امنیت', 'الگوریتم'],
    featured: true,
    blocks: [
      {
        type: 'markdown',
        content: `## نقش اعداد اول در امنیت دیجیتال

امنیت ارتباطات دیجیتال بر پایه‌ی دشواری تجزیه اعداد بزرگ به عوامل اول (Integer Factorization) استوار است. این مسئله به عنوان یکی از چالش‌های اساسی علوم کامپیوتر مطرح است.

### قضیه‌ی بنیادی حساب:`
      },
      {
        type: 'math',
        latex: `\\forall n \\in \\mathbb{N}, \\; n > 1 \\; \\Rightarrow \\; n = \\prod_{i=1}^{k} p_i^{e_i} \\quad ; \\; p_i \\in \\mathbb{P}`,
        caption: 'هر عدد صحیح بزرگ‌تر از یک به طور یکتا به حاصل‌ضرب اعداد اول تجزیه می‌شود'
      },
      {
        type: 'markdown',
        content: `### الگوریتم RSA و تابع فی اویلر`
      },
      {
        type: 'math',
        latex: `\\varphi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right) \\quad ; \\quad \\text{کلید عمومی: } (e, n) \\;,\\; \\text{کلید خصوصی: } (d, n)`
      },
      {
        type: 'code',
        language: 'python',
        filename: 'rsa_demo.py',
        code: `import math
import random

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def generate_keys(p, q):
    n = p * q
    phi = (p - 1) * (q - 1)
    e = 65537  # عدد اول ثابت
    d = pow(e, -1, phi)  # وارون ضربی
    return (e, n), (d, n)

# تولید کلیدهای آزمایشی
p, q = 61, 53
public_key, private_key = generate_keys(p, q)
print(f"کلید عمومی: {public_key}")
print(f"کلید خصوصی: {private_key}")`,
        caption: 'پیاده‌سازی ساده‌ی تولید کلید در RSA'
      }
    ]
  },
  {
    id: '09',
    title: 'موسیقی و ریاضیات: هارمونی اعداد',
    date: '2026/07/30',
    excerpt: 'کشف رابطه‌ی عمیق بین نسبت‌های ریاضی و فواصل موسیقیایی از دوران فیثاغورث تا合成 مدرن.',
    readTime: '۵ دقیقه',
    tags: ['موسیقی', 'ریاضیات', 'هارمونی', 'فیزیک صدا'],
    blocks: [
      {
        type: 'markdown',
        content: `## نسبت‌های ساده، آوای دلنشین

فیثاغورث اولین کسی بود که دریافت نسبت‌های ساده‌ی اعداد مانند ۲:۱، ۳:۲ و ۴:۳ با فواصل موسیقیایی اکتاو، پنجم درست و چهارم درست همخوانی دارند.`
      },
      {
        type: 'math',
        latex: `\\text{اکتاو: } 2:1 \\quad , \\quad \\text{پنجم درست: } 3:2 \\quad , \\quad \\text{چهارم درست: } 4:3`,
        caption: 'نسبت‌های بنیادین فواصل موسیقیایی'
      },
      {
        type: 'markdown',
        content: `### سری هارمونیک و طیف فرکانسی`
      },
      {
        type: 'math',
        latex: `f_n = n \\cdot f_0 \\quad ; \\quad n \\in \\mathbb{N}`,
        caption: 'فرکانس هارمونیک‌های nام با فرکانس پایه‌ی f₀'
      },
      {
        type: 'ascii',
        title: 'WAVE PATTERN VISUALIZATION',
        align: 'center',
        content: `
    /\      /\      /\\
   /  \\    /  \\    /  \\
  /    \\  /    \\  /    \\
 /      \\/      \\/      \\
/        \\      /        \\
         \\    /
          \\  /
           \\/
`
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «در سکوت میان دو نت، فضایی برای تأمل و دریافت نواهای ناشنیده وجود دارد.»`
      }
    ]
  },
  {
    id: '10',
    title: 'بهینه‌سازی الگوریتم‌های جستجو در داده‌های حجیم',
    date: '2026/07/28',
    excerpt: 'مقایسه‌ی الگوریتم‌های جستجوی خطی، دودویی و درختی و کاربرد آن‌ها در پایگاه‌های داده‌ی مدرن.',
    readTime: '۶ دقیقه',
    tags: ['الگوریتم', 'جستجو', 'بهینه‌سازی', 'داده'],
    blocks: [
      {
        type: 'markdown',
        content: `## پیچیدگی زمانی و انتخاب الگوریتم مناسب

انتخاب الگوریتم جستجوی مناسب می‌تواند تفاوت بین پاسخ‌دهی در میلی‌ثانیه و چندین ثانیه را ایجاد کند.`
      },
      {
        type: 'math',
        latex: `\\text{جستجوی خطی: } O(n) \\quad , \\quad \\text{جستجوی دودویی: } O(\\log n) \\quad , \\quad \\text{درخت BST: } O(\\log n)`
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'binarySearch.ts',
        code: `function binarySearch<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// مثال: جستجوی عدد ۴۲ در آرایه‌ی مرتب
const sortedArray = [10, 20, 30, 40, 42, 50, 60];
console.log(binarySearch(sortedArray, 42)); // خروجی: ۴`,
        caption: 'پیاده‌سازی جستجوی دودویی با تایپ‌اسکریپت'
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «الگوریتم‌های کارآمد مانند شاعران خوب، با کمترین واژه بیشترین معنا را منتقل می‌کنند.»`
      }
    ]
  },
  {
    id: '11',
    title: 'کهکشان‌ها و ساختار کیهانی در زبان ریاضیات',
    date: '2026/07/25',
    excerpt: 'بررسی مدل‌های ریاضی توصیف‌کننده‌ی ساختار کهکشان‌ها، خوشه‌های کهکشانی و انبساط جهان.',
    readTime: '۸ دقیقه',
    tags: ['کیهان‌شناسی', 'ریاضیات', 'فیزیک', 'نسبیت'],
    featured: false,
    blocks: [
      {
        type: 'markdown',
        content: `## معادلات حاکم بر کیهان

نسبیت عام این‌شتین با معادلات میدان خود، چارچوبی ریاضی برای توصیف گرانش و ساختار فضا-زمان ارائه می‌دهد.`
      },
      {
        type: 'math',
        latex: `G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}`,
        caption: 'معادلات میدان این‌شتین؛ قلب تپنده‌ی کیهان‌شناسی مدرن'
      },
      {
        type: 'markdown',
        content: `### قانون هابل و انبساط جهان`
      },
      {
        type: 'math',
        latex: `v = H_0 \\cdot d \\quad ; \\quad H_0 \\approx 70 \\; \\text{km/s/Mpc}`,
        caption: 'سرعت دورشدن کهکشان‌ها متناسب با فاصله‌ی آن‌هاست'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
        align: 'center',
        caption: 'تصویر انتزاعی از ساختار رشته‌های کیهانی با توزیع چگالی $\\rho(\\vec{r})$'
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «جهان کتابی است که با زبان ریاضیات نوشته شده و هر ستاره واژه‌ای در آن است.»`
      }
    ]
  },
  {
    id: '12',
    title: 'شبکه‌های عصبی و تقریب توابع پیچیده',
    date: '2026/07/22',
    excerpt: 'بررسی قضیه‌ی تقریب جهانی در شبکه‌های عصبی و توانایی آن‌ها در مدل‌سازی توابع غیرخطی.',
    readTime: '۶ دقیقه',
    tags: ['هوش مصنوعی', 'شبکه عصبی', 'یادگیری ماشین', 'ریاضیات'],
    blocks: [
      {
        type: 'markdown',
        content: `## قضیه‌ی تقریب جهانی (Universal Approximation Theorem)

این قضیه بیان می‌کند که یک شبکه‌ی عصبی با حداقل یک لایه‌ی پنهان و تعداد کافی نورون می‌تواند هر تابع پیوسته‌ای را با دقت دلخواه تقریب بزند.`
      },
      {
        type: 'math',
        latex: `f(x) \\approx \\sum_{i=1}^{N} w_i \\cdot \\sigma(\\vec{a}_i \\cdot \\vec{x} + b_i)`,
        caption: 'تقریب یک تابع دلخواه با جمع توابع سیگموئیدی وزن‌دار'
      },
      {
        type: 'code',
        language: 'python',
        filename: 'neural_approximator.py',
        code: `import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def approximate_function(x, weights, biases, coefficients):
    # تقریب با ترکیب توابع سیگموئیدی
    result = np.zeros_like(x)
    for i in range(len(weights)):
        result += coefficients[i] * sigmoid(weights[i] * x + biases[i])
    return result

# تابع هدف: سینوس
x = np.linspace(-10, 10, 1000)
target = np.sin(x)

# تقریب با ۵ نورون
weights = [1.5, 0.8, 2.0, 1.2, 0.5]
biases = [0.0, 1.0, -1.0, 2.0, -2.0]
coeffs = [0.8, 0.3, 0.5, 0.2, 0.4]

approx = approximate_function(x, weights, biases, coeffs)`,
        caption: 'پیاده‌سازی ساده‌ی تقریب تابع با شبکه‌ی عصبی'
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «هوش مصنوعی آینه‌ای است که پیچیدگی‌های ریاضی طبیعت را در خود منعکس می‌کند.»`
      }
    ]
  },
  {
    id: '13',
    title: 'هنر و معماری در تمدن‌های باستانی ایران',
    date: '2026/07/19',
    excerpt: 'بررسی ویژگی‌های معماری هخامنشی، ساسانی و اسلامی با تأکید بر هندسه‌ی مقدس و تناسبات طلایی.',
    readTime: '۵ دقیقه',
    tags: ['معماری', 'تاریخ', 'هنر', 'ایران'],
    blocks: [
      {
        type: 'markdown',
        content: `## هندسه در معماری ایرانی

معماری ایرانی همواره با مفاهیم عمیق هندسی و تناسبات ریاضی عجین بوده است. از ستون‌های تخت‌جمشید تا گنبدهای مساجد اصفهان.`
      },
      {
        type: 'math',
        latex: `\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618`,
        caption: 'نسبت طلایی؛ تناسب مقدس در معماری و هنر'
      },
      {
        type: 'ascii',
        title: 'PERSIAN ARCHITECTURAL PATTERN',
        align: 'center',
        content: `
    ╔═══════════════════╗
    ║   ◈  ◈  ◈  ◈  ◈   ║
    ║  ◈  ◈  ◈  ◈  ◈  ◈  ║
    ║   ◈  ◈  ◈  ◈  ◈   ║
    ║  ◈  ◈  ◈  ◈  ◈  ◈  ║
    ║   ◈  ◈  ◈  ◈  ◈   ║
    ║  ◈  ◈  ◈  ◈  ◈  ◈  ║
    ║   ◈  ◈  ◈  ◈  ◈   ║
    ╚═══════════════════╝
`
      },
      {
        type: 'markdown',
        content: `### الگوی گنبدهای دوپوسته در معماری اسلامی`
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1000&q=80',
        align: 'center',
        caption: 'نمایی از گنبدهای مسجد با هندسه‌ی متقارن $\\mathcal{S}$ و آرایه‌های کاشی‌کاری'
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «معماری شعر منجمد است و هر ستون، بیتی از حماسه‌ی هزارساله‌ی این سرزمین.»`
      }
    ]
  },
  {
    id: '14',
    title: 'نقش زبان‌های برنامه‌نویسی در شکل‌گیری تفکر محاسباتی',
    date: '2026/07/16',
    excerpt: 'چگونه انتخاب زبان برنامه‌نویسی بر نحوه‌ی تفکر، حل مسئله و طراحی سیستم‌های نرم‌افزاری تأثیر می‌گذارد.',
    readTime: '۴ دقیقه',
    tags: ['برنامه‌نویسی', 'تفکر', 'زبان', 'آموزش'],
    blocks: [
      {
        type: 'markdown',
        content: `## پارادایم‌های برنامه‌نویسی و شیوه‌ی تفکر

هر زبان برنامه‌نویسی نه تنها ابزاری برای پیاده‌سازی است، بلکه قالبی برای تفکر و مدل‌سازی مسئله به حساب می‌آید.`
      },
      {
        type: 'code',
        language: 'python',
        filename: 'functional_vs_imperative.py',
        code: `# سبک دستوری (Imperative)
def sum_of_squares_imperative(numbers):
    total = 0
    for n in numbers:
        total += n ** 2
    return total

# سبک تابعی (Functional)
def sum_of_squares_functional(numbers):
    return sum(map(lambda x: x ** 2, numbers))

# مقایسه
data = [1, 2, 3, 4, 5]
print(sum_of_squares_imperative(data))  # ۵۵
print(sum_of_squares_functional(data))  # ۵۵`,
        caption: 'مقایسه‌ی دو رویکرد متفاوت برنامه‌نویسی'
      },
      {
        type: 'markdown',
        content: `### پارادایم‌های اصلی:
- **دستوری (Imperative):** تمرکز بر گام‌های انجام کار
- **تابعی (Functional):** تمرکز بر ترکیب توابع و داده‌های ناتغییرپذیر
- **شی‌گرا (OOP):** تمرکز بر اشیا و تعاملات آن‌ها
- **منطقی (Logic):** تمرکز بر روابط و قواعد`
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «هر زبانی جهان‌بینی خاص خود را به همراه دارد؛ زبان‌های برنامه‌نویسی نیز از این قاعده مستثنی نیستند.»`
      }
    ]
  },
  {
    id: '15',
    title: 'زیبایی‌شناسی اعداد: سیر در دنیای اعداد خاص',
    date: '2026/07/14',
    excerpt: 'کشف زیبایی‌های پنهان در اعداد اول، فیبوناچی، کاتالان و دیگر دنباله‌های ریاضی شگفت‌انگیز.',
    readTime: '۶ دقیقه',
    tags: ['ریاضیات', 'اعداد', 'دنباله‌ها', 'زیبایی‌شناسی'],
    featured: true,
    blocks: [
      {
        type: 'markdown',
        content: `## جذابیت اعداد در ساده‌ترین شکل خود

اعداد نه تنها ابزار محاسبه هستند، بلکه موجوداتی با هویت و شخصیت مستقل. اعدادی مانند $\\pi$، $e$، و $\\varphi$ هر کدام داستانی برای گفتن دارند.`
      },
      {
        type: 'math',
        latex: `\\pi = 3.14159265358979323846\\ldots \\quad , \\quad e = 2.71828182845904523536\\ldots`,
        caption: 'دو عدد گنگ و متعالی که زیربنای بسیاری از علوم هستند'
      },
      {
        type: 'ascii',
        title: 'FIBONACCI SPIRAL',
        align: 'center',
        content: `
        ___---___
     __/       \\__
    /  ███   ███  \\
   |  ███   ███  |
   |    █████    |
   |   ███████   |
    \\  ███████  /
     \\__     __/
        ---
`
      },
      {
        type: 'markdown',
        content: `### دنباله‌ی کاتالان: اعداد درختان
اعداد کاتالان تعداد درختان دودویی با n گره را نشان می‌دهند:`
      },
      {
        type: 'math',
        latex: `C_n = \\frac{1}{n+1} \\binom{2n}{n} \\quad ; \\quad C_0 = 1, C_1 = 1, C_2 = 2, C_3 = 5, C_4 = 14, \\ldots`
      },
      {
        type: 'markdown',
        content: `جمله‌ی رندوم: «در ژرفای اعداد، جهانی از نظم و هماهنگی نهفته است که در انتظار کشف شدن هستند.»`
      }
    ]
  }
];
