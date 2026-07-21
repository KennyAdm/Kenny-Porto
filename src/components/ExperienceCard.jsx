import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TechBadge } from './ui/TechBadge';
import { ProjectModal } from './ProjectModal';
import { useImageCarousel } from '../hooks/useImageCarousel';
import { cn } from '../lib/utils';

const TECH_PREVIEW_LIMIT = 6;

export const ExperienceCard = ({
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
  const [techExpanded, setTechExpanded] = useState(false);
  const [techPinned, setTechPinned] = useState(false);

  const {
    activeIndex: previewIndex,
    hasMultiple: hasMultiplePreviewImages,
    next: goToNextPreview,
    prev: goToPrevPreview,
  } = useImageCarousel(images, { paused: isOpen });

  const showAllTech = techExpanded || techPinned;
  const hasHiddenTech = technologies.length > TECH_PREVIEW_LIMIT;
  const visibleTech = showAllTech ? technologies : technologies.slice(0, TECH_PREVIEW_LIMIT);
  const hiddenTechCount = technologies.length - TECH_PREVIEW_LIMIT;
  const previewText = shortDescription || description;

  const openModal = () => setIsOpen(true);

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal();
    }
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
      />
    </div>
  );
};
