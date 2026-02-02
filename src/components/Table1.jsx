/*import { useState, useEffect } from "react";

function Table1() {

    const [rows, setRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/templates")
            .then(res => res.json())
            .then(data => setRows(data));
    }, []);

    const create = () => {
        setName("");
        setDescription("");
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (row) => {
        setName(row.name);
        setDescription(row.description);
        setEditId(row.id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this template?"
        );
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/templates/${id}`, {
            method: "DELETE",
        });

        setRows(rows.filter((row) => row.id !== id));
    };

    const handleSubmit = () => {
        if (!name || !description) return;

        if (editId) {
            fetch(`http://localhost:5000/templates/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description }),
            })
                .then(res => res.json())
                .then(updated => {
                    setRows(rows.map(r => r.id === editId ? updated : r));
                });
        } else {
            fetch("http://localhost:5000/templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description }),
            })
                .then(res => res.json())
                .then(data => setRows([...rows, data]));
        }

        setShowModal(false);
        setName("");
        setDescription("");
        setEditId(null);
    };

    return (
        <div className="p-10 font-sans bg-slate-100 min-h-screen">

            
            <div className="flex justify-end mb-6">
                <button
                    onClick={create}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-lg
                               text-sm font-semibold tracking-wide shadow hover:bg-slate-800 transition"
                >
                    + Create
                </button>
            </div>

            
            <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-slate-700">
                    <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">S.No</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Description</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                        {rows.map((row, index) => (
                            <tr key={row.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">
                                    {row.name}
                                </td>
                                <td className="px-6 py-4">{row.description}</td>
                                <td className="px-6 py-4 text-center space-x-2">

                                    <button className="px-3 py-1 rounded-md bg-slate-500 text-white
                                                      hover:bg-slate-700 transition">
                                        View
                                    </button>

                                    <button
                                        onClick={() => handleEdit(row)}
                                        className="px-3 py-1 rounded-md bg-blue-400 text-white
                                                   hover:bg-blue-700 transition">
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(row.id)}
                                        className="px-3 py-1 rounded-md bg-red-500 text-white
                                                   hover:bg-red-700 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                        <h2 className="text-xl font-bold text-slate-800 mb-6">
                            {editId ? "Edit Template" : "Fill the Details"}
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="Leave Type"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300
                                           focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />

                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300
                                           focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-lg border border-slate-300
                                               text-slate-700 hover:bg-slate-100 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-slate-900 text-white
                                               hover:bg-slate-800 transition font-semibold"
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Table1;*/