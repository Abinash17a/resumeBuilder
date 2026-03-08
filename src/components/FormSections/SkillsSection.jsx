import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";

// Reusable Skill Pill Component
const SkillPill = ({ label, onRemove, colorClass }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border ${colorClass}`}>
    {label}
    <button
      onClick={onRemove}
      className="hover:scale-125 transition-transform leading-none text-lg"
      title="Remove skill"
    >
      ×
    </button>
  </span>
);

export default function SkillsSection() {
  const { state, dispatch } = useForm();
  const [currentTechnicalSkill, setCurrentTechnicalSkill] = useState("");
  const [currentNonTechnicalSkill, setCurrentNonTechnicalSkill] = useState("");

  const addSkill = (skill, type) => {
    if (skill.trim()) {
      dispatch({
        type: type === "tech" ? actionTypes.ADD_TECHNICAL_SKILL : actionTypes.ADD_NON_TECHNICAL_SKILL,
        payload: skill.trim()
      });
      type === "tech" ? setCurrentTechnicalSkill("") : setCurrentNonTechnicalSkill("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Technical Skills</h3>
            <p className="text-sm text-gray-500">Hard skills, software, and programming languages.</p>
          </div>
          <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">04</span>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            placeholder="e.g. React, Python, Docker, Figma"
            value={currentTechnicalSkill}
            onChange={(e) => setCurrentTechnicalSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill(currentTechnicalSkill, "tech")}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
          <button
            onClick={() => addSkill(currentTechnicalSkill, "tech")}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {state.technicalSkills.map((skill, index) => (
            <SkillPill
              key={index}
              label={skill}
              onRemove={() => dispatch({ type: actionTypes.REMOVE_TECHNICAL_SKILL, payload: skill })}
              colorClass="bg-blue-50 text-blue-700 border-blue-100"
            />
          ))}
          {state.technicalSkills.length === 0 && (
            <p className="text-xs text-gray-400 italic">No technical skills added yet.</p>
          )}
        </div>
      </div>

      {/* Non-Technical Skills */}
      <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Soft Skills</h3>
            <p className="text-sm text-gray-500">Interpersonal, leadership, and management skills.</p>
          </div>
          <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-sm">05</span>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            placeholder="e.g. Leadership, Public Speaking, Agile"
            value={currentNonTechnicalSkill}
            onChange={(e) => setCurrentNonTechnicalSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill(currentNonTechnicalSkill, "soft")}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
          />
          <button
            onClick={() => addSkill(currentNonTechnicalSkill, "soft")}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold text-sm shadow-md shadow-emerald-100 transition-all active:scale-95"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {state.nonTechnicalSkills.map((skill, index) => (
            <SkillPill
              key={index}
              label={skill}
              onRemove={() => dispatch({ type: actionTypes.REMOVE_NON_TECHNICAL_SKILL, payload: skill })}
              colorClass="bg-emerald-50 text-emerald-700 border-emerald-100"
            />
          ))}
          {state.nonTechnicalSkills.length === 0 && (
            <p className="text-xs text-gray-400 italic">No soft skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}