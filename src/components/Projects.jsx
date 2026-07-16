import React, { useCallback, useEffect, useState } from 'react';
import { Code2, Activity, Database, Briefcase, ChevronLeft, ChevronRight, X, ExternalLink, Github } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../supabase';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import { getTechIcon } from '../lib/tech-icons';

// TODO: This section still uses hardcoded dark/cyan Tailwind classes (bg-gray-900/90,
// gradient cyan/blue/purple) instead of the semantic shadcn tokens defined in
// src/assets/css/index.css (--background, --card, --primary, etc). Migrate the whole
// app to the semantic tokens in one pass later, not section-by-section, to avoid
// visual drift between migrated and non-migrated sections in the meantime.

const TECH_PREVIEW_LIMIT = 6;

const TechBadge = ({ name }) => {
  const Icon = getTechIcon(name);
  return (
    <span className='inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-xs font-mono text-blue-300'>
      <Icon size={14} className='shrink-0' />
      {name}
    </span>
  );
};

const iconMap = { Code2, Activity, Database, Briefcase };

const slideVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? '25%' : '-25%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction >= 0 ? '-25%' : '25%',
    opacity: 0,
  }),
};

const AnimatedDialogShell = ({ isOpen, onOpenChange, title, srDescription, contentClassName, children }) => (
  <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              className='fixed inset-0 z-50 bg-black/90 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content asChild forceMount>
            <motion.div
              className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => onOpenChange(false)}
            >
              <DialogPrimitive.Title className='sr-only'>{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className='sr-only'>{srDescription}</DialogPrimitive.Description>

              <div className='relative' onClick={(event) => event.stopPropagation()}>
                <div className='pointer-events-none absolute -inset-[1px] rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60' />

                <div
                  className={cn(
                    'relative bg-gray-900/95 border border-gray-800/50 rounded-lg shadow-2xl backdrop-blur-xl overflow-hidden',
                    contentClassName
                  )}
                >
                  <DialogPrimitive.Close asChild>
                    <button
                      type='button'
                      className='absolute top-3 right-3 z-20 p-2 rounded-full bg-gray-900/80 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors'
                      aria-label='Tutup'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </DialogPrimitive.Close>

                  {children}
                </div>
              </div>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  </DialogPrimitive.Root>
);

