import { useState } from "react";

export default function OnboardingProgressTracker() {
  const customColors = {
    purple: "#6b65ff",
    lightGreen: "#d2ff66",
    darkGreen: "#00785d",
    borderGreen: "#00785d",
    checkmarkGreen: "#00785d",
    // New colors for the Site Setup phase groups
    essential: "#6b65ff",
    account: "#4299e1",
    final: "#9061f9",
  };

  const phases = [
    {
      name: "Phase 1",
      description: "Description for Phase 1 tasks and requirements.",
      steps: [
        { name: "Step 1A", completed: false },
        { name: "Step 1B", completed: false },
        { name: "Step 1C", completed: false },
      ],
    },
    {
      name: "Phase 2",
      description: "Description for Phase 2 analysis and review process.",
      steps: [
        { name: "Step 2A", completed: false },
        { name: "Step 2B", completed: false },
        { name: "Step 2C", completed: false },
        { name: "Step 2D", completed: false },
        { name: "Step 2E", completed: false },
        { name: "Step 2F", completed: false },
        { name: "Step 2G", completed: false },
      ],
    },
    {
      name: "Phase 3",
      description: "Description for Phase 3 setup and configuration steps.",
      steps: [
        { id: 1, name: "Essential Step 1", group: "essential", completed: false },
        { id: 2, name: "Essential Step 2", group: "essential", completed: false },
        { id: 3, name: "Essential Step 3", group: "essential", completed: false },
        { id: 4, name: "Account Step 1", group: "account", completed: false },
        { id: 5, name: "Account Step 2", group: "account", completed: false },
        { id: 6, name: "Final Step", group: "final", completed: false },
      ],
    },
    {
      name: "Phase 4",
      description: "Description for Phase 4 final review and verification.",
      steps: [
        { name: "Step 4A", completed: false },
        { name: "Step 4B", completed: false },
        { name: "Step 4C", completed: false },
        { name: "Step 4D", completed: false },
        { name: "Step 4E", completed: false },
        { name: "Step 4F", completed: false },
        { name: "Step 4G", completed: false },
      ],
    },
  ];

  const [phaseData, setPhaseData] = useState(phases);
  const [activePhase, setActivePhase] = useState(2); // Default to Phase 3
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const toggleStep = (phaseIndex, stepIndex) => {
    const updatedPhases = [...phaseData];
    updatedPhases[phaseIndex].steps[stepIndex].completed = true;
    setPhaseData(updatedPhases);
    if (stepIndex + 1 < updatedPhases[phaseIndex].steps.length) {
      setActiveStepIndex(stepIndex + 1);
    }
  };

  const calculateCompletion = phase => {
    const totalSteps = phase.steps.length;
    const completedSteps = phase.steps.filter(step => step.completed).length;
    return totalSteps === 0
      ? 0
      : Math.round((completedSteps / totalSteps) * 100);
  };

  const isAllComplete = () => {
    return phaseData.every(phase => phase.steps.every(step => step.completed));
  };

  // Standard step renderer for non-Phase 3 phases
  const renderStepCircle = (step, idx) => {
    const isActive = idx === activeStepIndex && !step.completed;
    const isComplete = step.completed;
    return (
      <div
        key={idx}
        onClick={() => setActiveStepIndex(idx)}
        className="cursor-pointer"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1"
          style={{
            backgroundColor: isComplete
              ? customColors.lightGreen
              : isActive
              ? customColors.purple
              : "#e5e7eb",
            color: isComplete
              ? customColors.checkmarkGreen
              : isActive
              ? "white"
              : "#4b5563",
          }}
        >
          {isComplete ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            idx + 1
          )}
        </div>
        <span className="text-xs text-gray-800">{step.name}</span>
      </div>
    );
  };

  // Group steps by their type for Phase 3
  const groupPhase3Steps = steps => {
    const groups = {
      essential: steps.filter(step => step.group === "essential"),
      account: steps.filter(step => step.group === "account"),
      final: steps.filter(step => step.group === "final"),
    };
    return groups;
  };

  // Specialized step renderer for Phase 3 with horizontal flow
  const renderPhase3Flow = steps => {
    const groups = groupPhase3Steps(steps);

    return (
      <div className="mb-6">
        {/* Group Headers */}
        <div className="flex border-b border-gray-300 mb-2">
          <div className="w-1/2 px-2 py-1 bg-indigo-50 text-center rounded-t-lg border-t border-l border-r border-gray-300">
            <h3 className="font-medium text-indigo-800 text-sm">
              Essential Setup{" "}
              <span className="text-xs text-indigo-600">(Required First)</span>
            </h3>
          </div>
          <div className="w-1/3 px-2 py-1 bg-blue-50 text-center rounded-t-lg border-t border-l border-r border-gray-300 ml-1">
            <h3 className="font-medium text-blue-800 text-sm">
              Account Setup{" "}
            </h3>
          </div>
          <div className="w-1/6 px-2 py-1 bg-purple-50 text-center rounded-t-lg border-t border-l border-r border-gray-300 ml-1">
            <h3 className="font-medium text-purple-800 text-sm">Final</h3>
          </div>
        </div>

        {/* Step Circles and Connection Lines */}
        <div className="flex items-center relative h-24">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -z-10 transform -translate-y-1/2"></div>

          {/* Essential Steps */}
          <div className="w-1/2 flex justify-around">
            {groups.essential.map((step, idx) => {
              const stepIndex = steps.findIndex(s => s.id === step.id);
              const isActive = stepIndex === activeStepIndex && !step.completed;
              const isComplete = step.completed;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer"
                    style={{
                      backgroundColor: isComplete
                        ? customColors.lightGreen
                        : isActive
                        ? customColors.essential
                        : "#e5e7eb",
                      color: isComplete
                        ? customColors.checkmarkGreen
                        : isActive
                        ? "white"
                        : "#4b5563",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(107, 101, 255, 0.2)"
                        : "none",
                    }}
                    onClick={() => setActiveStepIndex(stepIndex)}
                  >
                    {isComplete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium">{step.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Account Steps */}
          <div className="w-1/3 flex justify-around">
            {groups.account.map((step, idx) => {
              const stepIndex = steps.findIndex(s => s.id === step.id);
              const isActive = stepIndex === activeStepIndex && !step.completed;
              const isComplete = step.completed;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer"
                    style={{
                      backgroundColor: isComplete
                        ? customColors.lightGreen
                        : isActive
                        ? customColors.account
                        : "#e5e7eb",
                      color: isComplete
                        ? customColors.checkmarkGreen
                        : isActive
                        ? "white"
                        : "#4b5563",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(66, 153, 225, 0.2)"
                        : "none",
                    }}
                    onClick={() => setActiveStepIndex(stepIndex)}
                  >
                    {isComplete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium">{step.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Step */}
          <div className="w-1/6 flex justify-center">
            {groups.final.map((step, idx) => {
              const stepIndex = steps.findIndex(s => s.id === step.id);
              const isActive = stepIndex === activeStepIndex && !step.completed;
              const isComplete = step.completed;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer"
                    style={{
                      backgroundColor: isComplete
                        ? customColors.lightGreen
                        : isActive
                        ? customColors.final
                        : "#e5e7eb",
                      color: isComplete
                        ? customColors.checkmarkGreen
                        : isActive
                        ? "white"
                        : "#4b5563",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(144, 97, 249, 0.2)"
                        : "none",
                    }}
                    onClick={() => setActiveStepIndex(stepIndex)}
                  >
                    {isComplete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium">{step.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Current step panel (shows only for Phase 3)
  const renderCurrentStepPanel = () => {
    if (activePhase !== 2 || activeStepIndex === null) return null;

    const currentStep = phaseData[activePhase].steps[activeStepIndex];
    if (!currentStep) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <div
            className="w-8 h-8 rounded-full text-white flex items-center justify-center mr-3"
            style={{
              backgroundColor:
                customColors[currentStep.group] || customColors.purple,
            }}
          >
            {currentStep.id}
          </div>
          <h3 className="font-bold text-lg">{currentStep.name}</h3>
          <span className="ml-auto px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            Current Step
          </span>
        </div>
        <div className="ml-11">
          <p className="text-gray-600 text-sm mb-2">
            Complete this step to proceed with your setup process.
          </p>
          <button
            className="text-white px-4 py-1 rounded-md text-sm font-medium hover:opacity-90"
            style={{
              backgroundColor:
                customColors[currentStep.group] || customColors.purple,
            }}
            onClick={() => toggleStep(activePhase, activeStepIndex)}
          >
            Start
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg p-8">
      {/* Phase Selector */}
      <div className="relative flex items-center justify-between mb-12">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-gray-300"></div>
        {phaseData.map((phase, index) => (
          <div
            key={index}
            className="relative z-10"
            onMouseEnter={() => setHoveredPhase(index)}
            onMouseLeave={() => setHoveredPhase(null)}
          >
            <div
              className="px-5 py-3 rounded-full text-sm font-semibold cursor-pointer transition shadow-md"
              style={{
                backgroundColor:
                  activePhase === index
                    ? customColors.purple
                    : calculateCompletion(phase) === 100
                    ? customColors.lightGreen
                    : "#f3f4f6",
                color:
                  activePhase === index
                    ? "white"
                    : calculateCompletion(phase) === 100
                    ? customColors.darkGreen
                    : "#4b5563",
                borderWidth: "1px",
                borderColor:
                  activePhase === index
                    ? customColors.purple
                    : calculateCompletion(phase) === 100
                    ? customColors.borderGreen
                    : "#e5e7eb",
              }}
              onClick={() => {
                setActivePhase(index);
                setActiveStepIndex(0);
              }}
            >
              {phase.name}
            </div>
            {hoveredPhase === index && (
              <div className="absolute top-full mt-2 w-64 p-3 text-sm bg-white border border-gray-300 rounded shadow-md z-50">
                {phase.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {activePhase >= 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              {calculateCompletion(phaseData[activePhase])}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${calculateCompletion(phaseData[activePhase])}%`,
                backgroundColor:
                  calculateCompletion(phaseData[activePhase]) === 100
                    ? customColors.darkGreen
                    : customColors.purple,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Render Steps */}
      {activePhase >= 0 &&
        (activePhase === 2
          ? // Special horizontal flow for Phase 3
            renderPhase3Flow(phaseData[activePhase].steps)
          : // Standard two-row layout for other phases
            (() => {
              const steps = phaseData[activePhase].steps;
              const firstRow = steps.slice(0, 4);
              const secondRow = steps.slice(4);

              return (
                <div className="space-y-4">
                  <div className="flex justify-around text-center">
                    {firstRow.map((step, idx) => renderStepCircle(step, idx))}
                  </div>
                  {secondRow.length > 0 && (
                    <div className="flex justify-around text-center">
                      {secondRow.map((step, idx) =>
                        renderStepCircle(step, idx + 4)
                      )}
                    </div>
                  )}
                </div>
              );
            })())}

      {/* Current Step Panel for Phase 3 */}
      {renderCurrentStepPanel()}

      {/* Generic Step Content */}
      {activePhase >= 0 && (
        <div className="space-y-6 mt-8">
          <h2 className="text-3xl font-bold">
            {phaseData[activePhase].steps[activeStepIndex]?.name || "Step Name"}
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-800 mb-4">
              This is the content area for the current step. Instructions, forms, 
              and other content would be displayed here based on the selected step.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Input Field
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter information here"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Dropdown
                </label>
                <select className="w-full border border-gray-300 p-2 rounded">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="text-sm text-purple-600 hover:text-purple-800">
              SKIP THIS STEP
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-6 rounded-full"
              onClick={() => toggleStep(activePhase, activeStepIndex)}
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {isAllComplete() && (
        <div
          className="mb-8 mx-4 p-6 rounded-md flex flex-col space-y-6"
          style={{
            backgroundColor: "rgba(210, 255, 102, 0.2)",
            borderWidth: "1px",
            borderColor: customColors.borderGreen,
          }}
        >
          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: customColors.darkGreen }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: customColors.darkGreen }}
            >
              You've completed the onboarding process! All steps have been finished successfully.
            </span>
          </div>

          <p
            className="text-base font-medium"
            style={{ color: customColors.darkGreen }}
          >
            Thank you for completing all phases of the setup process.
          </p>
        </div>
      )}
    </div>
  );
}
