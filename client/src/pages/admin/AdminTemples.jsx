import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import TempleTable from "@components/admin/TempleTable";
import TempleForm from "@components/admin/TempleForm";
import DeleteConfirmModal from "@components/admin/DeleteConfirmModal";

import {
  getTemples,
  deleteTemple,
} from "@services/user/templeService";

export default function AdminTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showForm, setShowForm] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templeToDelete, setTempleToDelete] = useState(null);

  useEffect(() => {
    loadTemples();
  }, []);

  const loadTemples = async () => {
    try {
      setLoading(true);

      const data = await getTemples();

      setTemples(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedTemple(null);
    setShowForm(true);
  };

  const handleEdit = (temple) => {
    setSelectedTemple(temple);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!templeToDelete) return;

    try {
      await deleteTemple(templeToDelete._id);

      toast.success("Temple deleted successfully!");

      setShowDeleteModal(false);
      setTempleToDelete(null);

      loadTemples();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete temple.");
    }
  };

  // Search
  const filteredTemples = temples.filter((temple) => {
    const keyword = searchTerm.toLowerCase().trim();

    return (
      (temple.name ?? "").toLowerCase().includes(keyword) ||
      (temple.city ?? "").toLowerCase().includes(keyword) ||
      (temple.state ?? "").toLowerCase().includes(keyword)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredTemples.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedTemples = filteredTemples.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold dark:text-white">
            Temple Management
          </h1>

          <p className="text-gray-500 dark:text-white">
            Manage temples
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Temple
        </button>

      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search temples by Name, City or State..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 
          focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <p className="text-sm text-gray-500 mt-2 dark:text-white">
          Showing {filteredTemples.length} of {temples.length} temples
        </p>
      </div>

      <TempleTable
        temples={paginatedTemples}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(temple) => {
          setTempleToDelete(temple);
          setShowDeleteModal(true);
        }}
      />

      {showForm && (
        <TempleForm
          temple={selectedTemple}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadTemples();
          }}
        />
      )}
      <div className="flex items-center justify-between mt-4">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1
                  ? "bg-orange-600 text-white"
                  : "border"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        title="Delete Temple"
        message={`Are you sure you want to delete "${templeToDelete?.name}"? This action cannot be undone.`}
        onCancel={() => {
          setShowDeleteModal(false);
          setTempleToDelete(null);
        }}
        onConfirm={handleDelete}
      />

    </div>
  );
}