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
      icon: Activity,
      title: 'Classification Analysis Based on Heart Attack Risk Prediction Using Heart Disease Dataset',
      company: 'Data Analysis · Data Science · Python (Programming Language) · Machine Learning · Health',
      period: '2024',
      description:
      'In this project, I predicted heart attack risks using machine learning with a Kaggle dataset, implementing Random Forest, K-Nearest Neighbor (KNN), and Decision Tree algorithms. Utilizing Jupyter Notebook, I conducted data preprocessing, feature engineering, and visualization to identify key risk factors. The evaluation revealed that Random Forest achieved the highest accuracy at 63.6%, making it the most effective model for this analysis.'
    },
    {
      icon: Database,
      title: 'PROJECT MOBILE APPLICATION AND DEVELOPMENT "GASKUY APP"',
      company: 'Mobile Application Development, Android Studio, Java, XML, Firebase, MySQL',
      period: '2024',
      description:
      'In this project, my team and I developed the "Gas Kuy" mobile application to digitize gas cylinder agent businesses in Indonesia, replacing inefficient manual processes. The app simplifies gas ordering, enables real-time order tracking, and enhances operational efficiency through stock and customer data management features. Built using Android Studio, PHP, MySQL, and Figma, it provides a modern solution to improve transparency, reduce operational errors, and enhance customer experience.'
    },
    {
      icon: Database,
      title: 'Optimizing Property Data Management: ETL Implementation in Data Warehouses in the Property Industry',
      company: 'Data Engineering, Data Warehouse, ETL, Python (Programming Language), SQL',
      period: '2024',
      description:
      'This implements ETL processes to optimize property data management and support digital transformation. Using 2009–2022 sales data, technologies like Pentaho, MySQL, and Python provide valuable business insights. Analysis highlights a 72.9% dominance of "Single Family" properties and a strong correlation between Estimated Value and Sale Price, aiding marketing and investment strategies. The ETL-based Data Warehouse enhances operational efficiency and drives data-driven property management innovation.'
    },
    {
      icon: Code2,
      title: 'Analysis and Evaluation of Total Motorcycle Sales Prediction Model with Forest Model in SAS Visual Analytic',
      company: 'SAS (Software), Data Modeling, Business Process Improvement',
      period: '2024',
      description:'In this project, I analyzed and predicted motorcycle sales in Indonesia using SAS Visual Analytics and machine learning techniques such as Random Forest, Decision Tree, and Neural Network. Following the CRISP-DM methodology, I conducted data processing, analysis, and model evaluation, with Random Forest emerging as the most accurate model based on an ASE of 11,616.4284.'
    },
    {
      icon: Briefcase,
      title: 'Analysis Design of the Loan Book’s System in the UMN Library',
      company: 'User Interface Design, Figma (Software), Project Management',
      period: '2023',
      description:'The technology-based book loan system at the Multimedia Nusantara University (UMN) Library enhances lending efficiency using the Rapid Application Development (RAD) methodology. Key features include user-friendly navigation, automated borrowing and returning, and return deadline notifications. Developed with Draw.io for UML diagrams and Figma for UI/UX design, the system improved accessibility and efficiency. User Acceptance Testing (UAT) showed 94% effectiveness in optimizing loan procedures, addressing issues like book status visibility, return deadlines, and late fees.'
    },
    {
      icon: Activity,
      title: 'Optimizing Salary Prediction Models: A Comprehensive Evaluation Using Random Forest Regression',
      company: 'Data Modeling · Salary Review · Business Intelligence (BI)',
      period: '2024',
      description:
      'In this project, my team and I developed a salary prediction model using Random Forest Regression and the CRISP-DM methodology to ensure accuracy and fairness in employee compensation. Considering factors like age, experience, education, and job position, the model achieved an R² of 0.9419, demonstrating high predictive accuracy. Data analysis revealed that experience and age were the strongest predictors, while education had a moderate impact.'
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
                Kenny Adam's Projects
              </h2>
              <div className='absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full' />
            </div>
            <p className='text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl'>
            "Whatever you do, work at it with all your heart, as if you were working for the Lord, not for human masters." – Colossians 3:23
            </p>
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
