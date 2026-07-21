import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

// Radix dialog wrapped with framer-motion enter/exit transitions and the
// gradient-bordered dark shell used across project detail modals.
export const AnimatedDialogShell = ({ isOpen, onOpenChange, title, srDescription, contentClassName, children }) => {
  const dragControls = useDragControls();

  return (
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

                <motion.div
                  drag='y'
                  dragListener={false}
                  dragControls={dragControls}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 0.4 }}
                  onDragEnd={(_event, info) => {
                    if (info.offset.y > 100 || info.velocity.y > 500) onOpenChange(false);
                  }}
                  className={cn(
                    'relative bg-gray-900/95 border border-gray-800/50 rounded-lg shadow-2xl backdrop-blur-xl overflow-hidden',
                    contentClassName
                  )}
                >
                  <div
                    className='sm:hidden w-10 h-1.5 rounded-full bg-gray-600 mx-auto mt-2 mb-1 touch-none cursor-grab active:cursor-grabbing'
                    onPointerDown={(event) => dragControls.start(event)}
                    aria-hidden='true'
                  />

                  <DialogPrimitive.Close asChild>
                    <button
                      type='button'
                      className='absolute top-3 right-3 z-30 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-900/90 border border-gray-700/70 text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors'
                      aria-label='Tutup'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </DialogPrimitive.Close>

                  {children}
                </motion.div>
              </div>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  </DialogPrimitive.Root>
  );
};
