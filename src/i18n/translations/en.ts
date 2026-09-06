import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    home: {
      title: "Dev Works — Digital solutions that grow your business",
      description:
        "Web development, e-commerce, business software, applications and GIS solutions. We turn ideas into digital solutions that grow your business.",
    },
    contact: {
      title: "Contact",
      description:
        "Tell us what you want to build. Write to us through the form or on WhatsApp and let's talk about your project.",
    },
    blog: {
      title: "Blog — Dev Works",
      description:
        "Technical and business notes from Dev Works: how we build software, choose technology, and solve real problems.",
    },
  },
  skipToContent: "Skip to main content",
  nav: {
    servicios: "Services",
    proyectos: "Projects",
    blog: "Blog",
    nosotros: "About",
    contacto: "Contact",
    hablemos: "Let's talk",
  },
  languageSwitcher: {
    label: "Change language",
  },
  hero: {
    badge: "Software · Design · Automation",
    title: "We turn ideas into digital solutions that grow your business.",
    description:
      "Web development, e-commerce, business software, applications and GIS solutions designed to solve real problems.",
    ctaPrimary: "Let's talk about your project",
    ctaSecondary: "See projects",
  },
  heroVisual: {
    activity: "Project activity",
    mapLots: "Lot map",
    deployActive: "Deploy active",
    readyForProduction: "// production ready",
  },
  trust: {
    heading: "Technology applied to real problems.",
    categories: ["Web", "E-commerce", "Software", "Apps", "GIS", "Automation"],
  },
  services: {
    eyebrow: "SERVICES",
    heading: "We build what your business needs.",
    description:
      "From a landing page to complete commercial platforms, we develop solutions built to work and grow with you.",
    items: {
      web: {
        title: "Web Development",
        description: "Fast, modern websites built to turn visits into customers.",
        longDescription:
          "We design and build corporate sites, landing pages and web platforms focused on load speed, clear visual hierarchy and an experience that guides users toward action.",
        tags: ["Websites", "Landing Pages", "Platforms", "Corporate web"],
      },
      ecommerce: {
        title: "E-commerce",
        description: "Shopping experiences that connect catalog, inventory and customers.",
        longDescription:
          "We build online stores that connect catalog, inventory, payments and customers in a single flow, optimized so every visit has a better chance of becoming a sale.",
        tags: ["WooCommerce", "Online stores", "Catalogs", "Integrations"],
      },
      software: {
        title: "Business software",
        description: "Digitization and automation of business processes.",
        longDescription:
          "We develop business systems, dashboards and CRM/ERP-style modules tailored to how your business actually operates, replacing spreadsheets and manual processes with centralized tools.",
        tags: ["Business systems", "Dashboards", "CRM", "ERP"],
      },
      apps: {
        title: "Applications",
        description: "Mobile apps adapted to your business needs.",
        longDescription:
          "We build Android, iOS and hybrid applications, connected to the APIs and systems your business already uses, designed to solve a specific workflow for your users or your team.",
        tags: ["Android", "iOS", "Hybrid", "API integrations"],
      },
      gis: {
        title: "GIS & Maps",
        description: "We turn geographic information into tools that help you make better decisions.",
        longDescription:
          "We design interactive maps and geographic information systems to visualize lots, territories and spatial data, enabling decisions that used to depend on scattered plans or disconnected spreadsheets.",
        tags: ["Interactive maps", "GIS", "Geolocation", "Territory management"],
      },
      automatizacion: {
        title: "Automation",
        description: "Connecting tools and processes to reduce repetitive tasks.",
        longDescription:
          "We integrate APIs and automate workflows between the tools your team already uses, eliminating repetitive tasks and reducing human error in operational processes.",
        tags: ["APIs", "Integrations", "Automations", "Business workflows"],
      },
    },
  },
  differentiator: {
    eyebrow: "WHAT SETS US APART",
    heading: "We don't just build. We understand the problem.",
    description:
      "Before writing a single line of code, we work to understand how your business runs, what needs improving and what solution actually makes sense.",
    pillars: {
      consultoria: "Consulting",
      analisis: "Analysis",
      diseno: "Design",
      desarrollo: "Development",
      mejora: "Continuous improvement",
    },
  },
  process: {
    eyebrow: "PROCESS",
    heading: "How we work at Dev Works.",
    steps: {
      descubrimos: {
        title: "Discover",
        description:
          "We analyze your business, your processes and the real problem you need to solve before proposing a solution.",
      },
      disenamos: {
        title: "Design",
        description:
          "We define architecture, user experience and interface, prioritizing clarity and ease of use.",
      },
      desarrollamos: {
        title: "Build",
        description:
          "We build the solution with modern technologies, in short cycles and with constant visibility into progress.",
      },
      medimos: {
        title: "Measure",
        description:
          "We verify the solution works as expected: performance, usability and real results.",
      },
      mejoramos: {
        title: "Improve",
        description:
          "We iterate with real data and feedback so the solution keeps evolving alongside your business.",
      },
    },
  },
  gis: {
    eyebrow: "GIS & MAPS",
    heading: "From scattered data to clear decisions.",
    description:
      "We turn geographic information into tools that help you make better decisions: lots, territories and spatial data, all visualized in one place.",
    features: [
      "Interactive maps",
      "Geolocation",
      "Territory management",
      "Geographic data visualization",
    ],
    previewLabel: "Conceptual preview — visual demo",
    popup: {
      title: "Lot #184",
      area: "320 m²",
      available: "Available",
      viewInfo: "View details",
    },
  },
  projects: {
    eyebrow: "PROJECTS",
    heading: "Projects that speak for us.",
    viewProject: "View project",
    items: {
      alphitech: {
        name: "Technical product catalog — ALPHI Technology",
        description:
          "Filterable web catalog for an industrial and defense electronics manufacturer, with detailed technical spec sheets per product and manual/quote requests.",
        category: "Web · B2B catalog",
      },
      vicmyers: {
        name: "Product catalog — Vic Myers Associates",
        description:
          "Catalog site for a manufacturers' representative in aerospace, defense and instrumentation technology, organized by product line.",
        category: "Web · B2B catalog",
      },
      bantokens: {
        name: "Fintech platform — Bantokens",
        description:
          "Landing page for a payments and monetization platform for content creators, with coverage across several countries and multiple withdrawal methods.",
        category: "Web · Fintech",
      },
      photofloh: {
        name: "Review portal — Photofloh",
        description:
          "Feedback page for a professional photography studio, with an interactive star-rating form and customer comments.",
        category: "Web · Review system",
      },
      "sistema-administrativo": {
        name: "Internal admin system",
        description:
          "Custom administrative system for managing internal business operations. Being a private tool, it has no public site.",
        category: "Business software · Dashboard",
      },
      "sistema-inventario": {
        name: "Inventory management system",
        description:
          "Inventory control system for a company in Mexico: manages stock inflows, outflows, returns, batches, expiration dates and real-time stock reports. Being a private tool, it has no public site.",
        category: "Business software · Inventory",
      },
    },
  },
  blog: {
    eyebrow: "BLOG",
    heading: "Ideas, process and lessons from Dev Works.",
    description: "Technical and business notes on what we build and how we think about it.",
    readMore: "Read article",
    backToBlog: "Back to blog",
    minReadSuffix: "min read",
    publishedOn: "Published on",
    breadcrumbBlog: "Blog",
    emptyState: "We'll publish our first article soon.",
  },
  technology: {
    eyebrow: "TECHNOLOGY",
    heading: "Technology that adapts to the project.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      infra: "Infrastructure",
    },
  },
  about: {
    eyebrow: "ABOUT DEV WORKS",
    heading: "Technology with a business vision.",
    p1: "Dev Works was born from a simple idea: software should solve real problems, not complicate them.",
    p2: "We work alongside companies and entrepreneurs to turn processes, ideas and opportunities into useful, modern and scalable digital products.",
  },
  cta: {
    heading: "Have an idea? Let's make it real.",
    description: "Tell us what you want to build and let's find the best way to do it, together.",
    ctaPrimary: "Let's talk about your project",
    whatsapp: "WhatsApp",
  },
  contactPage: {
    eyebrow: "CONTACT",
    heading: "Let's talk about your project.",
    description:
      "Tell us what you need to build and we'll get back to you to schedule a first, no-cost conversation.",
    whatsappLink: "Message us on WhatsApp",
  },
  contactForm: {
    needOptions: [
      "Web development",
      "E-commerce",
      "Business software",
      "Applications",
      "GIS & Maps",
      "Automation",
      "Other",
    ],
    labels: {
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "(optional)",
      whatsapp: "WhatsApp",
      need: "What do you need?",
      message: "Message",
    },
    placeholderSelect: "Select an option",
    honeypotLabel: "Do not fill in this field",
    errors: {
      name: "Tell us your name.",
      email: "Enter a valid email address.",
      need: "Select what you need.",
      message: "Tell us a bit more (minimum 10 characters).",
      fieldsError: "Please check the fields marked below.",
      rateLimited: "You sent several messages in a row. Try again in a few minutes.",
      generic: "We couldn't send your message. Please try again later.",
    },
    submit: "Send message",
    submitting: "Sending...",
    success: {
      whatsappTitle: "Almost there!",
      whatsappBody:
        "We opened WhatsApp with your message already written. Just confirm and hit send so it reaches us.",
      emailTitle: "Message sent!",
      emailBody: "Thanks for reaching out. We'll reply as soon as possible to the email you left us.",
      sendAnother: "Send another message",
    },
    whatsappMessage: {
      intro: "Hi Dev Works, I'd like to get a quote for a project.",
      name: "Name",
      email: "Email",
      company: "Company",
      need: "I need",
      message: "Message",
    },
  },
  footer: {
    navTitle: "Navigation",
    contactTitle: "Contact",
    tagline: "Digital solutions for businesses that want to grow.",
    rights: "All rights reserved.",
  },
  mobileMenu: {
    openLabel: "Open navigation menu",
    closeLabel: "Close menu",
    dialogLabel: "Navigation menu",
    cta: "Let's talk about your project",
  },
  whatsappFloat: {
    ariaLabel: "Message Dev Works on WhatsApp",
  },
  caseStudy: {
    backToProjects: "Back to projects",
    visitSite: "Visit site",
    imagePending: "[ Project image — coming soon ]",
    imageAltPrefix: "Screenshot of the project",
    sectionsNavLabel: "Case study sections",
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
    sections: {
      problem: {
        title: "Problem",
        body: "Detailed information on this case will be published soon. This page is ready to include the real context of the project: what problem the business faced before working with Dev Works.",
      },
      context: {
        title: "Context",
        body: "The client and business context will be documented here: their industry, their operations, and the limitations of the previous process or system.",
      },
      solution: {
        title: "Solution",
      },
      process: {
        title: "Process",
        body: "Development followed Dev Works' standard process: discovery, design, development, measurement and continuous improvement.",
      },
      results: {
        title: "Results",
        body: "Verifiable results for this project will be added here once available for publication.",
      },
    },
    ctaHeading: "Want a similar result for your business?",
    ctaButton: "Let's talk about your project",
  },
  seo: {
    ogLocale: "en_US",
  },
};
