export default function Template2({ data = {} }) {
  // Helper functions to parse data
  const parseList = (text) => {
    if (!text) return [];
    return String(text)
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const parseExperience = (exp) => {
    if (!exp) return [];
    const experienceBlocks = exp.split('\n\n').filter(block => block.trim() !== '');
    return experienceBlocks.map(block => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) return null;
      
      const titleMatch = lines[0].match(/(.*?)\s+at\s+(.*?)(?:\s*\(([^)]+)\))?$/);
      const title = titleMatch ? titleMatch[1].trim() : lines[0].trim();
      const company = titleMatch?.[2]?.trim() || '';
      const period = titleMatch?.[3]?.trim() || '';
      
      const bullets = lines.slice(1)
        .map(line => line.replace(/^[-•*]\s*/, '').trim())
        .filter(line => line);
      
      return { title, company, period, bullets };
    }).filter(Boolean);
  };

  const parseEducation = (edu) => {
    if (!edu) return [];
    const educationBlocks = edu.split('\n\n').filter(block => block.trim() !== '');
    return educationBlocks.map(block => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) return null;
      
      const [degree, ...details] = lines[0].split(',').map(s => s.trim());
      const school = details.join(', ');
      const notes = lines.slice(1).map(line => line.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
      
      return { degree, school, notes };
    }).filter(Boolean);
  };

  // Parse data
  const skillsList = parseList(data.skills);
  const languagesList = parseList(data.languages);
  const interestsList = parseList(data.interests);
  const experienceList = parseExperience(data.experience);
  const educationList = parseEducation(data.education);
  const certificationsList = data.certifications ? data.certifications.split('\n').filter(Boolean) : [];

  // Styles
  // Styles object
  const styles = {
    container: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      padding: '20mm',
      backgroundColor: '#ffffff',
      color: '#2d3748',
      lineHeight: 1.6,
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    sidebar: {
      backgroundColor: '#f8f9fa',
      padding: '25px',
      borderRadius: '8px',
      height: 'fit-content'
    },
    main: {
      padding: '0 10px'
    },
    header: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #4a6fa5',
      paddingBottom: '15px'
    },
    name: {
      color: '#2c5282',
      margin: '0',
      fontSize: '24px',
      fontWeight: '700',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    },
    contact: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap',
      marginTop: '8px',
      fontSize: '12px',
      color: '#4a5568'
    },
    section: {
      marginBottom: '20px'
    },
    sectionTitle: {
      color: '#2c5282',
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '3px',
      marginBottom: '8px'
    },
    jobTitle: {
      fontWeight: '600',
      color: '#2d3748',
      margin: '0 0 3px 0',
      fontSize: '12px'
    },
    company: {
      color: '#4a5568',
      fontStyle: 'italic',
      fontSize: '11px',
      margin: '0 0 6px 0'
    },
    period: {
      color: '#718096',
      fontSize: '11px',
      marginBottom: '8px',
      display: 'block'
    },
    bulletList: {
      paddingLeft: '20px',
      margin: '8px 0',
      fontSize: '12px'
    },
    bulletItem: {
      marginBottom: '4px',
      position: 'relative',
      '&::before': {
        content: '"\u2022"',
        color: '#4a6fa5',
        fontWeight: 'bold',
        display: 'inline-block',
        width: '1em',
        marginLeft: '-1em'
      }
    },
    skillsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      paddingLeft: '15px'
    },
    skillItem: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingLeft: '15px'
    },
    skillName: {
      fontWeight: '400',
      fontSize: '11px',
      color: '#2d3748',
      margin: 0,
      lineHeight: '1.3'
    },
    bullet: {
      position: 'absolute',
      left: 0,
      color: '#4a6fa5',
      fontWeight: 'bold',
      marginRight: '8px'
    },
    tag: {
      display: 'inline-block',
      backgroundColor: '#ebf8ff',
      color: '#2b6cb0',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      margin: '2px',
      whiteSpace: 'nowrap'
    },
    educationItem: {
      marginBottom: '12px'
    },
    degree: {
      fontWeight: '600',
      fontSize: '13px',
      margin: '0 0 2px 0',
      color: '#2d3748'
    },
    school: {
      fontSize: '12px',
      color: '#4a5568',
      margin: '0 0 4px 0'
    },
    note: {
      fontSize: '11px',
      color: '#718096',
      margin: '2px 0'
    }
  };

  return (
    <div id="resume-preview" style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.name}>{data.name || 'FULL NAME'}</h1>
        <div style={styles.contact}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </header>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        {/* Skills */}
        {skillsList.length > 0 && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Skills</h3>
            <div>
              <div style={styles.skillsContainer}>
                {skillsList.map((skill, i) => (
                  <div key={`skill-${i}`} style={styles.skillItem}>
                    <span style={styles.bullet}>•</span>
                    <span style={styles.skillName}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Languages */}
        {languagesList.length > 0 && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Languages</h3>
            <div>
              <div style={styles.skillsContainer}>
                {languagesList.map((lang, i) => (
                  <div key={`lang-${i}`} style={styles.skillItem}>
                    <span style={styles.bullet}>•</span>
                    <span style={styles.skillName}>{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Interests */}
        {interestsList.length > 0 && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Interests</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {interestsList.map((interest, i) => (
                <span key={`interest-${i}`} style={styles.tag}>
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certificationsList.length > 0 && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Certifications</h3>
            <ul style={{ ...styles.bulletList, listStyleType: 'none', paddingLeft: '0' }}>
              {certificationsList.map((cert, i) => (
                <li key={`cert-${i}`} style={{ ...styles.note, marginBottom: '6px' }}>
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Summary */}
        {data.summary && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Professional Summary</h3>
            <p style={{ fontSize: '12px', margin: '0', lineHeight: '1.6' }}>{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experienceList.length > 0 && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Professional Experience</h3>
            {experienceList.map((exp, i) => (
              <div key={`exp-${i}`} style={{ marginBottom: '16px' }}>
                <h4 style={styles.jobTitle}>{exp.title}</h4>
                {exp.company && <p style={styles.company}>{exp.company}</p>}
                {exp.period && <span style={styles.period}>{exp.period}</span>}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul style={styles.bulletList}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={`exp-${i}-${j}`} style={styles.bulletItem}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Education</h3>
            {educationList.map((edu, i) => (
              <div key={`edu-${i}`} style={styles.educationItem}>
                <h4 style={styles.degree}>{edu.degree}</h4>
                {edu.school && <p style={styles.school}>{edu.school}</p>}
                {edu.notes && edu.notes.length > 0 && (
                  <ul style={{ ...styles.bulletList, marginTop: '4px' }}>
                    {edu.notes.map((note, j) => (
                      <li key={`edu-${i}-${j}`} style={styles.note}>
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}