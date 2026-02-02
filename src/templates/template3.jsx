export default function Template3({ data }) {
  const sectionTitleStyle = {
    fontSize: "1.1em",
    fontWeight: "bold",
    color: "#000",
    marginTop: "18px",
    marginBottom: "6px",
    borderBottom: "1px solid #000",
    paddingBottom: "2px",
    textTransform: "uppercase",
  };

  return (
    // The wrapper component for the entire resume
    <div 
      id="resume-preview"
      style={{ 
        fontFamily: "Roboto, Helvetica, sans-serif", 
        color: "#222", 
        // 1. Set the fixed printable width
        width: "210mm", 
        // 2. Set margins for the entire document
        margin: "0 auto", 
        padding: "25mm",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          paddingBottom: "10px",
          // 3. Crucial for print: Keep the header elements together on one page
          breakAfter: 'avoid', 
          breakInside: 'avoid',
        }}
      >
        <h1 style={{ margin: "0", fontSize: "1.8em" }}>{data.name}</h1>
        <div style={{ textAlign: "right", fontSize: "0.8em" }}>
          <p style={{ margin: "0", fontSize: "0.8em" }}>✉️ {data.email}</p>
          <p style={{ margin: "0", fontSize: "0.8em" }}>📞 {data.phone}</p>
        </div>
      </div>
      <div style={{ borderTop: "5px solid #222", marginBottom: "15px", breakAfter: 'avoid' }}></div>

      {/* Summary */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>SUMMARY</h3>
        <p style={{ fontSize: "0.75em", lineHeight: "1.4", margin: "0 0 8px 0" }}>{data.summary}</p>
      </section>

      {/* Skills */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>SKILLS</h3>
        <p style={{ fontSize: "0.75em", lineHeight: "1.4", whiteSpace: "pre-wrap", margin: "0 0 8px 0" }}>{data.skills}</p>
      </section>

      {/* Education */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>EDUCATION</h3>
        <div style={{ fontSize: "0.85em", lineHeight: "1.4", whiteSpace: "pre-wrap", marginBottom: "8px" }}>
          {data.education}
        </div>
      </section>

      {/* Experience */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>EXPERIENCE</h3>
        <div style={{ fontSize: "0.85em", lineHeight: "1.4", whiteSpace: "pre-wrap", marginBottom: "8px" }}>
          {data.experience}
        </div>
      </section>
    </div>
  );
}