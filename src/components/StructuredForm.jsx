// import React, { useState } from "react";
// import html2pdf from "html2pdf.js";
// import { useForm } from "../context/formHooks.js";
// import { actionTypes } from "../constants/formConstants.js";

// export default function StructuredForm({ template }) {
//   const { state, dispatch } = useForm();
  
//   // State for managing current form inputs
//   const [currentExperience, setCurrentExperience] = useState({
//     title: "",
//     company: "",
//     startDate: "",
//     endDate: "",
//     current: false,
//     description: ""
//   });
//   const [currentEducation, setCurrentEducation] = useState({
//     degreeType: "",
//     degree: "",
//     specialization: "",
//     school: "",
//     startDate: "",
//     endDate: "",
//     current: false,
//     gpa: "",
//     notes: ""
//   });
//   const [currentTechnicalSkill, setCurrentTechnicalSkill] = useState("");
//   const [currentNonTechnicalSkill, setCurrentNonTechnicalSkill] = useState("");
//   const [currentCertification, setCurrentCertification] = useState({
//     name: "",
//     issuer: "",
//     date: "",
//     expiryDate: ""
//   });
//   const [currentProject, setCurrentProject] = useState({
//     title: "",
//     description: "",
//     technologies: "",
//     startDate: "",
//     endDate: "",
//     link: ""
//   });
//   const [currentAchievement, setCurrentAchievement] = useState("");
//   const [currentLanguage, setCurrentLanguage] = useState({
//     language: "",
//     proficiency: ""
//   });
//   const [currentInterest, setCurrentInterest] = useState("");

//   // Basic info handlers
//   const handleBasicInfoChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({
//       type: actionTypes.UPDATE_BASIC_INFO,
//       payload: { [name]: value }
//     });
//   };

//   // Profile image handler
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageData = reader.result;
//         dispatch({
//           type: actionTypes.SET_PROFILE_IMAGE,
//           payload: imageData
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Experience handlers
//   const addExperience = () => {
//     if (currentExperience.title && currentExperience.company) {
//       dispatch({
//         type: actionTypes.ADD_EXPERIENCE,
//         payload: currentExperience
//       });
//       setCurrentExperience({
//         title: "",
//         company: "",
//         startDate: "",
//         endDate: "",
//         current: false,
//         description: ""
//       });
//     }
//   };

//   const removeExperience = (id) => {
//     dispatch({
//       type: actionTypes.REMOVE_EXPERIENCE,
//       payload: id
//     });
//   };

//   // Education handlers
//   const addEducation = () => {
//     let degreeValue = currentEducation.degreeType === 'Other' 
//       ? currentEducation.degree 
//       : currentEducation.degreeType;
    
//     // Add specialization if provided
//     if (currentEducation.specialization && currentEducation.degreeType !== 'Other') {
//       degreeValue += ` in ${currentEducation.specialization}`;
//     }
    
//     if (degreeValue && currentEducation.school) {
//       dispatch({
//         type: actionTypes.ADD_EDUCATION,
//         payload: {
//           ...currentEducation,
//           degree: degreeValue
//         }
//       });
//       setCurrentEducation({
//         degreeType: "",
//         degree: "",
//         specialization: "",
//         school: "",
//         startDate: "",
//         endDate: "",
//         current: false,
//         gpa: "",
//         notes: ""
//       });
//     }
//   };

//   const removeEducation = (id) => {
//     dispatch({
//       type: actionTypes.REMOVE_EDUCATION,
//       payload: id
//     });
//   };

//   // Skills handlers
//   const addTechnicalSkill = () => {
//     if (currentTechnicalSkill.trim()) {
//       dispatch({
//         type: actionTypes.ADD_TECHNICAL_SKILL,
//         payload: currentTechnicalSkill.trim()
//       });
//       setCurrentTechnicalSkill("");
//     }
//   };

//   const removeTechnicalSkill = (skill) => {
//     dispatch({
//       type: actionTypes.REMOVE_TECHNICAL_SKILL,
//       payload: skill
//     });
//   };

//   const addNonTechnicalSkill = () => {
//     if (currentNonTechnicalSkill.trim()) {
//       dispatch({
//         type: actionTypes.ADD_NON_TECHNICAL_SKILL,
//         payload: currentNonTechnicalSkill.trim()
//       });
//       setCurrentNonTechnicalSkill("");
//     }
//   };

//   const removeNonTechnicalSkill = (skill) => {
//     dispatch({
//       type: actionTypes.REMOVE_NON_TECHNICAL_SKILL,
//       payload: skill
//     });
//   };

