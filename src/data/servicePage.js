// every service on the Services page; the id is used for the anchor links from the home page cards
export const serviceTicker = [
  "GP Consultations",
  "Preventive Health Checks",
  "Blood Tests & Investigations",
  "Women’s Health",
  "Weight Management",
  "Ear Wax Removal",
  "Chronic Disease Management",
  "Teleconsultations",
];

export const serviceSplits = [
  {
    id: "gp-consultations",
    number: "01",
    title: "GP Consultations",
    pill: "From £120",
    paragraphs: [
      "Fast, personal access to an experienced doctor, often on the same day. We assess and treat a wide range of conditions, provide private prescriptions, arrange investigations, and refer on to specialists when needed. Ideal for anyone who wants prompt, thorough care without a long wait.",
      "Whether it’s a new symptom, an ongoing concern, or something you simply haven’t had time to get checked, our GP consultations give you the space to be properly heard. Your doctor will take a full history, examine you thoroughly, and talk you through next steps in plain, unhurried terms, no 10-minute clock running in the background.",
      "You’ll leave with a clear plan, whether that’s a prescription, a referral, further tests, or simply reassurance. And because continuity of care matters to us, you can choose to see the same GP at every visit, so your doctor builds a real picture of your health over time.",
    ],
    chips: ["30-minute new consultations", "20-minute follow-ups", "Same-day access where possible"],
    flip: false,
  },
  {
    id: "preventive-health-checks",
    number: "02",
    title: "Preventive Health Checks",
    pill: "Proactive care",
    paragraphs: [
      "Prevention is at the heart of how we practise medicine. Rather than waiting for symptoms to appear, our health checks are designed to catch potential issues early and build a genuine, evidence-based picture of your current health, covering everything from cardiovascular risk to lifestyle factors that affect long-term wellbeing.",
      "Your initial consultation covers a detailed history and examination, with bloods and further checks arranged as needed. At your follow-up, your GP will talk you through the results and agree a personalised plan with you, whether that’s lifestyle changes, ongoing monitoring, or referral for specialist input.",
      "We recommend these checks not just for those with existing concerns, but as a proactive step for anyone wanting genuine peace of mind about their health. Many issues, from raised cholesterol to early signs of hypertension, show no symptoms at all until they’ve progressed, which is exactly why a structured, unhurried check matters.",
    ],
    chips: ["Prevention-first approach", "Lifestyle review", "Personalised health plan"],
    flip: true,
  },
  {
    id: "weight-management",
    number: "05",
    title: "Weight Management",
    pill: "£220 package",
    paragraphs: [
      "Our doctor-led weight management service includes clinical assessment, baseline blood tests, body composition review and personalised planning. The package includes a 45-minute consultation, blood tests and a 30-minute follow-up for £220, with medication costs to be confirmed.",
      "Sustainable weight management starts with understanding what’s actually driving the numbers, not just prescribing a quick fix. Your initial consultation includes a full clinical assessment and relevant blood tests, so your plan is built on real data about your metabolic health, not guesswork.",
      "At your follow-up, your GP will review your results and agree a structured, personalised plan together, whether that involves lifestyle changes, medical treatment, or a combination of both, with ongoing support as your journey progresses.",
      "We take a whole-person approach rather than focusing on the number on the scale alone, considering factors such as sleep, stress, hormonal health and existing medical conditions that may be affecting your progress. Ongoing follow-up ensures your plan evolves with you, rather than being a one-off intervention.",
    ],
    chips: ["45-minute consultation", "Blood tests included", "30-minute follow-up"],
    flip: false,
  },
];

export const bloodTests = {
  id: "blood-tests",
  number: "03",
  title: "Blood Tests & Investigations",
  pill: "Swift turnaround",
  paragraphs: [
    "We offer a comprehensive range of blood tests and investigations with swift turnaround times. Results are reviewed by your GP and discussed with you personally.",
    "Whether you need a specific test arranged by your own GP or want a broader panel as part of a proactive check-up, we make the process quick and straightforward, with results turned around fast and no impersonal automated letters.",
  ],
  priceFrom: 30,
  priceTo: 40,
  priceText:
    "Venepuncture is expected to be approximately £30 to £40, with blood test costs confirmed separately.",
  reviewText:
    "Every result is reviewed by a doctor, not just flagged as “normal” or “abnormal”, and talked through with you so you understand what it actually means for your health. Where follow-up action is needed, we’ll agree a clear next step together.",
  diagnosticsText:
    "We can also arrange investigations beyond standard bloods, including ECGs and other diagnostics, so that most of your assessment can happen in one place without being passed between different providers. This joined-up approach means fewer delays and a doctor who has the full picture when discussing your results with you.",
  chips: ["GP-reviewed results", "Fast turnaround", "Venepuncture approx. £30–£40"],
};

