/**
 * Structured university content used to hydrate the primary hub pages
 * (/about, /academics, /examinations, /research, /students).
 * Kept as plain data so it can later be swapped for a CMS/database read
 * without touching the presentation components.
 */

export const PORTALS = {
  admissions: "https://admissions.duet.edu.pk",
  student: "https://portal.duet.edu.pk",
  library: "https://library.duet.edu.pk",
} as const;

export type DegreeLevel = "Undergraduate" | "Postgraduate" | "PhD";

export type Department = {
  id: string;
  name: string;
  faculty: string;
  levels: DegreeLevel[];
  programs: string[];
  intake: number;
  summary: string;
};

export const departments: Department[] = [
  {
    id: "civil",
    name: "Civil Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate", "PhD"],
    programs: ["BE Civil Engineering", "ME Structural Engineering"],
    intake: 120,
    summary:
      "Structures, geotechnics, transportation and water resources engineering with PEC-accredited laboratories.",
  },
  {
    id: "electronic",
    name: "Electronic Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BE Electronic Engineering", "ME Electronics"],
    intake: 110,
    summary:
      "Embedded systems, control, communication and instrumentation with industry-linked final year projects.",
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BE Electrical Engineering", "ME Power Systems"],
    intake: 110,
    summary: "Power generation, transmission, renewable integration and smart-grid research.",
  },
  {
    id: "chemical",
    name: "Chemical Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate", "PhD"],
    programs: ["BE Chemical Engineering", "ME Chemical Engineering"],
    intake: 90,
    summary: "Process design, reaction engineering, energy systems and industrial safety.",
  },
  {
    id: "metallurgy",
    name: "Metallurgy & Materials Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BE Metallurgy & Materials", "ME Materials Engineering"],
    intake: 80,
    summary: "Extractive metallurgy, materials characterisation, corrosion and failure analysis.",
  },
  {
    id: "industrial",
    name: "Industrial & Manufacturing Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BE Industrial & Manufacturing Engineering", "ME Engineering Management"],
    intake: 80,
    summary: "Operations research, lean manufacturing, quality systems and supply-chain design.",
  },
  {
    id: "environmental",
    name: "Environmental Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BE Environmental Engineering", "ME Environmental Engineering"],
    intake: 70,
    summary: "Water and wastewater treatment, air quality, solid waste and climate resilience.",
  },
  {
    id: "energy",
    name: "Energy & Environment Engineering",
    faculty: "Faculty of Engineering",
    levels: ["Undergraduate"],
    programs: ["BE Energy & Environment Engineering"],
    intake: 60,
    summary: "Renewable energy technologies, energy auditing and sustainable systems.",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    faculty: "Faculty of Information Technology",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BS Computer Science", "MS Computer Science"],
    intake: 100,
    summary: "Software engineering, data science, artificial intelligence and cyber security.",
  },
  {
    id: "computer-systems",
    name: "Computer Systems Engineering",
    faculty: "Faculty of Information Technology",
    levels: ["Undergraduate"],
    programs: ["BE Computer Systems Engineering"],
    intake: 90,
    summary: "Computer architecture, networks, IoT platforms and system-on-chip design.",
  },
  {
    id: "architecture",
    name: "Architecture & Planning",
    faculty: "Faculty of Architecture & Management Sciences",
    levels: ["Undergraduate"],
    programs: ["B.Arch Architecture"],
    intake: 60,
    summary: "Design studios, urban planning, heritage conservation and building sciences.",
  },
  {
    id: "management",
    name: "Management Sciences",
    faculty: "Faculty of Architecture & Management Sciences",
    levels: ["Undergraduate", "Postgraduate"],
    programs: ["BBA", "MBA Engineering Management"],
    intake: 70,
    summary: "Technology management, entrepreneurship, finance and organisational behaviour.",
  },
  {
    id: "basic-sciences",
    name: "Basic Sciences & Humanities",
    faculty: "Faculty of Sciences",
    levels: ["Undergraduate", "PhD"],
    programs: ["BS Mathematics", "PhD Applied Mathematics"],
    intake: 50,
    summary: "Mathematics, physics, chemistry and humanities support across every engineering degree.",
  },
];

