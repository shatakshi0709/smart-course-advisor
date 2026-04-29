import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("courseResult");
    if (data) {
      try {
        setResult(JSON.parse(data));
      } catch (e) {
        console.error("Error parsing result data", e);
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="app-shell">
        <div className="content-card result-page-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '660px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>No result found</h2>
            <p>Please complete the course form first.</p>
            <button className="gradient-btn mt-4" style={{ marginTop: '20px' }} onClick={() => navigate("/")}>
              Go to Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <section className="content-card result-page-card">
        <div className="confetti-wrap">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={`confetti-${i}`} className="confetti-piece" />
          ))}
        </div>
        
        <div className="step-body center-body result-step">
          <h2>Your Perfect Path is Ready!</h2>
          <p className="subtitle" style={{ marginBottom: '24px' }}>Here is your personalized recommendation</p>
          
          <div className="udemy-course-card">
            <div className="card-top">
              <h3 className="course-name">{result.name}</h3>
              <div className="course-price">
                {typeof result.price === 'number' ? `₹${result.price.toLocaleString('en-IN')}` : result.price || 'Free'}
              </div>
            </div>
            
            <div className="card-meta">
              <span className="meta-item">
                <span className="icon"></span> {result.duration} {result.duration === 1 ? "week" : "weeks"}
              </span>
              <span className="meta-divider">•</span>
              <span className="meta-item">
                <span className="icon"></span> {result.level || 'Beginner'}
              </span>
            </div>
            
            <div className="card-description">
              <h4>About this course</h4>
              <p>{result.description || result.reason}</p>
            </div>
          </div>

          <div className="result-actions" style={{ display: 'flex', gap: '16px', marginTop: '30px', width: '100%', maxWidth: '500px' }}>
            <button className="gradient-btn" onClick={() => alert("Enrolling in course...")}>
              Enroll Now
            </button>
            <button className="text-btn" style={{ padding: '0 20px', border: '1.5px solid #e5e8ff', borderRadius: '14px' }} onClick={() => navigate("/")}>
              Start Over
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultPage;
