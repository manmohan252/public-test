import { useState, useEffect } from "react";
import { FlatType, Tab } from "../../../types/index";
import { flatApi } from "../../../api/api";

import Navbar from "../../../components/Admin/Navbar/Navbar";
import SearchBar from "../../../components/Admin/SearchBar/SearchBar";
import FlatGrid from "../../../components/Admin/FlatGrid/FlatGrid";
import Modal from "../../../components/Admin/Modal/Modal";
import FlatForm, { UpdateFlat } from "../../../components/Admin/FlatForm/FlatForm";
import ConfirmDelete from "../../../components/Admin/DeleteFlat/DeleteFlat";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "unavailable", label: "Unavailable" },
];

export default function AdminFlatsPage() {
  const [flats, setFlats] = useState<FlatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const [editFlat, setEditFlat] = useState<UpdateFlat | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [deleteFlat, setDeleteFlat] = useState<FlatType | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const [toggleLoading, setToggleLoading] = useState<Record<number, boolean>>({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchFlats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await flatApi.getAll();
      setFlats(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const handleOpenEdit = async (flat: FlatType) => {
    setEditOpen(true);
    setEditFlat(null);
    setEditLoading(true);

    try {
      const data = await flatApi.getById(flat.id);
      setEditFlat(data);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not load flat data");
      setEditOpen(false);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setEditFlat(null);
  };

  const handleToggle = async (flat: FlatType) => {
    setToggleLoading((p) => ({ ...p, [flat.id]: true }));
    try {
      await flatApi.toggleAvailability(flat.id);
      setFlats((prev) =>
        prev.map((f) => (f.id === flat.id ? { ...f, available: !f.available } : f))
      );
    } catch {
      alert("Toggle failed. Please try again.");
    } finally {
      setToggleLoading((p) => ({ ...p, [flat.id]: false }));
    }
  };

  const handleUpdateSuccess = (updated: UpdateFlat) => {
    setFlats((prev) =>
      prev.map((f) => (f.id === updated.id ? { ...f, ...updated } : f))
    );
    handleCloseEdit();
  };

  const handleDelete = async () => {
    if (!deleteFlat) return;
    setDeleteLoading(true);
    try {
      await flatApi.delete(deleteFlat.id);
      setFlats((prev) => prev.filter((f) => f.id !== deleteFlat.id));
      setDeleteFlat(null);
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCreate = async (data: Partial<FlatType>) => {
    setSaveLoading(true);
    try {
      const created = await flatApi.create(data);
      setFlats((prev) => [created, ...prev]);
      setCreateOpen(false);
    } catch {
      alert("Create failed. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const totalFlats = flats.length;
  const availableCount = flats.filter((f) => f.available).length;
  const unavailableCount = totalFlats - availableCount;

  const filtered = flats.filter((f) => {
    const matchesTab =
      tab === "all" ||
      (tab === "available" && f.available) ||
      (tab === "unavailable" && !f.available);

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      f.title?.toLowerCase().includes(q) ||
      f.city?.toLowerCase().includes(q) ||
      f.address?.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <Navbar
        total={totalFlats}
        availableCount={availableCount}
        unavailableCount={unavailableCount}
        activeTab={tab}
        onTabChange={setTab}
        onCreateClick={() => setCreateOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              label: "Total Flats",
              value: totalFlats,
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ),
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "border-blue-500/20",
            },
            {
              label: "Available",
              value: availableCount,
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
            },
            {
              label: "Unavailable",
              value: unavailableCount,
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              ),
              color: "text-rose-400",
              bg: "bg-rose-500/10",
              border: "border-rose-500/20",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 sm:gap-3 rounded-xl border ${stat.border} ${stat.bg} px-3 py-3 sm:px-4 sm:py-4`}
            >
              <div className={`${stat.color} shrink-0`}>{stat.icon}</div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold text-white leading-none">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 truncate">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-full sm:max-w-xs">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
                    tab === key
                      ? "bg-zinc-700 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-150 whitespace-nowrap shadow-lg shadow-emerald-900/40"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="hidden xs:inline">Add Flat</span>
              <span className="xs:hidden">Add</span>
            </button>
          </div>
        </div>

        {!loading && !error && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Showing <span className="text-zinc-300 font-medium">{filtered.length}</span> of{" "}
              <span className="text-zinc-300 font-medium">{totalFlats}</span> flats
              {search && (
                <> for <span className="text-emerald-400 font-medium">"{search}"</span></>
              )}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        <FlatGrid
          flats={filtered}
          loading={loading}
          error={error}
          search={search}
          toggleLoading={toggleLoading}
          onRetry={fetchFlats}
          onView={handleOpenEdit}
          onDelete={setDeleteFlat}
          onToggle={handleToggle}
          onCreateClick={() => setCreateOpen(true)}
        />
      </div>

      {editOpen && (
        <Modal
          title={editFlat ? `✏️  ${editFlat.title}` : "Loading..."}
          onClose={handleCloseEdit}
        >
          {editLoading || !editFlat ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-zinc-400 font-medium">Loading flat data...</p>
            </div>
          ) : (
            <FlatForm
              flat={editFlat}
              onSuccess={handleUpdateSuccess}
              onCancel={handleCloseEdit}
            />
          )}
        </Modal>
      )}

      {deleteFlat && (
        <Modal title="Confirm Delete" onClose={() => setDeleteFlat(null)}>
          <ConfirmDelete
            flat={deleteFlat}
            onConfirm={handleDelete}
            onCancel={() => setDeleteFlat(null)}
            loading={deleteLoading}
          />
        </Modal>
      )}

      {createOpen && (
        <Modal title="➕  Create New Flat" onClose={() => setCreateOpen(false)}>
          <FlatForm onSubmit={handleCreate} loading={saveLoading} />
        </Modal>
      )}
    </div>
  );
}