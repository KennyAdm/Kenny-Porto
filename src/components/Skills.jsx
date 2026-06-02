import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import {
  Code2, Paintbrush, Database, Layout, Cloud, BarChart, Figma, Box,
  PenTool, FileStack, Activity, GitBranch, MonitorSmartphone, Laptop2,
  Brush, FileJson, Binary, BrainCircuit, Palette, FileSpreadsheet,
  Server, Phone, Link, Github, BookOpen, BarChart2, Table2, Cpu,
  Blocks, Smartphone, Terminal, Notebook,
} from 'lucide-react';
import IconCloudDemo from './globe';

const iconMap = {
  figma: Figma,
  box: Box,
  'monitor-smartphone': MonitorSmartphone,
  'pen-tool': PenTool,
  'file-stack': FileStack,
  activity: Activity,
  'git-branch': GitBranch,
  'book-open': BookOpen,
  'bar-chart-2': BarChart2,
  'table-2': Table2,
  'code-2': Code2,
  'bar-chart': BarChart,
  smartphone: Smartphone,
  binary: Binary,
  'file-json': FileJson,
  brush: Brush,
  'brain-circuit': BrainCircuit,
  python: Terminal,
  database: Database,
  server: Server,
  'file-spreadsheet': FileSpreadsheet,
  blocks: Blocks,
  palette: Palette,
  cloud: Cloud,
  github: Github,
  linux: Link,
  terminal: Terminal,
  laptop: Laptop2,
  cpu: Cpu,
};

const categoryConfig = {
  'UI/UX and Diagram Design': { icon: Layout, color: 'text-purple-400' },
  'Tools and Analytics': { icon: BarChart, color: 'text-pink-400' },
  'Frontend Development & Languages': { icon: Code2, color: 'text-blue-400' },
  'Creative Skills': { icon: Paintbrush, color: 'text-yellow-400' },
  'Backend Development': { icon: Database, color: 'text-green-400' },
  'Cloud & DevOps': { icon: Cloud, color: 'text-orange-400' },
};

const getIcon = (iconName) => {
  const Icon = iconMap[iconName] ?? Code2;
  return <Icon className="w-4 h-4" />;
};

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <div className='group relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20'>
    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer'></div>
    <div className='p-6 relative z-10'>
      <div className='flex items-center gap-4 mb-6'>
        <div className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className='w-8 h-8' />
        </div>
        <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
          {title}
        </h3>
      </div>
      <div className='flex flex-wrap gap-2'>
        {skills.map((skill, index) => (
          <div
            key={index}
            className='group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border border-gray-600 rounded-lg flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20'
          >
            {skill.icon}
            <span className='font-medium'>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkillsSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('name, category, proficiency, icon, sort_order')
        .order('sort_order', { ascending: true });

      if (!error && data) {
        const grouped = data.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push({ name: skill.name, icon: getIcon(skill.icon) });
          return acc;
        }, {});

        const built = Object.entries(grouped).map(([title, skills]) => ({
          icon: categoryConfig[title]?.icon ?? Code2,
          title,
          color: categoryConfig[title]?.color ?? 'text-blue-400',
          skills,
        }));

        setCategories(built);
      }
      setLoading(false);
    };
    fetchSkills();
  }, []);

  return (
    <main id="skills" className='pt-15 lg:pt-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen scroll-mt-24'>
      <section className='container mx-auto px-4 py-11'>
        <div className='flex justify-center items-center mb-12 w-full overflow-hidden'>
          <div className='w-full max-w-lg'>
            <IconCloudDemo />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {categories.map((category, index) => (
              <SkillCard
                key={index}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
                color={category.color}
              />
            ))}
          </div>
        )}
      </section>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </main>
  );
};

export default SkillsSection;
