import { useState, useEffect, useRef } from 'react';
import { FiTerminal, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { personalInfo, skills, projects, experiences } from '../data/portfolioData';

export default function InteractiveTerminalCard() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Rajesh Patankar Interactive Console [Version 1.0.2]' },
    { type: 'system', content: 'Type "help" to list commands, or select them to see details.' },
    { type: 'system', content: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newCmdHistory = [...cmdHistory, trimmed];
    setCmdHistory(newCmdHistory);
    setHistoryIndex(newCmdHistory.length);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = [];

    switch (command) {
      case 'help':
        output = [
          { type: 'system', content: 'Available commands:' },
          { type: 'desc', content: '  about        Show bio details & locations' },
          { type: 'desc', content: '  skills       List categorized tech competencies' },
          { type: 'desc', content: '  projects     Print portfolio projects list' },
          { type: 'desc', content: '  experience   Display details of MERN internships' },
          { type: 'desc', content: '  social       Print LinkedIn, GitHub, & email' },
          { type: 'desc', content: '  clear        Clear console terminal log' }
        ];
        break;

      case 'about':
        output = [
          { type: 'system', content: `Name:      ${personalInfo.name}` },
          { type: 'system', content: `Location:  ${personalInfo.location}` },
          { type: 'system', content: `Bio:       ${personalInfo.bio}` }
        ];
        break;

      case 'skills':
        output = [{ type: 'system', content: 'Technical Stack Overview:' }];
        Object.entries(skills).forEach(([category, items]) => {
          output.push({ type: 'category', content: `  [${category}]` });
          items.forEach(skill => {
            output.push({ type: 'system', content: `    ${skill.name} - ${skill.level}% (${skill.label})` });
          });
        });
        break;

      case 'projects':
        if (args.length > 0) {
          const index = parseInt(args[0]) - 1;
          if (index >= 0 && index < projects.length) {
            const p = projects[index];
            output = [
              { type: 'system', content: `Title:       ${p.title}` },
              { type: 'system', content: `Category:    ${p.category}` },
              { type: 'system', content: `Description: ${p.description}` },
              { type: 'system', content: `Tech:        ${p.tech.join(', ')}` },
              { type: 'link', content: `Live Demo:   ${p.live}`, url: p.live },
              { type: 'link', content: `GitHub URL:  ${p.github}`, url: p.github }
            ];
          } else {
            output = [{ type: 'error', content: `Index out of range (1 - ${projects.length}). Usage: projects [index]` }];
          }
        } else {
          output = [{ type: 'system', content: 'Projects List:' }];
          projects.forEach((p, idx) => {
            output.push({ type: 'system', content: `  [${idx + 1}] ${p.title} - ${p.category}` });
          });
          output.push({ type: 'desc', content: '  Type "projects [num]" to inspect detailed links.' });
        }
        break;

      case 'experience':
        output = [{ type: 'system', content: 'MERN Stack Work Timeline:' }];
        experiences.forEach(exp => {
          output.push({ type: 'category', content: `  * ${exp.role} - ${exp.company}` });
          output.push({ type: 'system', content: `    Duration: ${exp.duration} | Location: ${exp.location}` });
          exp.points.forEach(pt => {
            output.push({ type: 'desc', content: `      - ${pt}` });
          });
        });
        break;

      case 'social':
        output = [
          { type: 'system', content: 'Profiles:' },
          { type: 'link', content: `  GitHub:   ${personalInfo.github}`, url: personalInfo.github },
          { type: 'link', content: `  LinkedIn: ${personalInfo.linkedin}`, url: personalInfo.linkedin },
          { type: 'link', content: `  Email:    ${personalInfo.email}`, url: `mailto:${personalInfo.email}` }
        ];
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = [{ type: 'error', content: `Command not recognized: "${command}". Type "help" for a list.` }];
    }

    setHistory(prev => [
      ...prev,
      { type: 'user', content: `$ ${trimmed}` },
      ...output,
      { type: 'system', content: '' }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else {
        setHistoryIndex(cmdHistory.length);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const options = ['help', 'about', 'skills', 'projects', 'experience', 'social', 'clear'];
      const match = options.find(o => o.startsWith(inputVal.toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <section id="terminal" className="section-padding" style={{ background: '#0a0a0f', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div className="section-divider" />
          <h2 className="section-title">Developer Console</h2>
          <p className="section-subtitle">Interact with my portfolio directly using shell commands</p>
        </div>

        {/* Console Container Window */}
        <div 
          onClick={handleConsoleClick}
          style={{
            background: '#040406',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
            display: 'flex',
            flexDirection: 'column',
            height: '420px',
            cursor: 'text',
          }}
        >
          {/* Console Top Window Header */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 600 }}>
              bash - rajesh@patankar-port
            </span>
            <div style={{ width: '38px' }} />
          </div>

          {/* Console Text Logger Box */}
          <div style={{
            flexGrow: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '0.85rem',
            color: '#34d399', // Emerald terminal color
            lineHeight: 1.45,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ flexGrow: 1 }}>
              {history.map((line, idx) => {
                if (line.type === 'user') {
                  return <div key={idx} style={{ color: '#ffffff', fontWeight: 'bold' }}>{line.content}</div>;
                }
                if (line.type === 'error') {
                  return <div key={idx} style={{ color: '#ef4444' }}>{line.content}</div>;
                }
                if (line.type === 'category') {
                  return <div key={idx} style={{ color: '#60a5fa', fontWeight: 'bold', marginTop: '0.4rem' }}>{line.content}</div>;
                }
                if (line.type === 'desc') {
                  return <div key={idx} style={{ color: 'rgba(255,255,255,0.45)' }}>{line.content}</div>;
                }
                if (line.type === 'link') {
                  return (
                    <div key={idx}>
                      <a 
                        href={line.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {line.content}
                      </a>
                    </div>
                  );
                }
                return <div key={idx}>{line.content}</div>;
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#ffffff', marginTop: '0.4rem', fontWeight: 'bold' }}>
              <span style={{ color: '#34d399', marginRight: '0.55rem' }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flexGrow: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '0.85rem',
                  padding: 0,
                  caretColor: '#34d399',
                }}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
