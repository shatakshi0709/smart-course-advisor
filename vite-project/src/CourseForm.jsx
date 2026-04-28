import React, { useState } from "react";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    interest: "",
    level: "",
    time: "",
    goal: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("YOUR_N8N_WEBHOOK_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Your Perfect Course 🎯</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Interest:</label>
      <select name="domain" onChange={handleChange} required>
  <option value="">Select Domain</option>
  <option value="ai">AI / ML</option>
  <option value="web">Web Development</option>
  <option value="data">Data Science</option>
  <option value="devops">DevOps</option>
  <option value="cyber">Cybersecurity</option>
  <option value="mobile">Mobile Development</option>
</select>
        </div>

        <div>
          <label>Skill Level:</label>
          <select name="level" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </div>

<div>
  <label>Course Duration (in weeks):</label>
  <select name="duration" onChange={handleChange} required>
    <option value="">Select Duration</option>
    <option value="4">Up to 4 weeks</option>
    <option value="8">Up to 8 weeks</option>
    <option value="12">Up to 12 weeks</option>
  </select>
</div>

<div>
  <label>Budget:</label>
        <select name="budget" onChange={handleChange} required>
          <option value="">Select Budget</option>
          <option value="0">Free</option>
          <option value="3000">Under ₹3000</option>
          <option value="7000">Under ₹7000</option>
          <option value="10000">Under ₹10000</option>
          <option value="15000">Any</option>
        </select>
</div>

        <div>
          <label>Goal:</label>
          <select name="goal" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="job">Get a Job</option>
            <option value="freelancing">Freelancing</option>
            <option value="learning">Learning</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Get Course 🚀
        </button>
      </form>


      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended Course 📚</h3>
          <p><b>Name:</b> {result.course_name}</p>
          <p><b>Reason:</b> {result.reason}</p>
          <p><b>Duration:</b> {result.duration}</p>
        </div>
      )}
    </div>
  );
};

export default CourseForm;