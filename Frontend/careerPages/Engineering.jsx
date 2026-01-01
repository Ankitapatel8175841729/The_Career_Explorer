import React from "react";
import engineering from "../../College&Exam/engineering";
import engineeringRanking from "../../College&Exam/engineeringRanking";

const Engineering = () => {
  return (
    <div className="container m-auto pt-3 min-vh-100">
      <h1>Engineering</h1>
      <h3>{engineering.length} Colleges</h3>
      <h3>{engineeringRanking.length} Colleges</h3>
    </div>
  );
};

export default Engineering;
