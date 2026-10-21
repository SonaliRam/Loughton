import aboutPoster from "../assets/images/about-banner-poster.webp";

export const aboutBanner = {
  label: "About Loughton Private GP",
  title: "Private healthcare rooted in community, driven by purpose.",
  // add the video path here, for example "/about-banner.mp4" with the file saved in the public folder
  video: "",
  // image shown while the video loads, and on its own until the video is added
  poster: aboutPoster,
};

// the images are colour blocks for now, replace "image" with a photo path such as "/story-1.jpg" when the photos arrive
export const aboutStory = {
  title: "Our Story",
  paragraphs: [
    "Loughton Private GP was founded by three experienced local GPs united by a single belief: that outstanding healthcare starts with time. Time to listen. Time to understand. Time to build the kind of trusted, long-term relationships that make a genuine difference to your health.",
    "After years of clinical practice within the NHS, a system we deeply respect and continue to work within, we recognised that the increasing pressures on primary care often make it difficult to deliver the thorough, personalised attention our patients deserve. Short appointment windows and long waiting times are not the fault of any individual clinician; they are the reality of a service under immense strain.",
    "We created this clinic to offer something different. New face-to-face GP consultations are 30 minutes, and selected specialist assessments are given the time they need. Patients can choose and continue with the same GP wherever possible, so every care plan is built around your life, not a standardised template.",
  ],
};

export const aboutMission = {
  title: "Mission Statement",
  text: "We are committed to delivering premium, personalised healthcare that fits seamlessly around modern life through unhurried consultations, proactive health management, and lasting patient relationships.",
};

export const aboutVision = {
  title: "Vision Statement",
  text: "To become the most trusted private healthcare partner in Loughton, redefining modern general practice through exceptional service, proactive care, and genuinely personal patient experiences. We envision a healthier community where individuals and families feel supported, valued, and empowered to prioritise their wellbeing, no matter how busy life becomes.",
};

export const aboutValues = {
  label: "Our Values",
  title: "What guides every appointment",
  text: "Six principles shape how we care for you, from the first conversation to every follow-up.",
  items: [
    { title: "Personalised Care", text: "Every patient is unique; thoughtful, tailored care built around your health goals, lifestyle, and priorities." },
    { title: "Clinical Excellence", text: "Evidence-based medicine, delivered with integrity, professionalism, and a commitment to continual learning." },
    { title: "Time & Attention", text: "Outstanding care cannot be rushed. Longer appointments ensure you are heard, not hurried." },
    { title: "Prevention & Longevity", text: "Preventing disease, optimising wellbeing, and supporting long-term health, not just treating today's symptoms." },
    { title: "Accessibility & Convenience", text: "Evening and weekend appointments. Rapid access. Healthcare designed to fit around your life." },
    { title: "Trust & Partnership", text: "We work with you, not just for you, empowering informed decisions through honesty and compassion." },
  ],
};

// the heading is written for the page, the paragraph and the button text come from the content document
export const aboutCta = {
  eyebrow: "Loughton High Road",
  title: "Here for every stage of your journey",
  text: "We are proud to be based on Loughton High Road, visible, accessible, and genuinely part of the community we serve. Whether you are a busy professional, a parent managing a family's health, or someone looking to take a more proactive approach to your wellbeing, we are here for every stage of your journey.",
  button: "Book your first appointment →",
  // dummy for now, replace with a photo path such as "/about-cta.jpg"
  media: "",
};
