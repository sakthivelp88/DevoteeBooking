import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import { getDarshanTypes, deleteDarshanType,} from "@/features/admin/services/adminDarshanTypeService";
import DarshanTypeTable from "@components/admin/DarshanTypeTable";
import DarshanTypeForm from "@components/admin/DarshanTypeForm";
import { getTemples } from "@/features/temples/services/templeService";

export default function AdminDarshanTypes() {
	const [darshanTypes, setDarshanTypes] = useState([]);

	const [loading, setLoading] = useState(true);

	const [showForm, setShowForm] = useState(false);
	const [selectedDarshanType, setSelectedDarshanType] = useState(null);

	const [temples, setTemples] = useState([]);

	useEffect(() => {
		loadDarshanTypes();
		loadTemples();
	}, []);

	const loadDarshanTypes = async () => {
		try {
			setLoading(true);
			const data = await getDarshanTypes();
			setDarshanTypes(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const loadTemples = async () => {
		try {
			const data = await getTemples();
			setTemples(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAdd = () => {
		setSelectedDarshanType(null);
		setShowForm(true);
	};

	const handleEdit = (item) => {
		setSelectedDarshanType(item);
		setShowForm(true);
	};

	const handleDelete = async (item) => {
		if (!window.confirm("Delete this Darshan Type?")) return;

		try {
			await deleteDarshanType(item._id);

			toast.success("Deleted successfully");

			loadDarshanTypes();
		} catch (err) {
			console.error(err);
			toast.error("Unable to delete");
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">

				<div>
					<h1 className="text-3xl font-bold dark:text-white">
						Darshan Types
					</h1>

					<p className="text-gray-500 dark:text-white">
						Manage Darshan Types
					</p>
				</div>

				<button
	onClick={handleAdd}
	className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg"
>
	<Plus size={18} />
	Add Darshan Type
</button>

			</div>

			<DarshanTypeTable
				darshanTypes={darshanTypes}
				loading={loading}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			{showForm && (
				<DarshanTypeForm
					darshanType={selectedDarshanType}
					temples={temples}
					onClose={() => setShowForm(false)}
					onSuccess={() => {
						setShowForm(false);
						loadDarshanTypes();
					}}
				/>
			)}
		</div>
	);
}
