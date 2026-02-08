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
    experience: "",
    profileImage: ""
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <TemplateSelector setTemplate={setTemplate} />
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1">
        {/* Desktop/Tablet: Split Screen */}
        <div className="hidden lg:flex h-[calc(100vh-80px)]">
          {/* Form - Scrollable */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-4">
              <StructuredForm data={resumeData} setData={setResumeData} template={template} />
            </div>
          </div>

          {/* Preview - Fixed */}
          <div className="w-1/2 overflow-y-auto bg-gray-50">
            <div className="p-4">
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

        {/* Mobile: Original Stacked Layout */}
        <div className="lg:hidden">
          <div className="p-4">
            <StructuredForm data={resumeData} setData={setResumeData} template={template} />
          </div>
          <div className="p-4 bg-gray-50">
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
    </div>
  );
}

export default App;
