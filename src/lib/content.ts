export const company = {
  name: "GTS",
  nameAr: "جي تي إس",
  fullName: "GTS للاستثمار الزراعي",
  tagline: "حلول زراعية متكاملة تحت سقف واحد",
  intro:
    "تتشرف شركة جي تي إس (GTS) للاستثمار الزراعي بتقديم خدماتها الفنية والتقنية في مجال الهندسة الزراعية المتكاملة.",
  address: {
    city: "مدينة 6 أكتوبر",
    line: "الشيخ زايد — فيلا ٦٨ المجاورة الاولي الحي الحادي عشر",
    note: "",
    maps: "https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D8%B4%D9%8A%D8%AE+%D8%B2%D8%A7%D9%8A%D8%AF+%D9%81%D9%8A%D9%84%D8%A7+68+%D8%A7%D9%84%D9%85%D8%AC%D8%A7%D9%88%D8%B1%D8%A9+%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%89+%D8%A7%D9%84%D8%AD%D9%8A+%D8%A7%D9%84%D8%AD%D8%A7%D8%AF%D9%8A+%D8%B9%D8%B4%D8%B1+6+%D8%A3%D9%83%D8%AA%D9%88%D8%A8%D8%B1",
  },
  facebook: "https://www.facebook.com/people/G-T-S/61567359410983/",
} as const;

export const phones = [
  {
    label: "موبايل / واتساب",
    display: "0100 654 5034",
    tel: "+201006545034",
    wa: "201006545034",
  },
  {
    label: "موبايل / واتساب",
    display: "0101 324 2127",
    tel: "+201013242127",
    wa: "201013242127",
  },
  {
    label: "المبيعات",
    display: "0112 477 2995",
    tel: "+201124772995",
    wa: "201124772995",
  },
] as const;

export const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/irrigation", label: "الري" },
  { href: "/energy", label: "الطاقة" },
  { href: "/supplies", label: "التوريدات العمومية" },
  { href: "/mechanization", label: "الميكنة" },
] as const;

export const marquee = [
  "ري محوري",
  "ري بالتنقيط",
  "ري بالرش",
  "جيربوكس",
  "لوحات تحكم",
  "مولدات",
  "قطع غيار",
  "شاسيه",
  "رشاشات",
  "صيانة ميدانية",
] as const;

export const services = [
  {
    num: "01",
    title: "الري المحوري",
    en: "Center Pivot",
    text: "توريد وتركيب وصيانة أجهزة الري المحوري، بتصميم يناسب مساحة الأرض وطبيعة المحصول.",
    image: "/images/spray.jpg",
    alt: "جهاز ري محوري يرش محصولًا أخضر",
    fit: "cover",
  },
  {
    num: "02",
    title: "التنقيط والرش",
    en: "Drip & Spray",
    text: "شبكات ري بالتنقيط والرش توصل المياه للنبات بدقة، وتقلل الهدر من غير التضحية بالإنتاج.",
    image: "/irrigation-photos/sprinkler-field.png",
    alt: "رشاش يوزّع المياه على عشب أخضر",
    fit: "cover",
  },
  {
    num: "03",
    title: "قطع الغيار",
    en: "Spare Parts",
    text: "شاسيهات، محركات، جيربوكسات، ورشاشات لأحدث الموديلات. المخزون في مكان واحد يقلل وقت التوقف.",
    image: "/irrigation-photos/gearboxes.jpg",
    alt: "مجموعة جيربوكسات سوداء جاهزة للشحن",
    fit: "cover",
  },
  {
    num: "04",
    title: "لوحات التحكم",
    en: "Control Panels",
    text: "لوحات كهربائية ومكونات تشغيل أوتوماتيكية تمنح تحكمًا أدق وثباتًا أعلى في دورة الري.",
    image: "/irrigation-photos/piv-panel.png",
    alt: "لوحة تحكم لجهاز الري",
    fit: "contain",
  },
  {
    num: "05",
    title: "المولدات والمحركات",
    en: "Power",
    text: "مجموعات توليد وحلول طاقة تكمل التشغيل في الموقع، تحت ظروف العمل الميداني المختلفة.",
    image: "/irrigation-photos/gen-open.png",
    alt: "مولد أصفر بابه مفتوح على المحرك",
    fit: "contain",
  },
  {
    num: "06",
    title: "الصيانة الميدانية",
    en: "Field Service",
    text: "متابعة الأعطال قبل ما توقف الجهاز، ومن أشهرها مشاكل الجيربوكس وطريقة حماية البيفوت.",
    image: "/images/mechanization.jpg",
    alt: "عجل جهاز ري محوري داخل الحقل",
    fit: "cover",
  },
] as const;

export const reasons = [
  {
    num: "01",
    title: "مواصفات قياسية",
    text: "جودة تقدر تبني عليها قرارك، بمكونات واضحة من غير مفاجآت وقت التشغيل.",
  },
  {
    num: "02",
    title: "سقف واحد",
    text: "الأجهزة، قطع الغيار، لوحات التحكم، والطاقة. بدل ما الرحلة تتوزع على أكتر من مورد.",
  },
  {
    num: "03",
    title: "مياه وطاقة",
    text: "أنظمة تساعد على ترشيد الاستهلاك، مع الحفاظ على إنتاجية المحصول.",
  },
] as const;

export const steps = [
  {
    num: "01",
    title: "المعاينة",
    text: "نفهم الأرض، مصدر المياه، والمحصول المطلوب قبل أي توريد.",
  },
  {
    num: "02",
    title: "الاختيار",
    text: "نحدد النظام المناسب: محوري، تنقيط، أو رش، ومعاه التحكم ومصدر الطاقة.",
  },
  {
    num: "03",
    title: "التنفيذ",
    text: "توريد وتركيب وتشغيل في الموقع، لحد ما الجهاز يبقى جاهز للشغل.",
  },
  {
    num: "04",
    title: "بعد التشغيل",
    text: "صيانة وقطع غيار ومتابعة، عشان التوقف ما ياخدش من الموسم.",
  },
] as const;

export const highlights = [
  { k: "محوري", v: "توريد وتركيب وصيانة" },
  { k: "تنقيط / رش", v: "شبكات حسب المحصول" },
  { k: "قطع الغيار", v: "في مكان واحد" },
  { k: "المقر", v: "6 أكتوبر" },
] as const;

export const photos = {
  hero: "/images/spray.jpg",
  orb: "/images/greens.jpg",
  quote: "/images/field.jpg",
  aerial: "/images/pivot.jpg",
  rows: "/images/greens.jpg",
  close: "/images/machine.jpg",
} as const;

export const quoteWa: string = phones[2].wa;

export function whatsappLink(text: string, wa: string = phones[0].wa) {
  return `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
}