export const faculties: string[] = Array.from(new Set(departments.map((d) => d.faculty)));

export type FacultyMember = {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  qualification: string;
  interests: string[];
  email: string;
};

export const facultyProfiles: FacultyMember[] = [
  {
    id: "f-001",
    name: "Prof. Dr. Ahsan Raza Siddiqui",
    designation: "Professor & Chairperson",
    departmentId: "civil",
    qualification: "PhD Structural Engineering, NED University",
    interests: ["Seismic design", "Concrete durability"],
    email: "civil.chair@duet.edu.pk",
  },
  {
    id: "f-002",
    name: "Dr. Nadia Hameed",
    designation: "Associate Professor",
    departmentId: "civil",
    qualification: "PhD Geotechnical Engineering, UET Lahore",
    interests: ["Soil stabilisation", "Coastal foundations"],
    email: "nadia.hameed@duet.edu.pk",
  },
  {
    id: "f-003",
    name: "Prof. Dr. Kamran Aziz Bhutto",
    designation: "Professor & Chairperson",
    departmentId: "electronic",
    qualification: "PhD Electronics, Tsinghua University",
    interests: ["Embedded systems", "Biomedical instrumentation"],
    email: "electronic.chair@duet.edu.pk",
  },
  {
    id: "f-004",
    name: "Engr. Sana Qureshi",
    designation: "Assistant Professor",
    departmentId: "electronic",
    qualification: "MS Control Systems, DUET Karachi",
    interests: ["Robotics", "Signal processing"],
    email: "sana.qureshi@duet.edu.pk",
  },
  {
    id: "f-005",
    name: "Prof. Dr. Imran Ali Memon",
    designation: "Professor & Chairperson",
    departmentId: "electrical",
    qualification: "PhD Power Systems, Politecnico di Torino",
    interests: ["Smart grids", "Renewable integration"],
    email: "electrical.chair@duet.edu.pk",
  },
  {
    id: "f-006",
    name: "Dr. Farah Naz Solangi",
    designation: "Associate Professor",
    departmentId: "chemical",
    qualification: "PhD Chemical Engineering, University of Manchester",
    interests: ["Catalysis", "Process intensification"],
    email: "farah.solangi@duet.edu.pk",
  },
  {
    id: "f-007",
    name: "Prof. Dr. Zubair Ahmed Khan",
    designation: "Professor",
    departmentId: "metallurgy",
    qualification: "PhD Materials Science, KAIST",
    interests: ["Corrosion", "Additive manufacturing"],
    email: "zubair.khan@duet.edu.pk",
  },
  {
    id: "f-008",
    name: "Dr. Hina Shaikh",
    designation: "Assistant Professor",
    departmentId: "industrial",
    qualification: "PhD Industrial Engineering, UTM Malaysia",
    interests: ["Lean systems", "Supply-chain analytics"],
    email: "hina.shaikh@duet.edu.pk",
  },
  {
    id: "f-009",
    name: "Dr. Bilal Ahmed Rajput",
    designation: "Associate Professor",
    departmentId: "environmental",
    qualification: "PhD Environmental Engineering, AIT Bangkok",
    interests: ["Wastewater reuse", "Air quality in Karachi"],
    email: "bilal.rajput@duet.edu.pk",
  },
  {
    id: "f-010",
    name: "Dr. Ayesha Jamil",
    designation: "Assistant Professor",
    departmentId: "computer-science",
    qualification: "PhD Computer Science, FAST-NU",
    interests: ["Machine learning", "Natural language processing"],
    email: "ayesha.jamil@duet.edu.pk",
  },
  {
    id: "f-011",
    name: "Engr. Usman Tariq",
    designation: "Lecturer",
    departmentId: "computer-systems",
    qualification: "MS Computer Systems, MUET Jamshoro",
    interests: ["IoT", "Edge computing"],
    email: "usman.tariq@duet.edu.pk",
  },
  {
    id: "f-012",
    name: "Ar. Sadia Khan",
    designation: "Assistant Professor",
    departmentId: "architecture",
    qualification: "M.Arch, NED University",
    interests: ["Urban housing", "Heritage conservation"],
    email: "sadia.khan@duet.edu.pk",
  },
  {
    id: "f-013",
    name: "Dr. Mohsin Ali Lakhani",
    designation: "Associate Professor",
    departmentId: "management",
    qualification: "PhD Management Sciences, IBA Karachi",
    interests: ["Technology entrepreneurship", "Operations strategy"],
    email: "mohsin.lakhani@duet.edu.pk",
  },
  {
    id: "f-014",
    name: "Prof. Dr. Rehana Baloch",
    designation: "Professor",
    departmentId: "basic-sciences",
    qualification: "PhD Applied Mathematics, Quaid-i-Azam University",
    interests: ["Numerical analysis", "Fluid dynamics"],
    email: "rehana.baloch@duet.edu.pk",
  },
];

