import React, { useEffect, useState } from 'react';
import { Code2, Activity, Database, Briefcase } from 'lucide-react';
import { supabase } from '../supabase';

const ExperienceCard = ({ position, company, period, description, images = [] }) => (
  <div className='group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
    <div className='absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg' />
    <div className='absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500' />
    <div className='relative bg-gray-900/90 rounded-lg p-4 sm:p-6 md:p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl'>
      <div className='relative mb-6'>
        <div className='absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25 rounded-full blur-xl group-hover:opacity-75 animate-pulse transition-all duration-500' />
        <Briefcase className='w-12 h-12 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300' />
      </div>
      <div className='space-y-3'>
        <h3 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          {position}
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
                <img src={image} alt={`${position} image ${index + 1}`} className='w-full h-full object-cover transform transition-transform duration-300 group-hover/image:scale-110' />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300' />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='absolute top-4 right-4 w-20 h-20'>
        <div className='absolute top-0 right-0 w-6 h-[2px] bg-cyan-500/50' />
        <div className='absolute top-0 right-0 w-[2px] h-6 bg-cyan-500/50' />
      </div>
      <div className='absolute bottom-4 left-4 w-20 h-20'>
        <div className='absolute bottom-0 left-0 w-6 h-[2px] bg-purple-500/50' />
        <div className='absolute bottom-0 left-0 w-[2px] h-6 bg-purple-500/50' />
      </div>
    </div>
  </div>
);

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error) setExperiences(data);
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  return (
    <div id="experience" className='min-h-screen bg-gradient-to-b relative overflow-hidden pt-32 pb-20 scroll-mt-24'>
      <div className='absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90' />
      <div className='relative container mx-auto px-4 sm:px-6 mt-10'>
        <div className='flex flex-col items-center space-y-8 mb-20'>
          <div className='relative'>
            <h2 className='text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center pb-3'>
              Kenny Adam's Journey
            </h2>
          </div>
          <p className='text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl'>
            Professional experience and organizational roles that shaped my growth in data and technology.
          </p>
        </div>
        {loading ? (
          <p className='text-center text-gray-400'>Loading experiences...</p>
        ) : experiences.length === 0 ? (
          <p className='text-center text-gray-400'>No experiences yet.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl mx-auto'>
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                position={exp.position}
                company={exp.company}
                period={`${exp.start_date?.slice(0, 7)} - ${exp.is_current ? 'Present' : exp.end_date?.slice(0, 7)}`}
                description={exp.description}
                images={[exp.image_url, exp.image_url_2].filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
      <div className='absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse' />
      <div className='absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000' />
    </div>
  );
};

export default ExperienceSection;