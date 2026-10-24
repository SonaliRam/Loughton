import story1 from "../assets/images/our-story-1Desktop 1600 × 900 px_Our Story.webp";
import story1Mobile from "../assets/images/our-story-1Mobile & tablet 1600 × 1200 px_our story.webp";
import story2 from "../assets/images/our-story-2Desktop 1300 × 1530 px copy.webp";
import story2Mobile from "../assets/images/our-story-2Mobile & tablet 1400 × 1050 px copy.webp";
import story3 from "../assets/images/our-story-3Desktop 770 × 940 px.webp";
import story3Mobile from "../assets/images/our-story-3Mobile & tablet 680 × 510 px.webp";
import story4 from "../assets/images/our-story-4Desktop 1380 × 1460 px.webp";
import story5Mobile from "../assets/images/our-story-5Mobile & tablet 1400 × 1050 px.webp";
import storySmall2 from "../assets/images/our-storyAll devices 860 × 645 px_2.webp";
import storySmall3 from "../assets/images/about-us-3rdrow-rightsideimgAll devices 860 × 645 px copy.webp";
import missionBig from "../assets/images/mission2All devices 1220 × 1315 px_1.webp";
import missionSmall from "../assets/images/mission1All devices 940 × 805 px_2.webp";
import visionBig from "../assets/images/vision1All devices 1220 × 1315 px.webp";
import visionSmall from "../assets/images/vision2All devices 940 × 805 px.webp";
import valuePersonalised from "../assets/images/All devices 700 × 440 px_Personalised Care.webp";
import valueClinical from "../assets/images/All devices 700 × 440 px_Clinical Excellence.webp";
import valueTime from "../assets/images/All devices 700 × 440 px_Time & Attention.webp";
import valuePrevention from "../assets/images/All devices 700 × 440 px_Prevention & Longevity.webp";
import valueAccess from "../assets/images/All devices 700 × 440 px_Accessibility & Convenience.webp";
import valueTrust from "../assets/images/All devices 700 × 440 px_Trust & Partnership.webp";

export const aboutBanner = {
  // label: "About Loughton Private GP",
  // title: "Private healthcare rooted in community, driven by purpose.",
  // the file lives in the public/videos folder
  video: "/videos/Loughton%20Horizontal%20Banner.mp4",
  // the vertical (9:16) version, used on phones
  videoMobile: "/videos/Loughton%20Vertical%20Banner.mp4",
  // image shown while the video loads, and on its own until the video is added
  poster: "",
};

// images for all three story rows
export const aboutStory = {
  title: "Our Story",
  images: { story1, story1Mobile, story2, story2Mobile, story3, story3Mobile, story4, story5Mobile, storySmall2, storySmall3 },
  paragraphs: [
    "Loughton Private GP was founded by three experienced local GPs united by a single belief: that outstanding healthcare starts with time. Time to listen. Time to understand. Time to build the kind of trusted, long-term relationships that make a genuine difference to your health.",
    "After years of clinical practice within the NHS, a system we deeply respect and continue to work within, we recognised that the increasing pressures on primary care often make it difficult to deliver the thorough, personalised attention our patients deserve. Short appointment windows and long waiting times are not the fault of any individual clinician; they are the reality of a service under immense strain.",
    "We created this clinic to offer something different. New face-to-face GP consultations are 30 minutes, and selected specialist assessments are given the time they need. Patients can choose and continue with the same GP wherever possible, so every care plan is built around your life, not a standardised template.",
  ],
};

export const aboutMission = {
  title: "Mission Statement",
  images: { big: missionBig, small: missionSmall },
  text: "We are committed to delivering premium, personalised healthcare that fits seamlessly around modern life through unhurried consultations, proactive health management, and lasting patient relationships.",
};

export const aboutVision = {
  title: "Vision Statement",
  images: { big: visionBig, small: visionSmall },
  text: "To become the most trusted private healthcare partner in Loughton, redefining modern general practice through exceptional service, proactive care, and genuinely personal patient experiences. We envision a healthier community where individuals and families feel supported, valued, and empowered to prioritise their wellbeing, no matter how busy life becomes.",
};

export const aboutValues = {
  label: "Our Values",
  title: "What guides every appointment",
  text: "Six principles shape how we care for you, from the first conversation to every follow-up.",
  items: [
    { title: "Personalised Care", image: valuePersonalised, text: "Every patient is unique; thoughtful, tailored care built around your health goals, lifestyle, and priorities." },
    { title: "Clinical Excellence", image: valueClinical, text: "Evidence-based medicine, delivered with integrity, professionalism, and a commitment to continual learning." },
    { title: "Time & Attention", image: valueTime, text: "Outstanding care cannot be rushed. Longer appointments ensure you are heard, not hurried." },
    { title: "Prevention & Longevity", image: valuePrevention, text: "Preventing disease, optimising wellbeing, and supporting long-term health, not just treating today's symptoms." },
    { title: "Accessibility & Convenience", image: valueAccess, text: "Evening and weekend appointments. Rapid access. Healthcare designed to fit around your life." },
    { title: "Trust & Partnership", image: valueTrust, text: "We work with you, not just for you, empowering informed decisions through honesty and compassion." },
  ],
};

