import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getTemples } from "@/features/temples/services/templeService";
import { getDarshanTypesByTemple } from "@/features/temples/services/darshanTypeService";
import { createTicket, updateTicket, getTicketById,} from "@/features/tickets/services/ticketService";

export default function AdminCreateTicket() {
	const [formData, setFormData] = useState({
		temple: "",
		darshanType: "",
		date: "",
		slotStart: "",
		slotEnd: "",
		price: "",
		totalSeats: "",
		bookingStart: "",
		bookingEnd: "",
	});
	const [temples, setTemples] = useState([]);
	const [darshanTypes, setDarshanTypes] = useState([]);
	const navigate = useNavigate();

	const { id } = useParams();
	const isEditMode = Boolean(id);

	useEffect(() => {
		fetchTemples();
	}, []);

	useEffect(() => {
		if (isEditMode && temples.length > 0) {
			fetchTicket();
		}
	}, [id, temples]);

	const fetchTemples = async () => {
		try {
			const data = await getTemples();
			setTemples(data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchTicket = async () => {
		try {
			const ticket = await getTicketById(id);

			// Load darshan types for the selected temple
			const types = await getDarshanTypesByTemple(ticket.temple._id);

			setDarshanTypes(types);

			setFormData({
				temple: ticket.temple._id,
				darshanType: ticket.darshanType._id,
				date: ticket.date.split("T")[0],
				slotStart: ticket.slotStart,
				slotEnd: ticket.slotEnd,
				price: ticket.price,
				totalSeats: ticket.totalSeats,
				bookingStart: ticket.bookingStart.split("T")[0],
				bookingEnd: ticket.bookingEnd.split("T")[0],
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to load ticket.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (isEditMode) {
				await updateTicket(id, formData);
				toast.success("Ticket updated successfully!");
			} else {
				await createTicket(formData);
				toast.success("Ticket created successfully!");
			}

			navigate("/admin/ticket-slots");
		} catch (error) {
			console.error(error);

			toast.error(
				error.response?.data?.message ||
				"Failed to save ticket."
			);
		}
	};

	const handleChange = async (e) => {
		const { name, value } = e.target;

		if (name === "temple") {
			try {
				const data = await getDarshanTypesByTemple(value);

				setDarshanTypes(data);

				setFormData((prev) => ({
					...prev,
					temple: value,
					darshanType: "",
					price: "",
				}));
			} catch (error) {
				console.error(error);
			}

			return;
		}

		if (name === "darshanType") {
			const selectedType = darshanTypes.find(
				(type) => type._id === value
			);

			setFormData((prev) => ({
				...prev,
				darshanType: value,
				price: selectedType?.fee || "",
			}));

			return;
		}

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-8">

			{/* <h1 className="text-3xl font-bold mb-8">
				Create Ticket
			</h1> */}
			<h1 className="text-3xl font-bold mb-8">
				{isEditMode ? "Edit Ticket" : "Create Ticket"}
			</h1>

			<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

				{/* Temple */}
				<div>
					<label className="block mb-2 font-medium">
						Temple
					</label>

					<select
						name="temple"
						value={formData.temple}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					>
						<option value="">Select Temple</option>

						{temples.map((temple) => (
							<option key={temple._id} value={temple._id}>
								{temple.name}
							</option>
						))}
					</select>
				</div>

				{/* Darshan Type */}
				<div>
					<label className="block mb-2 font-medium">
						Darshan Type
					</label>

					<select
						name="darshanType"
						value={formData.darshanType}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
						disabled={!formData.temple}
					>
						<option value="">Select Darshan Type</option>

						{darshanTypes.map((type) => (
							<option key={type._id} value={type._id}>
								{type.name}
							</option>
						))}
					</select>
				</div>

				{/* Date */}
				<div>
					<label className="block mb-2 font-medium">
						Date
					</label>

					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				{/* Slot */}
				<div>
					<label className="block mb-2 font-medium">
						Slot Start
					</label>

					<input
						type="time"
						name="slotStart"
						value={formData.slotStart}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				<div>
					<label className="block mb-2 font-medium">
						Slot End
					</label>

					<input
						type="time"
						name="slotEnd"
						value={formData.slotEnd}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				{/* Price */}
				<div>
					<label className="block mb-2 font-medium">
						Price
					</label>

					<input
						type="number"
						name="price"
						value={formData.price}
						readOnly
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				{/* Total Seats */}
				<div>
					<label className="block mb-2 font-medium">
						Total Seats
					</label>

					<input
						type="number"
						name="totalSeats"
						value={formData.totalSeats}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				{/* Booking Start */}
				<div>
					<label className="block mb-2 font-medium">
						Booking Start
					</label>

					<input
						type="date"
						name="bookingStart"
						value={formData.bookingStart}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				{/* Booking End */}
				<div>
					<label className="block mb-2 font-medium">
						Booking End
					</label>

					<input
						type="date"
						name="bookingEnd"
						value={formData.bookingEnd}
						onChange={handleChange}
						className="w-full border rounded-lg px-4 py-2"
					/>
				</div>

				{/* Buttons */}
				<div className="md:col-span-2 flex justify-end gap-4 mt-4">
					<button
						type="button"
						onClick={() => navigate("/admin/ticket-slots")}
						className="px-6 py-2 rounded-lg border"
					>
						Cancel
					</button>

					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
					>
						{isEditMode ? "Update Ticket" : "Save Ticket"}
					</button>
				</div>

			</form>
		</div>
	);
}
