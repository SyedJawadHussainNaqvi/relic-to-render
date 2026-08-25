-- Roles
create type public.app_role as enum ('admin', 'editor', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "Admins can read all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Bootstrap: the first signed-in user may claim admin while no admin exists.
create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(uid, 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin')
    on conflict (user_id, role) do nothing;
  return true;
end;
$$;
revoke all on function public.claim_first_admin() from public, anon;
grant execute on function public.claim_first_admin() to authenticated;

-- Slider
create table public.slider_slides (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null default '',
  caption text,
  link_to text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.slider_slides to anon;
grant select, insert, update, delete on public.slider_slides to authenticated;
grant all on public.slider_slides to service_role;
alter table public.slider_slides enable row level security;
create policy "Public can read published slides" on public.slider_slides
  for select to anon, authenticated using (is_published);
create policy "Admins read all slides" on public.slider_slides
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage slides" on public.slider_slides
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- News
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  image_url text,
  published_at timestamptz not null default now(),
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.news_posts to anon;
grant select, insert, update, delete on public.news_posts to authenticated;
grant all on public.news_posts to service_role;
alter table public.news_posts enable row level security;
create policy "Public can read published posts" on public.news_posts
  for select to anon, authenticated using (is_published);
create policy "Admins read all posts" on public.news_posts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage posts" on public.news_posts
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Navigation
create table public.nav_items (
  id uuid primary key default gen_random_uuid(),
  section text not null default 'main',
  parent_key text,
  label text not null,
  to_path text,
  href text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.nav_items to anon;
grant select, insert, update, delete on public.nav_items to authenticated;
grant all on public.nav_items to service_role;
alter table public.nav_items enable row level security;
create policy "Public can read published nav" on public.nav_items
  for select to anon, authenticated using (is_published);
create policy "Admins read all nav" on public.nav_items
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage nav" on public.nav_items
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger slides_touch before update on public.slider_slides
  for each row execute function public.touch_updated_at();
create trigger news_touch before update on public.news_posts
  for each row execute function public.touch_updated_at();
create trigger nav_touch before update on public.nav_items
  for each row execute function public.touch_updated_at();

-- Seed: slider
insert into public.slider_slides (image_url, alt_text, caption, sort_order) values
 ('/__l5e/assets-v1/ac237dc9-6dae-448a-ae26-2d56018c8c4e/WhatsApp-Image-2024-02-06-at-2.50.12-AM.jpeg', 'Dawood University event', 'Dawood University event', 0),
 ('/__l5e/assets-v1/1b3d2524-f021-49f7-8dd9-5480cc4a1a83/convo-123123.jpg', '11th Convocation 2024', '11th Convocation 2024', 10),
 ('/__l5e/assets-v1/3f983e90-a3d2-4183-a297-456c2f709447/pic-pec-china.jpg', 'DUET delegation in China', 'DUET delegation in China', 20),
 ('/__l5e/assets-v1/ae4dfbc6-9e42-4a22-a99b-91a6f4819d1b/grp-photo-china.jpg', 'Group photo, Jiangxi University visit', 'Group photo, Jiangxi University visit', 30),
 ('/__l5e/assets-v1/e6eb3feb-56c0-4c26-b1f8-128c4a29fcd3/image1.jpg', 'Dawood University campus', 'Dawood University campus', 40),
 ('/__l5e/assets-v1/db9ffae4-02c6-4c4e-8aea-5978d74233c2/image5.jpg', 'Dawood University students', 'Dawood University students', 50),
 ('/__l5e/assets-v1/38952da2-6307-4426-9e1c-3a9734b98a77/ti3.jpeg', 'Vice Chancellor Prof. Dr. Samreen Hussain (TI)', 'Vice Chancellor Prof. Dr. Samreen Hussain (TI)', 60),
 ('/__l5e/assets-v1/643bf406-9b2f-4403-a142-234ecdc5b429/governer-meeting-1.jpeg', 'Meeting at Sindh Governor''s House', 'Meeting at Sindh Governor''s House', 70);

-- Seed: news
insert into public.news_posts (slug, title, body, sort_order) values
('why-do-we-need-leaders-like-dr-samreen-hussain-in-education-industry-by-sarmad-aftab-lashari', 'Why do we need leaders like Dr. Samreen Hussain in Education Industry? By Sarmad Aftab Lashari', 'It was my first day as lecturer in The Begum Nusrat Bhutto Women University, Sukkur as lecturer. I was still in the process of observing the workplace dynamics and trying to fit in. We got a WhatsApp Message in Faculty group that “Worthy Vice Chancellor will be meeting with the faculty at 1 pm to discuss the issues related with academics”. It was my first interaction with her Read More …', 0),
('academia-reengineering-by-vice-chancellor-engr-prof-dr-samreen-hussain', 'Academia Reengineering By Vice Chancellor Engr. Prof. Dr. Samreen Hussain', 'In a groundbreaking development for the realm of academia, Engr. Prof. Dr. Samreen Hussain (T.I), Vice Chancellor of Dawood University of Engineering and Technology, has unveiled her latest literary endeavor, “: Renovating, Innovating, and Elevating The Higher Education Institutions.” Collaborating with co-authors Dilawar Khan and Engr. Muhammad Zakir Shaikh, Director NCRA MUET, Dr. Hussain’s book promises to revolutionize higher education paradigms.

A notable highlight of the publication is its foreword, authored by a distinguished Professor from Harvard University, adding significant scholarly weight to its content. Published by Great Britain Press and Publication, the e-book edition is already making waves on Amazon, with the hardcover edition slated for a post-Eid launch.

This ambitious work delves into the intricate dynamics of academia, offering innovative insights and strategies for institutions to adapt, evolve, and excel in an ever-changing educational landscape. With Dr. Samreen Hussain at the helm, this book is poised to inspire and guide educators, administrators, and policymakers worldwide.', 10),
('honorable-vice-chancellor-prof-dr-samreen-hussain-delivered-a-lecture-at-jiangxi-university-of-science-technology-on-ai-with-nanotechnology-future-or-threat', 'Engr. Prof. Dr. Samreen Hussain, VC', 'Honorable Vice Chancellor Prof. Dr. Samreen Hussain delivered a lecture at Jiangxi University of Science & Technology on “AI with Nanotechnology: Future or Threat”.', 20),
('the-date-for-11th-convocation-2024-of-duet-has-been-extended-and-it-will-be-held-on-saturday-13th-january-at-10-30-am-at-sindh-governors-house', 'The date for 11th Convocation 2024 of DUET has been extended and it will be held on Saturday, 13th January at 10.30 AM at Sindh Governor’s House and Last Date for Registration is now 2nd of January 2024.', 'The date for 11th Convocation 2024 of DUET has been extended and it will be held on Saturday, 13th January at 10.30 AM at Sindh Governor’s House and Last Date for Registration is now 2nd of January 2024.', 30),
('dawood-university-of-engineering-and-technology-shines-on-the-global-stage-duet-wins-unido-global-call-2023-award', 'Dawood University of Engineering and Technology Shines on the Global Stage: DUET Wins UNIDO Global Call 2023 Award', 'Dawood University of Engineering and Technology Shines on the Global Stage: DUET Wins UNIDO Global Call 2023 Award

Shanghai, China – November 7, 2023 – Prof. Dr. Zeeshan Ali, the Dean of the Faculty of Engineering at Dawood University of Engineering and Technology (Dawood UET), has achieved a remarkable accolade by securing the third prize, under the category of Clean Energy Innovation, at the prestigious United Nations Industrial Development Organization (UNIDO) Global Call 2023 Award Ceremony. This prestigious ceremony was a part of the Fourth Industrial Revolution and Smart Mobility Forum held at the China International Import Expo (CIIE) in Shanghai, China.

Prof. Dr. Zeeshan Ali represented DUET on the global stage at the UNIDO Global Call 2023, an initiative dedicated to recognizing outstanding green energy solutions from around the world. He showcased his groundbreaking Vertical Axis Wind Turbine (VAWT) solution, designed to address the challenges associated with wind energy production, particularly in regions with low natural wind speeds.

This distinguished recognition further cements Prof. Dr. Zeeshan Ali’s remarkable contributions in the field of sustainable energy solutions. The VAWT project, conceptualized by Prof. Dr. Zeeshan Ali, revolves around augmenting the stability of wind power provision through the introduction of an auxiliary system capable of generating wind even in conditions of low natural wind speeds. This innovation expands the existing system by harnessing both natural and artificial wind, ensuring a continuous wind energy supply with a capacity ranging from 300 to 1,000 watts.

Significantly, this groundbreaking VAWT system has already been successfully deployed in Karachi, Pakistan. With his recognition at CIIE, Prof. Dr. Zeeshan Ali aims to attract global investors interested in green energy solutions, offering an opportunity to apply this Pakistani innovation to a wide range of applications, including residences, hospitals, hotels, and more, ultimately contributing to the United Nations’ Sustainable Development Goals (SDGs).

Dawood UET takes immense pride in this momentous achievement and looks forward to supporting further innovations in the field of green energy and smart mobility. The UNIDO Global Call 2023 Award not only acknowledges the brilliance of Prof. Dr. Zeeshan Ali but also underscores the potential of Pakistani innovation on the global stage.', 40),
('first-industrial-visit-of-cyber-security', 'First Industrial visit of Cyber Security', 'The third year 21F batch students from BS Cyber Security visited Risk Associate, A Global Cyber Security Company, located in Karachi, Pakistan. The purpose of the visit was to learn about the company’s services, operations, and innovations in the field of cyber security risk management. The company’s CEO (Aziz A. Rahim), who gave an overview of the company’s history, mission, and values.

The DUET Alumni (18Batch CSE) Engr. Syed Mushahid Hussain, Principal Penetration Tester/Team Lead, explained the various types of risk management solutions that the company offers to its clients . He encouraged students with the latest cyber security related technologies and certifications. The students shared their impressions, opinions and expressed their gratitude and appreciation to the head of HR (Taqi Raza) and Managing Directory (Kashif Hassan) for hosting them and providing them with valuable insights and knowledge. The visit also enhanced their interest and motivation in pursuing further studies and research in the field of Cyber Security. The souvenir was presented by DUET to Risk Associate.', 50),
('transsion-tecno-electronics-conducts-successful-recruitment-drive-at-dawood-university-of-engineering-and-technology', 'Transsion-Tecno Electronics Conducts Successful Recruitment Drive at Dawood University of Engineering and Technology', 'Transsion-Tecno Electronics (TTE) recently conducted a highly successful recruitment drive at Dawood University of Engineering and Technology, targeting graduating and graduated students from the batches 19 and 19F. The drive, held on 13th February 2024, saw participation from students of Electronics Engineering, Industrial Engineering & Management, Telecommunication Engineering, and Metallurgy & Materials Engineering.

The Vice Chancellor of Dawood University of Engineering and Technology, Engr. Prof. Dr. Samreen Hussain (T.I), commended the efforts of TTE and its officials who are alumni of the university. She urged the alumni to continue their efforts to uplift the university and encouraged them to register in the Portal of Dawood University Alumni Association (DUAA).

A total of 54 students participated in the recruitment interviews, with many being shortlisted for the next panel interview. The event was organized by the Directorate of Industrial Liaison and Alumni Affairs in collaboration with the respective engineering departments.

The TTE team, including Maaz Wadood – Quality Manager, Amna Jawaid – Team Lead – Talent Acquisition and HR Operations, Junaid Saleem – Deputy Manager Production, Hassam Moiuddin – Deputy Manager Machine Engineering, Hassan Shabhi – Process Engineering Team Leader, Shehroz – Team Leader Machine Engineering, Muzammil – Executive Organizational Development, and Wajiha Adnan – MTO HR, was thanked for their visit to Dawood University and their efforts in the recruitment process.', 60);

update public.news_posts set excerpt = left(body, 300) where excerpt is null;

-- Seed: navigation
insert into public.nav_items (section, parent_key, label, to_path, href, sort_order) values
('utility', NULL, 'DUET Portal', NULL, 'https://portal.duet.edu.pk/', 0),
('utility', NULL, 'OBE Portal', NULL, 'https://qobe.duet.edu.pk/', 10),
('utility', NULL, 'Library', NULL, 'https://library.duet.edu.pk/', 20),
('utility', NULL, 'DUET e-mail', NULL, 'https://mail.duet.edu.pk/', 30),
('utility', NULL, 'Newsletter', '/newsletter', NULL, 40),
('utility', NULL, 'Alumni', '/alumni', NULL, 50),
('utility', NULL, 'Downloads', '/downloads', NULL, 60),
('utility', NULL, 'Contacts', '/contacts', NULL, 70),
('cemet', NULL, 'ABOUT CEMET', '/about-cemet', NULL, 0),
('cemet', NULL, 'INCUBATION CENTRE', '/incubation-centre', NULL, 10),
('cemet', NULL, 'Research Journal', '/journal', NULL, 20),
('main', NULL, 'ABOUT DUET', '/about-duet', NULL, 0),
('main', 'about-duet', 'Historic Profile', '/about-duet/historic-profile', NULL, 0),
('main', 'about-duet', 'Vision & Mission', '/about-duet/vision-mission', NULL, 10),
('main', 'about-duet', 'Vice Chancellor''s Message', '/vice-chancellors-message-2', NULL, 20),
('main', 'about-duet', 'Authorities', '/authorities', NULL, 30),
('main', 'about-duet', 'Officers', '/officers-2', NULL, 40),
('main', 'about-duet', 'University Linkages', '/university-linkages', NULL, 50),
('main', 'about-duet', 'Organogram', '/organogram', NULL, 60),
('main', 'about-duet', 'Annual Report', '/annual-report', NULL, 70),
('main', NULL, 'ADMISSIONS', '/admissions', NULL, 10),
('main', 'admissions', 'Online Admission Portal', NULL, 'https://admissions.duet.edu.pk/', 0),
('main', 'admissions', 'Undergraduate Admissions', '/undergrad-programs', NULL, 10),
('main', 'admissions', 'Postgraduate Admissions', '/postgraduate-programs', NULL, 20),
('main', 'admissions', 'Fee Structures', '/fee-structure', NULL, 30),
('main', 'admissions', 'Migration Policy', '/university-policies', NULL, 40),
('main', 'admissions', 'Admission Guidelines', '/downloads', NULL, 50),
('main', 'admissions', 'Scholarships', '/scholarships', NULL, 60),
('main', NULL, 'ACADEMICS', '/academics', NULL, 20),
('main', 'academics', 'Academic Calendar', '/academic-calendar', NULL, 0),
('main', 'academics', 'Faculties & Departments', '/faculty-departments', NULL, 10),
('main', 'academics', 'Undergraduate Programs', '/undergrad-programs', NULL, 20),
('main', 'academics', 'Undergraduate Regulations', '/undergrad-regulations', NULL, 30),
('main', 'academics', 'Postgraduate Programs', '/postgraduate-programs', NULL, 40),
('main', 'academics', 'Postgraduate Regulations', '/postgraduate-regulations', NULL, 50),
('main', 'academics', 'HEC Approved PhD Supervisors', '/hec-approved-phd-supervisors', NULL, 60),
('main', 'academics', 'Outcome Based Education (OBE)', '/outcome-based-education-obe', NULL, 70),
('main', NULL, 'EXAMINATIONS', '/examinations', NULL, 30),
('main', 'examinations', 'Regulations', '/regulations', NULL, 0),
('main', 'examinations', 'Schedule', '/schedule', NULL, 10),
('main', 'examinations', 'Results', '/results', NULL, 20),
('main', 'examinations', 'Certificates', '/certificates', NULL, 30),
('main', 'examinations', 'Convocation', '/convocation', NULL, 40),
('main', 'examinations', 'Downloads', '/downloads-2', NULL, 50),
('main', NULL, 'DIRECTORATES', '/directorates', NULL, 40),
('main', 'directorates', 'Admissions', '/admissions', NULL, 0),
('main', 'directorates', 'Business Incubation Center', '/business-incubation-center', NULL, 10),
('main', 'directorates', 'Continuous Professional Development', '/continues-professional-development', NULL, 20),
('main', 'directorates', 'Financial Assistance Department', '/financial-assistance-departments', NULL, 30),
('main', 'directorates', 'Industrial Liasons & Alumni Affairs', '/industrial-liasons-alumni-affairs', NULL, 40),
('main', 'directorates', 'Information Technology', '/information-technology', NULL, 50),
('main', 'directorates', 'Office of Research Innovation & Commercialisation', '/office-of-research-innovation-commercialisation', NULL, 60),
('main', 'directorates', 'Postgraduate Studies', '/postgraduate-studies', NULL, 70),
('main', 'directorates', 'Quality Enhancement Cell', '/quality-enhancement-cell', NULL, 80),
('main', 'directorates', 'Sports', '/sports', NULL, 90),
('main', 'directorates', 'Students Affairs', '/students-affairs', NULL, 100),
('main', NULL, 'RESEARCH', '/research-2', NULL, 50),
('main', 'research', 'Projects', '/projects', NULL, 0),
('main', 'research', 'Journal', '/journal', NULL, 10),
('main', 'research', 'Publications', '/publications', NULL, 20),
('main', 'research', 'Conference & Seminars', '/conference-seminars', NULL, 30),
('main', 'research', 'Funding Agencies', '/funding-agencies', NULL, 40),
('main', 'research', 'Research Ethics Policy', '/research-ethics-policy', NULL, 50),
('main', 'research', 'Plagiarism Policy', '/plagiarism-policy', NULL, 60),
('main', NULL, 'STUDENTS', '/students', NULL, 60),
('main', 'students', 'Academic Calendar', '/academic-calendar', NULL, 0),
('main', 'students', 'University Policies', '/university-policies', NULL, 10),
('main', 'students', 'Scholarships', '/scholarships', NULL, 20),
('main', 'students', 'Students Affairs', '/students-affairs', NULL, 30),
('main', 'students', 'Results', '/results', NULL, 40),
('main', 'students', 'Internships', '/internships', NULL, 50),
('main', 'students', 'Career Counselling', '/career-counselling', NULL, 60),
('main', 'students', 'Shuttle Bus Routes', '/shuttle-bus-routes', NULL, 70),
('main', 'students', 'Students Societies', '/students-societies', NULL, 80),
('main', 'students', 'Seminars & Workshops', '/seminars-workshops', NULL, 90),
('main', NULL, 'CAREERS', '/careers', NULL, 70);