//   // Certification handlers
//   const addCertification = () => {
//     if (currentCertification.name) {
//       dispatch({
//         type: actionTypes.ADD_CERTIFICATION,
//         payload: currentCertification
//       });
//       setCurrentCertification({
//         name: "",
//         issuer: "",
//         date: "",
//         expiryDate: ""
//       });
//     }
//   };

//   const removeCertification = (id) => {
//     dispatch({
//       type: actionTypes.REMOVE_CERTIFICATION,
//       payload: id
//     });
//   };

//   // Project handlers
//   const addProject = () => {
//     if (currentProject.title && currentProject.description) {
//       dispatch({
//         type: actionTypes.ADD_PROJECT,
//         payload: currentProject
//       });
//       setCurrentProject({
//         title: "",
//         description: "",
//         technologies: "",
//         startDate: "",
//         endDate: "",
//         link: ""
//       });
//     }
//   };

//   const removeProject = (id) => {
//     dispatch({
//       type: actionTypes.REMOVE_PROJECT,
//       payload: id
//     });
//   };

//   // Achievement handlers
//   const addAchievement = () => {
//     if (currentAchievement.trim()) {
//       dispatch({
//         type: actionTypes.ADD_ACHIEVEMENT,
//         payload: currentAchievement.trim()
//       });
//       setCurrentAchievement("");
//     }
//   };

//   const removeAchievement = (achievement) => {
//     dispatch({
//       type: actionTypes.REMOVE_ACHIEVEMENT,
//       payload: achievement
//     });
//   };

//   // Language handlers
//   const addLanguage = () => {
//     if (currentLanguage.language && currentLanguage.proficiency) {
//       dispatch({
//         type: actionTypes.ADD_LANGUAGE,
//         payload: currentLanguage
//       });
//       setCurrentLanguage({
//         language: "",
//         proficiency: ""
//       });
//     }
//   };

//   const removeLanguage = (id) => {
//     dispatch({
//       type: actionTypes.REMOVE_LANGUAGE,
//       payload: id
//     });
//   };

//   // Interest handlers
//   const addInterest = () => {
//     if (currentInterest.trim()) {
//       dispatch({
//         type: actionTypes.ADD_INTEREST,
//         payload: currentInterest.trim()
//       });
//       setCurrentInterest("");
//     }
//   };

//   const removeInterest = (interest) => {
//     dispatch({
//       type: actionTypes.REMOVE_INTEREST,
//       payload: interest
//     });
//   };

//   // Simple and reliable PDF download with color conversion
//   const downloadPDF = async (buttonElement) => {
//     const element = document.getElementById("resume-preview");
//     if (!element) {
//       alert("Resume preview not found. Make sure it has id='resume-preview'.");
//       return;
//     }

//     let originalButtonText = '';
//     try {
//       // Show loading state
//       if (buttonElement) {
//         originalButtonText = buttonElement.textContent;
//         buttonElement.textContent = "Generating PDF...";
//         buttonElement.disabled = true;
//       }

//       // Convert unsupported color formats before PDF generation
//       const convertColors = (element) => {
//         const elementsWithColor = element.querySelectorAll('*');
//         elementsWithColor.forEach(el => {
//           const style = window.getComputedStyle(el);
//           const color = style.color;
//           const bgColor = style.backgroundColor;
//           const borderColor = style.borderColor;

//           // Convert oklch colors to fallback colors
//           if (color && color.includes('oklch')) {
//             el.style.color = '#000000'; // Fallback to black
//           }
//           if (bgColor && bgColor.includes('oklch')) {
//             el.style.backgroundColor = '#ffffff'; // Fallback to white
//           }
//           if (borderColor && borderColor.includes('oklch')) {
//             el.style.borderColor = '#e5e7eb'; // Fallback to gray
//           }
//         });
//       };

//       // Apply color conversion
//       convertColors(element);

//       // Simple configuration that should work
//       const opt = {
//         margin: 10,
//         filename: `${(state.name || "resume").replace(/\s+/g, "_")}.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { 
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           backgroundColor: '#ffffff'
//         },
//         jsPDF: { 
//           unit: 'mm',
//           format: 'a4',
//           orientation: 'portrait'
//         }
//       };

//       // Generate PDF
//       await html2pdf().set(opt).from(element).save();

