import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import profileImage from '../assets/images/profile.png';
import '../assets/css/portfolio.css';

const PortfolioPage = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  // Skills to highlight in the text
  const highlightedSkills = [
    'software engineer',
    'cloud computing',
    'DevOps',
    'continuous learning',
    'analytical problem-solving',
    'leadership',
    'teamwork',
    'adaptability',
    'strategic thinking',
  ];

  // Function to highlight skills in text
  const highlightText = (text) => {
    let result = text;
    highlightedSkills.forEach((skill) => {
      const regex = new RegExp(`\\b${skill}\\b`, 'gi');
      result = result.replace(regex, (match) => `<span class="skill-highlight">${match}</span>`);
    });
    return result;
  };

  const description = `I am Kenny Adam, an Information Systems student with a specialization in Big Data Analytics. I am passionate about data-driven solutions, with expertise in data analysis, visualization, and business intelligence. Skilled in handling large datasets, I turn complex information into valuable insights.

Beyond academics, I actively develop my leadership, problem-solving, and adaptability through organizational activities and professional training. Committed to continuous learning, I strive to drive innovation and strategic decision-making in the digital era.`;

  return (
    <section className='about-section bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white py-16 flex items-center justify-center'>
      <motion.div
        ref={ref}
        className='container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 justify-center'
        variants={containerVariants}
        initial='hidden'
        animate={controls}
      >
        <motion.div className='content max-w-2xl' variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <motion.h2
              className='text-[#4ECCA3] text-2xl md:text-3xl font-bold mb-6 inline-block'
              whileHover={{ scale: 1.05, color: '#5FDDBD' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              WHO I AM?
            </motion.h2>
          </motion.div>

          <motion.div className='text-container relative overflow-hidden' variants={itemVariants}>
            <p
              className='text-base md:text-lg lg:text-lg leading-relaxed text-gray-200 tracking-wide'
              dangerouslySetInnerHTML={{ __html: highlightText(description) }}
            />

            <motion.div className='mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3' variants={itemVariants}>
              {['Innovative', 'Analytical', 'Problem-Solver', 'Multi-Tasking', 'Quick Learner', 'Trustworthy'].map(
                (trait, index) => (
                  <motion.div
                    key={index}
                    className='trait-card'
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 209, 197, 0.2)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {trait}
                  </motion.div>
                ),
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className='image-container' variants={imageVariants}>
          <motion.div
            className='profile-image-container'
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className='profile-image-glow'></div>
            <img src={profileImage} alt='Profile' className='profile-image' />
            <div className='profile-image-border'></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PortfolioPage;
