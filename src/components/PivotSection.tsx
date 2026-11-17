import type { TopicShot } from "@/lib/topics";
import { shotSrc } from "@/lib/photo";
import { PartsOwl } from "./MechanizationGallery";
import { Tx } from "./Tx";
import "./PivotSection.module.css";
import "./MechanizationGallery.module.css";

const points = [
  "لوحات التحكم وأنظمة التشغيل.",
  "علب التروس (Gearboxes).",
  "المحركات الكهربائية (Motors).",
  "علب الأبراج ومكونات الحركة.",
  "حلقات التوصيل الكهربائية (Slip Rings).",
  "كابلات التشغيل.",
  "الإطارات ومستلزمات الحركة.",
  "مكونات الرش والتوزيع.",
];

const shots: readonly TopicShot[] = [
  { src: "/irrigation-photos/piv-panel.png", caption: "لوحة التحكم", alt: "لوحة تحكم جهاز الري المحوري" },
  { src: "/irrigation-photos/piv-tower.png", caption: "علبة البرج", alt: "علبة برج سوداء لجهاز الري المحوري" },
  { src: "/irrigation-photos/piv-ring.png", caption: "سليبرنج", alt: "حلقة انزلاق تنقل الكهرباء والبرج بيلف" },
  { src: "/irrigation-photos/piv-cable.png", caption: "كابل التشغيل", alt: "كابل تشغيل متعدد الأسلاك لأبراج الري" },
  { src: "/irrigation-photos/piv-motor.png", caption: "موتور الحركة", alt: "موتور حركة فضي مع صندوق تروس" },
  { src: "/irrigation-photos/piv-gear.png", caption: "جيربوكس", alt: "جيربوكس أسود لعجل البرج" },
  { src: "/irrigation-photos/piv-wheel.png", caption: "كاوتش البرج", alt: "كاوتش برج الري المحوري" },
  { src: "/irrigation-photos/piv-coupler.png", caption: "وصلة", alt: "وصلة معدنية بين بحور الجهاز" },
  { src: "/irrigation-photos/piv-d3000.png", caption: "رشاش ثابت", alt: "رشاش ثابت لجهاز الري المحوري" },
  { src: "/irrigation-photos/piv-r3000.png", caption: "رشاش دوار", alt: "رشاش دوار لجهاز الري المحوري" },
  { src: "/irrigation-photos/piv-pr15.png", caption: "منظم ضغط", alt: "منظم ضغط للرشاش" },
  { src: "/irrigation-photos/piv-prhi.png", caption: "منظم ضغط عالي", alt: "منظم ضغط عالي التدفق" },
  { src: "/irrigation-photos/piv-gun.png", caption: "مدفع الطرف", alt: "رشاش طرف يكمّل تغطية آخر الجهاز" },
  { src: "/irrigation-photos/piv-timer.png", caption: "مؤقت النسبة", alt: "مؤقت نسبة يظبط زمن الدورة" },
  { src: "/irrigation-photos/piv-switch.png", caption: "مفتاح الأمان", alt: "مفتاح أمان يوقف البرج لو الميل زاد" },
  { src: "/irrigation-photos/piv-light.png", caption: "لمبة البرج", alt: "لمبة تحذير حمراء لبرج الري" },
];

export function PivotSection() {
  return (
    <section className="section section-light gts-piv">
      <div className="wrap">
        <figure className="gts-piv-lead">
          <img
            src={shotSrc("/irrigation-photos/pivot-field.png", 1280)}
            alt="جهاز ري محوري يلف على حقل أخضر وأصفر"
            decoding="async"
            style={{ objectPosition: "center 62%" }}
          />
          <figcaption><Tx text="الجهاز في الحقل" /></figcaption>
        </figure>
        <div className="gts-piv-copy">
          <p className="kicker"><Tx text="الري المحوري" /></p>
          <span className="furrow" aria-hidden="true" />
          <h2 className="h2"><Tx text="مش كل مساحة ينفعها نفس جهاز الري المحوري!" /></h2>
          <p className="lead">
            <Tx text="اختيار جهاز الري المحوري مش مجرد تحديد عدد الأبراج أو اختيار موديل من الكتالوج؛ لكنه قرار فني بيعتمد على طبيعة الأرض، ومساحتها، ومصدر المياه، ونوع المحصول، ومتطلبات التشغيل." />
          </p>
          <p className="lead">
            <Tx text="في GTS بنساعدك تختار منظومة الري المناسبة لطبيعة مشروعك، بداية من تحديد عدد الأبراج وطول الجهاز، مرورًا بتوزيع الرشاشات وتحقيق التغطية المطلوبة، وصولًا إلى تجهيز الأطراف النهائية لضمان الاستفادة القصوى من المساحة الزراعية." />
          </p>
          <p className="lead gts-piv-strong">
            <Tx text="منظومة متكاملة.. مش مجرد هيكل معدني!" />
          </p>
          <p className="lead">
            <Tx text="نوفر مكونات وحلول أجهزة الري المحوري، بداية من:" />
          </p>
          <ul className="gts-piv-points">
            {points.map((point) => (
              <li key={point}><Tx text={point} /></li>
            ))}
          </ul>
          <p className="lead gts-piv-strong">
            <Tx text="والأهم؟ توافر قطع الغيار وسرعة الاستجابة." />
          </p>
          <p className="lead">
            <Tx text="لأننا عارفين إن توقف جهاز الري مش مجرد عطل فني، لكنه وقت ضائع ممكن يؤثر على إنتاجية الموسم بالكامل." />
          </p>
          <p className="lead">
            <Tx text="ومن خلال مخزوننا بمدينة السادس من أكتوبر، بنوفر قطع الغيار اللازمة لدعم أعمال الصيانة وتقليل فترات التوقف." />
          </p>
          <p className="lead gts-piv-strong">
            <Tx text="GTS – شريكك في حلول الاستثمار الزراعي." />
          </p>
          <p className="lead">
            <Tx text="حلول متكاملة.. دعم فني.. وقطع غيار تضمن استمرارية التشغيل." />
          </p>
        </div>
      </div>
      <div className="gts-piv-catalog">
        <div className="wrap">
          <header className="gts-parts-head">
            <p className="kicker"><Tx text="قطع الغيار" /></p>
            <span className="furrow" aria-hidden="true" />
            <h2 className="h2"><Tx text="قطع غيار جهاز الري المحوري" /></h2>
            <p><Tx text="من لوحة التحكم لحد لمبة البرج. القطعة جزء من التوريد، وموجودة في المخزون لو البرج وقف." /></p>
          </header>
          <PartsOwl shots={shots} />
        </div>
      </div>
    </section>
  );
}
