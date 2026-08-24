export type MenuItem = { label: string; to?: string; href?: string };
export type MenuGroup = { label: string; to?: string; items: MenuItem[] };

export const utilityLinks: MenuItem[] = [
  { label: "DUET Portal", href: "https://portal.duet.edu.pk/" },
  { label: "OBE Portal", href: "https://qobe.duet.edu.pk/" },
  { label: "Library", href: "https://library.duet.edu.pk/" },
  { label: "DUET e-mail", href: "https://mail.duet.edu.pk/" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "Alumni", to: "/alumni" },
  { label: "Downloads", to: "/downloads" },
  { label: "Contacts", to: "/contacts" },
];

export const cemetLinks: MenuItem[] = [
  { label: "ABOUT CEMET", to: "/about-cemet" },
  { label: "INCUBATION CENTRE", to: "/incubation-centre" },
  { label: "Research Journal", to: "/journal" },
];

export const mainMenu: MenuGroup[] = [
  {
    label: "ABOUT DUET",
    to: "/about-duet",
    items: [
      { label: "Historic Profile", to: "/about-duet/historic-profile" },
      { label: "Vision & Mission", to: "/about-duet/vision-mission" },
      { label: "Vice Chancellor's Message", to: "/vice-chancellors-message-2" },
      { label: "Authorities", to: "/authorities" },
      { label: "Officers", to: "/officers-2" },
      { label: "University Linkages", to: "/university-linkages" },
      { label: "Organogram", to: "/organogram" },
      { label: "Annual Report", to: "/annual-report" },
    ],
  },
  {
    label: "ADMISSIONS",
    to: "/admissions",
    items: [
      { label: "Online Admission Portal", href: "https://admissions.duet.edu.pk/" },
      { label: "Undergraduate Admissions", to: "/undergrad-programs" },
      { label: "Postgraduate Admissions", to: "/postgraduate-programs" },
      { label: "Fee Structures", to: "/fee-structure" },
      { label: "Migration Policy", to: "/university-policies" },
      { label: "Admission Guidelines", to: "/downloads" },
      { label: "Scholarships", to: "/scholarships" },
    ],
  },
  {
    label: "ACADEMICS",
    to: "/academics",
    items: [
      { label: "Academic Calendar", to: "/academic-calendar" },
      { label: "Faculties & Departments", to: "/faculty-departments" },
      { label: "Undergraduate Programs", to: "/undergrad-programs" },
      { label: "Undergraduate Regulations", to: "/undergrad-regulations" },
      { label: "Postgraduate Programs", to: "/postgraduate-programs" },
      { label: "Postgraduate Regulations", to: "/postgraduate-regulations" },
      { label: "HEC Approved PhD Supervisors", to: "/hec-approved-phd-supervisors" },
      { label: "Outcome Based Education (OBE)", to: "/outcome-based-education-obe" },
    ],
  },
  {
    label: "EXAMINATIONS",
    to: "/examinations",
    items: [
      { label: "Regulations", to: "/regulations" },
      { label: "Schedule", to: "/schedule" },
      { label: "Results", to: "/results" },
      { label: "Certificates", to: "/certificates" },
      { label: "Convocation", to: "/convocation" },
      { label: "Downloads", to: "/downloads-2" },
    ],
  },
  {
    label: "DIRECTORATES",
    to: "/directorates",
    items: [
      { label: "Admissions", to: "/admissions" },
      { label: "Business Incubation Center", to: "/business-incubation-center" },
      { label: "Continuous Professional Development", to: "/continues-professional-development" },
      { label: "Financial Assistance Department", to: "/financial-assistance-departments" },
      { label: "Industrial Liasons & Alumni Affairs", to: "/industrial-liasons-alumni-affairs" },
      { label: "Information Technology", to: "/information-technology" },
      {
        label: "Office of Research Innovation & Commercialisation",
        to: "/office-of-research-innovation-commercialisation",
      },
      { label: "Postgraduate Studies", to: "/postgraduate-studies" },
      { label: "Quality Enhancement Cell", to: "/quality-enhancement-cell" },
      { label: "Sports", to: "/sports" },
      { label: "Students Affairs", to: "/students-affairs" },
    ],
  },
  {
    label: "RESEARCH",
    to: "/research-2",
    items: [
      { label: "Projects", to: "/projects" },
      { label: "Journal", to: "/journal" },
      { label: "Publications", to: "/publications" },
      { label: "Conference & Seminars", to: "/conference-seminars" },
      { label: "Funding Agencies", to: "/funding-agencies" },
      { label: "Research Ethics Policy", to: "/research-ethics-policy" },
      { label: "Plagiarism Policy", to: "/plagiarism-policy" },
    ],
  },
  {
    label: "STUDENTS",
    to: "/students",
    items: [
      { label: "Academic Calendar", to: "/academic-calendar" },
      { label: "University Policies", to: "/university-policies" },
      { label: "Scholarships", to: "/scholarships" },
      { label: "Students Affairs", to: "/students-affairs" },
      { label: "Results", to: "/results" },
      { label: "Internships", to: "/internships" },
      { label: "Career Counselling", to: "/career-counselling" },
      { label: "Shuttle Bus Routes", to: "/shuttle-bus-routes" },
      { label: "Students Societies", to: "/students-societies" },
      { label: "Seminars & Workshops", to: "/seminars-workshops" },
    ],
  },
  { label: "CAREERS", to: "/careers", items: [] },
];
