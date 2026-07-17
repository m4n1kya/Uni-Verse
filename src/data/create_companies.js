const fs = require('fs');
const path = require('path');

const companiesList = {
  "IT & Software": [
    "Microsoft", "Amazon", "IBM", "Intel", "Cisco", "Infosys", "Wipro", "TCS", "Deloitte", "Cognizant", "Accenture", "Capgemini", "HPE", "eBay", "Flipkart", "Qualcomm", "Oracle", "Dell"
  ],
  "Finance & Consulting": [
    "Goldman Sachs", "EY", "KPMG", "JP Morgan Chase & Co", "IDFC First Bank", "Barclays", "D.E. Shaw India", "PwC"
  ],
  "Engineering & Manufacturing": [
    "Bosch", "Philips", "Hero Motors", "Tata Motors", "Maruti Suzuki", "Caterpillar", "L&T Technology Services", "Reliance Industries Limited", "NTPC", "BHEL", "ONGC"
  ],
  "E-commerce & Technology Platforms": [
    "Zomato", "Swiggy", "Pepperfry"
  ]
};

function getLogo(name) {
  if (name === "Amazon") return "A";
  if (name.includes("Morgan")) return "JPM";
  if (name.includes("Shaw")) return "DES";
  if (name.includes("Tata")) return "TM";
  if (name.includes("First")) return "IDFC";
  return name.substring(0, 2).toUpperCase();
}

function getColor(category, index) {
  const colors = [
    "from-blue-500 to-indigo-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
    "from-violet-500 to-purple-500",
    "from-lime-500 to-emerald-500",
    "from-red-500 to-orange-500"
  ];
  return colors[index % colors.length];
}

function getStatsAndCutoff(name, category) {
  const superDream = ["Microsoft", "Amazon", "Intel", "Goldman Sachs", "JP Morgan Chase & Co", "D.E. Shaw India", "Zomato", "Swiggy", "Barclays"];
  const massRecruiters = ["Infosys", "Wipro", "TCS", "Cognizant", "Accenture", "Capgemini"];
  const dream = ["IBM", "Cisco", "Deloitte", "HPE", "eBay", "Flipkart", "Qualcomm", "Oracle", "Dell", "EY", "KPMG", "PwC", "Bosch", "Philips", "Tata Motors", "L&T Technology Services", "Reliance Industries Limited"];

  if (superDream.includes(name)) {
    return { gpaCutoff: 8.0, avgLPA: 18 + Math.floor(Math.random()*8), maxLPA: 40 + Math.floor(Math.random()*20) };
  } else if (massRecruiters.includes(name)) {
    return { gpaCutoff: 6.0, avgLPA: 4 + Math.random()*2, maxLPA: 8 + Math.random()*2 };
  } else if (dream.includes(name)) {
    return { gpaCutoff: 7.0, avgLPA: 8 + Math.floor(Math.random()*5), maxLPA: 15 + Math.floor(Math.random()*10) };
  } else {
    // defaults for undefined others (e.g. Hero Motors, NTPC)
    return { gpaCutoff: 6.5, avgLPA: 6 + Math.floor(Math.random()*4), maxLPA: 12 + Math.floor(Math.random()*5) };
  }
}

function getSkillsAndDSA(category) {
  if (category === "IT & Software" || category === "E-commerce & Technology Platforms") {
    return {
      skills: ["DSA", "System Design", "Problem Solving", "Web Dev"],
      dsaTopics: ["Trees", "Graphs", "Dynamic Programming", "Arrays"]
    };
  } else if (category === "Finance & Consulting") {
    return {
      skills: ["Analytical Skills", "Excel/SQL", "Aptitude", "Financial Modeling Basics"],
      dsaTopics: ["Math", "Arrays", "Dynamic Programming", "Probability"]
    };
  } else {
    // Core Engineering
    return {
      skills: ["Core Engineering", "AutoCAD/Simulation", "Aptitude", "Process Flow"],
      dsaTopics: ["Basic Math", "Arrays", "Strings", "Logic"]
    };
  }
}

let companiesArray = [];
let idCounter = 1;

for (const [category, names] of Object.entries(companiesList)) {
  names.forEach((name, index) => {
    let stats = getStatsAndCutoff(name, category);
    let skillsObj = getSkillsAndDSA(category);
    let company = {
      id: idCounter++,
      name: name,
      category: category,
      logo: getLogo(name),
      gpaCutoff: Number(stats.gpaCutoff.toFixed(1)),
      avgLPA: Number(stats.avgLPA.toFixed(1)),
      highestLPA: Number(stats.maxLPA.toFixed(1)),
      skills: skillsObj.skills,
      dsaTopics: skillsObj.dsaTopics,
      color: getColor(category, index),
      prepMaterial: [
        { type: "leetcode", label: \`\${name} Interview Questions\`, url: \`https://leetcode.com/company/\${name.toLowerCase().replace(/\\s+/g, '-')}/\`, desc: \`Top questions tagged \${name}\` },
        { type: "youtube", label: \`\${name} Placement Prep\`, url: \`https://www.youtube.com/results?search_query=\${name.replace(/\\s+/g, '+')}+interview+preparation\`, desc: \`YouTube - \${name} Preparation Guide\` },
        { type: "article", label: \`\${name} Interview Experience\`, url: \`https://www.geeksforgeeks.org/tag/\${name.toLowerCase().replace(/\\s+/g, '-')}/\`, desc: \`GeeksForGeeks \${name} experiences\` },
        { type: "guide", label: "Fundamental Concepts", url: "https://www.educative.io/courses/grokking-the-system-design-interview", desc: "System Design & General CS" }
      ]
    };
    companiesArray.push(company);
  });
}

const fileContent = \`export interface PrepMaterial {
  type: "leetcode" | "youtube" | "article" | "guide";
  label: string;
  url: string;
  desc: string;
}

export interface Company {
  id: number;
  name: string;
  category: string;
  logo: string;
  gpaCutoff: number;
  avgLPA: number;
  highestLPA: number;
  skills: string[];
  dsaTopics: string[];
  color: string;
  prepMaterial: PrepMaterial[];
}

export const companiesData: Company[] = \${JSON.stringify(companiesArray, null, 2)};
\`;

fs.writeFileSync(path.join(__dirname, 'companies.ts'), fileContent, 'utf8');
console.log("companies.ts created successfully.");
