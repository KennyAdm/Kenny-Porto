import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiGooglegemini,
  SiFramer,
  SiRadixui,
  SiPython,
  SiJupyter,
} from 'react-icons/si';
import { FiCode, FiFileText, FiCreditCard, FiEdit3, FiBarChart2 } from 'react-icons/fi';

const TECH_ICON_RULES = [
  { test: /next\.?js/, icon: SiNextdotjs },
  { test: /typescript/, icon: SiTypescript },
  { test: /tailwind/, icon: SiTailwindcss },
  { test: /supabase/, icon: SiSupabase },
  { test: /postgres/, icon: SiPostgresql },
  { test: /gemini/, icon: SiGooglegemini },
  { test: /midtrans/, icon: FiCreditCard },
  { test: /tiptap/, icon: FiEdit3 },
  { test: /recharts/, icon: FiBarChart2 },
  { test: /framer/, icon: SiFramer },
  { test: /radix/, icon: SiRadixui },
  { test: /react[\s-]?pdf/, icon: FiFileText },
  { test: /jupyter/, icon: SiJupyter },
  { test: /python/, icon: SiPython },
];

export const getTechIcon = (techName) => {
  if (!techName) return FiCode;
  const normalized = techName.toLowerCase();
  const rule = TECH_ICON_RULES.find(({ test }) => test.test(normalized));
  return rule ? rule.icon : FiCode;
};
