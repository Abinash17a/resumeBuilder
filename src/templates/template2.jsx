export default function Template1({ data = {}, fontSizeConfig = {}, spacingConfig = {} }) {
  console.log("sizing-----------",fontSizeConfig,"----------------------",spacingConfig)
  // Destructure with defaults - responsive sizing
  const {
    // Text sizes (responsive for mobile/tablet/web)
    heading = 'text-[18px] sm:text-[20px] lg:text-[22px] leading-tight font-bold',
    subheading = 'text-[14px] sm:text-[15px] lg:text-[16px] font-semibold',
    body = 'text-[10px] sm:text-[10.5px] lg:text-[11px] leading-snug',
    // Line heights
    lineHeight = 'leading-snug',
    // Letter spacing
    letterSpacing = 'tracking-normal',
    // Margins (responsive)
    sectionMargin = 'mb-2 sm:mb-3 lg:mb-3',
    itemMargin = 'mb-1 sm:mb-1.5 lg:mb-1.5',
    // Padding (responsive)
    sectionPadding = 'p-1.5 sm:p-2 lg:p-2',
    // Border radius
    borderRadius = 'rounded',
    // Section styles (responsive)
    section = 'mb-3 sm:mb-4 lg:mb-4',
    // Item styles (responsive)
    item = 'mb-1 sm:mb-1.5 lg:mb-1.5'
  } = { ...fontSizeConfig, ...spacingConfig };
  // helpers to parse fields gracefully
  const parseList = (text) => {
    if (!text) return []
    return String(text)
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
  }

  // Parse experience entries with structured format
  const parseExperience = (exp) => {
    if (!exp) return [];

    // Split by double newline to separate different experiences
    const experienceBlocks = exp.split('\n\n').filter(block => block.trim() !== '');
    const experiences = [];

    experienceBlocks.forEach(block => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) return;

      const firstLine = lines[0].trim();

      // Try to find the first bullet point to determine where the title/company ends
      let firstBulletIndex = lines.findIndex(line =>
        line.trim().startsWith('-') ||
        line.trim().startsWith('•') ||
        line.trim().startsWith('*')
      );

      // If no bullets, use all lines as description
      if (firstBulletIndex === -1) firstBulletIndex = lines.length;

      // First line is the title and company
      const titleCompanyMatch = firstLine.match(/^(.*?)\s+at\s+(.*)/) || [null, firstLine, ''];
      const title = titleCompanyMatch[1] || firstLine;
      const company = titleCompanyMatch[2] || '';
      
      // The rest are bullet points
      const bullets = [];
      for (let i = 1; i < firstBulletIndex; i++) {
        // If there are lines between title and bullets, add them as description
        const line = lines[i].trim();
        if (line) {
          bullets.push(line.replace(/^[-•*]\s*/, '').trim());
        }
      }
      
      // Add the actual bullet points
      for (let i = firstBulletIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          bullets.push(line.replace(/^[-•*]\s*/, '').trim());
        }
      }
      
      experiences.push({
        title: title.trim(),
        company: company.trim(),
        bullets: bullets.filter(b => b)
      });
    });
    
    return experiences;
  };

  // Parse education entries with structured format
  const parseEducation = (edu) => {
    if (!edu) return [];
    
    // Split by double newline to separate different education entries
    const educationBlocks = edu.split('\n\n').filter(block => block.trim() !== '');
    const educations = [];
    
    educationBlocks.forEach(block => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) return;
      
      // First line is the degree and school
      const firstLine = lines[0].trim();
      const commaIndex = firstLine.indexOf(',');
      
      let degree = '';
      let school = '';
      
      if (commaIndex > -1) {
        degree = firstLine.substring(0, commaIndex).trim();
        school = firstLine.substring(commaIndex + 1).trim();
      } else {
        // If no comma, try to split by common separators
        const parts = firstLine.split(/[,\t]/);
        if (parts.length > 1) {
          degree = parts[0].trim();
          school = parts.slice(1).join(', ').trim();
        } else {
          // If no separator, treat the whole line as degree
          degree = firstLine;
        }
      }

      // The rest are notes/bullet points
      const notes = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          // Remove bullet points if present and trim
          const note = line.replace(/^[-•*]\s*/, '').trim();
          if (note) notes.push(note);
        }
      }

      educations.push({
        degree: degree,
        school: school,
        notes: notes
      });
    });

    return educations;
  };

  const formatAchievements = (text) => {
    if (!text) return []
    return text
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
  }

  const formatProjects = (text) => {
    if (!text) return []
    return text
      .split(/\n{2,}/)
      .map((block) => {
        const lines = block
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
        if (lines.length === 0) return null

        const title = lines[0].replace(/^[-*]\s*/, "")
        const bullets = lines
          .slice(1)
          .map((line) => line.replace(/^[-*]\s*/, ""))
          .filter((line) => line.trim().length > 0)

        return { title, bullets }
      })
      .filter(Boolean)
  }

  const languagesList = parseList(data.languages);
  const interestsList = parseList(data.interests);
  const experienceList = parseExperience(data.experience);
  console.log("experience list",experienceList)
  console.log("data-----",data)
  const educationList = parseEducation(data.education);
  const certificationsList = data.certifications ? data.certifications.split("\n").filter(Boolean) : [];
  const achievementsList = formatAchievements(data.achievements);
  const projectsList = formatProjects(data.projects || "");

  // Parse technical and non-technical skills separately
  const parseTechnicalSkills = (skills) => {
    if (!skills) return [];
    // Look for technical skills pattern or split by common separators
    const allSkills = parseList(skills);
    // For now, we'll assume the first half are technical, but this could be enhanced
    // In a real implementation, you might want to mark skills as technical/non-technical
    return allSkills.slice(0, Math.ceil(allSkills.length / 2));
  };

  const parseNonTechnicalSkills = (skills) => {
    if (!skills) return [];
    const allSkills = parseList(skills);
    return allSkills.slice(Math.ceil(allSkills.length / 2));
  };

  const technicalSkillsList = parseTechnicalSkills(data.skills);
  const nonTechnicalSkillsList = parseNonTechnicalSkills(data.skills);

  const containerStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "16px 24px",
    backgroundColor: "#ffffff",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: "clamp(9px, 2.5vw, 11px)", // Responsive font size
    lineHeight: 1.5,
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px"
  }

  const headerStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
    paddingBottom: "clamp(12px, 3vw, 16px)",
    marginBottom: "clamp(16px, 4vw, 20px)",
  }

  const headerLeftStyle = {
    flex: 1,
    textAlign: "left",
  }

  const headerRightStyle = {
    flexShrink: 0,
  }

  const profileImageStyle = {
    width: "clamp(80px, 15vw, 120px)",
    height: "clamp(80px, 15vw, 120px)",
    borderRadius: "8px",
    objectFit: "cover",
    border: "2px solid #1a1a1a",
  }

  const nameStyle = {
    margin: 0,
    color: "#1a1a1a",
    fontSize: "clamp(18px, 5vw, 24pt)", // Responsive name size
    letterSpacing: "0.5px",
    fontWeight: 700,
    marginBottom: "6px",
    lineHeight: 1.1
  }

  const contactStyle = {
    margin: "0",
    fontSize: "clamp(8px, 2.5vw, 10pt)", // Responsive contact size
    color: "#444",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "clamp(2px, 0.5vw, 4px)",
    flexWrap: "wrap",
    maxWidth: "100%"
  }

  const sectionHeaderStyle = {
    fontSize: "clamp(9px, 3vw, 11pt)", // Responsive section headers
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#1a1a1a",
    marginTop: "clamp(12px, 3vw, 16px)",
    marginBottom: "clamp(6px, 2vw, 8px)",
    paddingBottom: "4px",
    borderBottom: "1px solid #1a1a1a",
  }

  const subsectionStyle = {
    marginBottom: "clamp(12px, 3vw, 16px)",
  }

  const jobTitleStyle = {
    fontSize: "clamp(9px, 3vw, 11pt)", // Responsive job titles
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "2px",
  }

  const bulletListStyle = {
    margin: "4px 0 0 0",
    paddingLeft: "clamp(12px, 3vw, 16px)",
    fontSize: "clamp(8px, 2.5vw, 10pt)", // Responsive bullet text
    lineHeight: 1.5,
  }

  const bulletItemStyle = {
    marginBottom: "4px",
  }

  const summaryStyle = {
    fontSize: "clamp(8px, 2.5vw, 10pt)", // Responsive summary text
    lineHeight: 1.5,
    color: "#333",
    textAlign: "left",
    marginBottom: "8px",
    wordWrap: "break-word"
  }

  const skillsCategoryStyle = {
    marginBottom: "8px",
  }

  const skillsLabelStyle = {
    fontWeight: 700,
    display: "inline",
    marginRight: "6px",
  }

  const skillsValueStyle = {
    display: "inline",
  }
  return (
    <div
      id="resume-preview"
      role="document"
      style={containerStyle}
      className={`w-full max-w-[900px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-5 lg:py-6 ${lineHeight} ${letterSpacing} text-gray-800 print:px-6 print:py-4 print:max-w-none print:shadow-none print:rounded-none`}
    >
      {/* Header with profile picture on right */}
      <header style={headerStyle} className={`${sectionMargin} ${sectionPadding} ${borderRadius}`}>
        <div style={headerLeftStyle}>
          <h1 className={`${heading} text-gray-900`} style={nameStyle}>{data.name || "CHARLES BLOOMBERG"}</h1>
          <div className={`${body} ${itemMargin} text-gray-700`} style={contactStyle}>
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
          </div>
        </div>
        <div style={headerRightStyle}>
  <img
    src={
      data.profileImage ||
      `data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
        <circle cx='100' cy='100' r='100' fill='%23e5e7eb'/>
        <circle cx='100' cy='80' r='35' fill='%239ca3af'/>
        <path d='M40 165c10-35 35-50 60-50s50 15 60 50' fill='%239ca3af'/>
      </svg>`
    }
    alt="Profile"
    style={profileImageStyle}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src =
        "https://ui-avatars.com/api/?name=User&background=random&color=fff&size=200";
    }}
  />