const ProjectModal = ({
  title,
  description,
  technologies = [],
  images = [],
  demoUrl,
  githubUrl,
  isOpen,
  onOpenChange,
  activeIndex,
  direction,
  onNext,
  onPrev,
  onSelect,
}) => {
  const hasMultipleImages = images.length > 1;
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isOpen || !hasMultipleImages) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') onNext();
      else if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasMultipleImages, onNext, onPrev]);

  useEffect(() => {
    if (!isOpen || !hasMultipleImages || isHovering) return undefined;
    const timer = setInterval(onNext, 4000);
    return () => clearInterval(timer);
  }, [isOpen, hasMultipleImages, isHovering, onNext, activeIndex]);

  return (
    <AnimatedDialogShell
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      srDescription={`Detail lengkap project ${title}`}
      contentClassName='w-full max-w-3xl max-h-[90vh] overflow-y-auto'
    >
      {images.length > 0 && (
        <div
          className='relative w-full h-64 sm:h-80 md:h-96 bg-[#020617] overflow-hidden'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {hasMultipleImages && (
            <>
              <button
                type='button'
                onClick={onPrev}
                className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-gray-900/80 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors'
                aria-label='Gambar sebelumnya'
              >
                <ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6' />
              </button>
              <button
                type='button'
                onClick={onNext}
                className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-gray-900/80 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors'
                aria-label='Gambar berikutnya'
              >
                <ChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
              </button>
            </>
          )}

          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${title} image ${activeIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='absolute inset-0 w-full h-full object-contain'
            />
          </AnimatePresence>

          {hasMultipleImages && (
            <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-2'>
              {images.map((_, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => onSelect(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ke gambar ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className='flex flex-col gap-5 p-6 sm:p-8'>
        <h3 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent pr-8'>
          {title}
        </h3>
        <p className='text-gray-300 leading-relaxed whitespace-pre-line'>{description}</p>

        {technologies.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {technologies.map((tech, index) => (
              <TechBadge key={`${tech}-${index}`} name={tech} />
            ))}
          </div>
        )}

        {(demoUrl || githubUrl) && (
          <div className='flex flex-wrap items-center gap-3 pt-5 border-t border-gray-800/50'>
            {demoUrl && (
              <Button
                asChild
                size='sm'
                className='bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] hover:scale-105 transition-all duration-300'
              >
                <a href={demoUrl} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink />
                  Live Demo
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button
                asChild
                size='sm'
                variant='outline'
                className='bg-white/5 text-gray-200 border-gray-700/60 hover:bg-white/10 hover:text-white hover:border-gray-500 hover:scale-105 transition-all duration-300'
              >
                <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
                  <Github />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </AnimatedDialogShell>
  );
};

const ExperienceCard = ({
  title,
  technologies = [],
  period,
  shortDescription,
  description,
  images = [],
  demoUrl,
  githubUrl,
  featured = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [techExpanded, setTechExpanded] = useState(false);
  const [techPinned, setTechPinned] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const hasMultiplePreviewImages = images.length > 1;

  useEffect(() => {
    if (!hasMultiplePreviewImages || isOpen) return undefined;
    const timer = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hasMultiplePreviewImages, isOpen, images.length, previewIndex]);

  const goToNextPreview = (event) => {
    event.stopPropagation();
    setPreviewIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevPreview = (event) => {
    event.stopPropagation();
    setPreviewIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showAllTech = techExpanded || techPinned;
  const hasHiddenTech = technologies.length > TECH_PREVIEW_LIMIT;
  const visibleTech = showAllTech ? technologies : technologies.slice(0, TECH_PREVIEW_LIMIT);
  const hiddenTechCount = technologies.length - TECH_PREVIEW_LIMIT;
  const previewText = shortDescription || description;

  const openModal = () => {
    setDirection(0);
    setActiveIndex(0);
    setIsOpen(true);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal();
    }
  };

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const selectSlide = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div className='group relative h-full overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
      <div className='absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg' />
      <div className='absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500' />
      <div
        role='button'
        tabIndex={0}
        onClick={openModal}
        onKeyDown={handleCardKeyDown}
        aria-label={`Lihat detail project ${title}`}
        className={cn(
          'relative flex flex-col h-full bg-gray-900/90 rounded-lg p-4 sm:p-6 md:p-8 border shadow-xl backdrop-blur-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
          featured ? 'border-cyan-500/40' : 'border-gray-800/50'
        )}
      >
        {featured && (
          <Badge
            variant='outline'
            className='absolute top-3 right-3 z-10 border-cyan-400/50 bg-cyan-500/10 text-cyan-300 backdrop-blur-sm'
          >
            Featured
          </Badge>
        )}

        <div className='flex flex-col flex-1 gap-4'>
          <div className='space-y-3'>
            <h3
              className={cn(
                'text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent',
                featured && 'pr-24'
              )}
            >
              {title}
            </h3>
            <div className='flex flex-wrap items-start justify-between gap-2 text-gray-300'>
              <div
                className='flex flex-wrap items-center gap-1.5'
                onMouseEnter={() => setTechExpanded(true)}
                onMouseLeave={() => setTechExpanded(false)}
              >
                {visibleTech.map((tech, index) => (
                  <TechBadge key={`${tech}-${index}`} name={tech} />
                ))}
                {hasHiddenTech && (
                  <button
                    type='button'
                    onClick={(event) => {
                      event.stopPropagation();
                      setTechPinned((prev) => !prev);
                    }}
                    aria-expanded={showAllTech}
                    className='inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-xs font-mono text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-colors'
                  >
                    {showAllTech ? 'Lebih sedikit' : `+${hiddenTechCount} lainnya`}
                  </button>
                )}
              </div>
              <span className='shrink-0 text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full'>{period}</span>
            </div>
          </div>

          {previewText && (
            <p className='text-gray-300 border-l-4 border-blue-500/50 pl-4 leading-relaxed line-clamp-3'>
              {previewText}
            </p>
          )}

          {images.length > 0 && (
            <div className='relative w-full overflow-hidden rounded-lg aspect-video'>
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${title} preview ${index + 1}`}
                  className={cn(
                    'absolute inset-0 w-full h-full object-cover transform transition-opacity duration-700 ease-in-out group-hover:scale-110',
                    index === previewIndex ? 'opacity-100' : 'opacity-0'
                  )}
                />
              ))}
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
              {hasMultiplePreviewImages && (
                <>
                  <button
                    type='button'
                    onClick={goToPrevPreview}
                    className='absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-gray-900/70 border border-gray-700/50 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors duration-200'
                    aria-label='Gambar sebelumnya'
                  >
                    <ChevronLeft className='w-4 h-4' />
                  </button>
                  <button
                    type='button'
                    onClick={goToNextPreview}
                    className='absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-gray-900/70 border border-gray-700/50 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors duration-200'
                    aria-label='Gambar berikutnya'
                  >
                    <ChevronRight className='w-4 h-4' />
                  </button>
                </>
              )}
              {hasMultiplePreviewImages && (
                <div className='absolute bottom-2 left-0 right-0 flex justify-center gap-1.5'>
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        index === previewIndex ? 'w-4 bg-cyan-400' : 'w-1.5 bg-white/40'
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {(demoUrl || githubUrl) && (
            <div className='mt-auto flex flex-wrap items-center gap-3 pt-2'>
              {demoUrl && (
                <Button
                  asChild
                  size='sm'
                  className='bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] hover:scale-105 transition-all duration-300'
                >
                  <a href={demoUrl} target='_blank' rel='noopener noreferrer' onClick={(event) => event.stopPropagation()}>
                    <ExternalLink />
                    Live Demo
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button
                  asChild
                  size='sm'
                  variant='outline'
                  className='bg-white/5 text-gray-200 border-gray-700/60 hover:bg-white/10 hover:text-white hover:border-gray-500 hover:scale-105 transition-all duration-300'
                >
                  <a href={githubUrl} target='_blank' rel='noopener noreferrer' onClick={(event) => event.stopPropagation()}>
                    <Github />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        title={title}
        description={description}
        technologies={technologies}
        images={images}
        demoUrl={demoUrl}
        githubUrl={githubUrl}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        activeIndex={activeIndex}
        direction={direction}
        onNext={goNext}
        onPrev={goPrev}
        onSelect={selectSlide}
      />
    </div>
  );
};

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
