'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Ristina Eka Salsabila, S.kom',
    role: 'Tenaga Pendidik Bidang Sistem Aplikasi dan Service (SAAS)',
    text: 'Pelayanan sangat luar biasa! Prosesnya cepat, profesional, dan hasilnya jauh melampaui ekspektasi saya.',
    image: '/bila.jpeg',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    name: 'Muhammad Dzikri Fauzan, S.Kom',
    role: 'Developer, Ketua Program Keahlian SIJA',
    text: 'Tim ini benar-benar ahli di bidangnya. Komunikasi jelas, solusi tepat, dan hasil kerja berkualitas.',
    image: '/dzikri.jpg',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    id: 3,
    name: 'Fatimah Azzahra, S.Si',
    role: 'Tenaga Pendidik Bidang Design & Informatika',
    text: 'Pengalaman bekerja sama sangat menyenangkan. Saya pasti akan merekomendasikan ke rekan bisnis lainnya.',
    image: '/mimah.png',
    gradient: 'from-pink-500 to-rose-400',
  },
];

// Variant animations untuk framer-motion
const cardVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.95,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 80 : -80,
    scale: 0.95,
    transition: { duration: 0.3 },
  }),
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, type: 'spring', stiffness: 200 },
  },
};

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  const goToTestimonial = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
    setProgress(0);
  };

  // Progress bar animation for auto-rotate
  useEffect(() => {
    if (isPaused) return;

    const duration = 5000;
    const interval = 100;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextTestimonial();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [active, isPaused, nextTestimonial]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextTestimonial();
      if (e.key === 'ArrowLeft') prevTestimonial();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, prevTestimonial]);

  const current = testimonials[active];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">What People Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">Real experiences from clients and partners who have collaborated with us on various projects.</p>
        </motion.div>

        {/* Testimonial Card Container */}
        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Progress bar */}
          <div className="absolute -top-3 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-4 sm:mx-0">
            <motion.div className={`h-full bg-gradient-to-r ${current.gradient}`} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: 'linear', duration: 0.1 }} />
          </div>

          {/* Main Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={current.id}
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50"
            >
              {/* Quote Icon */}
              <motion.div variants={quoteVariants} initial="hidden" animate="visible" className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${current.gradient} text-white mb-6`}>
                <FaQuoteLeft className="text-lg" />
              </motion.div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 dark:text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 font-medium">&quot;{current.text}&quot;</blockquote>

              {/* Author Section */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} rounded-full blur-sm opacity-50`} />
                    <Image
                      src={current.image}
                      alt={current.name}
                      width={64}
                      height={64}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
                      priority={active === 0} // ✅ Load gambar pertama lebih cepat
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">{current.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-tight max-w-xs">{current.role}</p>
                  </div>
                </div>

                {/* Rating Stars (Optional) */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.5 6.91l6.572-.955L10 0l2.928 5.955 6.572.955-4.745 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="p-3 sm:p-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToTestimonial(index)}
                  className={`relative h-2 rounded-full transition-all duration-300 ${active === index ? `w-8 bg-gradient-to-r ${testimonials[index].gradient}` : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={active === index ? 'true' : 'false'}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="p-3 sm:p-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Counter */}
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
            <span className="font-semibold text-gray-700 dark:text-gray-200">{active + 1}</span> of {testimonials.length}
          </p>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-6 hidden sm:block">Use ← → arrow keys to navigate</p>
      </div>
    </section>
  );
}