//     } catch (error) {
//       console.error('PDF generation error:', error);
//       alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. Please try again.`);
//     } finally {
//       // Restore button state
//       if (buttonElement && originalButtonText) {
//         buttonElement.textContent = originalButtonText;
//         buttonElement.disabled = false;
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
//       <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8 pb-3 border-b-4 border-indigo-100">
//         Professional Resume Builder
//       </h2>

//       {/* Personal Details Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-indigo-50">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Personal Details</h3>
        
//         {/* Profile Image Upload - Only show for Template2 */}
//         {template === "template2" && (
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
//             <div className="flex items-center gap-4">
//               {state.profileImage ? (
//                 <div className="relative">
//                   <img 
//                     src={state.profileImage} 
//                     alt="Profile" 
//                     className="w-20 h-20 rounded-lg object-cover border-2 border-gray-300"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       dispatch({
//                         type: actionTypes.SET_PROFILE_IMAGE,
//                         payload: ""
//                       });
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ) : (
//                 <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
//                   <span className="text-gray-400 text-2xl">👤</span>
//                 </div>
//               )}
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfileImageChange}
//                   className="hidden"
//                   id="profileImageUpload"
//                 />
//                 <label
//                   htmlFor="profileImageUpload"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer text-sm font-medium"
//                 >
//                   {state.profileImage ? "Change Photo" : "Upload Photo"}
//                 </label>
//                 <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               name="name"
//               value={state.name || ""}
//               onChange={handleBasicInfoChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="John Doe"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={state.email || ""}
//               onChange={handleBasicInfoChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="john.doe@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//             <input
//               name="phone"
//               value={state.phone || ""}
//               onChange={handleBasicInfoChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="(123) 456-7890"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
//             <input
//               name="linkedin"
//               type="url"
//               value={state.linkedin || ""}
//               onChange={handleBasicInfoChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="https://linkedin.com/in/username"
//             />
//           </div>
//         </div>
//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
//           <textarea
//             name="summary"
//             value={state.summary || ""}
//             onChange={handleBasicInfoChange}
//             rows="4"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="A brief overview of your professional background and career goals..."
//           />
//         </div>
//       </div>

//       {/* Experience Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Work Experience</h3>

//         {/* Add Experience Form */}
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Job Title"
//               value={currentExperience.title}
//               onChange={(e) => setCurrentExperience({...currentExperience, title: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               placeholder="Company"
//               value={currentExperience.company}
//               onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="date"
//               placeholder="Start Date"
//               value={currentExperience.startDate}
//               onChange={(e) => setCurrentExperience({...currentExperience, startDate: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 placeholder="End Date"
//                 value={currentExperience.endDate}
//                 onChange={(e) => setCurrentExperience({...currentExperience, endDate: e.target.value})}
//                 disabled={currentExperience.current}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
//               />
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={currentExperience.current}
//                   onChange={(e) => setCurrentExperience({...currentExperience, current: e.target.checked, endDate: ""})}
//                   className="mr-2"
//                 />
//                 Current
//               </label>
//             </div>
//           </div>
//           <textarea
//             placeholder="Job description and achievements..."
//             value={currentExperience.description}
//             onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
//             rows="3"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
//           />
//           <button
//             onClick={addExperience}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Experience
//           </button>
//         </div>

//         {/* Experience List */}
//         <div className="space-y-4">
//           {state.experiences.map((exp) => (
//             <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-semibold">{exp.title} at {exp.company}</h4>
//                   <p className="text-sm text-gray-600">
//                     {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
//                   </p>
//                   <p className="text-sm mt-2">{exp.description}</p>
//                 </div>
//                 <button
//                   onClick={() => removeExperience(exp.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Education Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Education</h3>
        
