import React from 'react';
import { Code2, Activity, Cpu, Layers, Network, Binary, Database, BarChart3, Briefcase, Bolt } from 'lucide-react';

const ExperienceCard = ({ title, company, period, description, icon: Icon, images = [] }) => (
  <div className='group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
    {/* Glass morphism effect */}
    <div className='absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg' />

    {/* Animated gradient border */}
    <div className='absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500' />

    <div className='relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl'>
      {/* Floating icon with pulse effect */}
      <div className='relative mb-6'>
        <div className='absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25 rounded-full blur-xl group-hover:opacity-75 animate-pulse transition-all duration-500' />
        <Icon className='w-12 h-12 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300' />
      </div>

      {/* Content with improved typography */}
      <div className='space-y-3'>
        <h3 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          {title}
        </h3>
        <div className='flex justify-between items-center text-gray-300'>
          <span className='font-semibold text-blue-400'>{company}</span>
          <span className='text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full'>{period}</span>
        </div>
        <p className='text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed'>{description}</p>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className='mt-6 grid grid-cols-2 gap-4'>
            {images.map((image, index) => (
              <div key={index} className='relative group/image overflow-hidden rounded-lg'>
                <img
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  className='w-full h-48 object-cover transform transition-transform duration-300 group-hover/image:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300' />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative elements */}
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
  const experiences = [
    {
      icon: Code2,
      images: [
        '/OMB23/OMB2.png',
        '/OMB23/ombb.png',
      ],
      title: 'Event Planner',
      company: 'Orientasi Mahasiswa Baru UMN 2023',
      period: 'March 2023 - September 2023',
      description:
        'Actively contributed to designing creative event assignments to enhance the experience of approximately 2,000 new students. Successfully carried out assigned tasks with responsibility and efficiency according to designated roles. Participated in preparation meetings by providing input and reporting task progress. Additionally, assisted in resolving operational issues during the event to ensure smooth execution.',
    },
    {
      icon: Database,
      images: [
        '/seminar/seminar1.png',
        '/seminar/seminar2.png',
      ],
      title: 'Event Planner Coordinator',
      company: 'Information System Seminar',
      period: 'August 2023 - September 2023',
      description:
        'Led a team in planning and executing a seminar for 150+ participants, ensuring smooth operations and adherence to quality standards. Managed logistics, including venue setup and speaker coordination. Developed event timelines, delegated tasks, and supervised communications to ensure clarity and efficiency.',
    },
    {
      icon: Activity,
      images: [
        '/OMB24/gambar1.png',
        '/OMB24/gambar3.png',
      ],
      title: 'Event Planner Coordinator',
      company: 'Orientasi Mahasiswa Baru UMN 2024',
      period: 'Jan 2024 - Sept 2024',
      description:
        'Designed interactive and inclusive event concepts to enhance the experience of over 2,000 new participants at UMN. I coordinated with various organizational divisions to ensure all requirements were met during preparation, execution, and event days. With a team of 7 members, I effectively delegated tasks to ensure each aspect of the event ran according to schedule. During the event, I also addressed operational challenges with efficient and effective solutions.',
    },
    {
      icon: Briefcase,
      title: 'Data Engineer & Software Development Internship',
      company: 'PT. Solarion Energi Alam',
      period: 'February 2025 - July 2025 (Present)',
      description:
        'Developed internal web applications using HTML5, CSS3, JavaScript, and the Bootstrap framework to deliver responsive, user-friendly, and functional systems that streamlined internal operations. Collected, cleaned, and prepared datasets from multiple sources to ensure high-quality data for analysis and reporting, enabling more reliable insights and strategic planning. Analyzed hidden patterns and trends in data using Jupyter Notebook (Python) to support data-driven decision-making processes within various company projects. Designed and built interactive dashboards for internal company projects using Power BI, allowing stakeholders to monitor key metrics, visualize performance, and make timely business decisions.',
    },
  ];

  return (
    <>
      <div className='min-h-screen bg-gradient-to-b  relative overflow-hidden pt-32 pb-20'>
        {/* Animated gradient background */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90' />

        {/* Animated particles */}
        <div className='absolute inset-0'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float'
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className='relative container mx-auto px-6 mt-10'>
          {/* Section header with enhanced effects */}
          <div className='flex flex-col items-center space-y-8 mb-20'>
            <div className='relative'>
              <h2 className='text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center pb-3'>
                Kenny Adam's Journey
              </h2>
              <div className='absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full' />
            </div>
            <p className='text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl'>
            "Commit to the LORD whatever you do, and He will establish your plans." – Proverbs 16:3            </p>
          </div>

          {/* Experience grid with improved layout */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl mx-auto'>
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>

        {/* Enhanced background effects */}
        <div className='absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000' />
      </div>
    </>
  );
};

export default ExperienceSection;
