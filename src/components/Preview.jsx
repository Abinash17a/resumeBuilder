import Template1 from "../templates/template1";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";

export default function Preview({
  data,
  template,
  fontSize,
  setFontSize,
  fontSizeConfig
}) {

  const renderTemplate = () => {
    if (template === "template1") return <Template1 data={data} fontSizeConfig={fontSizeConfig} />;
    if (template === "template2") return <Template2 data={data} fontSizeConfig={fontSizeConfig} />;
    if (template === "template3") return <Template3 data={data} fontSizeConfig={fontSizeConfig} />;

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
