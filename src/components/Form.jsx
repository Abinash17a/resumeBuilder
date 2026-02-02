// src/components/Form.jsx
import React, { useEffect, useCallback } from "react";
import html2pdf from "html2pdf.js";

export default function Form({ data, setData }) {
  // Controlled change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Normalize functions
  const normalizeText = (text = "") =>
    text.replace(/\s+/g, " ").trim();

  const parseList = (text = "") => {
    // Accept comma or newline separated values
    return text
      .split(/[,;\n]/)
      .map(s => s.trim())
      .filter(Boolean);
  };

  const parseExperienceToBullets = (text = "") => {
    // Split by newlines or by sentence delimiters (.,;), keep meaningful fragments
    const lines = text.split(/\n/).flatMap(line => line.split(/(?<=\.)\s+/));
    return lines.map(l => normalizeText(l.replace(/^-+\s*/, ""))).filter(Boolean);
  };

  const parseAchievements = (text = "") => {
    // Split by newlines and keep empty lines as separators between different achievements
    return text.split(/\n{2,}/)
      .map(block => block.trim())
      .filter(Boolean);
  };

  const handleBlurNormalize = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "skills" || name === "interests" || name === "languages") {
      const arr = parseList(value);
      // Keep as comma separated string in the input but normalized
      setData(prev => ({ ...prev, [name]: arr.join(", ") }));
    } else if (name === "experience") {
      // Normalize whitespace and keep newlines as separators for readability
      const bullets = parseExperienceToBullets(value);
      setData(prev => ({ ...prev, experience: bullets.join("\n") }));
    } else if (name === "achievements") {
      // Keep double newlines as separators between achievements
      const formatted = parseAchievements(value).join("\n\n");
      setData(prev => ({ ...prev, achievements: formatted }));
    } else if (name === "projects") {
      // Format projects with titles and descriptions
      const formatted = parseAchievements(value).join("\n\n");
      setData(prev => ({ ...prev, projects: formatted }));
    } else if (name === "education" || name === "summary" || name === "certifications") {
      setData(prev => ({ ...prev, [name]: normalizeText(value) }));
    } else {
      setData(prev => ({ ...prev, [name]: value.trimStart() }));
    }
  }, [setData]);

  // Autosave to localStorage (simple)
  useEffect(() => {
    try {
      localStorage.setItem("resumeFormData", JSON.stringify(data || {}));
    } catch (e) {
      // ignore for browsers blocking localStorage
      console.warn("localStorage save failed", e);
    }
  }, [data]);

  // Load initial data from localStorage in parent or here (optional).
  // Parent component can do this once and pass into `data`.

  // Simple PDF download - no cloning, no complex processing
  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Resume preview not found. Make sure it has id='resume-preview'.");
      return;
    }

    try {
      // Minimal configuration that works
      const opt = {
        margin: 10,
        filename: `${(data.name || "resume").replace(/\s+/g, "_")}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };

      // Generate PDF
      await html2pdf().set(opt).from(element).save();

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Basic client-side validation hint (not blocking)
  const emailIsValid = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-lg my-8 font-sans">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8 pb-3 border-b-4 border-indigo-100">
        Professional Resume Builder
      </h2>

      {/* Personal Details Section */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-indigo-50">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">Personal Details</h3>

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            id="name"
            name="name"
            value={data.name || ""}
            placeholder="John Doe"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            aria-label="Full name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email || ""}
            placeholder="john.doe@example.com"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${data.email && !emailIsValid(data.email) ? 'border-red-400' : 'border-gray-300'}`}
            aria-invalid={data.email && !emailIsValid(data.email)}
          />
          {data.email && !emailIsValid(data.email) && (
            <p className="text-xs text-red-600 mt-1">Please enter a valid email address.</p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            id="phone"
            name="phone"
            value={data.phone || ""}
            placeholder="(123) 456-7890"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            inputMode="tel"
          />
        </div>

        {/* LinkedIn URL Input */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            value={data.linkedin || ""}
            placeholder="https://linkedin.com/in/username"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            inputMode="url"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 border border-gray-200 rounded-lg bg-white">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">Experience & Education Content</h3>

        {/* Summary Textarea */}
        <div className="mb-4">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={data.summary || ""}
            placeholder="A brief, compelling overview of your career goals and key accomplishments..."
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          />
        </div>

        {/* Skills Textarea */}
        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills (Technical, Soft, Languages)</label>
          <textarea
            id="skills"
            name="skills"
            value={data.skills || ""}
            placeholder="HTML, CSS, JavaScript, React, Node.js"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">Tip: Separate skills with commas — they’ll render as individual bullets on the resume.</p>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
          <textarea
            id="languages"
            name="languages"
            value={data.languages || ""}
            placeholder="English (Fluent), Spanish (Intermediate), French (Basic)"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">List languages you're proficient in and your level (e.g., Native, Fluent, Intermediate, Basic)</p>
        </div>

        {/* Certifications */}
        <div className="mb-4">
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
          <textarea
            id="certifications"
            name="certifications"
            value={data.certifications || ""}
            placeholder="AWS Certified Solutions Architect - Associate, 2023\nGoogle Data Analytics Professional Certificate, 2022"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">List your professional certifications, one per line</p>
        </div>

        {/* Projects */}
        <div className="mb-4">
          <label htmlFor="projects" className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
          <textarea
            id="projects"
            name="projects"
            value={data.projects || ""}
            placeholder="E-commerce Website (MERN Stack)\n- Built a full-stack e-commerce platform with React, Node.js, and MongoDB\n- Implemented user authentication and payment processing\n\nTask Management App\n- Developed a collaborative task management tool with real-time updates"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            List your projects. Separate projects with a blank line. Each project can have a title (first line) and bullet points (starting with - or *)
          </p>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
          <textarea
            id="achievements"
            name="achievements"
            value={data.achievements || ""}
            placeholder="Employee of the Month - June 2023\n\nPublished research paper on AI in Journal of Computer Science\n\nWon 1st place in Hackathon 2022"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">List your key achievements, awards, or recognitions. Separate each with a blank line.</p>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Interests & Hobbies</label>
          <textarea
            id="interests"
            name="interests"
            value={data.interests || ""}
            placeholder="Open-source contributions, Machine Learning, Hiking, Photography"
            onChange={handleChange}
            onBlur={handleBlurNormalize}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">List your professional or personal interests that might be relevant</p>
        </div>

        {/* Experience Textarea */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Work/Project Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={data.experience || ""}
            placeholder="Example:\nSoftware Engineer at Google\n- Developed new features\n- Fixed bugs\n\nSenior Developer at Microsoft\n- Led a team\n- Built systems"
            onChange={handleChange}
            onBlur={(e) => {
              // Preserve line breaks by ensuring they're not trimmed
              const value = e.target.value.replace(/\r\n/g, '\n');
              handleChange({ target: { name: 'experience', value } });
            }}
            rows="8"
            className="whitespace-pre-wrap w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: Job Title at Company on first line, then bullet points starting with - or • on the following lines.
            Separate different experiences with a blank line.
          </p>
        </div>

        {/* Education Textarea */}
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education</label>
          <textarea
            id="education"
            name="education"
            value={data.education || ""}
            placeholder="Example:\nB.S. in Computer Science, Stanford University\n- Graduated with honors\n- GPA: 3.8"
            onChange={handleChange}
            onBlur={(e) => {
              // Preserve line breaks by ensuring they're not trimmed
              const value = e.target.value.replace(/\r\n/g, '\n');
              handleChange({ target: { name: 'education', value } });
            }}
            rows="6"
            className="whitespace-pre-wrap w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: Degree, School on first line, then any notes or achievements on the following lines starting with - or •
          </p>
        </div>

        {/* Download helper button (optional) */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => downloadPDF()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Download PDF (Quick)
          </button>

          <button
            type="button"
            onClick={() => {
              // Example quick preview normalization before download
              setData(prev => ({
                ...prev,
                skills: (prev.skills && prev.skills.split(/[,;\n]/).map(s=>s.trim()).filter(Boolean).join(", ")) || ""
              }));
              downloadPDF();
            }}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
          >
            Normalize & Download
          </button>
        </div>
      </div>
    </div>
  );
}