//         {/* Add Education Form */}
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
//               <select
//                 value={currentEducation.degreeType || ''}
//                 onChange={(e) => {
//                   const degreeType = e.target.value;
//                   setCurrentEducation({
//                     ...currentEducation,
//                     degreeType,
//                     degree: degreeType === 'Other' ? currentEducation.degree : ''
//                   });
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
//               >
//                 <option value="">Select Degree</option>
//                 <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
//                 <option value="B.Sc">B.Sc (Bachelor of Science)</option>
//                 <option value="B.Com">B.Com (Bachelor of Commerce)</option>
//                 <option value="BCA">BCA (Bachelor of Computer Applications)</option>
//                 <option value="B.A">B.A (Bachelor of Arts)</option>
//                 <option value="M.Tech">M.Tech (Master of Technology)</option>
//                 <option value="M.Sc">M.Sc (Master of Science)</option>
//                 <option value="M.Com">M.Com (Master of Commerce)</option>
//                 <option value="MCA">MCA (Master of Computer Applications)</option>
//                 <option value="M.A">M.A (Master of Arts)</option>
//                 <option value="PhD">PhD (Doctor of Philosophy)</option>
//                 <option value="Diploma">Diploma</option>
//                 <option value="Other">Other</option>
//               </select>
//               {currentEducation.degreeType === 'Other' && (
//                 <input
//                   type="text"
//                   placeholder="Enter custom degree"
//                   value={currentEducation.degree}
//                   onChange={(e) => setCurrentEducation({...currentEducation, degree: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               )}
//               {currentEducation.degreeType && currentEducation.degreeType !== 'Other' && (
//                 <input
//                   type="text"
//                   placeholder="Specialization (e.g., Computer Science, Mathematics)"
//                   value={currentEducation.specialization}
//                   onChange={(e) => setCurrentEducation({...currentEducation, specialization: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               )}
//             </div>
//             <input
//               placeholder="School/University"
//               value={currentEducation.school}
//               onChange={(e) => setCurrentEducation({...currentEducation, school: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="date"
//               placeholder="Start Date"
//               value={currentEducation.startDate}
//               onChange={(e) => setCurrentEducation({...currentEducation, startDate: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 placeholder="End Date"
//                 value={currentEducation.endDate}
//                 onChange={(e) => setCurrentEducation({...currentEducation, endDate: e.target.value})}
//                 disabled={currentEducation.current}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
//               />
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={currentEducation.current}
//                   onChange={(e) => setCurrentEducation({...currentEducation, current: e.target.checked, endDate: ""})}
//                   className="mr-2"
//                 />
//                 Current
//               </label>
//             </div>
//             <input
//               placeholder="GPA (optional)"
//               value={currentEducation.gpa}
//               onChange={(e) => setCurrentEducation({...currentEducation, gpa: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <textarea
//             placeholder="Additional notes, achievements, honors..."
//             value={currentEducation.notes}
//             onChange={(e) => setCurrentEducation({...currentEducation, notes: e.target.value})}
//             rows="2"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
//           />
//           <button
//             onClick={addEducation}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Education
//           </button>
//         </div>

