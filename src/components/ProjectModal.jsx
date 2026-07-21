import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import { TechBadge } from './ui/TechBadge';
import { AnimatedDialogShell } from './ui/animated-dialog';
import { useImageCarousel } from '../hooks/useImageCarousel';

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

export const ProjectModal = ({
  title,
  description,
  technologies = [],
  images = [],
  demoUrl,
  githubUrl,
  isOpen,
  onOpenChange,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { activeIndex, direction, hasMultiple: hasMultipleImages, next: onNext, prev: onPrev, goTo: onSelect, reset } =
    useImageCarousel(images, { paused: !isOpen || isHovering });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isOpen || !hasMultipleImages) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') onNext();
      else if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasMultipleImages, onNext, onPrev]);

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
