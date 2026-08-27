export interface PrepMaterial {
  type: "leetcode" | "ambitionbox" | "article" | "youtube" | "guide";
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

export const companiesData: Company[] = [
  {
    "id": 1,
    "name": "Microsoft",
    "category": "IT & Software",
    "logo": "MI",
    "gpaCutoff": 8.0,
    "avgLPA": 25,
    "highestLPA": 59,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Microsoft Problem Set",
        "url": "https://leetcode.com/problemset/?search=microsoft",
        "desc": "Search LeetCode for Microsoft"
      },
      {
        "type": "ambitionbox",
        "label": "Microsoft Interview Data",
        "url": "https://www.ambitionbox.com/interviews/microsoft-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Microsoft Interview Archive",
        "url": "https://www.geeksforgeeks.org/microsoft-interview-experience/",
        "desc": "GeeksForGeeks Microsoft prep"
      },
      {
        "type": "youtube",
        "label": "Microsoft Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Microsoft+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Microsoft"
      }
    ]
  },
  {
    "id": 2,
    "name": "Amazon",
    "category": "IT & Software",
    "logo": "A",
    "gpaCutoff": 8.0,
    "avgLPA": 19,
    "highestLPA": 55,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Amazon Problem Set",
        "url": "https://leetcode.com/problemset/?search=amazon",
        "desc": "Search LeetCode for Amazon"
      },
      {
        "type": "ambitionbox",
        "label": "Amazon Interview Data",
        "url": "https://www.ambitionbox.com/interviews/amazon-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Amazon Interview Archive",
        "url": "https://www.geeksforgeeks.org/amazon-interview-experience/",
        "desc": "GeeksForGeeks Amazon prep"
      },
      {
        "type": "youtube",
        "label": "Amazon Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Amazon+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Amazon"
      }
    ]
  },
  {
    "id": 3,
    "name": "IBM",
    "category": "IT & Software",
    "logo": "IB",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 24,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "IBM Problem Set",
        "url": "https://leetcode.com/problemset/?search=ibm",
        "desc": "Search LeetCode for IBM"
      },
      {
        "type": "ambitionbox",
        "label": "IBM Interview Data",
        "url": "https://www.ambitionbox.com/interviews/ibm-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "IBM Interview Archive",
        "url": "https://www.geeksforgeeks.org/ibm-interview-experience/",
        "desc": "GeeksForGeeks IBM prep"
      },
      {
        "type": "youtube",
        "label": "IBM Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=IBM+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for IBM"
      }
    ]
  },
  {
    "id": 4,
    "name": "Intel",
    "category": "IT & Software",
    "logo": "IN",
    "gpaCutoff": 8.0,
    "avgLPA": 22,
    "highestLPA": 51,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Intel Problem Set",
        "url": "https://leetcode.com/problemset/?search=intel",
        "desc": "Search LeetCode for Intel"
      },
      {
        "type": "ambitionbox",
        "label": "Intel Interview Data",
        "url": "https://www.ambitionbox.com/interviews/intel-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Intel Interview Archive",
        "url": "https://www.geeksforgeeks.org/intel-interview-experience/",
        "desc": "GeeksForGeeks Intel prep"
      },
      {
        "type": "youtube",
        "label": "Intel Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Intel+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Intel"
      }
    ]
  },
  {
    "id": 5,
    "name": "Cisco",
    "category": "IT & Software",
    "logo": "CI",
    "gpaCutoff": 7.0,
    "avgLPA": 12,
    "highestLPA": 19,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Cisco Problem Set",
        "url": "https://leetcode.com/problemset/?search=cisco",
        "desc": "Search LeetCode for Cisco"
      },
      {
        "type": "ambitionbox",
        "label": "Cisco Interview Data",
        "url": "https://www.ambitionbox.com/interviews/cisco-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Cisco Interview Archive",
        "url": "https://www.geeksforgeeks.org/cisco-interview-experience/",
        "desc": "GeeksForGeeks Cisco prep"
      },
      {
        "type": "youtube",
        "label": "Cisco Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Cisco+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Cisco"
      }
    ]
  },
  {
    "id": 6,
    "name": "Infosys",
    "category": "IT & Software",
    "logo": "IN",
    "gpaCutoff": 6.0,
    "avgLPA": 5,
    "highestLPA": 8,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Infosys Problem Set",
        "url": "https://leetcode.com/problemset/?search=infosys",
        "desc": "Search LeetCode for Infosys"
      },
      {
        "type": "ambitionbox",
        "label": "Infosys Interview Data",
        "url": "https://www.ambitionbox.com/interviews/infosys-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Infosys Interview Archive",
        "url": "https://www.geeksforgeeks.org/infosys-interview-experience/",
        "desc": "GeeksForGeeks Infosys prep"
      },
      {
        "type": "youtube",
        "label": "Infosys Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Infosys+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Infosys"
      }
    ]
  },
  {
    "id": 7,
    "name": "Wipro",
    "category": "IT & Software",
    "logo": "WI",
    "gpaCutoff": 6.0,
    "avgLPA": 6,
    "highestLPA": 9,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Wipro Problem Set",
        "url": "https://leetcode.com/problemset/?search=wipro",
        "desc": "Search LeetCode for Wipro"
      },
      {
        "type": "ambitionbox",
        "label": "Wipro Interview Data",
        "url": "https://www.ambitionbox.com/interviews/wipro-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Wipro Interview Archive",
        "url": "https://www.geeksforgeeks.org/wipro-interview-experience/",
        "desc": "GeeksForGeeks Wipro prep"
      },
      {
        "type": "youtube",
        "label": "Wipro Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Wipro+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Wipro"
      }
    ]
  },
  {
    "id": 8,
    "name": "TCS",
    "category": "IT & Software",
    "logo": "TC",
    "gpaCutoff": 6.0,
    "avgLPA": 4,
    "highestLPA": 10,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "TCS Problem Set",
        "url": "https://leetcode.com/problemset/?search=tcs",
        "desc": "Search LeetCode for TCS"
      },
      {
        "type": "ambitionbox",
        "label": "TCS Interview Data",
        "url": "https://www.ambitionbox.com/interviews/tcs-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "TCS Interview Archive",
        "url": "https://www.geeksforgeeks.org/tcs-interview-experience/",
        "desc": "GeeksForGeeks TCS prep"
      },
      {
        "type": "youtube",
        "label": "TCS Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=TCS+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for TCS"
      }
    ]
  },
  {
    "id": 9,
    "name": "Deloitte",
    "category": "IT & Software",
    "logo": "DE",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 20,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Deloitte Problem Set",
        "url": "https://leetcode.com/problemset/?search=deloitte",
        "desc": "Search LeetCode for Deloitte"
      },
      {
        "type": "ambitionbox",
        "label": "Deloitte Interview Data",
        "url": "https://www.ambitionbox.com/interviews/deloitte-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Deloitte Interview Archive",
        "url": "https://www.geeksforgeeks.org/deloitte-interview-experience/",
        "desc": "GeeksForGeeks Deloitte prep"
      },
      {
        "type": "youtube",
        "label": "Deloitte Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Deloitte+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Deloitte"
      }
    ]
  },
  {
    "id": 10,
    "name": "Cognizant",
    "category": "IT & Software",
    "logo": "CO",
    "gpaCutoff": 6.0,
    "avgLPA": 5,
    "highestLPA": 10,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Cognizant Problem Set",
        "url": "https://leetcode.com/problemset/?search=cognizant",
        "desc": "Search LeetCode for Cognizant"
      },
      {
        "type": "ambitionbox",
        "label": "Cognizant Interview Data",
        "url": "https://www.ambitionbox.com/interviews/cognizant-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Cognizant Interview Archive",
        "url": "https://www.geeksforgeeks.org/cognizant-interview-experience/",
        "desc": "GeeksForGeeks Cognizant prep"
      },
      {
        "type": "youtube",
        "label": "Cognizant Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Cognizant+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Cognizant"
      }
    ]
  },
  {
    "id": 11,
    "name": "Accenture",
    "category": "IT & Software",
    "logo": "AC",
    "gpaCutoff": 6.0,
    "avgLPA": 5,
    "highestLPA": 10,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Accenture Problem Set",
        "url": "https://leetcode.com/problemset/?search=accenture",
        "desc": "Search LeetCode for Accenture"
      },
      {
        "type": "ambitionbox",
        "label": "Accenture Interview Data",
        "url": "https://www.ambitionbox.com/interviews/accenture-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Accenture Interview Archive",
        "url": "https://www.geeksforgeeks.org/accenture-interview-experience/",
        "desc": "GeeksForGeeks Accenture prep"
      },
      {
        "type": "youtube",
        "label": "Accenture Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Accenture+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Accenture"
      }
    ]
  },
  {
    "id": 12,
    "name": "Capgemini",
    "category": "IT & Software",
    "logo": "CA",
    "gpaCutoff": 6.0,
    "avgLPA": 5,
    "highestLPA": 10,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Capgemini Problem Set",
        "url": "https://leetcode.com/problemset/?search=capgemini",
        "desc": "Search LeetCode for Capgemini"
      },
      {
        "type": "ambitionbox",
        "label": "Capgemini Interview Data",
        "url": "https://www.ambitionbox.com/interviews/capgemini-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Capgemini Interview Archive",
        "url": "https://www.geeksforgeeks.org/capgemini-interview-experience/",
        "desc": "GeeksForGeeks Capgemini prep"
      },
      {
        "type": "youtube",
        "label": "Capgemini Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Capgemini+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Capgemini"
      }
    ]
  },
  {
    "id": 13,
    "name": "HPE",
    "category": "IT & Software",
    "logo": "HP",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 24,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "HPE Problem Set",
        "url": "https://leetcode.com/problemset/?search=hpe",
        "desc": "Search LeetCode for HPE"
      },
      {
        "type": "ambitionbox",
        "label": "HPE Interview Data",
        "url": "https://www.ambitionbox.com/interviews/hpe-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "HPE Interview Archive",
        "url": "https://www.geeksforgeeks.org/hpe-interview-experience/",
        "desc": "GeeksForGeeks HPE prep"
      },
      {
        "type": "youtube",
        "label": "HPE Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=HPE+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for HPE"
      }
    ]
  },
  {
    "id": 14,
    "name": "eBay",
    "category": "IT & Software",
    "logo": "EB",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 19,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "eBay Problem Set",
        "url": "https://leetcode.com/problemset/?search=ebay",
        "desc": "Search LeetCode for eBay"
      },
      {
        "type": "ambitionbox",
        "label": "eBay Interview Data",
        "url": "https://www.ambitionbox.com/interviews/ebay-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "eBay Interview Archive",
        "url": "https://www.geeksforgeeks.org/ebay-interview-experience/",
        "desc": "GeeksForGeeks eBay prep"
      },
      {
        "type": "youtube",
        "label": "eBay Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=eBay+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for eBay"
      }
    ]
  },
  {
    "id": 15,
    "name": "Flipkart",
    "category": "IT & Software",
    "logo": "FL",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 20,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Flipkart Problem Set",
        "url": "https://leetcode.com/problemset/?search=flipkart",
        "desc": "Search LeetCode for Flipkart"
      },
      {
        "type": "ambitionbox",
        "label": "Flipkart Interview Data",
        "url": "https://www.ambitionbox.com/interviews/flipkart-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Flipkart Interview Archive",
        "url": "https://www.geeksforgeeks.org/flipkart-interview-experience/",
        "desc": "GeeksForGeeks Flipkart prep"
      },
      {
        "type": "youtube",
        "label": "Flipkart Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Flipkart+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Flipkart"
      }
    ]
  },
  {
    "id": 16,
    "name": "Qualcomm",
    "category": "IT & Software",
    "logo": "QU",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 20,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Qualcomm Problem Set",
        "url": "https://leetcode.com/problemset/?search=qualcomm",
        "desc": "Search LeetCode for Qualcomm"
      },
      {
        "type": "ambitionbox",
        "label": "Qualcomm Interview Data",
        "url": "https://www.ambitionbox.com/interviews/qualcomm-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Qualcomm Interview Archive",
        "url": "https://www.geeksforgeeks.org/qualcomm-interview-experience/",
        "desc": "GeeksForGeeks Qualcomm prep"
      },
      {
        "type": "youtube",
        "label": "Qualcomm Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Qualcomm+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Qualcomm"
      }
    ]
  },
  {
    "id": 17,
    "name": "Oracle",
    "category": "IT & Software",
    "logo": "OR",
    "gpaCutoff": 7.0,
    "avgLPA": 12,
    "highestLPA": 16,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Oracle Problem Set",
        "url": "https://leetcode.com/problemset/?search=oracle",
        "desc": "Search LeetCode for Oracle"
      },
      {
        "type": "ambitionbox",
        "label": "Oracle Interview Data",
        "url": "https://www.ambitionbox.com/interviews/oracle-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Oracle Interview Archive",
        "url": "https://www.geeksforgeeks.org/oracle-interview-experience/",
        "desc": "GeeksForGeeks Oracle prep"
      },
      {
        "type": "youtube",
        "label": "Oracle Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Oracle+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Oracle"
      }
    ]
  },
  {
    "id": 18,
    "name": "Dell",
    "category": "IT & Software",
    "logo": "DE",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 19,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Dell Problem Set",
        "url": "https://leetcode.com/problemset/?search=dell",
        "desc": "Search LeetCode for Dell"
      },
      {
        "type": "ambitionbox",
        "label": "Dell Interview Data",
        "url": "https://www.ambitionbox.com/interviews/dell-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Dell Interview Archive",
        "url": "https://www.geeksforgeeks.org/dell-interview-experience/",
        "desc": "GeeksForGeeks Dell prep"
      },
      {
        "type": "youtube",
        "label": "Dell Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Dell+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Dell"
      }
    ]
  },
  {
    "id": 19,
    "name": "Goldman Sachs",
    "category": "Finance & Consulting",
    "logo": "GO",
    "gpaCutoff": 8.0,
    "avgLPA": 22,
    "highestLPA": 49,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Goldman Sachs Problem Set",
        "url": "https://leetcode.com/problemset/?search=goldman+sachs",
        "desc": "Search LeetCode for Goldman Sachs"
      },
      {
        "type": "ambitionbox",
        "label": "Goldman Sachs Interview Data",
        "url": "https://www.ambitionbox.com/interviews/goldman-sachs-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Goldman Sachs Interview Archive",
        "url": "https://www.geeksforgeeks.org/goldman-sachs-interview-experience/",
        "desc": "GeeksForGeeks Goldman Sachs prep"
      },
      {
        "type": "youtube",
        "label": "Goldman Sachs Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Goldman+Sachs+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Goldman Sachs"
      }
    ]
  },
  {
    "id": 20,
    "name": "EY",
    "category": "Finance & Consulting",
    "logo": "EY",
    "gpaCutoff": 7.0,
    "avgLPA": 8,
    "highestLPA": 16,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "EY Problem Set",
        "url": "https://leetcode.com/problemset/?search=ey",
        "desc": "Search LeetCode for EY"
      },
      {
        "type": "ambitionbox",
        "label": "EY Interview Data",
        "url": "https://www.ambitionbox.com/interviews/ey-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "EY Interview Archive",
        "url": "https://www.geeksforgeeks.org/ey-interview-experience/",
        "desc": "GeeksForGeeks EY prep"
      },
      {
        "type": "youtube",
        "label": "EY Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=EY+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for EY"
      }
    ]
  },
  {
    "id": 21,
    "name": "KPMG",
    "category": "Finance & Consulting",
    "logo": "KP",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 19,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "KPMG Problem Set",
        "url": "https://leetcode.com/problemset/?search=kpmg",
        "desc": "Search LeetCode for KPMG"
      },
      {
        "type": "ambitionbox",
        "label": "KPMG Interview Data",
        "url": "https://www.ambitionbox.com/interviews/kpmg-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "KPMG Interview Archive",
        "url": "https://www.geeksforgeeks.org/kpmg-interview-experience/",
        "desc": "GeeksForGeeks KPMG prep"
      },
      {
        "type": "youtube",
        "label": "KPMG Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=KPMG+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for KPMG"
      }
    ]
  },
  {
    "id": 22,
    "name": "JP Morgan Chase & Co",
    "category": "Finance & Consulting",
    "logo": "JPM",
    "gpaCutoff": 8.0,
    "avgLPA": 20,
    "highestLPA": 48,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "JP Morgan Chase & Co Problem Set",
        "url": "https://leetcode.com/problemset/?search=jp+morgan+chase+%26+co",
        "desc": "Search LeetCode for JP Morgan Chase & Co"
      },
      {
        "type": "ambitionbox",
        "label": "JP Morgan Chase & Co Interview Data",
        "url": "https://www.ambitionbox.com/interviews/jp-morgan-chase-and-co-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "JP Morgan Chase & Co Interview Archive",
        "url": "https://www.geeksforgeeks.org/jp-morgan-chase-and-co-interview-experience/",
        "desc": "GeeksForGeeks JP Morgan Chase & Co prep"
      },
      {
        "type": "youtube",
        "label": "JP Morgan Chase & Co Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=JP+Morgan+Chase+%26+Co+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for JP Morgan Chase & Co"
      }
    ]
  },
  {
    "id": 23,
    "name": "IDFC First Bank",
    "category": "Finance & Consulting",
    "logo": "IDFC",
    "gpaCutoff": 6.5,
    "avgLPA": 7,
    "highestLPA": 12,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "IDFC First Bank Problem Set",
        "url": "https://leetcode.com/problemset/?search=idfc+first+bank",
        "desc": "Search LeetCode for IDFC First Bank"
      },
      {
        "type": "ambitionbox",
        "label": "IDFC First Bank Interview Data",
        "url": "https://www.ambitionbox.com/interviews/idfc-first-bank-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "IDFC First Bank Interview Archive",
        "url": "https://www.geeksforgeeks.org/idfc-first-bank-interview-experience/",
        "desc": "GeeksForGeeks IDFC First Bank prep"
      },
      {
        "type": "youtube",
        "label": "IDFC First Bank Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=IDFC+First+Bank+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for IDFC First Bank"
      }
    ]
  },
  {
    "id": 24,
    "name": "Barclays",
    "category": "Finance & Consulting",
    "logo": "BA",
    "gpaCutoff": 8.0,
    "avgLPA": 21,
    "highestLPA": 51,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Barclays Problem Set",
        "url": "https://leetcode.com/problemset/?search=barclays",
        "desc": "Search LeetCode for Barclays"
      },
      {
        "type": "ambitionbox",
        "label": "Barclays Interview Data",
        "url": "https://www.ambitionbox.com/interviews/barclays-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Barclays Interview Archive",
        "url": "https://www.geeksforgeeks.org/barclays-interview-experience/",
        "desc": "GeeksForGeeks Barclays prep"
      },
      {
        "type": "youtube",
        "label": "Barclays Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Barclays+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Barclays"
      }
    ]
  },
  {
    "id": 25,
    "name": "D.E. Shaw India",
    "category": "Finance & Consulting",
    "logo": "DES",
    "gpaCutoff": 8.0,
    "avgLPA": 21,
    "highestLPA": 40,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "D.E. Shaw India Problem Set",
        "url": "https://leetcode.com/problemset/?search=d.e.+shaw+india",
        "desc": "Search LeetCode for D.E. Shaw India"
      },
      {
        "type": "ambitionbox",
        "label": "D.E. Shaw India Interview Data",
        "url": "https://www.ambitionbox.com/interviews/de-shaw-india-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "D.E. Shaw India Interview Archive",
        "url": "https://www.geeksforgeeks.org/de-shaw-india-interview-experience/",
        "desc": "GeeksForGeeks D.E. Shaw India prep"
      },
      {
        "type": "youtube",
        "label": "D.E. Shaw India Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=D.E.+Shaw+India+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for D.E. Shaw India"
      }
    ]
  },
  {
    "id": 26,
    "name": "PwC",
    "category": "Finance & Consulting",
    "logo": "PW",
    "gpaCutoff": 7.0,
    "avgLPA": 9,
    "highestLPA": 24,
    "skills": [
      "Analytical Skills",
      "Excel/SQL",
      "Aptitude",
      "Finance Basics"
    ],
    "dsaTopics": [
      "Math",
      "Arrays",
      "DP",
      "Probability"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "PwC Problem Set",
        "url": "https://leetcode.com/problemset/?search=pwc",
        "desc": "Search LeetCode for PwC"
      },
      {
        "type": "ambitionbox",
        "label": "PwC Interview Data",
        "url": "https://www.ambitionbox.com/interviews/pwc-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "PwC Interview Archive",
        "url": "https://www.geeksforgeeks.org/pwc-interview-experience/",
        "desc": "GeeksForGeeks PwC prep"
      },
      {
        "type": "youtube",
        "label": "PwC Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=PwC+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for PwC"
      }
    ]
  },
  {
    "id": 27,
    "name": "Bosch",
    "category": "Engineering & Manufacturing",
    "logo": "BO",
    "gpaCutoff": 7.0,
    "avgLPA": 12,
    "highestLPA": 19,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Bosch Problem Set",
        "url": "https://leetcode.com/problemset/?search=bosch",
        "desc": "Search LeetCode for Bosch"
      },
      {
        "type": "ambitionbox",
        "label": "Bosch Interview Data",
        "url": "https://www.ambitionbox.com/interviews/bosch-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Bosch Interview Archive",
        "url": "https://www.geeksforgeeks.org/bosch-interview-experience/",
        "desc": "GeeksForGeeks Bosch prep"
      },
      {
        "type": "youtube",
        "label": "Bosch Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Bosch+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Bosch"
      }
    ]
  },
  {
    "id": 28,
    "name": "Philips",
    "category": "Engineering & Manufacturing",
    "logo": "PH",
    "gpaCutoff": 7.0,
    "avgLPA": 10,
    "highestLPA": 17,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Philips Problem Set",
        "url": "https://leetcode.com/problemset/?search=philips",
        "desc": "Search LeetCode for Philips"
      },
      {
        "type": "ambitionbox",
        "label": "Philips Interview Data",
        "url": "https://www.ambitionbox.com/interviews/philips-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Philips Interview Archive",
        "url": "https://www.geeksforgeeks.org/philips-interview-experience/",
        "desc": "GeeksForGeeks Philips prep"
      },
      {
        "type": "youtube",
        "label": "Philips Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Philips+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Philips"
      }
    ]
  },
  {
    "id": 29,
    "name": "Hero Motors",
    "category": "Engineering & Manufacturing",
    "logo": "HE",
    "gpaCutoff": 6.5,
    "avgLPA": 9,
    "highestLPA": 16,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Hero Motors Problem Set",
        "url": "https://leetcode.com/problemset/?search=hero+motors",
        "desc": "Search LeetCode for Hero Motors"
      },
      {
        "type": "ambitionbox",
        "label": "Hero Motors Interview Data",
        "url": "https://www.ambitionbox.com/interviews/hero-motors-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Hero Motors Interview Archive",
        "url": "https://www.geeksforgeeks.org/hero-motors-interview-experience/",
        "desc": "GeeksForGeeks Hero Motors prep"
      },
      {
        "type": "youtube",
        "label": "Hero Motors Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Hero+Motors+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Hero Motors"
      }
    ]
  },
  {
    "id": 30,
    "name": "Tata Motors",
    "category": "Engineering & Manufacturing",
    "logo": "TM",
    "gpaCutoff": 7.0,
    "avgLPA": 11,
    "highestLPA": 23,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Tata Motors Problem Set",
        "url": "https://leetcode.com/problemset/?search=tata+motors",
        "desc": "Search LeetCode for Tata Motors"
      },
      {
        "type": "ambitionbox",
        "label": "Tata Motors Interview Data",
        "url": "https://www.ambitionbox.com/interviews/tata-motors-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Tata Motors Interview Archive",
        "url": "https://www.geeksforgeeks.org/tata-motors-interview-experience/",
        "desc": "GeeksForGeeks Tata Motors prep"
      },
      {
        "type": "youtube",
        "label": "Tata Motors Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Tata+Motors+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Tata Motors"
      }
    ]
  },
  {
    "id": 31,
    "name": "Maruti Suzuki",
    "category": "Engineering & Manufacturing",
    "logo": "MA",
    "gpaCutoff": 6.5,
    "avgLPA": 8,
    "highestLPA": 14,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Maruti Suzuki Problem Set",
        "url": "https://leetcode.com/problemset/?search=maruti+suzuki",
        "desc": "Search LeetCode for Maruti Suzuki"
      },
      {
        "type": "ambitionbox",
        "label": "Maruti Suzuki Interview Data",
        "url": "https://www.ambitionbox.com/interviews/maruti-suzuki-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Maruti Suzuki Interview Archive",
        "url": "https://www.geeksforgeeks.org/maruti-suzuki-interview-experience/",
        "desc": "GeeksForGeeks Maruti Suzuki prep"
      },
      {
        "type": "youtube",
        "label": "Maruti Suzuki Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Maruti+Suzuki+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Maruti Suzuki"
      }
    ]
  },
  {
    "id": 32,
    "name": "Caterpillar",
    "category": "Engineering & Manufacturing",
    "logo": "CA",
    "gpaCutoff": 6.5,
    "avgLPA": 9,
    "highestLPA": 16,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Caterpillar Problem Set",
        "url": "https://leetcode.com/problemset/?search=caterpillar",
        "desc": "Search LeetCode for Caterpillar"
      },
      {
        "type": "ambitionbox",
        "label": "Caterpillar Interview Data",
        "url": "https://www.ambitionbox.com/interviews/caterpillar-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Caterpillar Interview Archive",
        "url": "https://www.geeksforgeeks.org/caterpillar-interview-experience/",
        "desc": "GeeksForGeeks Caterpillar prep"
      },
      {
        "type": "youtube",
        "label": "Caterpillar Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Caterpillar+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Caterpillar"
      }
    ]
  },
  {
    "id": 33,
    "name": "L&T Technology Services",
    "category": "Engineering & Manufacturing",
    "logo": "L&T",
    "gpaCutoff": 7.0,
    "avgLPA": 10,
    "highestLPA": 16,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "L&T Technology Services Problem Set",
        "url": "https://leetcode.com/problemset/?search=l%26t+technology+services",
        "desc": "Search LeetCode for L&T Technology Services"
      },
      {
        "type": "ambitionbox",
        "label": "L&T Technology Services Interview Data",
        "url": "https://www.ambitionbox.com/interviews/landt-technology-services-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "L&T Technology Services Interview Archive",
        "url": "https://www.geeksforgeeks.org/landt-technology-services-interview-experience/",
        "desc": "GeeksForGeeks L&T Technology Services prep"
      },
      {
        "type": "youtube",
        "label": "L&T Technology Services Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=L%26T+Technology+Services+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for L&T Technology Services"
      }
    ]
  },
  {
    "id": 34,
    "name": "Reliance Industries Limited",
    "category": "Engineering & Manufacturing",
    "logo": "RIL",
    "gpaCutoff": 7.0,
    "avgLPA": 11,
    "highestLPA": 19,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Reliance Industries Limited Problem Set",
        "url": "https://leetcode.com/problemset/?search=reliance+industries+limited",
        "desc": "Search LeetCode for Reliance Industries Limited"
      },
      {
        "type": "ambitionbox",
        "label": "Reliance Industries Limited Interview Data",
        "url": "https://www.ambitionbox.com/interviews/reliance-industries-limited-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Reliance Industries Limited Interview Archive",
        "url": "https://www.geeksforgeeks.org/reliance-industries-limited-interview-experience/",
        "desc": "GeeksForGeeks Reliance Industries Limited prep"
      },
      {
        "type": "youtube",
        "label": "Reliance Industries Limited Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Reliance+Industries+Limited+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Reliance Industries Limited"
      }
    ]
  },
  {
    "id": 35,
    "name": "NTPC",
    "category": "Engineering & Manufacturing",
    "logo": "NT",
    "gpaCutoff": 6.5,
    "avgLPA": 7,
    "highestLPA": 14,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "NTPC Problem Set",
        "url": "https://leetcode.com/problemset/?search=ntpc",
        "desc": "Search LeetCode for NTPC"
      },
      {
        "type": "ambitionbox",
        "label": "NTPC Interview Data",
        "url": "https://www.ambitionbox.com/interviews/ntpc-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "NTPC Interview Archive",
        "url": "https://www.geeksforgeeks.org/ntpc-interview-experience/",
        "desc": "GeeksForGeeks NTPC prep"
      },
      {
        "type": "youtube",
        "label": "NTPC Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=NTPC+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for NTPC"
      }
    ]
  },
  {
    "id": 36,
    "name": "BHEL",
    "category": "Engineering & Manufacturing",
    "logo": "BH",
    "gpaCutoff": 6.5,
    "avgLPA": 7,
    "highestLPA": 14,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "BHEL Problem Set",
        "url": "https://leetcode.com/problemset/?search=bhel",
        "desc": "Search LeetCode for BHEL"
      },
      {
        "type": "ambitionbox",
        "label": "BHEL Interview Data",
        "url": "https://www.ambitionbox.com/interviews/bhel-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "BHEL Interview Archive",
        "url": "https://www.geeksforgeeks.org/bhel-interview-experience/",
        "desc": "GeeksForGeeks BHEL prep"
      },
      {
        "type": "youtube",
        "label": "BHEL Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=BHEL+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for BHEL"
      }
    ]
  },
  {
    "id": 37,
    "name": "ONGC",
    "category": "Engineering & Manufacturing",
    "logo": "ON",
    "gpaCutoff": 6.5,
    "avgLPA": 7,
    "highestLPA": 14,
    "skills": [
      "Core Engineering",
      "AutoCAD",
      "Aptitude",
      "Process Flow"
    ],
    "dsaTopics": [
      "Basic Math",
      "Arrays",
      "Strings",
      "Logic"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "ONGC Problem Set",
        "url": "https://leetcode.com/problemset/?search=ongc",
        "desc": "Search LeetCode for ONGC"
      },
      {
        "type": "ambitionbox",
        "label": "ONGC Interview Data",
        "url": "https://www.ambitionbox.com/interviews/ongc-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "ONGC Interview Archive",
        "url": "https://www.geeksforgeeks.org/ongc-interview-experience/",
        "desc": "GeeksForGeeks ONGC prep"
      },
      {
        "type": "youtube",
        "label": "ONGC Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=ONGC+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for ONGC"
      }
    ]
  },
  {
    "id": 38,
    "name": "Zomato",
    "category": "E-commerce & Technology Platforms",
    "logo": "ZO",
    "gpaCutoff": 8.0,
    "avgLPA": 19,
    "highestLPA": 55,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Zomato Problem Set",
        "url": "https://leetcode.com/problemset/?search=zomato",
        "desc": "Search LeetCode for Zomato"
      },
      {
        "type": "ambitionbox",
        "label": "Zomato Interview Data",
        "url": "https://www.ambitionbox.com/interviews/zomato-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Zomato Interview Archive",
        "url": "https://www.geeksforgeeks.org/zomato-interview-experience/",
        "desc": "GeeksForGeeks Zomato prep"
      },
      {
        "type": "youtube",
        "label": "Zomato Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Zomato+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Zomato"
      }
    ]
  },
  {
    "id": 39,
    "name": "Swiggy",
    "category": "E-commerce & Technology Platforms",
    "logo": "SW",
    "gpaCutoff": 8.0,
    "avgLPA": 19,
    "highestLPA": 55,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Swiggy Problem Set",
        "url": "https://leetcode.com/problemset/?search=swiggy",
        "desc": "Search LeetCode for Swiggy"
      },
      {
        "type": "ambitionbox",
        "label": "Swiggy Interview Data",
        "url": "https://www.ambitionbox.com/interviews/swiggy-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Swiggy Interview Archive",
        "url": "https://www.geeksforgeeks.org/swiggy-interview-experience/",
        "desc": "GeeksForGeeks Swiggy prep"
      },
      {
        "type": "youtube",
        "label": "Swiggy Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Swiggy+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Swiggy"
      }
    ]
  },
  {
    "id": 40,
    "name": "Pepperfry",
    "category": "E-commerce & Technology Platforms",
    "logo": "PE",
    "gpaCutoff": 6.5,
    "avgLPA": 9,
    "highestLPA": 16,
    "skills": [
      "DSA",
      "System Design",
      "Problem Solving",
      "Web Dev"
    ],
    "dsaTopics": [
      "Trees",
      "Graphs",
      "DP",
      "Arrays"
    ],
    "color": "from-primary to-secondary",
    "prepMaterial": [
      {
        "type": "leetcode",
        "label": "Pepperfry Problem Set",
        "url": "https://leetcode.com/problemset/?search=pepperfry",
        "desc": "Search LeetCode for Pepperfry"
      },
      {
        "type": "ambitionbox",
        "label": "Pepperfry Interview Data",
        "url": "https://www.ambitionbox.com/interviews/pepperfry-interview-questions",
        "desc": "Verified AmbitionBox experiences"
      },
      {
        "type": "article",
        "label": "Pepperfry Interview Archive",
        "url": "https://www.geeksforgeeks.org/pepperfry-interview-experience/",
        "desc": "GeeksForGeeks Pepperfry prep"
      },
      {
        "type": "youtube",
        "label": "Pepperfry Prep Playlists",
        "url": "https://www.youtube.com/results?search_query=Pepperfry+interview+preparation+playlist&sp=EgIQAw%253D%253D",
        "desc": "Curated video courses for Pepperfry"
      }
    ]
  }
];