//         {/* Education List */}
//         <div className="space-y-4">
//           {state.educationItems.map((edu) => (
//             <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-semibold">{edu.degree}</h4>
//                   <p className="text-sm text-gray-600">{edu.school}</p>
//                   <p className="text-sm text-gray-600">
//                     {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
//                   </p>
//                   {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
//                   {edu.notes && <p className="text-sm mt-2">{edu.notes}</p>}
//                 </div>
//                 <button
//                   onClick={() => removeEducation(edu.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Technical Skills Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Technical Skills</h3>
//         <div className="mb-4">
//           <input
//             placeholder="Add a technical skill (e.g., JavaScript, Python, React, AWS)"
//             value={currentTechnicalSkill}
//             onChange={(e) => setCurrentTechnicalSkill(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
//           />
//           <button
//             onClick={addTechnicalSkill}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Add Technical Skill
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {state.technicalSkills.map((skill, index) => (
//             <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
//               {skill}
//               <button
//                 onClick={() => removeTechnicalSkill(skill)}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Non-Technical Skills Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Non-Technical Skills</h3>
//         <div className="mb-4">
//           <input
//             placeholder="Add a non-technical skill (e.g., Project Management, Communication, Leadership)"
//             value={currentNonTechnicalSkill}
//             onChange={(e) => setCurrentNonTechnicalSkill(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && addNonTechnicalSkill()}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
//           />
//           <button
//             onClick={addNonTechnicalSkill}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             Add Non-Technical Skill
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {state.nonTechnicalSkills.map((skill, index) => (
//             <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
//               {skill}
//               <button
//                 onClick={() => removeNonTechnicalSkill(skill)}
//                 className="text-green-600 hover:text-green-800"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Certifications Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Certifications</h3>
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Certification Name"
//               value={currentCertification.name}
//               onChange={(e) => setCurrentCertification({...currentCertification, name: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               placeholder="Issuing Organization"
//               value={currentCertification.issuer}
//               onChange={(e) => setCurrentCertification({...currentCertification, issuer: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="date"
//               placeholder="Date Obtained"
//               value={currentCertification.date}
//               onChange={(e) => setCurrentCertification({...currentCertification, date: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="date"
//               placeholder="Expiry Date (optional)"
//               value={currentCertification.expiryDate}
//               onChange={(e) => setCurrentCertification({...currentCertification, expiryDate: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <button
//             onClick={addCertification}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Certification
//           </button>
//         </div>
//         <div className="space-y-2">
//           {state.certifications.map((cert) => (
//             <div key={cert.id} className="p-3 border border-gray-200 rounded-lg flex justify-between items-center">
//               <div>
//                 <span className="font-medium">{cert.name}</span>
//                 {cert.issuer && <span className="text-gray-600"> - {cert.issuer}</span>}
//                 {cert.date && <span className="text-sm text-gray-500"> ({cert.date})</span>}
//                 {cert.expiryDate && <span className="text-sm text-orange-600"> - Expires: {cert.expiryDate}</span>}
//               </div>
//               <button
//                 onClick={() => removeCertification(cert.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Projects Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Projects</h3>
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Project Title"
//               value={currentProject.title}
//               onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               placeholder="Project Link (optional)"
//               value={currentProject.link}
//               onChange={(e) => setCurrentProject({...currentProject, link: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="date"
//               placeholder="Start Date"
//               value={currentProject.startDate}
//               onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="date"
//               placeholder="End Date"
//               value={currentProject.endDate}
//               onChange={(e) => setCurrentProject({...currentProject, endDate: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <textarea
//             placeholder="Project description..."
//             value={currentProject.description}
//             onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
//             rows="3"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
//           />
//           <input
//             placeholder="Technologies used (comma separated)"
//             value={currentProject.technologies}
//             onChange={(e) => setCurrentProject({...currentProject, technologies: e.target.value})}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
//           />
//           <button
//             onClick={addProject}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Project
//           </button>
//         </div>
//         <div className="space-y-4">
//           {state.projects.map((proj) => (
//             <div key={proj.id} className="p-4 border border-gray-200 rounded-lg">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-semibold">{proj.title}</h4>
//                   <p className="text-sm text-gray-600">
//                     {proj.startDate} - {proj.endDate}
//                   </p>
//                   <p className="text-sm mt-2">{proj.description}</p>
//                   {proj.technologies && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       <strong>Technologies:</strong> {proj.technologies}
//                     </p>
//                   )}
//                   {proj.link && (
//                     <p className="text-sm text-blue-600 mt-1">
//                       <strong>Link:</strong> <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => removeProject(proj.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Achievements Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Achievements</h3>
//         <div className="mb-4">
//           <input
//             placeholder="Add an achievement or award"
//             value={currentAchievement}
//             onChange={(e) => setCurrentAchievement(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
//           />
//           <button
//             onClick={addAchievement}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Achievement
//           </button>
//         </div>
//         <div className="space-y-4">
//           {state.achievements.map((achievement, index) => (
//             <div key={index} className="p-3 border border-gray-200 rounded-lg flex justify-between items-center">
//               <span>{achievement}</span>
//               <button
//                 onClick={() => removeAchievement(achievement)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Languages Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Languages</h3>
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Language"
//               value={currentLanguage.language}
//               onChange={(e) => setCurrentLanguage({...currentLanguage, language: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <select
//               value={currentLanguage.proficiency}
//               onChange={(e) => setCurrentLanguage({...currentLanguage, proficiency: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Proficiency</option>
//               <option value="Basic">Basic</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Fluent">Fluent</option>
//               <option value="Native">Native</option>
//             </select>
//           </div>
//           <button
//             onClick={addLanguage}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Language
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {state.languages.map((lang) => (
//             <span key={lang.id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
//               {lang.language} ({lang.proficiency})
//               <button
//                 onClick={() => removeLanguage(lang.id)}
//                 className="text-green-600 hover:text-green-800"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Interests Section */}
//       <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//         <h3 className="text-xl font-semibold text-indigo-700 mb-4">Personal Interests & Hobbies</h3>
//         <div className="mb-4">
//           <input
//             placeholder="Add an interest or hobby"
//             value={currentInterest}
//             onChange={(e) => setCurrentInterest(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && addInterest()}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
//           />
//           <button
//             onClick={addInterest}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Interest
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {state.interests.map((interest, index) => (
//             <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2">
//               {interest}
//               <button
//                 onClick={() => removeInterest(interest)}
//                 className="text-purple-600 hover:text-purple-800"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Download Button */}
//       <div className="mt-6 flex justify-center">
//         <button
//           onClick={(e) => downloadPDF(e.currentTarget)}
//           className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg font-semibold"
//         >
//           Download PDF Resume
//         </button>
//       </div>
//     </div>
//   );
// }
