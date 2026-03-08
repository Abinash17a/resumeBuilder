import Template1 from "../templates/template1";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";

// Utility function to format form state for templates
const formatDataForTemplates = (formData) => {
  return {
    ...formData,
    // Convert arrays of objects back to strings (legacy format for templates)
    experience: formData.experiences.map(exp => 
      `${exp.title} at ${exp.company}${exp.startDate || exp.endDate ? ` (${exp.startDate}${exp.endDate ? ' - ' + exp.endDate : exp.current ? ' - Present' : ''})` : ''}\n${exp.description || ''}`
    ).join('\n\n'),
    education: formData.educationItems.map(edu => 
      `${edu.degree}, ${edu.school}${edu.startDate || edu.endDate ? ` (${edu.startDate}${edu.endDate ? ' - ' + edu.endDate : edu.current ? ' - Present' : ''})` : ''}${edu.gpa ? `\nGPA: ${edu.gpa}` : ''}${edu.notes ? `\n${edu.notes}` : ''}`
    ).join('\n\n'),
    skills: [...formData.technicalSkills, ...formData.nonTechnicalSkills].join(', '),
    certifications: formData.certifications.map(cert => 
      `${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.date ? ` (${cert.date})` : ''}${cert.expiryDate ? ` - Expires: ${cert.expiryDate}` : ''}`
    ).join('\n'),
    projects: formData.projects.map(proj => 
      `${proj.title}\n${proj.description}${proj.technologies ? `\nTechnologies: ${proj.technologies}` : ''}${proj.link ? `\nLink: ${proj.link}` : ''}`
    ).join('\n\n'),
    achievements: formData.achievements.join('\n\n'),
    languages: formData.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', '),
    interests: formData.interests.join(', ')
  };
};

export default function Preview({
  data,
  template,
  fontSize,
  setFontSize,
  fontSizeConfig
}) {

  const renderTemplate = () => {
    const formattedData = formatDataForTemplates(data);
    if (template === "template1") return <Template1 data={formattedData} fontSizeConfig={fontSizeConfig} />;
    if (template === "template2") return <Template2 data={formattedData} fontSizeConfig={fontSizeConfig} />;
    if (template === "template3") return <Template3 data={formattedData} fontSizeConfig={fontSizeConfig} />;

    return (
      <div className="text-center p-6 sm:p-8 text-gray-500">
        Select a template to view your resume preview.
      </div>
    );
  };

  return (
    // Outer container
    <div className="
      flex-1 
      w-full 
      p-2 sm:p-4 lg:p-6 
      bg-gray-50 
      border-l 
      border-gray-200 
      shadow-inner
    ">

      {/* Header */}
      <div className="
        flex 
        flex-col 
        sm:flex-row 
        sm:justify-between 
        sm:items-center 
        gap-3 
        mb-4 
        border-b 
        pb-3
      ">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          Live Resume Preview
        </h2>

        {/* Font Size Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Font Size:</span>

          <div className="inline-flex rounded-md shadow-sm">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFontSize(size)}
                className={`
                  px-3 sm:px-4 
                  py-1.5 
                  text-xs sm:text-sm 
                  font-medium 
                  rounded-md 
                  transition-all 
                  ${
                    fontSize === size
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                  }
                `}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Mockup Container */}
      <div className="
        mx-auto 
        w-full 
        max-w-4xl 
        bg-white 
        shadow-xl 
        overflow-hidden 
        ring-1 
        ring-gray-900/5
        p-2 sm:p-4 lg:p-8
      ">
        {/* Optional scaling to avoid overflow on very small screens */}
        <div className="origin-top scale-[0.95] sm:scale-100">
          {renderTemplate()}
        </div>
      </div>

    </div>
  );
}
