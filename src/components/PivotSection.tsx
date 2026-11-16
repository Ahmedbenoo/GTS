import type { TopicShot } from "@/lib/topics";
import { shotSrc } from "@/lib/photo";
import { PartsOwl } from "./MechanizationGallery";
import { Tx } from "./Tx";
import "./PivotSection.module.css";
import "./MechanizationGallery.module.css";

const points = [
  "عدد الأبراج بعد المعاينة، مش من الكتالوج",
  "لوحة التحكم تشغّل الدورة في الموقع",
  "السليبرنج والكابل والرشاش مع الجهاز",
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
        <div className="gts-piv-split">
          <div className="gts-piv-copy">
            <p className="kicker"><Tx text="الري المحوري" /></p>
            <span className="furrow" aria-hidden="true" />
            <h2 className="h2"><Tx text="عدد الأبراج يتظبط على المساحة، مش على صورة الكتالوج" /></h2>
            <p className="lead">
              <Tx text="المساحة الواسعة ما تتغطاش بخط يتفرد على الأرض. الجهاز بيتحدد بعد المعاينة: كام برج، مصدر المياه فين، والمحصول إيه. البرج بيمشي، والرشاش بيوزّع لحد آخر الجهاز، والطرف بيقفل المساحة اللي الدورة لوحدها ما بتوصلهاش." />
            </p>
            <p className="lead">
              <Tx text="التوريد مش الشاسيه لوحده. لوحة التحكم بتشغّل الدورة من الموقع، ومعاها علب الأبراج، السليبرنج، كابل التشغيل، الموتور، الجيربوكس، والكاوتش. بيتتركّبوا في الأرض، ولو برج وقف الغيار يخرج من مخزون مدينة 6 أكتوبر قبل ما اليوم يضيع من الموسم." />
            </p>
          </div>
          <figure className="gts-piv-lead">
            <img
              src={shotSrc("/irrigation-photos/pivot-field.png", 1280)}
              alt="جهاز ري محوري يلف على حقل أخضر وأصفر"
              decoding="async"
              style={{ objectPosition: "center 62%" }}
            />
            <figcaption><Tx text="الجهاز في الحقل" /></figcaption>
          </figure>
        </div>
        <ul className="gts-piv-points">
          {points.map((point) => (
            <li key={point}><Tx text={point} /></li>
          ))}
        </ul>
        <div className="gts-piv-catalog">
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
