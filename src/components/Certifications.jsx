import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase";
import { Award, Calendar, ExternalLink, ShieldCheck, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const ImageModal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
};

const CertificationCard = ({ cert, hovered, onEnter, onLeave }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <motion.div
        variants={cardVariants}
        className={`relative border rounded-xl transition-all duration-300 bg-gray-900/50 backdrop-blur-sm overflow-hidden ${
          hovered ? "border-teal-500 scale-[1.02]" : "border-blue-400/20"
        }`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {cert.image_url && (
          <div
            className="relative w-full h-56 overflow-hidden cursor-zoom-in group/img"
            onClick={openModal}
          >
            <img
              src={cert.image_url}
              alt={cert.name}
              className="w-full h-full object-contain bg-gray-950 opacity-90 group-hover/img:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                <ZoomIn className="w-3.5 h-3.5" />
                Click to expand
              </div>
            </div>
          </div>
        )}

        <div className="p-7 space-y-5">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-teal-400 mt-0.5 shrink-0" />
              <h3 className="text-xl font-bold text-white leading-snug">{cert.name}</h3>
            </div>
            <p className="text-base text-teal-300 font-medium pl-9">{cert.issuer}</p>
          </div>

          <div className="flex flex-wrap gap-3 pl-9">
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              Issued {formatDate(cert.issue_date)}
            </span>
            {cert.expiry_date && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                Expires {formatDate(cert.expiry_date)}
              </span>
            )}
            {!cert.expiry_date && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20">
                No Expiry
              </span>
            )}
          </div>

          {cert.credential_url && (
            <div className="pl-9">
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-teal-400 transition-colors duration-200 group/link"
              >
                <Award className="w-4 h-4" />
                View Credential
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {modalOpen && (
        <ImageModal src={cert.image_url} alt={cert.name} onClose={closeModal} />
      )}
    </>
  );
};

const CertificationsSection = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("name, issuer, issue_date, expiry_date, credential_url, image_url, sort_order")
        .order("sort_order", { ascending: true });
      if (!error && data) setCerts(data);
      setLoading(false);
    };
    fetchCerts();
  }, []);

  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-32 bg-gradient-to-b from-[#000D1A]/90 via-[#0a0f1f] to-[#020617] scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6 pb-3">
            Certifications <span className="text-gray-300">| Kenny Adam</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Professional certifications and credentials earned through continuous learning and dedication.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : certs.length === 0 ? (
          <p className="text-center text-gray-500">No certifications yet.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certs.map((cert, index) => (
              <CertificationCard
                key={cert.name + index}
                cert={cert}
                hovered={hoveredIndex === index}
                onEnter={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
    </section>
  );
};

export default CertificationsSection;
