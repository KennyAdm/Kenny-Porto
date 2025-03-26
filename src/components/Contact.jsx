import React, { useState } from 'react';
import { Send, Phone, MapPin, Mail, Instagram, Loader2 } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    if (!validateForm()) {
      setStatus('Please fill in all required fields correctly.');
      setIsLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append('access_key', '7cb5c758-0657-430a-a4fa-17b327f2de72');
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('subject', formData.subject);
      form.append('message', formData.message);
      form.append('to_email', 'kennyadam017@gmail.com'); // Add your email as recipient

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully! I will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setErrors({});
      } else {
        setStatus(result.message || 'There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='pt-20 lg:pt-[0rem] bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen'>
      <section className='hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Contact Info */}
            <div className='space-y-8'>
              <div>
                <h2 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                  Get in Touch
                </h2>
                <p className='text-gray-300 text-lg'>Have a question or want to work together? Drop me a message!</p>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center space-x-4'>
                  <div className='bg-purple-500/10 p-3 rounded-lg'>
                    <Mail className='w-6 h-6 text-purple-400' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Email</h3>
                    <p className='text-gray-400'>kennyadam017@gmail.com</p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='bg-blue-500/10 p-3 rounded-lg'>
                    <a href="https://www.linkedin.com/in/kenny-adam/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className='w-6 h-6 text-blue-400' />
                    </a>
                  </div>
                  <div>
                    <h3 className='font-semibold'>LinkedIn</h3>
                    <p className='text-gray-400'>
                      <a href="https://www.linkedin.com/in/kenny-adam/" className="hover:text-blue-400 transition-colors">
                        Kenny Adam
                      </a>
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='bg-pink-500/10 p-3 rounded-lg'>
                    <MapPin className='w-6 h-6 text-pink-400' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Location</h3>
                    <p className='text-gray-400'>Jakarta, Indonesia</p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='bg-rose-500/10 p-3 rounded-lg'>
                    <a href="https://www.instagram.com/kennyadm_/" target="_blank" rel="noopener noreferrer">
                      <Instagram className='w-6 h-6 text-rose-400' />
                    </a>
                  </div>
                  <div>
                    <h3 className='font-semibold'>Instagram</h3>
                    <p className='text-gray-400'>
                      <a href="https://www.instagram.com/kennyadm_/" className="hover:text-rose-400 transition-colors">
                        @kennyadm_
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl border border-gray-800/50'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 gap-6'>
                  <div>
                    <input
                      type='text'
                      placeholder='Your Name'
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.name ? 'border-red-500' : 'border-gray-700'
                      } focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isLoading}
                    />
                    {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type='email'
                      placeholder='Your Email'
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-gray-700'
                      } focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isLoading}
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type='text'
                      placeholder='Subject'
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.subject ? 'border-red-500' : 'border-gray-700'
                      } focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400`}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      disabled={isLoading}
                    />
                    {errors.subject && <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      placeholder='Your Message'
                      rows='4'
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.message ? 'border-red-500' : 'border-gray-700'
                      } focus:border-blue-500 focus:outline-none transition-colors resize-none text-white placeholder-gray-400`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isLoading}
                    ></textarea>
                    {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className='w-4 h-4' />
                    </>
                  )}
                </button>
              </form>

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-4 p-4 rounded-lg text-center ${
                    status.includes('success')
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  <p>{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
