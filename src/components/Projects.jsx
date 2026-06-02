import React, { useEffect, useState } from 'react';
import { Code2, Activity, Database, Briefcase } from 'lucide-react';
import { supabase } from '../supabase';

const iconMap = { Code2, Activity, Database, Briefcase };

const ExperienceCard = ({ title, company, period, description, images = [] }) => (
  <div className='group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
    <div className='absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg' />
    <div className='absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500' />
    <div className='relative bg-gray-900/90 rounded-lg p-4 sm:p-6 md:p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl'>
      <div className='space-y-3'>
        <h3 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          {title}
        </h3>
        <div className='flex justify-between items-center text-gray-300'>
          <span className='font-semibold text-blue-400'>{company}</span>
          <span className='text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full'>{period}</span>
        </div>
        <p className='text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed'>{description}</p>
        {images.length > 0 && (
          <div className='mt-6 grid grid-cols-2 gap-4'>
            {images.map((image, index) => (
              <div key={index} className='relative group/image overflow-hidden rounded-lg aspect-video'>
                <img src={image} alt={`${title} image ${index + 1}`} className='w-full h-full object-cover transform transition-transform duration-300 group-hover/image:scale-110' />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const ExperienceSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (!error) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div id="projects" className='min-h-screen bg-gradient-to-b relative overflow-hidden pt-32 pb-20 scroll-mt-24'>
      <div className='absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90' />
      <div className='relative container mx-auto px-4 sm:px-6 mt-10'>
        <div className='flex flex-col items-center space-y-8 mb-20'>
          <h2 className='text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center pb-3'>
            Kenny Adam's Projects
          </h2>
          <p className='text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl'>
            "Whatever you do, work at it with all your heart, as if you were working for the Lord, not for human masters." – Colossians 3:23
          </p>
        </div>
        {loading ? (
          <p className='text-center text-gray-400'>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className='text-center text-gray-400'>No projects yet.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto'>
            {projects.map((project) => (
              <ExperienceCard
                key={project.id}
                title={project.title}
                company={Array.isArray(project.technologies) 
                  ? project.technologies.join(', ') 
                  : ''}
                period={project.created_at?.slice(0, 4)}
                description={project.description}
                images={[
                  project.image_url, 
                  project.image_url_2
                ].filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;