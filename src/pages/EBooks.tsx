import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ContentRail } from "@/components/ui/ContentRail";
import { ContentCard } from "@/components/ui/ContentCard";
import { SubjectGrid, SubjectCard } from "@/components/ui/SubjectGrid";
import { Search, BookOpen, Calculator, Bookmark, Star, FileText, MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import cardEbooks from "@/assets/card-ebooks.jpg";

const subjects = [
  {
    id: 1,
    title: "AWS Solution Architect",
    code: "CSE3002",
    books: 5,
    category: "Program Core",
    image: cardEbooks,
    modules: [
      { title: "UNIT-1 AWS Solution Architect", path: "/notes/aws/UNIT-1  AWS Solution Architect.pdf" },
      { title: "UNIT-2 Updated", path: "/notes/aws/UNIT-2 - Updated.pdf" },
      { title: "UNIT-3 Updated", path: "/notes/aws/UNIT-3 Updated.pdf" },
      { title: "UNIT-4", path: "/notes/aws/UNIT-4.pdf" },
      { title: "UNIT-5", path: "/notes/aws/UNIT-5.pdf" }
    ]
  },
  {
    id: 2,
    title: "Internet & Web Programming",
    code: "CSE4001",
    books: 6,
    category: "Program Core",
    image: cardEbooks,
    modules: [
      { title: "IWP UNIT 1", path: "/notes/iwp/IWP_UNIT1.pdf" },
      { title: "IWP UNIT 2 HTML", path: "/notes/iwp/IWP_UNIT2_HTML.pdf" },
      { title: "IWP UNIT 2 CSS", path: "/notes/iwp/IWP_UNIT2_CSS.pdf" },
      { title: "IWP Unit 3", path: "/notes/iwp/IWP_Unit3.pdf" },
      { title: "IWP Unit 4", path: "/notes/iwp/IWP_Unit4.pdf" },
      { title: "Unit 5 PHP", path: "/notes/iwp/Unit-5- php.pdf" }
    ]
  },
  {
    id: 3,
    title: "Software Engineering",
    code: "CSE3005",
    books: 5,
    category: "Program Core",
    image: cardEbooks,
    modules: [
      { title: "Module-1 Software Process Model", path: "/notes/se/Module-1_Software Process Model.pdf" },
      { title: "Module-2 Requirement Engineering", path: "/notes/se/Module-2_Requirement Engineering today.pdf" },
      { title: "Module-3 Design Concepts - Testing", path: "/notes/se/Module-3 Design Concepts - Testing.pdf" },
      { title: "Module-4 Object Oriented Life Cycle", path: "/notes/se/Module-4 Object Oriented Life Cycle.pdf" },
      { title: "Module-5 Quality and Maintenance", path: "/notes/se/Module-5 Quality and Maintanance.pdf" }
    ]
  },
  { id: 4, title: "Object Oriented Programming With C++", code: "CSE2001", books: 4, category: "Program Core", image: cardEbooks },
  { id: 5, title: "Data Structures and Algorithms", code: "CSE2002", books: 8, category: "Program Core", image: cardEbooks },
  { id: 6, title: "Computer Architecture and Organization", code: "CSE2003", books: 5, category: "Program Core", image: cardEbooks },
  { id: 7, title: "Theory Of Computation And Compiler Design", code: "CSE2004", books: 3, category: "Program Core", image: cardEbooks },
  { id: 8, title: "Database Management Systems", code: "CSE3001", books: 7, category: "Program Core", image: cardEbooks },
  { id: 9, title: "Operating System", code: "CSE3003", books: 6, category: "Program Core", image: cardEbooks },
  { id: 10, title: "Design Analysis Of Algorithm", code: "CSE3004", books: 5, category: "Program Core", image: cardEbooks },
  { id: 11, title: "Computer Networks", code: "CSE3006", books: 7, category: "Program Core", image: cardEbooks },
  { id: 12, title: "Parallel and Distributed Computing", code: "CSE3009", books: 4, category: "Program Core", image: cardEbooks },
  { id: 13, title: "Python Programming", code: "CSE3011", books: 8, category: "Program Core", image: cardEbooks },
  { id: 14, title: "Digital Logic Design", code: "ECE2002", books: 5, category: "Program Core", image: cardEbooks },
  { id: 15, title: "Microprocessors And Microcontrollers", code: "ECE3004", books: 4, category: "Program Core", image: cardEbooks },
  { id: 16, title: "Machine Learning", code: "CSE4002", books: 15, category: "Program Core", image: cardEbooks },
  { id: 17, title: "Internet of Things", code: "CCA3011", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 18, title: "Healthcare Information Systems", code: "CHI2007", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 19, title: "Data Visualization", code: "CSA3004", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 20, title: "Cloud Computing", code: "CSA3005", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 21, title: "Knowledge Engineering", code: "CSA3017", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 22, title: "Data Mining And Data Warehousing", code: "CSA4003", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 23, title: "Information Retrieval and Web Search", code: "CSA4011", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 24, title: "Ethical Hacking", code: "CSD4002", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 25, title: "Cyber Security Framework", code: "CSD4008", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 26, title: "Virtualization Essentials", code: "CSD5002", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 27, title: "Forensic Science", code: "CSD5008", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 28, title: "Soft Computing", code: "CSE3008", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 29, title: "Computer Vision", code: "CSE3010", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 30, title: "Mobile Application Development", code: "CSE3012", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 31, title: "Agile Software Development", code: "CSE3013", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 32, title: "Medical Imaging", code: "CSE3014", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 33, title: "AWS Cloud Practitioner", code: "CSE3015", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 34, title: "AWS Solution Architect", code: "CSE3016", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 35, title: "Salesforce", code: "CSE3017", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 36, title: "Bigdata Analytics", code: "CSE4003", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 37, title: "Machine Learning (Elective)", code: "CSE4005", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 38, title: "Software Defined Network", code: "CSE4012", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 39, title: "Software Project Management", code: "CSE4016", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 40, title: "Software Testing", code: "CSE4017", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 41, title: "Advanced Java Programming", code: "CSE4019", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 42, title: "Augmented Reality and Virtual Reality", code: "CSG2001", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 43, title: "Wireless Sensor Networks", code: "ECE4007", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 44, title: "Embedded Systems", code: "ECE4010", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 45, title: "PATTERN RECOGNITION AND IMAGE ANALYSIS", code: "ECE6012", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 46, title: "Applied Cryptography", code: "MAT2009", books: 4, category: "Program Elective", image: cardEbooks },
  { id: 47, title: "Mathematical Foundations for Cybersecurity", code: "MAT5004", books: 3, category: "Program Elective", image: cardEbooks },
  { id: 48, title: "ENGINEERING CHEMISTRY", code: "CHY1001", books: 5, category: "Natural Science Core", image: cardEbooks },
  { id: 49, title: "Calculus and Laplace Transforms", code: "MAT1001", books: 6, category: "Natural Science Core", image: cardEbooks },
  { id: 50, title: "Discrete Mathematics And Graph Theory", code: "MAT2002", books: 4, category: "Natural Science Core", image: cardEbooks },
  { id: 51, title: "Applied Linear Algebra", code: "MAT3002", books: 3, category: "Natural Science Core", image: cardEbooks },
  { id: 52, title: "Probability, Statistics And Reliability", code: "MAT3003", books: 4, category: "Natural Science Core", image: cardEbooks },
  { id: 53, title: "ENGINEERING PHYSICS", code: "PHY1001", books: 4, category: "Natural Science Core", image: cardEbooks },
  { id: 54, title: "Fundamentals In AI & ML", code: "CSA2001", books: 4, category: "Basic Engineering Core", image: cardEbooks },
  { id: 55, title: "Electric Circuits and Systems", code: "EEE1001", books: 4, category: "Basic Engineering Core", image: cardEbooks },
  { id: 56, title: "Engineering Design and Modelling", code: "MEE2014", books: 4, category: "Basic Engineering Core", image: cardEbooks },
  { id: 57, title: "Introduction to Problem Solving and Programming", code: "CSE1021", books: 4, category: "Skill Development", image: cardEbooks },
  { id: 58, title: "Programming In Java", code: "CSE2006", books: 3, category: "Skill Development", image: cardEbooks },
  { id: 59, title: "Competitive Coding Practices", code: "PLA1004", books: 3, category: "Skill Development", image: cardEbooks },
  { id: 60, title: "Lateral Thinking", code: "PLA1006", books: 2, category: "Skill Development", image: cardEbooks },
  { id: 61, title: "Professional Communication Skills for Engineers", code: "SST1003", books: 1, category: "Skill Development", image: cardEbooks },
  { id: 62, title: "Dynamics of workplace communication Skills", code: "SST2003", books: 1, category: "Skill Development", image: cardEbooks },
  { id: 63, title: "Environmental Sustainability", code: "CHY1006", books: 2, category: "Humanities Core", image: cardEbooks },
  { id: 64, title: "EFFECTIVE TECHNICAL COMMUNICATION", code: "ENG1004", books: 2, category: "Humanities Core", image: cardEbooks },
  { id: 65, title: "Advanced Technical Communication", code: "ENG2005", books: 2, category: "Humanities Core", image: cardEbooks },
  // Project and Internships
  { id: 66, title: "Summer Industrial Internship", code: "DSN2092", books: 1, category: "Project & Internships", image: cardEbooks },
  { id: 67, title: "Semester Internship", code: "DSN2093", books: 4, category: "Project & Internships", image: cardEbooks },
  { id: 68, title: "Project Exhibition - I", code: "DSN2098", books: 1, category: "Project & Internships", image: cardEbooks },
  { id: 69, title: "Project Exhibition - II", code: "DSN3099", books: 1, category: "Project & Internships", image: cardEbooks },
  { id: 70, title: "Engineering Project In Community Service", code: "DSN3099", books: 2, category: "Project & Internships", image: cardEbooks },
  { id: 71, title: "Capstone Project - Phase 1", code: "DSN4091", books: 3, category: "Project & Internships", image: cardEbooks },
  { id: 72, title: "Capstone Project - Phase 2", code: "DSN4092", books: 5, category: "Project & Internships", image: cardEbooks },
  // Natural Science Electives
  { id: 73, title: "Modeling And Simulation Of Biological Systems", code: "CHY2007", books: 3, category: "Natural Science Elective", image: cardEbooks },
  { id: 74, title: "Differential And Difference Equations", code: "MAT2001", books: 3, category: "Natural Science Elective", image: cardEbooks },
  { id: 75, title: "Applied Numerical Methods", code: "MAT3001", books: 3, category: "Natural Science Elective", image: cardEbooks },
  { id: 76, title: "Operations Research", code: "MAT2004", books: 3, category: "Natural Science Elective", image: cardEbooks },
  { id: 77, title: "Random Process", code: "MAT3004", books: 3, category: "Natural Science Elective", image: cardEbooks },
  { id: 78, title: "Computational Game Theory", code: "MAT3008", books: 3, category: "Natural Science Elective", image: cardEbooks },
  { id: 79, title: "Biophysics", code: "PHY2011", books: 3, category: "Natural Science Elective", image: cardEbooks },
  // Multidisciplinary Electives
  { id: 80, title: "Bio Inspired Design", code: "BIO1501", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  { id: 81, title: "Foundations of Data Science", code: "CDS3005", books: 6, category: "Multidisciplinary Elective", image: cardEbooks, modules: [
    { title: "Foundations of Data Science - Module 1", path: "/notes/fds/MODULE 1.pdf" },
    { title: "Foundations of Data Science - Module 2", path: "/notes/fds/Module 2 (1).pdf" },
    { title: "Foundations of Data Science - Module 3", path: "/notes/fds/Module 3.pptx.pdf" },
    { title: "Foundations of Data Science - Module 4", path: "/notes/fds/Module 4.pdf" },
    { title: "Foundations of Data Science - Module 5", path: "/notes/fds/Module 5.pdf" },
  ], questions: [
    { title: "Numerical Questions For First Half", path: "/notes/fds/Question Bank.pdf" },
  ] },
  { id: 82, title: "Cyber Physical Systems", code: "CSD3010", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  { id: 83, title: "Human Computer Interaction", code: "CSG2003", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  { id: 84, title: "Body Area Networks", code: "EAC4012", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  { id: 85, title: "Sensors And IoT", code: "ECE4006", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  { id: 86, title: "Introduction to Computational Linguistics", code: "ENG3001", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  { id: 87, title: "Unmanned Aerial Vehicles", code: "MEA3015", books: 3, category: "Multidisciplinary Elective", image: cardEbooks },
  // Humanities, Social Sciences and Management Electives
  { id: 88, title: "Human Resource Management", code: "BMT1013", books: 3, category: "Humanities Elective", image: cardEbooks },
  { id: 89, title: "International Business", code: "BMT2017", books: 3, category: "Humanities Elective", image: cardEbooks },
  { id: 90, title: "Emotional Intelligence", code: "HUM1002", books: 3, category: "Humanities Elective", image: cardEbooks },
  { id: 91, title: "Behavioural Science", code: "HUM2001", books: 3, category: "Humanities Elective", image: cardEbooks },
  { id: 92, title: "Principles Of Management And Organizational Behaviour", code: "MGT1002", books: 3, category: "Humanities Elective", image: cardEbooks },
  { id: 93, title: "Technology Entrepreneurship", code: "MGT2003", books: 3, category: "Humanities Elective", image: cardEbooks },
  // Open Electives
  { id: 94, title: "Introduction To E-Commerce", code: "CEC2001", books: 3, category: "Open Elective", image: cardEbooks },
  { id: 95, title: "Introduction to Computational Chemistry", code: "CHY1005", books: 4, category: "Open Elective", image: cardEbooks },
  { id: 96, title: "Forensic Chemistry and Applications", code: "CHY1007", books: 4, category: "Open Elective", image: cardEbooks },
  { id: 97, title: "Generative AI", code: "CSA3020", books: 3, category: "Open Elective", image: cardEbooks },
  { id: 98, title: "Principles Of Digital Forensics", code: "CSD1001", books: 3, category: "Open Elective", image: cardEbooks },
  { id: 99, title: "Introduction to Calculus", code: "MAT1031", books: 4, category: "Open Elective", image: cardEbooks },
  { id: 100, title: "Engineering Mechanics", code: "MEE1002", books: 3, category: "Open Elective", image: cardEbooks },
  { id: 101, title: "Basic Workshop", code: "MEE1006", books: 2, category: "Open Elective", image: cardEbooks },
  { id: 102, title: "Industrial IoT Markets and Security", code: "ONL1022", books: 3, category: "Open Elective", image: cardEbooks },
  { id: 103, title: "The Bits and Bytes of Computer Networking", code: "ONL1028", books: 4, category: "Open Elective", image: cardEbooks },
  { id: 104, title: "IBM AI Engineering Professional Certificate", code: "ONL1032", books: 4, category: "Open Elective", image: cardEbooks },
  { id: 105, title: "Introduction to Computational Physics", code: "PHY1003", books: 4, category: "Open Elective", image: cardEbooks },
];

const faculties = [
  {
    id: 1,
    name: "Jyoti Chauhan",
    department: "Computer Science",
    subjects: [
      {
        id: 101,
        title: "AWS Solution Architect",
        code: "CSE3002",
        books: 2,
        image: cardEbooks,
        modules: [
          { title: "Jyoti Mam - AWS Unit 1", path: "/notes/jyoti_aws/unit1.pdf" },
          { title: "Jyoti Mam - AWS Unit 2", path: "/notes/jyoti_aws/unit2.pdf" },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Jastin Samuel R",
    department: "Bioscience",
    subjects: [
      {
        id: 201,
        title: "Biosafety, Bioethics & Biosecurity",
        code: "BIO-BBB",
        books: 9,
        image: cardEbooks,
        category: "Bioscience",
        modules: [
          { title: "Biosafety Bioethics Biosecurity - Module 1", path: "https://drive.google.com/file/d/1TSB6gzvBVVeGZcVlkS_MNlIQicqcEA4U/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 2", path: "https://drive.google.com/file/d/15ZwpIcFVMqyAy66RvCLh8hRlXXy1kvbo/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 3 Part 1", path: "https://drive.google.com/file/d/13htMvZbkszLfPcsBT4jHhnVbW8Hfe5Sh/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 3 Part 2", path: "https://drive.google.com/file/d/1MYr-0LXclAhmSEUD_RxMYBnfdSwPlzPF/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 4", path: "https://drive.google.com/file/d/1HyNiN6_M6lDZ3nTAEwOgKAayXgCfTeUl/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 5 Part 1", path: "https://drive.google.com/file/d/1NCdeDd43F1KyH5iEawPVYFklnqMZABpA/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 5 Part 2", path: "https://drive.google.com/file/d/1O2pK9zuTfL1WdEo_QzgSarBvvMmwK_ET/view?usp=sharing" },
          { title: "Biosafety Bioethics Biosecurity - Module 6", path: "https://drive.google.com/file/d/1IQf5cWUXsK-D59QYf5xznvl0bCCZw2l5/view?usp=sharing" },
          { title: "Biosecurity - Previous Year Questions", path: "https://drive.google.com/file/d/1jaUKL-67QhmOia-oTzFOmBEB0PUD84Mo/view?usp=sharing" },
        ]
      },
      {
        id: 202,
        title: "Global Health Challenges",
        code: "BIO-GHC",
        books: 6,
        image: cardEbooks,
        category: "Bioscience",
        modules: [
          { title: "Global Health Challenges - Module 1", path: "https://drive.google.com/file/d/1v1MgQb9oBwWwg8_zKEWB6LjvPuxfCtEr/view?usp=sharing" },
          { title: "Global Health Challenges - Module 2", path: "https://drive.google.com/file/d/1uAmm9tJrDu4S_qOy5hjuPginaaKQWQ6M/view?usp=sharing" },
          { title: "Global Health Challenges - Module 3", path: "https://drive.google.com/file/d/1XIPv1zDXczHh0SEAhneMgsPk3q3DlKi3/view?usp=sharing" },
          { title: "Global Health Challenges - Module 4", path: "https://drive.google.com/file/d/1bocbBTRU_2R0rM0v-GARSHQh1npS6ySH/view?usp=sharing" },
          { title: "Global Health Challenges - Module 5", path: "https://drive.google.com/file/d/1A0MtDmaCSNT6c_d3vpEwr4yDKXpNry37/view?usp=sharing" },
          { title: "Global Health - Previous Year Questions", path: "https://drive.google.com/file/d/1W68Srl-BlJweT9TaLtJhs5N1DSZn2LN4/view?usp=sharing" },
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Dr. Abhinav Kumar",
    department: "SASL",
    subjects: [
      {
        id: 301,
        title: "Computational Physics",
        code: "PHY-CP",
        books: 6,
        image: cardEbooks,
        category: "Natural Science Core",
        modules: [
          { title: "Computational Physics - Module 1", path: "https://drive.google.com/file/d/1-b73zMXNV5nhN1uZkWFHlAZDaqlaAnmx/view?usp=sharing" },
          { title: "Computational Physics - Module 2", path: "https://drive.google.com/file/d/1JpPtPjqBdd5q3kZPr9UWjj-9_uRH2UBn/view?usp=sharing" },
          { title: "Computational Physics - Module 3 Part 1", path: "https://drive.google.com/file/d/11o6WiwUQIngAP4gUIm0jG8AmqOTf7Qqg/view?usp=sharing" },
          { title: "Computational Physics - Module 3 Part 2", path: "https://drive.google.com/file/d/1ZKx6nOMCWlrw_IhUftcIdbtqKpZkg9FI/view?usp=sharing" },
          { title: "Computational Physics - Module 4", path: "https://drive.google.com/file/d/1R1Uk12e7tu57nTSHR9i3kFAq__kOMtIA/view?usp=sharing" },
          { title: "Computational Physics - Module 5", path: "https://drive.google.com/file/d/1Bq3jVWsum5whDeUn63DhDyE_yFzQzCwo/view?usp=sharing" },
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Dr. Chandan Kumar Behera",
    department: "BCE",
    subjects: [
      {
        id: 401,
        title: "Theory of Computation",
        code: "TOC",
        books: 5,
        image: cardEbooks,
        category: "Program Core",
        modules: [
          { title: "TOC Notes", path: "https://drive.google.com/file/d/1-2vI6AU6Qssq_ZxCfbNC3AUctpd5ofyA/view" },
        ],
        questions: [
          { title: "TOC Assignment 1", path: "https://drive.google.com/file/d/1agP0rgT52dyD1DHYHtYL405jG0QwytWd/view" },
          { title: "TOC Assignment 2", path: "https://drive.google.com/file/d/1V5mPrzGx99tlzBaePtVHfrdUG7UoIdVU/view" },
          { title: "TOC Assignment 3", path: "https://drive.google.com/file/d/1QNaZy5iEF_Xv8N3-HKVP-RP2x2TAZhmW/view" },
          { title: "TOC Previous Year Questions", path: "https://drive.google.com/file/d/1XRg3Ig6ItTtfen7RgevslhZw_QzwoOvw/view" },
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Dr. Palas Mandal",
    department: "SASL",
    subjects: [
      {
        id: 501,
        title: "Differential & Difference Equations",
        code: "MAT-DDE",
        books: 2,
        image: cardEbooks,
        category: "Natural Science Core",
        modules: [
          { title: "Differential and Difference Equations Notes", path: "https://drive.google.com/file/d/1IekD6de-w1fnvi5Aud5wnH2bogJ7tZw8/view" },
        ],
        questions: [
          { title: "Difference & Differential Equations PYQ's", path: "https://drive.google.com/file/d/1c_eLYr_u2cDHICrrgiCL8V1u1ynvp_80/view" },
        ]
      },
      {
        id: 502,
        title: "Probability, Statistics & Reliability",
        code: "MAT-PSR",
        books: 4,
        image: cardEbooks,
        category: "Natural Science Core",
        modules: [
          { title: "Probability, Statistics & Reliability - Module 1", path: "https://drive.google.com/file/d/1JqRVoQ0lUJTuBokdyVC_7_j5h7zfLHP7/view" },
          { title: "Probability, Statistics & Reliability - Module 2", path: "https://drive.google.com/file/d/1SUAcQ9BjntnCpOHB3RAGlAoL7q86-kuZ/view" },
          { title: "Probability, Statistics & Reliability - Module 3", path: "https://drive.google.com/file/d/1qXaql3Rg0jMOrb-m9TFG5rnP8TIe94QW/view" },
        ],
        questions: [
          { title: "Probability PYQ's", path: "https://drive.google.com/file/d/1FhZtufazGT5nOKJxEF-oka50NG25UELy/view" },
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Dr. Shagun Sharma",
    department: "SCSE",
    subjects: [
      {
        id: 601,
        title: "Foundations of Data Science",
        code: "CDS3005",
        books: 6,
        image: cardEbooks,
        category: "Multidisciplinary Elective",
        modules: [
          { title: "Foundations of Data Science - Module 1", path: "/notes/fds/MODULE 1.pdf" },
          { title: "Foundations of Data Science - Module 2", path: "/notes/fds/Module 2 (1).pdf" },
          { title: "Foundations of Data Science - Module 3", path: "/notes/fds/Module 3.pptx.pdf" },
          { title: "Foundations of Data Science - Module 4", path: "/notes/fds/Module 4.pdf" },
          { title: "Foundations of Data Science - Module 5", path: "/notes/fds/Module 5.pdf" },
        ],
        questions: [
          { title: "Numerical Questions For First Half", path: "/notes/fds/Question Bank.pdf" },
        ]
      }
    ]
  },
];

const gridSubjects = [
  { id: 1, title: "Data Structures", code: "CSE2003", category: "CS" },
  { id: 2, title: "Calculus", code: "MAT1011", category: "Math" },
  { id: 3, title: "Thermodynamics", code: "MEE2001", category: "Engineering" },
  { id: 4, title: "Quantum Physics", code: "PHY1001", category: "Science" },
  { id: 5, title: "Digital Logic", code: "CSE2001", category: "CS" },
  { id: 6, title: "Linear Algebra", code: "MAT2002", category: "Math" },
  { id: 7, title: "Fluid Mechanics", code: "MEE2002", category: "Engineering" },
  { id: 8, title: "Psychology", code: "HUM1001", category: "Humanities" },
];

const EBooks = () => {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Notes");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const [recentViews, setRecentViews] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("uniease_recent_views");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("uniease_recent_views", JSON.stringify(recentViews));
  }, [recentViews]);

  const handleSelectBook = (book: any) => {
    setSelectedBook(book);
    if (!book) return;
    setRecentViews(prev => {
      const filtered = prev.filter(b => b.id !== book.id || b.type !== 'book');
      const newView = {
        id: book.id,
        title: book.title,
        author: book.code || "Course Material",
        subject: book.category || "Subject",
        rating: 4.8,
        type: 'book',
        original: book
      };
      return [newView, ...filtered].slice(0, 5);
    });
  };

  const handleSelectFaculty = (faculty: any) => {
    setSelectedFaculty(faculty);
    if (!faculty) return;
    setRecentViews(prev => {
      const filtered = prev.filter(b => b.id !== faculty.id || b.type !== 'faculty');
      const newView = {
        id: faculty.id,
        title: faculty.name,
        author: "Faculty Profile",
        subject: faculty.department,
        rating: 4.9,
        type: 'faculty',
        original: faculty
      };
      return [newView, ...filtered].slice(0, 5);
    });
  };
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [viewAllSubjects, setViewAllSubjects] = useState(false);
  const [viewAllFaculties, setViewAllFaculties] = useState(false);
  const [cgpaCredits, setCgpaCredits] = useState<{ grade: string; credits: string }[]>([
    { grade: "S", credits: "4" },
    { grade: "A", credits: "3" },
    { grade: "B", credits: "3" },
  ]);
  const [showCalculator, setShowCalculator] = useState(false);

  // Reset tab when modal opens
  useEffect(() => {
    if (selectedBook) setActiveTab("Notes");
  }, [selectedBook]);

  const toggleBookmark = () => {
    if (!selectedBook) return;
    const isBookmarked = bookmarks.some(b => b.id === selectedBook.id);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b.id !== selectedBook.id));
    } else {
      setBookmarks([...bookmarks, { ...selectedBook, facultyName: selectedFaculty?.name }]);
    }
  };

  const isCurrentlyBookmarked = selectedBook ? bookmarks.some(b => b.id === selectedBook.id) : false;

  const filteredSubjects = subjects.filter(subject => 
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (subject.code && subject.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFaculties = faculties.filter(faculty => 
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.subjects.some((s: any) => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const filteredRecentBooks = recentViews.filter(view => 
    view.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    view.author?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    view.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGridSubjects = gridSubjects.filter(subject => 
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gradePoints: Record<string, number> = {
    S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0, N: 0
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    cgpaCredits.forEach((item) => {
      const credits = parseInt(item.credits) || 0;
      const points = gradePoints[item.grade.toUpperCase()] || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  return (
    <>
      <MainLayout>
        {viewAllSubjects ? (
          <div className="p-4 md:p-6 animate-fade-in">
            <Button
              variant="outline"
              onClick={() => setViewAllSubjects(false)}
              className="mb-6 flex items-center gap-2 hover:bg-muted"
            >
              <X className="w-4 h-4" />
              Back to Hub
            </Button>
            
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-2xl md:text-3xl">All University Subjects</h1>
                <p className="text-muted-foreground mt-1">Found {filteredSubjects.length} subjects</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => handleSelectBook(subject)}
                />
              ))}
            </div>
            {filteredSubjects.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p>No subjects found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : viewAllFaculties ? (
          <div className="p-4 md:p-6 animate-fade-in">
            <Button
              variant="outline"
              onClick={() => setViewAllFaculties(false)}
              className="mb-6 flex items-center gap-2 hover:bg-muted"
            >
              <X className="w-4 h-4" />
              Back to Hub
            </Button>

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-2xl md:text-3xl">All Faculty</h1>
                <p className="text-muted-foreground mt-1">Found {filteredFaculties.length} faculty members with materials</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search faculty or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredFaculties.map((faculty) => (
                <div
                  key={faculty.id}
                  onClick={() => { setViewAllFaculties(false); handleSelectFaculty(faculty); }}
                  className="glass-card p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-[0_8px_30px_hsl(var(--primary)/0.3)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 border-t-2 border-t-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3">
                    <span className="font-display font-bold text-xl text-primary">
                      {faculty.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">{faculty.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{faculty.department}</p>
                  <span className="mt-2 text-xs text-primary font-medium">{faculty.subjects.length} Subject{faculty.subjects.length !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
            {filteredFaculties.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p>No faculty found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <>
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border">
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-4">
            E-Books & <span className="gradient-text">Academic Hub</span>
          </h1>

          {/* Search & Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search books, notes, questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showCalculator ? "default" : "outline"}
                onClick={() => { setShowCalculator(!showCalculator); setShowBookmarks(false); }}
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                CGPA Calculator
              </Button>
              <Button 
                variant={showBookmarks ? "default" : "outline"} 
                onClick={() => { setShowBookmarks(!showBookmarks); setShowCalculator(false); }}
                className="flex items-center gap-2"
              >
                <Bookmark className={`w-4 h-4 ${bookmarks.length > 0 ? 'fill-current' : ''}`} />
                Bookmarks
                {bookmarks.length > 0 && (
                  <span className="ml-1 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                    {bookmarks.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* CGPA Calculator */}
        {showCalculator && (
          <div className="p-4 md:p-6 border-b border-border animate-fade-in">
            <div className="glass-card p-4 md:p-6 max-w-xl">
              <h3 className="font-display font-semibold text-lg mb-4">CGPA Calculator</h3>
              <div className="space-y-3">
                {cgpaCredits.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <select
                      value={item.grade}
                      onChange={(e) => {
                        const updated = [...cgpaCredits];
                        updated[index].grade = e.target.value;
                        setCgpaCredits(updated);
                      }}
                      className="flex h-10 w-1/2 rounded-md border border-input bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled hidden>Select Grade</option>
                      {['S', 'A', 'B', 'C', 'D', 'E', 'F', 'N'].map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="Credits"
                      type="number"
                      value={item.credits}
                      onChange={(e) => {
                        const updated = [...cgpaCredits];
                        updated[index].credits = e.target.value;
                        setCgpaCredits(updated);
                      }}
                      className="w-1/2 bg-muted"
                    />
                    <button
                      onClick={() => setCgpaCredits(cgpaCredits.filter((_, i) => i !== index))}
                      disabled={cgpaCredits.length === 1}
                      className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                      title="Remove row"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => setCgpaCredits([...cgpaCredits, { grade: "", credits: "" }])}
                  className="text-primary"
                >
                  + Add Subject
                </Button>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Your CGPA</p>
                <p className="font-display font-bold text-3xl text-primary">{calculateCGPA()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bookmarks Section */}
        {showBookmarks && (
          <div className="p-4 md:p-6 border-b border-border animate-fade-in bg-muted/30">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-primary" /> 
              Your Saved Materials
            </h3>
            {bookmarks.length === 0 ? (
              <p className="text-muted-foreground text-sm">You haven't bookmarked any materials yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarks.map((bookmark) => (
                  <div 
                    key={bookmark.id} 
                    className="glass-card p-4 flex gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => {
                      handleSelectBook(bookmark);
                    }}
                  >
                    <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={bookmark.image} alt={bookmark.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold line-clamp-1">{bookmark.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {bookmark.code} 
                        {bookmark.facultyName && <span className="text-primary ml-1 font-medium">• {bookmark.facultyName}</span>}
                      </p>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs mt-2 text-primary" onClick={(e) => {
                        e.stopPropagation();
                        setBookmarks(bookmarks.filter(b => b.id !== bookmark.id));
                      }}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subject-wise Books */}
        {filteredSubjects.length > 0 && (
          <ContentRail 
            title="Browse by Subject (Recommended)" 
            subtitle="Explore general course materials"
            onViewAll={() => setViewAllSubjects(true)}
          >
            {filteredSubjects.map((subject) => (
              <div key={subject.id} className="w-64 shrink-0 -m-6 hover:z-20 p-6">
                <SubjectCard
                  subject={subject}
                  onClick={() => handleSelectBook(subject)}
                />
              </div>
            ))}
          </ContentRail>
        )}

        {/* Faculty-wise Books */}
        {filteredFaculties.length > 0 && (
          <ContentRail title="Browse by Faculty" subtitle="Access faculty-specific notes & materials" onViewAll={() => setViewAllFaculties(true)}>
            {filteredFaculties.map((faculty) => (
              <div 
                key={faculty.id} 
                onClick={() => handleSelectFaculty(faculty)}
                className="glass-card w-48 md:w-56 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-[0_8px_30px_hsl(var(--primary)/0.3)] hover:-translate-y-2 transition-all duration-300 group shrink-0 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 border-t-2 border-t-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 transition-transform relative z-20">
                  <span className="font-display font-bold text-2xl text-primary">
                    {faculty.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-sm line-clamp-1 relative z-20 group-hover:text-primary transition-colors">{faculty.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 relative z-20">{faculty.department}</p>
                <p className="text-xs text-primary mt-2 relative z-20">{faculty.subjects.length} Subjects</p>
              </div>
            ))}
          </ContentRail>
        )}

        {/* Recent Books */}
        {filteredRecentBooks.length > 0 && (
          <section className="py-6 px-4 md:px-6">
            <h2 className="font-display font-bold text-xl mb-4">Recently Viewed</h2>
            <div className="grid gap-4">
              {filteredRecentBooks.map((view, idx) => (
                <div
                  key={`${view.type}-${view.id}-${idx}`}
                  onClick={() => {
                    if (view.type === 'faculty') handleSelectFaculty(view.original);
                    else handleSelectBook(view.original);
                  }}
                  className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.2)] transition-all duration-300 group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center relative z-10">
                    <BookOpen className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 relative z-10">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{view.title}</h3>
                    <p className="text-sm text-muted-foreground">{view.author} • {view.subject}</p>
                  </div>
                  <div className="flex items-center gap-1 relative z-10">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{view.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        </>
        )}
      </MainLayout>

      {/* Book Detail Panel */}
      {
        selectedBook && (
          <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-display font-bold text-2xl">{selectedBook.title}</h2>
                    <p className="text-muted-foreground">{selectedBook.code || selectedBook.author}</p>
                  </div>
                  <button
                    onClick={() => handleSelectBook(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Action Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {[
                    { id: "Notes", icon: FileText, label: "Notes" },
                    { id: "Questions", icon: BookOpen, label: "Questions" },
                    { id: "AI Chat", icon: MessageCircle, label: "AI Chat" },
                  ].map((action) => (
                    <Button
                      key={action.id}
                      variant={activeTab === action.id ? "default" : "outline"}
                      onClick={() => setActiveTab(action.id)}
                      className="flex items-center gap-2 shrink-0"
                    >
                      <action.icon className="w-4 h-4" />
                      {action.label}
                    </Button>
                  ))}
                  
                  {/* Bookmark Button Separated */}
                  <Button
                    variant={isCurrentlyBookmarked ? "default" : "outline"}
                    onClick={toggleBookmark}
                    className="flex items-center gap-2 shrink-0 ml-auto border-primary/20 hover:border-primary"
                  >
                    <Bookmark className={`w-4 h-4 ${isCurrentlyBookmarked ? 'fill-current' : ''}`} />
                    {isCurrentlyBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>

                {/* Content Preview */}
                <div className="space-y-4">
                  {activeTab === "Notes" && (
                    <div className="glass-card p-4 animate-fade-in">
                      <h3 className="font-semibold mb-2">Available Notes</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {selectedBook.modules ? (
                          selectedBook.modules.map((module: any, idx: number) => (
                            <li key={idx}>
                              <a
                                href={module.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted/50"
                              >
                                <FileText className="w-4 h-4" />
                                {module.title}
                              </a>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-center gap-2">
                              <FileText className="w-4 h-4" /> Unit 1 - Introduction
                            </li>
                            <li className="flex items-center gap-2">
                              <FileText className="w-4 h-4" /> Unit 2 - Core Concepts
                            </li>
                            <li className="flex items-center gap-2">
                              <FileText className="w-4 h-4" /> Unit 3 - Advanced Topics
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {activeTab === "Questions" && (
                    <div className="glass-card p-4 animate-fade-in">
                      <h3 className="font-semibold mb-3">Question Bank</h3>
                      {selectedBook.questions && selectedBook.questions.length > 0 ? (
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {selectedBook.questions.map((q: any, idx: number) => (
                            <li key={idx}>
                              <a
                                href={q.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted/50"
                              >
                                <BookOpen className="w-4 h-4" />
                                {q.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center py-6">
                          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-40" />
                          <p className="text-sm text-muted-foreground">No question bank uploaded for this subject yet.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "AI Chat" && (
                     <div className="glass-card p-4 animate-fade-in text-center py-8">
                       <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                       <h3 className="font-semibold mb-1">AI Assitant Coming Soon</h3>
                       <p className="text-sm text-muted-foreground">Chat with the materials to clear your doubts instantly.</p>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Faculty Modal */}
      {
        selectedFaculty && !selectedBook && (
          <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-3xl max-h-[80vh] overflow-y-auto animate-scale-in flex flex-col">
              <div className="p-6 md:p-8 bg-gradient-to-r from-primary/10 to-transparent border-b border-white/5 relative">
                <button
                  onClick={() => handleSelectFaculty(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/20 shadow-[0_0_30px_hsl(18_100%_50%/0.2)]">
                    <span className="font-display font-bold text-3xl text-primary">
                      {selectedFaculty.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl">{selectedFaculty.name}</h2>
                    <p className="text-muted-foreground mt-1">{selectedFaculty.department} Faculty</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1">
                <h3 className="font-semibold text-lg mb-4">Subjects Taught ({selectedFaculty.subjects.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedFaculty.subjects.map((subject: any) => (
                    <SubjectCard
                      key={subject.id}
                      subject={{ ...subject, category: subject.category || "CS" }}
                      onClick={() => handleSelectBook(subject)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default EBooks;
