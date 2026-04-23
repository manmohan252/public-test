import { useNavigate } from "react-router-dom";
import { Tab } from "../../../types/index";

type NavbarProps = {
  total: number;
  availableCount: number;
  unavailableCount: number;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function Navbar({
  total,
  availableCount,
  unavailableCount,
  activeTab,
  onTabChange,
}: NavbarProps) {
  const navigate = useNavigate();

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: `All (${total})` },
    { key: "available", label: `Available (${availableCount})` },
    { key: "unavailable", label: `Unavailable (${unavailableCount})` },
  ];

  return (
    <>
      {/* Top Bar */}
      <nav className="sticky top-0 z-40 bg-green-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          
          {/* Title */}
          <span className="text-white font-semibold text-base">
            Flat Admin
          </span>

          {/* Create Button */}
          <button
            onClick={() => navigate("/admin/create-flat")}
            className="bg-white text-green-800 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition"
          >
            + Create
          </button>
        </div>
      </nav>

      {/* Tabs */}
     
    </>
  );
}