export const womensHealth = {
  id: "womens-health",
  number: "04",
  title: "Women’s Health",
  pill: "Specialist support",
  left: [
    "From menstrual health, contraception and pelvic pain to menopause and postnatal wellbeing, we offer compassionate support. Dr Rai holds the British Menopause Society Certificate in Menopause Care. Menopause assessments are 45 minutes; women’s health appointments are 30 minutes.",
    "Women’s health needs change across every stage of life, and too often those conversations get rushed or overlooked. Our appointments are designed to give these topics the time and sensitivity they deserve, whether you’re navigating contraception choices, unexplained symptoms, or the impact of hormonal change.",
  ],
  right: [
    "Dr Rai’s specialist training in menopause care means you can expect an assessment that goes beyond a quick prescription, looking at your full symptom picture, lifestyle, and long-term wellbeing to build a plan that actually works for you.",
    "We also understand that these appointments can feel deeply personal, so our approach is always unhurried, private and led by you. Whether you simply want a second opinion, a longer conversation than a routine appointment allows, or ongoing support through a particular life stage, our GPs are here to listen without judgement.",
  ],
  chips: ["30-minute appointments", "Compassionate, ongoing care", "45-minute menopause assessments"],
};

export const earWax = {
  id: "ear-wax-removal",
  number: "06",
  title: "Ear Wax Removal",
  pill: "£70",
  paragraphs: [
    "We offer safe, professional ear wax removal using microsuction. The service begins with an initial consultation and ear examination to assess for wax, followed by a gentle, quick and effective procedure where appropriate.",
    "Microsuction is widely regarded as the safest and most comfortable method of ear wax removal, using gentle suction rather than water irrigation. Your GP will first examine your ears to confirm the cause of any discomfort or hearing changes before proceeding.",
    "If wax is present, removal is typically quick and well-tolerated, and you’ll notice the difference immediately. If microsuction isn’t appropriate on the day, your GP will explain why and advise on the best next steps for your ears.",
    "Left untreated, wax build-up can affect hearing, cause discomfort, or even lead to recurring ear infections, so addressing it promptly and safely matters. Our microsuction approach avoids the risks associated with home syringing or ear candling, giving you a clean, controlled procedure carried out by a qualified clinician.",
  ],
  chips: ["Initial consultation + examination", "Microsuction", "30-minute appointment"],
};

export const chronicDisease = {
  id: "chronic-disease-management",
  number: "07",
  title: "Chronic Disease Management",
  pill: "Structured support",
  lead: "Living with a long-term condition such as diabetes, hypertension or high cholesterol requires consistent, informed support. Our GPs will work with you to develop a structured, proactive management plan, reviewing your condition regularly and adjusting your care as your needs evolve.",
  cards: [
    {
      number: "01",
      title: "More than repeat prescriptions",
      text: "Managing a long term condition well is about more than repeat prescriptions, it’s about a doctor who knows your history and stays ahead of changes in your health.",
    },
    {
      number: "02",
      title: "An active, ongoing approach",
      text: "We take an active, ongoing approach, rather than a reactive one. Your GP will work with you to set clear, realistic goals, monitor key markers over time, and adjust your treatment plan as your circumstances change, giving you the confidence that your condition is being properly and consistently managed.",
    },
    {
      number: "03",
      title: "The same GP at each review",
      text: "Because you’ll ideally see the same GP at each review, care doesn’t have to start from scratch every time, your doctor already understands your history, your treatment response, and what matters to you. This continuity often makes it easier to catch small changes early, before they become bigger problems.",
    },
  ],
  chips: ["30-minute new consultations", "20-minute follow-ups", "Same-day access where possible"],
};

export const teleconsultations = {
  id: "teleconsultations",
  number: "08",
  title: "Teleconsultations",
  pill: "£90",
  paragraphs: [
    "Not every appointment needs to be in person. Secure telephone and video consultations are available for follow-ups, prescription reviews and non-urgent concerns. Remote consultations are 20 minutes and priced at £90.",
    "We know life doesn’t always allow for an in-person visit, whether you’re at work, travelling, or simply prefer to speak from home. Our teleconsultations offer the same unhurried, personal attention as a face-to-face appointment, just delivered remotely.",
    "These appointments are ideal for reviewing progress, discussing results, renewing prescriptions, or talking through a non-urgent concern. If your GP feels an in-person examination is needed, they’ll let you know and help arrange it promptly.",
    "All remote appointments are conducted through a secure, confidential platform, giving you the same standard of privacy and care as an in-person visit. It’s a particularly convenient option for patients managing busy schedules, ongoing conditions, or those who simply feel more comfortable speaking from a familiar environment.",
  ],
  chips: ["20-minute consultations", "Phone & video", "Ideal for follow-ups"],
};

export const serviceCta = {
  eyebrow: "Need help choosing?",
  title: "Not sure which service is right for you?",
  text: "Get in touch and our team will help guide you to the right appointment. No referral is required, and new patients of all ages are welcome.",
  button: "Request appointment",
  visit: "110 High Road, Loughton, IG10 4HJ",
};
