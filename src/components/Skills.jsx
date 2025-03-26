import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IconCloudDemo from './globe';
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud, BarChart } from 'lucide-react';

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <Card className='group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20'>
    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer'></div>
    <CardContent className='p-6 relative z-10'>
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
          <Badge
            key={index}
            variant='outline'
            className='group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20'
          >
            <span className='font-medium'>{skill}</span>
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Layout,
      title: 'UI/UX and Diagram Design',
      color: 'text-purple-400',
      skills: [
        'Figma',
        'Draw.io',
        'Responsive Design',
        'Prototyping',
        'Use Case',
        'Activity Diagram',
        'Sequence Diagram',
        'Class Diagram'
      ],
    },
    {
      icon: BarChart,
      title: 'Tools and Analytics',
      color: 'text-pink-400',
      skills: [
        'Jupyter Notebook',
        'Power BI',
        'Tableau',
        'VS Code',
        'Cursor',
        'SAS Visual Analytics',
        'Mobile Application',
        'R Studio'
      ],
    },
    {
      icon: Code2,
      title: 'Frontend Development',
      color: 'text-blue-400',
      skills: [
        'React.js',
        'HTML5',
        'CSS3',
        'Next.js',
        'TypeScript'
      ],
    },
    {
      icon: Paintbrush,
      title: 'Creative Skills',
      color: 'text-yellow-400',
      skills: [
        'Content Management',
        'Dynamic Content',
        'Identifying Optimal Patterns for Analytics',
        'UI Animation',
        'Advanced Microsoft Office'
      ],
    },
    {
      icon: Database,
      title: 'Backend Development',
      color: 'text-green-400',
      skills: [
        'MySQL',
        'Laravel',
        'Python'
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      color: 'text-orange-400',
      skills: [
        'Cloudflare',
        'Git',
        'Linux'
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
