import React from 'react';
import { Code2, Paintbrush, Database, Layout, Cloud, BarChart, Figma, Box, PenTool, FileStack, Activity, GitBranch, MonitorSmartphone, Laptop2, Brush, FileJson, Binary, BrainCircuit, Palette, FileSpreadsheet, Server, Phone as Python, Link as Linux, Github, Notebook as JupyterNotebook, BarChart2, Table2, Cpu, Blocks, Smartphone, BookOpen } from 'lucide-react';
import IconCloudDemo from './globe';

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
  const skillCategories = [
    {
      icon: Layout,
      title: 'UI/UX and Diagram Design',
      color: 'text-purple-400',
      skills: [
        { name: 'Figma', icon: <Figma className="w-4 h-4" /> },
        { name: 'Draw.io', icon: <Box className="w-4 h-4" /> },
        { name: 'Responsive Design', icon: <MonitorSmartphone className="w-4 h-4" /> },
        { name: 'Prototyping', icon: <PenTool className="w-4 h-4" /> },
        { name: 'Use Case', icon: <FileStack className="w-4 h-4" /> },
        { name: 'Activity Diagram', icon: <Activity className="w-4 h-4" /> },
        { name: 'Sequence Diagram', icon: <GitBranch className="w-4 h-4" /> },
        { name: 'Class Diagram', icon: <Box className="w-4 h-4" /> }
      ],
    },
    {
      icon: BarChart,
      title: 'Tools and Analytics',
      color: 'text-pink-400',
      skills: [
        { name: 'Jupyter Notebook', icon: <JupyterNotebook className="w-4 h-4" /> },
        { name: 'Power BI', icon: <BarChart2 className="w-4 h-4" /> },
        { name: 'Tableau', icon: <Table2 className="w-4 h-4" /> },
        { name: 'VS Code', icon: <Code2 className="w-4 h-4" /> },
        { name: 'Cursor', icon: <PenTool className="w-4 h-4" /> },
        { name: 'SAS Visual Analytics', icon: <BarChart className="w-4 h-4" /> },
        { name: 'Mobile Application', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'R Studio', icon: <BookOpen className="w-4 h-4" /> }
      ],
    },
    {
      icon: Code2,
      title: 'Frontend Development',
      color: 'text-blue-400',
      skills: [
        { name: 'React.js', icon: <Binary className="w-4 h-4" /> },
        { name: 'HTML5', icon: <FileJson className="w-4 h-4" /> },
        { name: 'CSS3', icon: <Brush className="w-4 h-4" /> },
        { name: 'Next.js', icon: <BrainCircuit className="w-4 h-4" /> },
        { name: 'TypeScript', icon: <FileJson className="w-4 h-4" /> }
      ],
    },
    {
      icon: Paintbrush,
      title: 'Creative Skills',
      color: 'text-yellow-400',
      skills: [
        { name: 'Content Management', icon: <FileStack className="w-4 h-4" /> },
        { name: 'Dynamic Content', icon: <Blocks className="w-4 h-4" /> },
        { name: 'Identifying Optimal Patterns', icon: <BrainCircuit className="w-4 h-4" /> },
        { name: 'UI Animation', icon: <Palette className="w-4 h-4" /> },
        { name: 'Advanced Microsoft Office', icon: <FileSpreadsheet className="w-4 h-4" /> }
      ],
    },
    {
      icon: Database,
      title: 'Backend Development',
      color: 'text-green-400',
      skills: [
        { name: 'MySQL', icon: <Database className="w-4 h-4" /> },
        { name: 'Laravel', icon: <Server className="w-4 h-4" /> },
        { name: 'Python', icon: <Python className="w-4 h-4" /> }
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      color: 'text-orange-400',
      skills: [
        { name: 'Cloudflare', icon: <Cloud className="w-4 h-4" /> },
        { name: 'Git', icon: <Github className="w-4 h-4" /> },
        { name: 'Linux', icon: <Linux className="w-4 h-4" /> }
      ],
    },
  ];

  return (
    <main className='pt-15 lg:pt-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen'>
      <section className='container mx-auto px-4 py-11'>
        <div className='flex justify-center items-center mb-12'>
          <IconCloudDemo />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
            />
          ))}
        </div>
      </section>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </main>
  );
};

export default SkillsSection;
