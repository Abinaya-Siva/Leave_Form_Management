import { useEffect, useState } from "react";

export default function ViewTemplate() {
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/templates")
      .then(res => res.json())
      .then(data => setRows(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this template?")) return;

    await fetch(`http://localhost:5000/templates/${id}`, {
      method: "DELETE",
    });

    setRows(rows.filter(r => r.id !== id));
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setName(row.name);
    setDescription(row.description);
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/templates/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    setRows(rows.map(r =>
      r.id === editId ? { ...r, name, description } : r
    ));

    setEditId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">S.No</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-t">
                <td className="p-4">{index + 1}</td>

                <td className="p-4">
                  {editId === row.id ? (
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border px-2 py-1"
                    />
                  ) : (
                    row.name
                  )}
                </td>

                <td className="p-4">
                  {editId === row.id ? (
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border px-2 py-1"
                    />
                  ) : (
                    row.description
                  )}
                </td>

                <td className="p-4 space-x-2">
                  {editId === row.id ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(row.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}