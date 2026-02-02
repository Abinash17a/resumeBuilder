import { useState } from "react";
import StructuredForm from "./components/StructuredForm";
import Preview from "./components/Preview";
import TemplateSelector from "./components/TemplateSelector";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: "",
    experience: ""
  });

  const [template, setTemplate] = useState("template1");
  const [fontSize, setFontSize] = useState("medium");

  const fontSizeConfig = {
    small: {
      heading: "text-xl font-bold",
      subheading: "text-base font-semibold",
      body: "text-sm",
      small: "text-xs",
      lineHeight: "leading-snug",
      letterSpacing: "tracking-normal",
      sectionMargin: "mb-3",
      itemMargin: "mb-1.5",
      sectionPadding: "p-2",
      borderRadius: "rounded"
    },
    medium: {
      heading: "text-2xl font-bold",
      subheading: "text-lg font-semibold",
      body: "text-base",
      small: "text-sm",
      lineHeight: "leading-normal",
      letterSpacing: "tracking-normal",
      sectionMargin: "mb-4",
      itemMargin: "mb-2",
      sectionPadding: "p-3",
      borderRadius: "rounded-md"
    },
    large: {
      heading: "text-3xl font-bold",
      subheading: "text-xl font-semibold",
      body: "text-lg",
      small: "text-base",
      lineHeight: "leading-relaxed",
      letterSpacing: "tracking-wide",
      sectionMargin: "mb-6",
      itemMargin: "mb-3",
      sectionPadding: "p-4",
      borderRadius: "rounded-lg"
    }
  };

  return (
    <div className="p-4">
      <TemplateSelector setTemplate={setTemplate} />

      {/* Responsive Layout */}
      <div
        className="
          flex
          flex-col            // Mobile: stacked
          gap-6
          lg:flex-row         // Desktop: side by side
        "
      >
        {/* Form */}
        <div className="w-full lg:w-1/2">
          <StructuredForm data={resumeData} setData={setResumeData} />
        </div>

        {/* Preview */}
        <div className="w-full lg:w-1/2">
          <Preview
            data={resumeData}
            template={template}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontSizeConfig={fontSizeConfig[fontSize]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
