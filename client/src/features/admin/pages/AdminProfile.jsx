import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
	FiUser,
	FiCamera,
	FiTrash2,
	FiMail,
	FiPhone,
	FiShield,
	FiEdit2,
	FiSave,
	FiX,
} from "react-icons/fi";

import { useAuth } from "@/context/AuthContext";

import {
  updateProfile,
  uploadProfilePhoto,
  removeProfilePhoto,
} from "@/features/admin/services/adminProfileService";

export default function Profile() {
	const { user, setUser } = useAuth();
	const [selectedFile, setSelectedFile] = useState(null);
	const [preview, setPreview] = useState("");
	const [uploading, setUploading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);
    
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
			});
			setPreview(user?.profileImage || "");
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCancel = () => {
		setFormData({
			name: user?.name || "",
			email: user?.email || "",
			phone: user?.phone || "",
		});

		setIsEditing(false);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		const allowedTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp",
		];

		if (!allowedTypes.includes(file.type)) {
			toast.error("Only JPG, PNG and WebP images are allowed.");
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			toast.error("Image size must be less than 2 MB.");
			return;
		}

		setSelectedFile(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleUpload = async () => {
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append("profileImage", selectedFile);

		setUploading(true);

		try {
			const response = await uploadProfilePhoto(formData);

			setUser(response.user);

			setSelectedFile(null);

			toast.success(response.message);

		} catch (error) {

			toast.error(
				error.response?.data?.message ||
				"Upload failed."
			);

		} finally {

			setUploading(false);

		}
	};

	const handleRemove = async () => {
		try {

			const response = await removeProfilePhoto();

			setUser(response.user);

			setPreview("");

			setSelectedFile(null);

			toast.success(response.message);

		} catch (error) {

			toast.error(
				error.response?.data?.message ||
				"Failed to remove photo."
			);

		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name.trim()) {
			toast.error("Name is required.");
			return;
		}

		if (!formData.phone.trim()) {
			toast.error("Phone number is required.");
			return;
		}

		setLoading(true);

		try {
			const response = await updateProfile({
				name: formData.name,
				phone: formData.phone,
			});

			setUser(response.user);

			setIsEditing(false);

			toast.success(response.message);

		} catch (error) {
			toast.error(
				error.response?.data?.message ||
				"Failed to update profile."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-5xl space-y-6">

			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
					My Profile
				</h1>

				<p className="mt-1 text-gray-500 dark:text-white">
					Manage your personal account information.
				</p>
			</div>

			{/* Card */}
			<div className="overflow-hidden rounded-xl bg-white shadow">

				<div className="grid grid-cols-1 lg:grid-cols-3">

					{/* Left Side */}
					<div className="flex flex-col items-center justify-center border-b bg-gray-50 p-8 lg:border-b-0 lg:border-r">

						<div className="relative">

							<div className="h-32 w-32 overflow-hidden rounded-full border-4 border-orange-200">

								{preview ? (
									<img
										src={
											preview.startsWith("blob:")
												? preview
												: preview
										}
										alt="Profile"
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center bg-orange-100">
										<FiUser
											size={60}
											className="text-orange-500"
										/>
									</div>
								)}

							</div>

							<label className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-orange-600 p-2 text-white hover:bg-orange-700">
								<FiCamera />

								<input
									type="file"
									accept="image/*"
									hidden
									onChange={handleFileChange}
								/>
							</label>

						</div>

						<div className="mt-4 flex gap-2">

							{selectedFile && (
								<button
									onClick={handleUpload}
									disabled={uploading}
									className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:bg-orange-400"
								>
									{uploading ? "Uploading..." : "Upload"}
								</button>
							)}

							{user?.profileImage ? (
								<img
									src={user.profileImage ? user.profileImage : "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=f97316&color=fff&size=150"}
									alt={user.name}
									className="h-10 w-10 rounded-full object-cover"
								/>
							) : (
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
									<FiUser className="text-orange-500" />
								</div>
							)}

						</div>

						<h2 className="mt-5 text-xl font-semibold">
							{user?.name}
						</h2>

						<span className="mt-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
							Administrator
						</span>

					</div>

					{/* Right Side */}
					<div className="lg:col-span-2 p-8">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid gap-5 md:grid-cols-2">
								<div>
									<label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
										<FiUser /> Name
									</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										disabled={!isEditing}
										className="w-full rounded-lg border px-4 py-3 disabled:bg-gray-100"
									/>
								</div>

								<div>
									<label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
										<FiMail /> Email
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										disabled
										className="w-full rounded-lg border bg-gray-100 px-4 py-3"
									/>
								</div>

								<div>
									<label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
										<FiPhone /> Phone
									</label>
									<input
										type="text"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										disabled={!isEditing}
										className="w-full rounded-lg border px-4 py-3 disabled:bg-gray-100"
									/>
								</div>

								<div>
									<label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
										<FiShield /> Role
									</label>
									<input
										type="text"
										value="Administrator"
										disabled
										className="w-full rounded-lg border bg-gray-100 px-4 py-3"
									/>
								</div>
							</div>

							<div className="flex flex-wrap gap-3 pt-2">
								{!isEditing ? (
									<button
										type="button"
										onClick={() => setIsEditing(true)}
										className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
									>
										<FiEdit2 /> Edit Profile
									</button>
								) : (
									<>
										<button
											type="submit"
											disabled={loading}
											className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-white hover:bg-green-700 disabled:bg-green-400"
										>
											<FiSave />
											{loading ? "Saving..." : "Save"}
										</button>

										<button
											type="button"
											onClick={handleCancel}
											className="flex items-center gap-2 rounded-lg bg-gray-400 px-5 py-2.5 text-white hover:bg-gray-500"
										>
											<FiX /> Cancel
										</button>
									</>
								)}

								{preview && (
									<button
										type="button"
										onClick={handleRemove}
										className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-white hover:bg-red-700"
									>
										<FiTrash2 /> Remove Photo
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