export type ExamSession = "Fall" | "Spring";

export type ExamSchedule = {
  id: string;
  course: string;
  code: string;
  departmentId: string;
  level: DegreeLevel;
  semester: number;
  session: ExamSession;
  date: string;
  time: string;
  venue: string;
};

export const examSchedules: ExamSchedule[] = [
  { id: "e-01", course: "Engineering Mechanics", code: "CE-201", departmentId: "civil", level: "Undergraduate", semester: 3, session: "Fall", date: "2026-01-12", time: "09:00 – 12:00", venue: "Exam Hall A" },
  { id: "e-02", course: "Reinforced Concrete Design", code: "CE-403", departmentId: "civil", level: "Undergraduate", semester: 7, session: "Fall", date: "2026-01-14", time: "09:00 – 12:00", venue: "Exam Hall A" },
  { id: "e-03", course: "Advanced Structural Analysis", code: "CE-511", departmentId: "civil", level: "Postgraduate", semester: 1, session: "Fall", date: "2026-01-16", time: "14:00 – 17:00", venue: "PG Block 2" },
  { id: "e-04", course: "Digital Logic Design", code: "EL-202", departmentId: "electronic", level: "Undergraduate", semester: 3, session: "Fall", date: "2026-01-12", time: "14:00 – 17:00", venue: "Exam Hall B" },
  { id: "e-05", course: "Microprocessor Systems", code: "EL-305", departmentId: "electronic", level: "Undergraduate", semester: 5, session: "Fall", date: "2026-01-15", time: "09:00 – 12:00", venue: "Exam Hall B" },
  { id: "e-06", course: "Power Transmission & Distribution", code: "EE-404", departmentId: "electrical", level: "Undergraduate", semester: 7, session: "Fall", date: "2026-01-13", time: "09:00 – 12:00", venue: "Exam Hall C" },
  { id: "e-07", course: "Smart Grid Technologies", code: "EE-522", departmentId: "electrical", level: "Postgraduate", semester: 2, session: "Spring", date: "2026-06-04", time: "14:00 – 17:00", venue: "PG Block 1" },
  { id: "e-08", course: "Chemical Reaction Engineering", code: "CH-306", departmentId: "chemical", level: "Undergraduate", semester: 5, session: "Fall", date: "2026-01-17", time: "09:00 – 12:00", venue: "Exam Hall D" },
  { id: "e-09", course: "Process Safety Management", code: "CH-451", departmentId: "chemical", level: "Undergraduate", semester: 8, session: "Spring", date: "2026-06-08", time: "09:00 – 12:00", venue: "Exam Hall D" },
  { id: "e-10", course: "Physical Metallurgy", code: "MM-204", departmentId: "metallurgy", level: "Undergraduate", semester: 3, session: "Fall", date: "2026-01-19", time: "09:00 – 12:00", venue: "Exam Hall E" },
  { id: "e-11", course: "Operations Research", code: "IM-303", departmentId: "industrial", level: "Undergraduate", semester: 5, session: "Fall", date: "2026-01-20", time: "14:00 – 17:00", venue: "Exam Hall E" },
  { id: "e-12", course: "Water & Wastewater Treatment", code: "EN-402", departmentId: "environmental", level: "Undergraduate", semester: 7, session: "Spring", date: "2026-06-10", time: "09:00 – 12:00", venue: "Exam Hall F" },
  { id: "e-13", course: "Data Structures & Algorithms", code: "CS-203", departmentId: "computer-science", level: "Undergraduate", semester: 3, session: "Fall", date: "2026-01-21", time: "09:00 – 12:00", venue: "IT Block Lab 1" },
  { id: "e-14", course: "Machine Learning", code: "CS-512", departmentId: "computer-science", level: "Postgraduate", semester: 2, session: "Spring", date: "2026-06-12", time: "14:00 – 17:00", venue: "IT Block Lab 2" },
  { id: "e-15", course: "Computer Networks", code: "CT-304", departmentId: "computer-systems", level: "Undergraduate", semester: 5, session: "Fall", date: "2026-01-22", time: "09:00 – 12:00", venue: "IT Block Lab 1" },
  { id: "e-16", course: "Architectural Design Studio IV", code: "AR-401", departmentId: "architecture", level: "Undergraduate", semester: 7, session: "Spring", date: "2026-06-15", time: "09:00 – 13:00", venue: "Design Studio 3" },
  { id: "e-17", course: "Engineering Economics", code: "MS-301", departmentId: "management", level: "Undergraduate", semester: 5, session: "Fall", date: "2026-01-23", time: "14:00 – 17:00", venue: "Exam Hall G" },
  { id: "e-18", course: "Numerical Methods", code: "BS-205", departmentId: "basic-sciences", level: "Undergraduate", semester: 3, session: "Spring", date: "2026-06-17", time: "09:00 – 12:00", venue: "Exam Hall G" },
];

