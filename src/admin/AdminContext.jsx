import React, { createContext, useContext, useReducer, useEffect } from 'react';

/* ---- Default Data (used on first load / reset) ---- */
export const DEFAULT_DATA = {
  slides: [
    {
      id: 1,
      tag: 'Our Vision',
      headline: 'Reimagining Surveillance with',
      highlight: 'AI & IoT',
      sub: "We envision a future where security systems don't just record incidents – they prevent them. AMPARO is a next-generation platform for proactive protection.",
      cta1Label: 'Explore Our Vision', cta1Href: '/about',
      cta2Label: 'Contact Us',        cta2Href: '/contact',
      badge: '🚀 Incubation Phase',
      bgImage: '',
      visualImage: '',
    },
    {
      id: 2,
      tag: 'Edge Intelligence',
      headline: 'Real-Time Response with',
      highlight: 'Edge-Based AI',
      sub: 'On-device intelligence analyzes events locally, reducing cloud dependency and providing sub-second alerts for hazards and suspicious activity.',
      cta1Label: 'How It Works', cta1Href: '/how-it-works',
      cta2Label: 'Learn More',    cta2Href: '/services',
      badge: '⚡ Sub-second Alerts',
      bgImage: '',
      visualImage: '',
    },
    {
      id: 3,
      tag: 'Unified Monitoring',
      headline: 'Total Control with',
      highlight: 'Central SaaS Dashboard',
      sub: 'A unified platform to monitor multiple locations centrally, review events, and generate actionable insights from your security ecosystem.',
      cta1Label: 'View Dashboard', cta1Href: '/services',
      cta2Label: 'Get Started',    cta2Href: '/contact',
      badge: '📊 Real-time Insights',
      bgImage: '',
      visualImage: '',
    },
    {
      id: 4,
      tag: 'Proactive Defense',
      headline: 'Smart Alerts for',
      highlight: 'Predictive Safety',
      sub: 'Automated hazard detection, crowd analytics, and unauthorized access alerts — keep your people and assets safe with automated intelligence.',
      cta1Label: 'See Use Cases', cta1Href: '/industries',
      cta2Label: 'Book Demo',      cta2Href: '/contact',
      badge: '🛡️ Predictive Security',
      bgImage: '',
      visualImage: '',
    },
  ],

  services: [
    { 
      id: 1, 
      slug: 'ai-attendance', 
      title: 'AI Attendance System', 
      subtitle: 'CCTV-Based Face Recognition', 
      badge: 'Most Popular', 
      desc: 'Automated employee attendance via smart CCTV cameras. Real-time face recognition with HR software integration — no badges, no manual sheets.', 
      features: ['Face Recognition', 'Real-time Reporting', 'HR Integration', 'Anti-spoofing'],
      fullContent: `<h2>The End of Manual Attendance</h2><p>Our AI-powered attendance system transforms any standard IP camera into a high-precision biometric scanner. By leveraging advanced facial recognition algorithms, employees simply walk through the door and their attendance is logged instantly—even with masks, varying lighting conditions, or partial occlusions.</p><h3>How It Works</h3><ul><li><strong>Frictionless Entry:</strong> No stopping, no swiping, no fingerprint touching.</li><li><strong>Anti-Spoofing:</strong> Liveness detection prevents spoofing via photos or videos on phones.</li><li><strong>Enterprise Integration:</strong> APIs sync directly with SAP, Workday, BambooHR, and bespoke ERPs.</li></ul><p>Stop paying for "buddy punching" and reclaim thousands of hours previously lost to manual attendance reconciliation.</p>`
    },
    { 
      id: 2, 
      slug: 'vapt-services', 
      title: 'VAPT Services', 
      subtitle: 'Vulnerability Assessment & Pen Testing', 
      badge: '', 
      desc: 'End-to-end cybersecurity assessments — web app VAPT, network pen testing, mobile security audits and detailed remediation reports.', 
      features: ['Web App VAPT', 'Network Pen Test', 'Mobile Security', 'Red Team Testing'],
      fullContent: `<h2>Identify Vulnerabilities Before Hackers Do</h2><p>AMPARO's elite Red Team offensive security experts simulate real-world cyberattacks against your infrastructure, applications, and networks. Our VAPT (Vulnerability Assessment and Penetration Testing) services don't just run automated scanners; we employ manual ethical hacking techniques to uncover complex chained vulnerabilities.</p><h3>Our Testing Domains</h3><ul><li><strong>Web & API Security:</strong> OWASP Top 10, business logic flaws, and injection vectors.</li><li><strong>Internal & External Networks:</strong> Firewall misconfigurations, unpatched zero-days, and lateral movement paths.</li><li><strong>Mobile Applications:</strong> iOS/Android reverse engineering and secure storage analysis.</li></ul><p>You receive a comprehensive executive summary and a deeply technical remediation guide with code-level fixes.</p>`
    },
    { 
      id: 3, 
      slug: 'fire-detection', 
      title: 'Fire Detection', 
      subtitle: 'AI-Powered Fire & Smoke Alerts', 
      badge: '', 
      desc: 'Deep learning models trained to detect fire and smoke in real-time via cameras. Sub-second alerts to security teams and emergency services.', 
      features: ['Smoke Detection', 'Flame Analysis', 'Instant Alerts', 'Edge Processing'],
      fullContent: `<h2>Visual Fire Detection at the Edge</h2><p>Traditional smoke detectors rely on particles reaching a ceiling sensor, which can take minutes in large open spaces or high-ceiling warehouses. By the time an alarm triggers, the fire is often out of control. Our AI models detect the visual signature of flames and smoke in milliseconds directly from camera feeds.</p><h3>Key Advantages</h3><ul><li><strong>Early Warning:</strong> Detects smoke plumes before they rise and trigger thermal/particle sensors.</li><li><strong>Outdoor Capability:</strong> Works reliably outdoors where traditional smoke detectors fail (e.g., lumber yards, chemical plants).</li><li><strong>False Positive Filtering:</strong> Trained to ignore steam, dust, welding sparks, and vehicle exhaust.</li></ul><p>Instant visual verification is sent to the dashboard and mobile app, allowing security teams to confirm the threat and dispatch emergency services immediately.</p>`
    },
    { 
      id: 4, 
      slug: 'weapon-detection', 
      title: 'Weapon Detection', 
      subtitle: 'Real-Time Threat Identification', 
      badge: '', 
      desc: 'Computer vision models that detect unauthorized weapons in CCTV footage — triggering immediate lockdown protocols.', 
      features: ['Gun Detection', 'Knife Detection', 'Instant Lockdown', 'Multi-Camera'],
      fullContent: `<h2>Proactive Active Shooter Prevention</h2><p>In critical incidents, every second counts. AMPARO’s weapon detection AI continuously scans camera feeds across your campus, capable of identifying drawn or partially concealed firearms and bladed weapons long before a shot is fired.</p><h3>System Workflows</h3><ul><li><strong>Zero-Latency Detection:</strong> Sub-second identification of rifles, shotguns, handguns, and knives.</li><li><strong>Automated Lockdown:</strong> Connects to access control systems to automatically lock doors and elevate threat levels.</li><li><strong>Silent Dispatch:</strong> Instantly pushes alerts with camera location and suspect screenshots to local law enforcement and on-site tactical teams.</li></ul><p>Built for schools, corporate campuses, places of worship, and critical infrastructure.</p>`
    },
    { 
      id: 5, 
      slug: 'smart-surveillance', 
      title: 'Smart Surveillance', 
      subtitle: 'AI-Enhanced CCTV Monitoring', 
      badge: '', 
      desc: 'Centralized AI surveillance platform with perimeter detection, crowd analytics, and anomaly alerts — all managed from a single dashboard.', 
      features: ['Perimeter Alerts', 'Crowd Analytics', 'Night Vision AI', 'Central Dashboard'],
      fullContent: `<h2>Make Your Dumb Cameras Smart</h2><p>You already have the cameras. Now give them a brain. AMPARO’s smart surveillance platform ingests RSTP feeds from almost any IP camera and applies a layer of deep behavioral analytics across your entire ecosystem.</p><h3>Core Analytics</h3><ul><li><strong>Perimeter Protection:</strong> Draw virtual tripwires. Get alerted only when a human or vehicle crosses, ignoring animals and shadows.</li><li><strong>Loitering & Anomaly:</strong> Detect individuals lingering near secure access points or ATMs.</li><li><strong>Crowd Density:</strong> Heatmap generation and alerts for overcrowding in retail aisles or stadium choke points.</li></ul><p>Manage 10 cameras or 10,000 from a centralized, unified SaaS dashboard that cuts out the noise and only presents actionable events.</p>`
    },
    { 
      id: 6, 
      slug: 'cybersecurity-consulting', 
      title: 'Cybersecurity Consulting', 
      subtitle: 'Full-Spectrum Security Advisory', 
      badge: '', 
      desc: 'From security architecture to compliance frameworks (ISO 27001, SOC 2) — experts guide your team to build a security-first culture.', 
      features: ['Security Audits', 'ISO 27001', 'SOC 2 Compliance', 'Training'],
      fullContent: `<h2>Strategic Security Leadership</h2><p>Technology alone cannot secure an organization. You need processes, policies, and people. Our advisory team acts as your vCISO (Virtual Chief Information Security Officer), guiding your leadership through the complexities of modern cyber risk management.</p><h3>Advisory Services</h3><ul><li><strong>Compliance & Frameworks:</strong> Full readiness assessments and implementation for SOC 2 Type II, ISO 27001, HIPAA, and GDPR.</li><li><strong>Architecture Review:</strong> Cloud security posture management (AWS, Azure, GCP) and zero-trust network design.</li><li><strong>Incident Response Planning:</strong> Crafting and tabletop-testing IR playbooks so your team knows exactly what to do when a breach occurs.</li></ul><p>We build a defensible security posture that satisfies regulators, wins enterprise enterprise clients, and actually protects your data.</p>`
    },
  ],

  stats: [
    { id: 1, val: '99.7%', lbl: 'Detection Accuracy' },
    { id: 2, val: '200+',  lbl: 'Cameras Deployed' },
    { id: 3, val: '<1s',   lbl: 'Alert Response Time' },
    { id: 4, val: '50+',   lbl: 'Clients Protected' },
  ],

  pillars: [
    { 
      id: 1, 
      title: 'AI-Enabled Sensors', 
      desc: 'High-performance hardware layer designed to capture high-fidelity video and environmental data even in low-light industrial settings.',
      icon: '📷',
      details: ['Video Analytics', 'Hazard Sensing', 'Low-Light PIR', 'Tamper Alerts']
    },
    { 
      id: 2, 
      title: 'Smart Alert Engine', 
      desc: 'Intelligent routing system that categorizes events and triggers instant notifications via mobile, desktop, or emergency dispatch.',
      icon: '🔔',
      details: ['Predictive Logic', 'Multi-Channel Notify', 'Sub-second Latency', 'Escalation Workflows']
    },
    { 
      id: 3, 
      title: 'Edge AI Processing', 
      desc: 'On-device intelligence analyzes video locally, ensuring privacy and continued monitoring without relying on cloud availability.',
      icon: '💾',
      details: ['Local Inference', 'Bandwidth Saving', 'Privacy Focused', 'Offline Resilience']
    },
    { 
      id: 4, 
      title: 'Central SaaS Dashboard', 
      desc: 'A unified cloud-native platform to monitor thousands of locations, review historical events, and manage security policies.',
      icon: '📊',
      details: ['Multi-Site View', 'Real-time Analytics', 'Role-Based Access', 'API Integration']
    },
  ],

  contactInfo: {
    email: 'info@amparoglobal.com',
    phone: '+91 98765 43210',
    address: 'AMPARO Secure Tech, Mumbai, India',
  },

  footerTagline: 'AI-powered security intelligence for the modern world. Protecting what matters most.',

  cases: [
    { id: 1, category: 'Logistics',  title: 'Smart Warehousing',       desc: 'Real-time monitoring of loading docks, inventory alerts, and perimeter security for a 50,000 sq.ft facility.', img: '🏭' },
    { id: 2, category: 'Corporate',  title: 'Enterprise Offices',      desc: 'Integrated AI attendance and visitor management for multi-floor corporate hubs with zero-latency face tracking.', img: '🏢' },
    { id: 3, category: 'Industrial', title: 'Critical Infrastructure', desc: 'Fire and hazard detection in manufacturing plants where traditional sensors fail due to environmental factors.', img: '🏗️' },
    { id: 4, category: 'Commerce',   title: 'Retail Analytics',        desc: 'Crowd density mapping and suspicious behavior detection for high-traffic retail environments.', img: '🛍️' },
  ],

  servicesWhyChoose: {
    title: 'Why Choose Our AI Surveillance?',
    desc: "Traditional security systems are passive—they record incidents but don't prevent them. AMPARO's AI integration transforms your cameras into proactive guards that detect threats in sub-seconds.",
    features: [
      { label: 'Edge AI', text: 'Processing happens locally on the camera or local server, ensuring zero-latency and data privacy.' },
      { label: 'Smart Alerts', text: 'No more false alarms. Our models differentiate between a stray cat and a perimeter breach.' },
    ]
  },

  heroStats: [
    { label: 'Detection Accuracy', val: '99.7%' },
    { label: 'Alert Response',    val: '<1s' },
    { label: 'Monitoring',        val: '24/7' },
    { label: 'Cameras Managed',   val: '200+' },
  ],

  heroAlerts: [
    { text: 'Perimeter breach detected – Zone 3', type: 'red' },
    { text: 'Attendance: 128 employees logged',    type: 'green' },
    { text: 'Fire alert cleared – Building A',     type: 'yellow' },
    { text: 'VAPT scan complete – 0 critical',     type: 'green' },
  ],

  headerSettings: {
    ctaLabel: 'Get Free Quote',
    ctaLink: '/contact',
    showMegaMenu: true
  },

  footerSettings: {
    tagline: 'AI-powered security intelligence for the modern world. Protecting what matters most.',
    copyright: 'AMPARO Secure Tech. All rights reserved.',
    socials: {
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    },
    locations: ['Jaipur', 'Bhilwara']
  },

  products: [
    { id: 1, name: 'Amparo Pro AI Camera', price: 24999, stock: 45, category: 'Hardware', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=100' },
    { id: 2, name: 'IoT Smoke Sensor v2', price: 4200, stock: 120, category: 'Sensors', image: '' },
    { id: 3, name: 'Edge AI Processing Node', price: 45000, stock: 12, category: 'Computing', image: '' },
  ],
  orders: [
    { id: 'ORD-7721', customer: 'TechCorp Intl', date: '2026-03-10', status: 'Processing', total: 104500 },
    { id: 'ORD-7722', customer: 'Smart Logistics', date: '2026-03-12', status: 'Shipped', total: 72000 },
  ],
  projects: [
    { id: 1, name: 'Smart City Mumbai', status: 'In Progress', completion: 65, client: 'PMC India' },
    { id: 2, name: 'Industrial Hub Pune', status: 'Planning', completion: 15, client: 'Mahindra Logistics' },
  ],
  messages: [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', phone: '+91 99999 88888', service: 'Weapon Detection', message: 'Interested in a demo for our school campus.', date: '2026-03-11T10:30:00Z', read: false },
  ],
  clients: [
    { id: 1, name: 'TechFlow', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=200&h=80&q=80' },
    { id: 2, name: 'SecureNet', logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&w=200&h=80&q=80' },
    { id: 3, name: 'AI Global', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&h=80&q=80' },
    { id: 4, name: 'Innovate', logo: 'https://placehold.co/200x80/ffffff/E8192C?text=INNOVATE' },
    { id: 5, name: 'Core Intel', logo: 'https://placehold.co/200x80/ffffff/111111?text=CORE+INTEL' },
  ],
  testimonialSettings: {
    title: 'WHAT OUR CLIENTS SAY?',
    testimonials: [
      {
        id: 1,
        name: 'Mr. Devendra Tyagi',
        role: 'Nursing Superintendent',
        company: 'Indus Jaipur Hospital',
        title: 'Support That Truly Cares',
        text: "Aeyi didn't just give us a product – they supported us through the entire journey. You can tell they genuinely care about helping improve patient care.",
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150'
      },
      {
        id: 2,
        name: 'Mr. Vishal',
        role: 'IT Head',
        company: 'Indus Jaipur Hospital',
        title: 'Quick to Learn, Easy to Use',
        text: 'Our staff adapted to the new system much faster than expected. Even those with little tech experience found it easy to use, thanks to how intuitive Aeyi made it.',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150'
      },
      {
        id: 3,
        name: 'Mr. Shantanu Sain',
        role: 'IT Manager',
        company: 'SRK Max Hospital',
        title: 'Processes Made Simple',
        text: 'Aeyi has made so many of our hospital processes easier from scheduling to compliance. It really feels like it was built for us.',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150'
      }
    ]
  },
  chatTickets: [],
  chatConfig: {
    autoReplyEnabled: true,
    welcomeMessage: "Hello! I'm AMPARO AI Assistant. How can I help you today?",
    defaultResponse: "Thank you for your question! AMPARO provides enterprise-grade AI security solutions. For more detailed information, please contact our team."
  },
  adminPassword: 'amparo2024'
};

/* ---- Reducer ---- */
function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':        return { ...state, ...action.payload };
    case 'SET_SLIDES':       return { ...state, slides: action.payload };
    case 'SET_SERVICES':     return { ...state, services: action.payload };
    case 'SET_STATS':        return { ...state, stats: action.payload };
    case 'SET_PILLARS':      return { ...state, pillars: action.payload };
    case 'SET_CONTACT_INFO': return { ...state, contactInfo: action.payload };
    case 'SET_FOOTER_TAGLINE': return { ...state, footerTagline: action.payload }; // Compatibility
    case 'SET_FOOTER':       return { ...state, footerSettings: action.payload };
    case 'SET_HEADER':       return { ...state, headerSettings: action.payload };
    case 'SET_CASES':        return { ...state, cases: action.payload };
    case 'SET_SERVICES_WHY': return { ...state, servicesWhyChoose: action.payload };
    case 'SET_HERO_STATS':   return { ...state, heroStats: action.payload };
    case 'SET_HERO_ALERTS':  return { ...state, heroAlerts: action.payload };
    case 'SET_PRODUCTS':     return { ...state, products: action.payload };
    case 'SET_ORDERS':       return { ...state, orders: action.payload };
    case 'SET_PROJECTS':     return { ...state, projects: action.payload };
    case 'ADD_MESSAGE':      return { ...state, messages: [action.payload, ...state.messages] };
    case 'SET_MESSAGES':     return { ...state, messages: action.payload };
    case 'SET_CLIENTS':      return { ...state, clients: action.payload };
    case 'SET_TESTIMONIALS': return { ...state, testimonialSettings: action.payload };
    case 'ADD_CHAT_MESSAGE': {
      const { sessionId, message, customerInfo } = action.payload;
      const existingTicket = state.chatTickets.find(t => t.id === sessionId);
      
      let updatedTickets;
      if (existingTicket) {
        updatedTickets = state.chatTickets.map(t => 
          t.id === sessionId 
            ? { 
                ...t, 
                messages: [...t.messages, message], 
                lastMessage: message.text, 
                date: new Date().toISOString(), 
                status: message.type === 'user' ? 'active' : 'replied' 
              } 
            : t
        );
      } else {
        updatedTickets = [{
          id: sessionId,
          customerName: customerInfo?.name || 'Guest User',
          phone: customerInfo?.phone || '',
          company: customerInfo?.company || '',
          lastMessage: message.text,
          date: new Date().toISOString(),
          status: 'active',
          messages: [message]
        }, ...state.chatTickets];
      }
      return { ...state, chatTickets: updatedTickets };
    }
    case 'SET_CHAT_CONFIG': return { ...state, chatConfig: action.payload };
    case 'DELETE_CHAT_TICKET': {
      return { ...state, chatTickets: state.chatTickets.filter(t => t.id !== action.payload) };
    }
    case 'SET_ADMIN_PASSWORD': return { ...state, adminPassword: action.payload };
    case 'TOGGLE_TICKET_STATUS': {
      return { ...state, chatTickets: state.chatTickets.map(t => 
        t.id === action.payload ? { ...t, status: t.status === 'closed' ? 'active' : 'closed' } : t
      )};
    }
    case 'RESET':
      if (window.confirm('Are you sure? This will wipe all your custom edits.')) {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_DATA;
      }
      return state;
    default: return state;
  }
}

const AdminContext = createContext(null);
const STORAGE_KEY = 'amparo_config_v2';

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_DATA);

  // Initial Load from MongoDB (with localStorage fallback)
  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        
        if (json.success && json.data) {
          console.log("Loaded from MongoDB");
          dispatch({ type: 'SET_STATE', payload: json.data });
        } else {
          // Fallback to localStorage if MongoDB is empty or failing
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            console.log("Loaded from LocalStorage");
            dispatch({ type: 'SET_STATE', payload: JSON.parse(saved) });
          }
        }
      } catch (err) {
        console.error("MongoDB fetch failed, using LocalStorage:", err);
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) dispatch({ type: 'SET_STATE', payload: JSON.parse(saved) });
      }
    }
    loadContent();
  }, []);

  // Save to MongoDB and LocalStorage on change
  useEffect(() => {
    // 1. Always save to LocalStorage for speed
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn("LocalStorage full, but will still try MongoDB.");
      }
    }

    // 2. Debounced save to MongoDB
    const timeout = setTimeout(async () => {
      try {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state),
        });
        console.log("Synced to MongoDB (with compressed images)");
      } catch (err) {
        console.error("Failed to sync to MongoDB:", err);
      }
    }, 2000); // 2 second debounce to prevent over-saving

    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useContent must be inside AdminProvider');
  return ctx;
}
