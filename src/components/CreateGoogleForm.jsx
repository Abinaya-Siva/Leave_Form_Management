import { useState } from "react";

export default function CreateGoogleForm() {

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: "",
        type: "short",
        options: []
      }
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map(q =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map(q =>
        q.id === id
          ? { ...q, options: [...q.options, ""] }
          : q
      )
    );
  };

  const updateOption = (qid, index, value) => {
    setQuestions(
      questions.map(q =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? value : opt
              )
            }
          : q
      )
    );
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const saveForm = async () => {
    if (!title || questions.length === 0) return alert("Add title & questions");

    await fetch("http://localhost:5000/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questions })
    });

    alert("Form Saved Successfully");
    setTitle("");
    setQuestions([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-semibold border-b-2 border-slate-300
                   focus:outline-none focus:border-slate-900 pb-2"
      />

      {questions.map((q, index) => (
        <div key={q.id} className="bg-white rounded-xl shadow p-6 space-y-4">

          <div className="flex gap-4">
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.question}
              onChange={(e) =>
                updateQuestion(q.id, "question", e.target.value)
              }
              className="flex-1 border p-2 rounded"
            />

            <select
              value={q.type}
              onChange={(e) =>
                updateQuestion(q.id, "type", e.target.value)
              }
              className="border p-2 rounded"
            >
              <option value="short">Short Answer</option>
              <option value="long">Long Answer</option>
              <option value="mcq">MCQ</option>
              <option value="checkbox">Checkbox</option>
              <option value="file">File Upload</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
            </select>
          </div>

          {(q.type === "mcq" || q.type === "checkbox") && (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) =>
                    updateOption(q.id, i, e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
              ))}

              <button
                onClick={() => addOption(q.id)}
                className="text-sm text-blue-600"
              >
                + Add Option
              </button>
            </div>
          )}

          <button
            onClick={() => deleteQuestion(q.id)}
            className="text-sm text-red-600"
          >
            Delete Question
          </button>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={addQuestion}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg"
        >
          + Add Question
        </button>

        <button
          onClick={saveForm}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Save Form
        </button>
      </div>

    </div>
  );
}


