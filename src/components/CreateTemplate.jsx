import { useState } from "react";

export default function CreateTemplate() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !description) return;

    fetch("http://localhost:5000/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    }).then(() => {
      setName("");
      setDescription("");
      alert("Template saved successfully");
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadaow p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        FORM 
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Leave Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border
                     focus:ring-2 focus:ring-slate-900"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border
                     focus:ring-2 focus:ring-slate-900"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-slate-900 text-white
                       hover:bg-slate-800 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}





