import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    createDarshanType,
    updateDarshanType,
} from "@/features/admin/services/adminDarshanTypeService";

export default function DarshanTypeForm({
    darshanType,
    temples,
    onClose,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        temple: "",
        name: "",
        description: "",
        fee: "",
        duration: "",
        reportingTime: "",
        features: "",
        bestFor: "",
        dressCode: "",
        isRecommended: false,
        status: "Active",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (darshanType) {
            setFormData({
                temple: darshanType?.temple?._id || "",
                name: darshanType?.name || "",
                description: darshanType?.description || "",
                fee: darshanType?.fee || "",
                duration: darshanType?.duration || "",
                reportingTime: darshanType?.reportingTime || "",
                features: darshanType?.features?.join(", ") || "",
                bestFor: darshanType?.bestFor || "",
                dressCode: darshanType?.dressCode || "",
                isRecommended: darshanType?.isRecommended || false,
                status: darshanType?.status || "Active",
            });
        } else {
            setFormData({
                temple: "",
                name: "",
                description: "",
                fee: "",
                duration: "",
                reportingTime: "",
                features: "",
                bestFor: "",
                dressCode: "",
                isRecommended: false,
                status: "Active",
            });
        }

        setErrors({});
    }, [darshanType]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.temple)
            newErrors.temple = "Temple is required.";

        if (!formData.name.trim())
            newErrors.name = "Darshan Type is required.";

        if (!formData.fee)
            newErrors.fee = "Fee is required.";

        if (!formData.duration.trim())
            newErrors.duration = "Duration is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {

            const payload = {
                ...formData,
                features: formData.features
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            if (darshanType) {
                await updateDarshanType(darshanType._id, payload);
            } else {
                await createDarshanType(payload);
            }

            toast.success(
                darshanType
                    ? "Darshan Type updated successfully!"
                    : "Darshan Type created successfully!"
            );

            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Unable to save.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="border-b p-5">
                    <h2 className="text-2xl font-bold">
                        {darshanType ? "Edit Darshan Type" : "Add Darshan Type"}
                    </h2>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    <div className="grid grid-cols-2 gap-5">

                        {/* Temple */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Temple
                            </label>

                            <select
                                name="temple"
                                value={formData.temple}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.temple
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select Temple</option>

                                {temples.map((temple) => (
                                    <option
                                        key={temple._id}
                                        value={temple._id}
                                    >
                                        {temple.name}
                                    </option>
                                ))}
                            </select>

                            {errors.temple && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.temple}
                                </p>
                            )}
                        </div>

                        {/* Darshan Type */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Darshan Type
                            </label>

                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Fee */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Fee
                            </label>

                            <input
                                type="number"
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                                className={`w-full rounded-lg p-3 border ${errors.fee
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />

                            {errors.fee && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.fee}
                                </p>
                            )}
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Duration
                            </label>

                            <input
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="15 mins"
                                className={`w-full rounded-lg p-3 border ${errors.duration
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />

                            {errors.duration && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.duration}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-lg border p-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Reporting Time
                            </label>

                            <input
                                type="time"
                                name="reportingTime"
                                value={formData.reportingTime}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Features
                            </label>

                            <input
                                name="features"
                                value={formData.features}
                                onChange={handleChange}
                                placeholder="VIP Queue, Prasadam"
                                className="w-full rounded-lg border p-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Best For
                            </label>

                            <input
                                name="bestFor"
                                value={formData.bestFor}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Dress Code
                            </label>

                            <input
                                name="dressCode"
                                value={formData.dressCode}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 mt-8">
                                <input
                                    type="checkbox"
                                    checked={formData.isRecommended}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            isRecommended: e.target.checked,
                                        }))
                                    }
                                />
                                Recommended
                            </label>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
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