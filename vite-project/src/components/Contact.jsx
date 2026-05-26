import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

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
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.82rem 1rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.38rem' };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Let&apos;s connect
          </p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider" />
          <p className="section-subtitle">I&apos;m currently open to new opportunities — reach out, I&apos;d love to chat!</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', maxWidth: '880px', margin: '0 auto', alignItems: 'start' }}>
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    required placeholder="John Doe" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    required placeholder="john@example.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    required rows={5} placeholder="Hi Rajesh, I'd like to talk about..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>

                <button type="submit" className="btn-accent" disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', padding: '0.88rem', fontSize: '0.92rem', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? 'Sending...' : <><FiSend size={15} /> Send Message</>}
                </button>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.9rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--text-status)', color: 'var(--text-status)', fontSize: '0.84rem' }}>
                    <FiCheckCircle size={15} /> Message sent! I&apos;ll reply soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.9rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--text-error)', color: 'var(--text-error)', fontSize: '0.84rem' }}>
                    <FiAlertCircle size={15} /> Add your EmailJS credentials to enable this form.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>Let&apos;s build something great</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                Whether you&apos;re looking for a full-stack developer, want to collaborate on a project, or just want to say hi — my inbox is always open.
              </p>
            </div>

            {socials.map((s, i) => (
              <motion.a key={s.label} href={s.href}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.9rem',
                  padding: '0.9rem 1.1rem', borderRadius: '10px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                onHoverStart={e => { }}
                whileHover={{ x: 4, borderColor: 'var(--accent)' }}
              >
                <div style={{
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-accent)', flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.label}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.value}</p>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>→</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
