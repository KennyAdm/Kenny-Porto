import { getTechIcon } from '../../lib/tech-icons';

export const TechBadge = ({ name }) => {
  const Icon = getTechIcon(name);
  return (
    <span className='inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-xs font-mono text-blue-300'>
      <Icon size={14} className='shrink-0' />
      {name}
    </span>
  );
};
