import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';


const socials = [
  { icon: <FiMail size={18} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: <FiLinkedin size={18} />, label: 'LinkedIn', value: 'Connect with me', href: personalInfo.linkedin },
  { icon: <FiGithub size={18} />, label: 'GitHub', value: `@${personalInfo.githubUsername}`, href: personalInfo.github },
];

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastSentTime = localStorage.getItem('lastEmailSentTime');
    const COOLDOWN_PERIOD = 60 * 1000; // 1 minute cooldown
    if (lastSentTime && Date.now() - parseInt(lastSentTime, 10) < COOLDOWN_PERIOD) {
      setStatus('ratelimited');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY });
      localStorage.setItem('lastEmailSentTime', Date.now().toString());
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClassName = "w-full py-3.5 px-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] text-[0.9rem] font-sans outline-none transition-colors duration-200 focus:border-[var(--accent)]";
  const labelClassName = "block text-[0.8rem] font-semibold text-[var(--text-secondary)] mb-1.5";

  return (
    <section id="contact" className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-center  font-semibold text-[0.68rem] tracking-widest uppercase mb-2">
            Let&apos;s connect
          </p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider" />
          <p className="section-subtitle">I&apos;m currently open to new opportunities — reach out, I&apos;d love to chat!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-4.5">
                <div>
                  <label className={labelClassName}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className={labelClassName}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className={labelClassName}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Hi Rajesh, I'd like to talk about..."
                    className={`${inputClassName} resize-vertical min-h-[120px]`}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-accent w-full justify-center py-3.5 text-[0.92rem] inline-flex items-center gap-2"
                  disabled={status === 'sending'}
                  style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending...' : <><FiSend size={15} /> Send Message</>}
                </button>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 py-3 px-4 rounded-lg bg-[var(--bg-card)] border border-[var(--text-status)] text-[var(--text-status)] text-[0.84rem]"
                  >
                    <FiCheckCircle size={15} /> Message sent! I&apos;ll reply soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 py-3 px-4 rounded-lg bg-[var(--bg-card)] border border-[var(--text-error)] text-[var(--text-error)] text-[0.84rem]"
                  >
                    <FiAlertCircle size={15} /> Add your EmailJS credentials to enable this form.
                  </motion.div>
                )}
                {status === 'ratelimited' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 py-3 px-4 rounded-lg bg-[var(--bg-card)] border border-[var(--text-error)] text-[var(--text-error)] text-[0.84rem]"
                  >
                    <FiAlertCircle size={15} /> Please wait a minute before sending another message.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="mb-2">
              <h3 className="text-[1.15rem] font-bold mb-2 text-[var(--text-primary)]">Let&apos;s build something great</h3>
              <p className="text-[var(--text-secondary)] text-[0.875rem] leading-relaxed">
                Whether you&apos;re looking for a full-stack developer, want to collaborate on a project, or just want to say hi — my inbox is always open.
              </p>
            </div>

            {socials.map((s, i) => (
              <motion.a key={s.label} href={s.href}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3.5 py-3.5 px-4.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] no-underline transition-all duration-200"
                whileHover={{ x: 4, borderColor: 'var(--accent)' }}
              >
                <div className="w-[38px] h-[38px] rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-accent)] shrink-0">
                  {s.icon}
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[0.85rem] text-[var(--text-primary)]">{s.label}</p>
                  <p className="text-[0.75rem] text-[var(--text-muted)]">{s.value}</p>
                </div>
                <div className="ml-auto text-[var(--text-muted)] text-[0.9rem]">→</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
