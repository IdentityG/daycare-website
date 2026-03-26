export interface Dictionary {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
  };
  nav: {
    home: string;
    about: string;
    programs: string;
    contact: string;
  };
  philosophy: {
    badge: string;
    title: string;
    description: string;
    point1: string;
    point2: string;
    point3: string;
  };
  programs: {
    badge: string;
    title: string;
    infant: { title: string; age: string; desc: string; };
    toddler: { title: string; age: string; desc: string; };
    preschool: { title: string; age: string; desc: string; };
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    ctaTour: string;
    ctaTeachers: string;
    cards: Array<{
      title: string;
      desc: string;
      statLabel: string;
      subFeatures: string[];
    }>;
  };
  timeline: {
    badge: string;
    title: string;
    events: Array<{ time: string; title: string; desc: string; }>;
  };
  testimonials: {
    badge: string;
    title: string;
    reviews: Array<{ name: string; role: string; text: string; }>;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    info: { address: string; phone: string; email: string; };
    form: { name: string; email: string; message: string; submit: string; };
  };
  about: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    history: {
      title: string;
      story: string;
    };
    values: {
      badge: string;
      title: string;
      cards: Array<{ title: string; desc: string; }>;
    };
    team: {
      badge: string;
      title: string;
      members: Array<{ name: string; role: string; bio: string; }>;
    };
  };
  programsPage: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    curriculum: {
      badge: string;
      title: string;
      subtitle: string;
      points: Array<{ title: string; desc: string; }>;
    };
    facilities: {
      badge: string;
      title: string;
      cards: Array<{ title: string; desc: string; image: string; }>;
    };
    admission: {
      badge: string;
      title: string;
      steps: Array<{ title: string; desc: string; }>;
    };
  };
  contactPage: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    faq: {
      badge: string;
      title: string;
      questions: Array<{ q: string; a: string; }>;
    };
  };
  footer: {
    description: string;
    quickLinks: string;
    newsletter: { title: string; desc: string; placeholder: string; button: string; };
    rights: string;
    privacy: string;
    terms: string;
  };
}