export type ResearchCentre = {
  id: string;
  name: string;
  focus: string;
  lead: string;
  fundedProjects: number;
};

export const researchCentres: ResearchCentre[] = [
  { id: "rc-1", name: "Office of Research, Innovation & Commercialisation (ORIC)", focus: "Research governance, funding and industry commercialisation", lead: "Director ORIC", fundedProjects: 24 },
  { id: "rc-2", name: "Centre of Excellence in Mineral & Energy Technology (CEMET)", focus: "Minerals processing, energy technology and applied testing services", lead: "Director CEMET", fundedProjects: 15 },
  { id: "rc-3", name: "Business Incubation Centre", focus: "Student and alumni start-ups, prototyping and mentorship", lead: "Manager, BIC", fundedProjects: 11 },
  { id: "rc-4", name: "Quality Enhancement Cell", focus: "Programme accreditation, OBE compliance and self-assessment", lead: "Director QEC", fundedProjects: 6 },
];

export type UniversityFact = { label: string; value: string };

export const universityFacts: UniversityFact[] = [
  { label: "Established", value: "1962" },
  { label: "Campus", value: "New M. A. Jinnah Road, Karachi" },
  { label: "Departments", value: `${departments.length}` },
  { label: "Faculties", value: `${faculties.length}` },
  { label: "Accreditation", value: "PEC, HEC, NCEAC" },
];

export type StudentService = {
  title: string;
  description: string;
  to?: string;
  href?: string;
};

export const studentServices: StudentService[] = [
  { title: "Students Affairs", description: "Enrolment support, discipline, hostels and student welfare.", to: "/students-affairs" },
  { title: "Student Societies", description: "Technical, literary and community societies across departments.", to: "/students-societies" },
  { title: "Sports", description: "Inter-departmental and inter-university sports calendar.", to: "/sports" },
  { title: "Career Counselling", description: "CV clinics, mock interviews and employer sessions.", to: "/career-counselling" },
  { title: "Internships", description: "Industry placement support and internship listings.", to: "/internships" },
  { title: "Shuttle Bus Routes", description: "Point-to-point transport routes across Karachi.", to: "/shuttle-bus-routes" },
  { title: "Scholarships", description: "Need- and merit-based financial assistance schemes.", to: "/scholarships" },
  { title: "Digital Library", description: "HEC digital library, journals and e-books.", href: PORTALS.library },
];
