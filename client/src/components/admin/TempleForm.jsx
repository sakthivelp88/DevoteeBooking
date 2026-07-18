import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    createTemple,
    updateTemple
} from "@services/user/templeService";

export default function TempleForm({
    temple,
    onClose,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        state: "",
        city: "",
        location: "",
        status: "Active",
        isFeatured: false,
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (temple) {
            setFormData({
                name: temple.name || "",
                slug: temple.slug || "",
                state: temple.state || "",
                city: temple.city || "",
                location: temple.location || "",
                status: temple.status || "Active",
                isFeatured: temple.isFeatured || false,
            });

            setPreview(
                temple.image
                    ? `http://localhost:5000${temple.image}`
                    : ""
            );

            setSelectedImage(null);
        } else {
            setFormData({
                name: "",
                slug: "",
                state: "",
                city: "",
                location: "",
                status: "Active",
                isFeatured: false,
            });

            setPreview("");
            setSelectedImage(null);
        }

        setErrors({});
    }, [temple]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Temple Name is required.";
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug is required.";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State is required.";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required.";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required.";
        }

        if (!temple && !selectedImage) {
            newErrors.image = "Temple image is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            if (selectedImage) {
                data.append("image", selectedImage);
            }

            if (temple) {
                await updateTemple(temple._id, data);
            } else {
                await createTemple(data);
            }

            toast.success(
                temple
                    ? "Temple updated successfully!"
                    : "Temple created successfully!"
            );

            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Unable to save temple.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="border-b p-5">

                    <h2 className="text-2xl font-bold">
                        {temple ? "Edit Temple" : "Add Temple"}
                    </h2>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    <div className="grid grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2 font-medium">
                                Temple Name
                            </label>

                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Slug
                            </label>

                            <input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.slug ? "border-red-500" : "border-gray-300"
                                    }`}
                            />

                            {errors.slug && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.slug}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                State
                            </label>

                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.state ? "border-red-500" : "border-gray-300"
                                    }`}
                            />

                            {errors.state && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.state}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                City
                            </label>

                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.city ? "border-red-500" : "border-gray-300"
                                    }`}
                            />

                            {errors.city && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Location
                            </label>

                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.location ? "border-red-500" : "border-gray-300"
                                    }`}
                            />

                            {errors.location && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.location}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Temple Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full rounded-lg p-3 border border-gray-300"
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Temple Preview"
                                    className="mt-3 w-32 h-32 rounded-lg object-cover border"
                                />
                            )}

                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>

                        </div>

                        <div className="flex items-center mt-9">

                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                            />

                            <label className="ml-3">
                                Featured Temple
                            </label>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="border-t pt-5 flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-orange-600 text-white rounded-lg"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}