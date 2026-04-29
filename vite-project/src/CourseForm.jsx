import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const TOTAL_STEPS = 6;

const levelOptions = [
  {
    id: "beginner",
    title: "Beginner",
    description: "Just getting started",
    tone: "tone-green",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Know the basics",
    tone: "tone-orange",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Want to level up",
    tone: "tone-red",
  },
];

const goalOptions = [
  {
    id: "get-job",
    title: "Get a Job",
    description: "Build skills for your dream role",
    bg: "goal-blue",
  },
  {
    id: "learn-skills",
    title: "Learn New Skills",
    description: "Upskill and grow",
    bg: "goal-purple",
  },
  {
    id: "crack-exams",
    title: "Crack Exams",
    description: "Ace your learning goals",
    bg: "goal-yellow",
  },
];

const budgetOptions = ["Under ₹3000", "Under ₹7000", "Under ₹10000+"];

const leftPanelContent = {
  1: { emoji: "👋", title: "Welcome aboard", subtitle: "Your guided learning journey starts now." },
  2: { emoji: "📝", title: "Tell us about you", subtitle: "We only need a few basic details." },
  3: { emoji: "🧭", title: "Pick your domain", subtitle: "Choose what excites you the most." },
  4: { emoji: "🎯", title: "Set your level", subtitle: "We personalize based on your experience." },
  5: { emoji: "🚩", title: "Define your goal", subtitle: "Your purpose shapes the perfect path." },
  6: { emoji: "⏱️", title: "Final details", subtitle: "Tune timeline and budget for a fit." },
};

const CourseForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    course: "",
    level: "",
    goal: "",
    duration: 8,
    budget: "Under ₹7000",
  });
  
  const [domains, setDomains] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDomains = async () => {
      // Mock fetching dynamic categories from backend (Notion)
      const data = [
        { id: "ai-genai", title: "AI / GenAI" },
        { id: "cybersecurity", title: "Cybersecurity" },
        { id: "data-science", title: "Data Science" },
        { id: "devops", title: "DevOps" },
        { id: "machine-learning", title: "Machine Learning" },
        { id: "mobile-dev", title: "Mobile Development" },
        { id: "programming", title: "Programming" },
        { id: "web-development", title: "Web Development" }
      ];
      setDomains(data);
    };
    getDomains();
  }, []);

  const animateStep = (nextStep) => {
    setIsAnimating(true);
    window.setTimeout(() => {
      setStep(nextStep);
      setIsAnimating(false);
    }, 220);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDomainSelect = (domainId) => {
    updateField("domain", domainId);
    updateField("course", ""); 
    setLoadingCourses(true);
    
    // Mock fetching courses for the selected domain
    setTimeout(() => {
      const selectedDomain = domains.find(d => d.id === domainId)?.title || domainId;
      const mockCourses = [
        { id: `c1-${domainId}`, title: `Introduction to ${selectedDomain}` },
        { id: `c2-${domainId}`, title: `Advanced ${selectedDomain} Concepts` },
        { id: `c3-${domainId}`, title: `${selectedDomain} Masterclass for Professionals` }
      ];
      setCourses(mockCourses);
      setLoadingCourses(false);
    }, 600);
  };

  const increaseDuration = () => {
    setFormData((prev) => ({ ...prev, duration: Math.min(prev.duration + 1, 52) }));
  };

  const decreaseDuration = () => {
    setFormData((prev) => ({ ...prev, duration: Math.max(prev.duration - 1, 1) }));
  };

  const canContinueFromStep = () => {
    if (step === 2) return formData.name.trim() && formData.email.trim();
    if (step === 3) return formData.domain && formData.course; // Now requires selecting a course too
    if (step === 4) return formData.level;
    if (step === 5) return formData.goal;
    if (step === 6) return formData.budget;
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS && canContinueFromStep()) {
      animateStep(step + 1);
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
  
    const payload = {
      name: formData.name,
      email: formData.email,
      domain: domains.find((item) => item.id === formData.domain)?.title || formData.domain,
      course: courses.find((item) => item.id === formData.course)?.title || formData.course,
      level: levelOptions.find((item) => item.id === formData.level)?.title || formData.level,
      goal: goalOptions.find((item) => item.id === formData.goal)?.title || formData.goal,
      duration: formData.duration,
      budget: formData.budget,
    };
  
    const webhookUrls = [
        "http://localhost:5678/webhook-test/lead-form",
    ];

    try {
      let lastError = null;

      for (const url of webhookUrls) {
        try {
          const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data?.message || "Something went wrong");
          }
  
          localStorage.setItem("courseResult", JSON.stringify(data));
          navigate('/result');
          return;
        } catch (requestError) {
          lastError = requestError;
        }
      }
  
      throw lastError || new Error("Something went wrong");
    } catch (submitError) {
      const isNetworkError = submitError instanceof TypeError;
      setError(
        isNetworkError
          ? "Unable to reach n8n webhook. Please ensure n8n is running and webhook is active."
          : submitError?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    if (step > 1) {
      animateStep(step - 1);
    }
  };

  const leftContent = leftPanelContent[step];

  return (
    <div className="app-shell">
      <section className={`content-card ${isAnimating ? "step-entering" : ""}`}>
        <div className="floating-illustration hero-in-card">
          <div className="emoji-bubble">{leftContent.emoji}</div>
          <h3>{leftContent.title}</h3>
          <p>{leftContent.subtitle}</p>
        </div>

          <div className="progress-wrap">
            <div className="step-dots">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <span key={`dot-${i + 1}`} className={step >= i + 1 ? "dot active" : "dot"} />
              ))}
            </div>
            <div className="progress-bar">
              <span style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
            </div>
            <p className="step-label">Step {step} of {TOTAL_STEPS}</p>
          </div>

          {step === 1 && (
            <div className="step-body center-body">
              <h1>Hey there! Let&apos;s find your perfect course</h1>
              <p>Answer a few quick questions and we&apos;ll build your ideal learning path.</p>
              <button className="gradient-btn" onClick={next}>
                Let&apos;s Start
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-body">
              <h2>First, tell us about you</h2>
              <p className="subtitle">We just need the basics.</p>
              <label className="input-wrap">
                <span className="input-icon"></span>
                <input
                  value={formData.name}
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </label>
              <label className="input-wrap">
                <span className="input-icon"></span>
                <input
                  value={formData.email}
                  type="email"
                  placeholder="Your Email"
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </label>
              <button className="gradient-btn" disabled={!canContinueFromStep()} onClick={next}>
                Next →
              </button>
              <button className="text-btn" onClick={back}>← Back</button>
            </div>
          )}

          {step === 3 && (
            <div className="step-body" style={{ alignItems: 'stretch' }}>
              <h2 style={{ textAlign: 'center' }}>What do you want to learn?</h2>
              <p className="subtitle" style={{ textAlign: 'center', marginBottom: '16px' }}>Choose a domain to see available courses.</p>
              
              <div className="grid-cards">
                {domains.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`choice-card ${formData.domain === item.id ? "selected" : ""}`}
                    onClick={() => handleDomainSelect(item.id)}
                  >
                    <span>{item.title}</span>
                    {formData.domain === item.id && <span className="check">✓</span>}
                  </button>
                ))}
              </div>

              {formData.domain && loadingCourses && <p style={{ textAlign: 'center', marginTop: '16px', color: '#7c6bff' }}>Loading courses...</p>}

              {formData.domain && !loadingCourses && courses.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px', color: '#272a4f' }}>Select a Course</h3>
                  <div className="stack-cards">
                    {courses.map(course => (
                      <button
                        type="button"
                        key={course.id}
                        className={`goal-card goal-blue ${formData.course === course.id ? "selected" : ""}`}
                        onClick={() => updateField("course", course.id)}
                      >
                        <div>
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.95rem' }}>{course.title}</strong>
                          </div>
                        </div>
                        {formData.course === course.id && <span className="check">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="gradient-btn" disabled={!canContinueFromStep()} onClick={next}>
                  Next →
                </button>
                <button className="text-btn" onClick={back}>← Back</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-body">
              <h2>What&apos;s your current level?</h2>
              <p className="subtitle">This helps us personalize your path better.</p>
              <div className="stack-cards">
                {levelOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`level-card ${item.tone} ${formData.level === item.id ? "selected" : ""}`}
                    onClick={() => updateField("level", item.id)}
                  >
                    <div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>
                    </div>
                    {formData.level === item.id && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
              <button className="gradient-btn" disabled={!canContinueFromStep()} onClick={next}>
                Next →
              </button>
              <button className="text-btn" onClick={back}>← Back</button>
            </div>
          )}

          {step === 5 && (
            <div className="step-body">
              <h2>What&apos;s your goal?</h2>
              <p className="subtitle">Your goal shapes your perfect path.</p>
              <div className="stack-cards">
                {goalOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`goal-card ${item.bg} ${formData.goal === item.id ? "selected" : ""}`}
                    onClick={() => updateField("goal", item.id)}
                  >
                    <div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>
                    </div>
                    {formData.goal === item.id && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
              <button className="gradient-btn" disabled={!canContinueFromStep()} onClick={next}>
                Next →
              </button>
              <button className="text-btn" onClick={back}>← Back</button>
            </div>
          )}

          {step === 6 && (
            <div className="step-body">
              <h2>Almost there!</h2>
              <p className="subtitle">Let&apos;s add a few final details.</p>
              <div className="duration-wrap">
                <span>Duration (weeks)</span>
                <div className="stepper">
                  <button type="button" onClick={decreaseDuration}>−</button>
                  <strong>{formData.duration}</strong>
                  <button type="button" onClick={increaseDuration}>+</button>
                </div>
              </div>

              <div>
                <p className="budget-title">What&apos;s your budget?</p>
                <div className="budget-pills">
                  {budgetOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={formData.budget === item ? "pill active" : "pill"}
                      onClick={() => updateField("budget", item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button className="gradient-btn" onClick={handleFinalSubmit} disabled={loading}>
                {loading ? "AI is preparing your path..." : "Show My Path"}
              </button>
              {error ? <p className="subtitle" style={{ color: 'red' }}>{error}</p> : null}
              <button className="text-btn" onClick={back} disabled={loading}>← Back</button>
            </div>
          )}

      </section>
    </div>
  );
};

export default CourseForm;