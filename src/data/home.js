import {
  CalendarIcon,
  ClockIcon,
  HeartCircleIcon,
  HeartIcon,
  LockIcon,
  ShieldIcon,
} from "../components/ui/Icons";

export const featureStrip = [
  { icon: CalendarIcon, label: "Same-day appointments" },
  { icon: ClockIcon, label: "Extended consultations" },
  { icon: HeartCircleIcon, label: "Preventative health" },
  { icon: LockIcon, label: "Discreet & confidential" },
];

export const about = {
  label: "About Loughton Private GP",
  heading: "Where personalised care meets modern general practice.",
  paragraphs: [
    "At Loughton Private GP, we believe that great medicine begins with a conversation, one where you feel heard, understood, and respected.",
    "Situated on the High Road in the heart of our community, our clinic brings together three experienced local GPs, offering longer appointments and more time to discuss your health alongside the care available through the NHS.",
  ],
};

export const whyChooseUs = [
  {
    icon: ClockIcon,
    title: "30-Minute Appointments",
    text: "No rushing. Every consultation gives you the time to discuss everything on your mind.",
  },
  {
    icon: CalendarIcon,
    title: "Rapid Access",
    text: "Same-day availability where possible, evening appointments and Saturday clinics, healthcare on your schedule.",
  },
  {
    icon: HeartIcon,
    title: "Continuity of Care",
    text: "Three local GPs committed to knowing you and your health history, rather than starting from scratch each visit.",
  },
  {
    icon: ShieldIcon,
    title: "Prevention First",
    text: "Comprehensive health checks, personalised plans, and a focus on long-term wellbeing, not just today's symptoms.",
  },
];
