import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions on mount
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(console.error);
  }, []);

  // Add question handler
  function handleAddQuestion(newQuestion) {
    setQuestions((questions) => [...questions, newQuestion]);
  }

  // Delete question handler
  function handleDeleteQuestion(id) {
    // Optimistically update UI
    setQuestions((questions) => questions.filter((q) => q.id !== id));
  }

  // Update question handler (for correctIndex)
  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((questions) =>
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
