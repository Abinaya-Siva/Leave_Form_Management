import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function ViewGoogleForms() {

  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/forms")
      .then(res => res.json())
      .then(data => setForms(data));
  }, []);

  const deleteForm = async (id) => {
    const confirmDelete = window.confirm("Delete this form?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/forms/${id}`, {
      method: "DELETE"
    });

    setForms(forms.filter(f => f.id !== id));
    setSelectedForm(null);
  };

  
  const downloadPDF = (form) => {
    const pdf = new jsPDF();
    let y = 10;

    pdf.setFontSize(18);
    pdf.text(form.title, 10, y);
    y += 10;

    pdf.setFontSize(12);

    form.questions.forEach((q, index) => {
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }

      pdf.text(`${index + 1}. ${q.question}`, 10, y);
      y += 6;

      pdf.text(`Type: ${q.type}`, 12, y);
      y += 6;

      if (q.options && q.options.length > 0) {
        pdf.text(`Options: ${q.options.join(", ")}`, 12, y);
        y += 6;
      }

      y += 4;
    });

    pdf.save(`${form.title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">

      
      <div className="col-span-1 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Saved Forms</h2>

        {forms.length === 0 && (
          <p className="text-sm text-gray-500">No forms created</p>
        )}

        {forms.map(form => (
          <div
            key={form.id}
            onClick={() => setSelectedForm(form)}
            className="cursor-pointer border rounded p-3 mb-2 hover:bg-slate-100"
          >
            <p className="font-medium">{form.title}</p>
            <p className="text-xs text-gray-500">
              {form.questions.length} questions
            </p>
          </div>
        ))}
      </div>

      
      <div className="col-span-2 bg-white rounded-xl shadow p-6">

        {!selectedForm ? (
          <p className="text-gray-500 text-center">
            Select a form to preview
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedForm.title}
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => downloadPDF(selectedForm)}
                  className="px-3 py-1 rounded-md bg-emerald-600 text-white
                             hover:bg-emerald-700 transition text-sm"
                >
                  Download PDF
                </button>

                <button
                  onClick={() => deleteForm(selectedForm.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {selectedForm.questions.map((q, i) => (
                <div key={q.id} className="border rounded p-4">

                  <p className="font-medium mb-2">
                    {i + 1}. {q.question}
                  </p>

                  {q.type === "short" && (
                    <input disabled className="w-full border p-2 rounded" />
                  )}

                  {q.type === "long" && (
                    <textarea disabled className="w-full border p-2 rounded" />
                  )}

                  {(q.type === "mcq" || q.type === "checkbox") && (
                    <div className="space-y-1">
                      {q.options.map((opt, idx) => (
                        <label key={idx} className="flex gap-2 items-center">
                          <input
                            type={q.type === "mcq" ? "radio" : "checkbox"}
                            disabled
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "file" && <input type="file" disabled />}
                  {q.type === "date" && <input type="date" disabled />}
                  {q.type === "time" && <input type="time" disabled />}

                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}