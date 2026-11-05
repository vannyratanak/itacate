export type NavItem = { href: string; en: string; kh: string };

// Header (main) links.
export const MAIN_NAV: NavItem[] = [
    { href: "/", en: "Home", kh: "ទំព័រដើម" },
    { href: "/menu", en: "Menu", kh: "ម៉ឺនុយ" },
    { href: "/reservations", en: "Reservations", kh: "កក់តុ" },
    { href: "/offers", en: "Offers & Events", kh: "ការផ្តល់ជូន និងព្រឹត្តិការណ៍" },
    { href: "/gallery", en: "Gallery", kh: "វិចិត្រសាល" },
    { href: "/about", en: "About", kh: "អំពីយើង" },
    { href: "/contact", en: "Contact", kh: "ទំនាក់ទំនង" },
];

// Footer: every page on the site.
export const MORE_NAV: NavItem[] = [
    { href: "/reviews", en: "Reviews", kh: "មតិអតិថិជន" },
    { href: "/private-dining", en: "Private dining & catering", kh: "ជប់លៀង និងម្ហូបកម្មង់" },
    { href: "/gift-cards", en: "Gift cards", kh: "កាតអំណោយ" },
    { href: "/blog", en: "Blog & news", kh: "ព័ត៌មាន" },
    { href: "/careers", en: "Careers", kh: "ការងារ" },
    { href: "/faq", en: "FAQ", kh: "សំណួរញឹកញាប់" },
    { href: "/survey", en: "Take our survey", kh: "ការស្ទង់មតិ" },
];

export const LEGAL_NAV: NavItem[] = [
    { href: "/privacy", en: "Privacy", kh: "ឯកជនភាព" },
    { href: "/terms", en: "Terms", kh: "លក្ខខណ្ឌ" },
];
