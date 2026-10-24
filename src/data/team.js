import gursharanImage from "../assets/images/900 x 1349_our_Dr. Gursharan Rai.webp";
import mansimranImage from "../assets/images/900 x 1349_our Doctors_Dr. Mansimran Cheema.webp";
import samrathImage from "../assets/images/900 x 1349_our _Dr. Samrath Cheema.webp";

import bannerImage from "../assets/images/our-team-banner.webp";

export const teamIntro = {
  title: "Three local GPs. One shared commitment to your health.",
  text: "Our clinical team brings together decades of combined NHS and private practice experience, advanced specialist training, and above all, a genuine passion for knowing and caring for our patients as individuals.",
  // first names of the three doctors, shown one at a time in the rolling pill
  doctors: ["Dr Gursharan", "Dr Mansimran", "Dr Samrath"],
  image: bannerImage,
};

// text comes from the content document, the images are colour blocks until the photos arrive
export const teamDoctors = {
  label: "Meet the doctors",
  items: [
    {
      name: "Dr Gursharan K Rai",
      image: gursharanImage,
      imageAlt: "Portrait of Dr Gursharan K Rai at Loughton Private GP",
      role: "GP Founder",
      tags: ["Nutrition", "Lifestyle medicine", "Menopause care"],
      credentials: "MBChB (University of Manchester, 2012) · MRCGP (2019) · Diploma in Nutrition (Sano, 2022) · Certificate in Menopause Care (BMS)",
      bio: [
        "Dr Gursharan K Rai is a highly regarded GP known for her warm, reassuring presence and the exceptional level of care she provides. After qualifying in medicine from the University of Manchester, she trained at the renowned Royal Free Hospital, building an extensive and diverse clinical background. She serves as Clinical Lead for long-term conditions and immunisation lead within Haringey GP Federation, demonstrating her dedication to improving patient care.",
        "Alongside her core GP work, Dr Rai has completed a Diploma in Nutrition through Sano and holds the British Menopause Society Certificate in Menopause Care. This specialist training underpins her expertise in women's health, hormonal wellbeing, nutrition and lifestyle-based medicine. She is deeply committed to preventative care, helping patients build long-term wellbeing rather than simply treating illness.",
        "As a mother of two, Dr Rai brings a personal understanding of the pressures facing modern families. She is especially passionate about pre- and postnatal care and supporting women through every stage of their health journey. Her approach aims to create an environment where individuals feel safe, respected and fully heard.",
      ],
      interests: "Nutrition, lifestyle medicine, menopause care, postnatal health, long-term conditions, immunisations and preventative care.",
      tone: "bg-tan text-white/80",
    },
    {
      name: "Dr Mansimran Cheema",
      image: mansimranImage,
      imageAlt: "Portrait of Dr Mansimran Cheema at Loughton Private GP",
      role: "GP Founder",
      tags: ["Endocrinology", "Weight management", "Men's health"],
      credentials: "",
      bio: [
        "Dr Mansimran Cheema is a distinguished GP renowned for his calm, assured presence, refined communication style and unwavering dedication to personalised, patient-centred care. A graduate of Imperial College London, he achieved a First Class BSc in Endocrinology and received the Royal Society of Endocrinology Undergraduate Achievement Award. His clinical training at the prestigious Royal London Hospital, followed by an MBA in Healthcare awarded with Distinction, reflects both academic excellence and a commitment to modern, high-quality medical leadership.",
        "His specialist interests include endocrinology and weight management, men's health, musculoskeletal medicine, joint injections and child health. Patients value his measured, holistic approach, where physical, emotional and social factors are thoughtfully integrated. Dr Cheema's vision is to deliver a premium standard of general practice built on time, continuity and truly coordinated care, ensuring every patient feels heard, supported and understood.",
      ],
      interests: "",
      tone: "bg-[#8d7d68] text-white/80",
    },
    {
      name: "Dr Samrath Singh Cheema",
      image: samrathImage,
      imageAlt: "Portrait of Dr Samrath Singh Cheema at Loughton Private GP",
      role: "GP Partner",
      tags: ["Family medicine", "Paediatrics", "Preventative health"],
      credentials: "Medical Faculty, Masaryk University, Brno · GMC No. 7090835",
      bio: [
        "Dr Samrath Singh Cheema is a London-born Family GP with over a decade of experience caring for communities across Essex and the wider UK. He has held leadership and front-line roles across diverse practice settings, shaping his belief that excellent medicine is built on trust, clarity and partnership with a focus on long-term optimisation rather than quick fixes.",
        "His clinical interests in weight management, children's health and men's health allow him to support individuals and families with a level of attentiveness that feels both reassuring and exceptionally considered. Dr Cheema blends evidence-based medicine with a calm, composed presence, offering patients clarity, structure and a sense of genuine partnership in their wellbeing. He is especially committed to multi-generational care, helping families navigate health together with thoughtful preventative strategies and personalised guidance.",
      ],
      interests: "Family medicine, paediatrics, preventative health, acute medicine and long-term health optimisation.",
      tone: "bg-[#231e1b] text-white/70",
    },
  ],
};
