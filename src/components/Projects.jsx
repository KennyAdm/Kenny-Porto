import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { ExperienceCard } from './ExperienceCard';

// TODO: This section still uses hardcoded dark/cyan Tailwind classes (bg-gray-900/90,
// gradient cyan/blue/purple) instead of the semantic shadcn tokens defined in
// src/assets/css/index.css (--background, --card, --primary, etc). Migrate the whole
// app to the semantic tokens in one pass later, not section-by-section, to avoid
// visual drift between migrated and non-migrated sections in the meantime.

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
                technologies={Array.isArray(project.technologies) ? project.technologies : []}
                period={project.created_at?.slice(0, 4)}
                shortDescription={project.short_description}
                description={project.description}
                images={
                  Array.isArray(project.images) && project.images.length > 0
                    ? project.images
                    : [project.image_url, project.image_url_2].filter(Boolean)
                }
                demoUrl={project.demo_url}
                githubUrl={project.github_url}
                featured={Boolean(project.featured)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
