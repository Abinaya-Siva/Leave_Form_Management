import { useNavigate, Outlet } from "react-router-dom";

export default function Template() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">

      <aside className="w-64 bg-white border-r border-slate-200 px-6 py-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-10">
          Templates
        </h2>

        <button
          onClick={() => navigate("create")}
          className="w-full mb-4 rounded-lg bg-slate-900 text-white py-3 text-sm font-semibold tracking-wide
                     hover:bg-slate-800 transition-all duration-200 shadow-sm"
        >
          Create Template
        </button>

        <button
          onClick={() => navigate("view")}
          className="w-full rounded-lg bg-slate-900 text-white py-3 text-sm font-semibold tracking-wide
                     border border-slate-300 hover:bg-slate-800 transition-all duration-200"
        >
          View Templates
        </button>

        <button
          onClick={() => navigate("google-form")}
          className="w-full mt-6 rounded-lg bg-slate-900 text-white py-3 text-sm font-semibold"
        >
          Google Form
        </button>

        <button
          onClick={() => navigate("view-forms")}
          className="w-full mt-3 rounded-lg bg-slate-900 text-white py-3 text-sm font-semibold"
        >
          View Google Forms
        </button>

      </aside>

      <main className="flex-1 p-10">
        <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 p-10">
          <Outlet />
        </div>
      </main>

    </div>
  );
}