</div>

      </header>

      {/* Summary */}
      {data.summary && (
        <section aria-label="professional summary" className={`${sectionMargin} ${sectionPadding} ${borderRadius} bg-white`}>
          <h2 className={`${subheading} text-gray-800 border-b border-gray-200 pb-1 mb-3`}>PROFESSIONAL SUMMARY</h2>
          <p className={`${body} text-gray-700`} style={summaryStyle}>{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experienceList.length > 0 && (
        <section aria-label="experience" className={section}>
          <h2 className={subheading} style={sectionHeaderStyle}>PROFESSIONAL EXPERIENCE</h2>
          {experienceList.map((exp, i) => (
            <div key={`exp-${i}`} className={item} style={subsectionStyle}>
              <div style={{ marginBottom: '4px' }}>
                <div className={subheading} style={{ ...jobTitleStyle, display: 'inline', fontWeight: 700 }}>{exp.title}</div>
                {exp.company && (
                  <span>
                    {' at '}
                    <span style={{ fontStyle: 'italic' }}>{exp.company}</span>
                  </span>
                )}
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul style={bulletListStyle}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={`exp-${i}-${j}`} style={bulletItemStyle}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projectsList.length > 0 && (
        <section aria-label="projects">
          <h2 style={sectionHeaderStyle}>PROJECTS</h2>
          {projectsList.map((project, i) => (
            <div key={`project-${i}`} style={subsectionStyle}>
              <div style={jobTitleStyle}>{project.title}</div>
              {project.bullets.length > 0 && (
                <ul style={bulletListStyle}>
                  {project.bullets.map((bullet, j) => (
                    <li key={`project-${i}-${j}`} style={bulletItemStyle}>
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
        <section aria-label="education" className={section}>
          <h2 className={subheading} style={sectionHeaderStyle}>EDUCATION</h2>
          {educationList.map((edu, idx) => (
            <div key={`edu-${idx}`} className={item} style={subsectionStyle}>
              <div style={{ marginBottom: '4px' }}>
                <div className={subheading} style={{ ...jobTitleStyle, display: 'inline', fontWeight: 700 }}>{edu.degree}</div>
                {edu.school && (
                  <span>
                    {', '}
                    <span style={{ fontStyle: 'italic' }}>{edu.school}</span>
                  </span>
                )}
              </div>
              {edu.notes && edu.notes.length > 0 && (
                <ul style={bulletListStyle}>
                  {edu.notes.map((note, j) => (
                    <li key={`edu-${idx}-${j}`} style={bulletItemStyle}>
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certificationsList.length > 0 && (
        <section aria-label="certifications">
          <h2 style={sectionHeaderStyle}>CERTIFICATIONS</h2>
          <ul style={bulletListStyle}>
            {certificationsList.map((cert, i) => (
              <li key={`cert-${i}`} style={bulletItemStyle}>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievementsList.length > 0 && (
        <section aria-label="achievements">
          <h2 style={sectionHeaderStyle}>ACHIEVEMENTS</h2>
          <ul style={bulletListStyle}>
            {achievementsList.map((achievement, i) => (
              <li key={`ach-${i}`} style={bulletItemStyle}>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      <section aria-label="skills">
        <h2 style={sectionHeaderStyle}>SKILLS</h2>
        
        {/* Technical Skills */}
        {technicalSkillsList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Technical Skills:</span>
            <span style={skillsValueStyle}>{technicalSkillsList.join(", ")}</span>
          </div>
        )}
        
        {/* Non-Technical Skills */}
        {nonTechnicalSkillsList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Non-Technical Skills:</span>
            <span style={skillsValueStyle}>{nonTechnicalSkillsList.join(", ")}</span>
          </div>
        )}
        
        {/* Languages */}
        {languagesList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Languages:</span>
            <span style={skillsValueStyle}>{languagesList.join(", ")}</span>
          </div>
        )}
        
        {/* Interests */}
        {interestsList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Fields of Interest:</span>
            <span style={skillsValueStyle}>{interestsList.join(", ")}</span>
          </div>
        )}
      </section>
    </div>
  )
}
