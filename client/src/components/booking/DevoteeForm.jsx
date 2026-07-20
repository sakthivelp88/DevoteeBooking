function DevoteeForm({
    devotees,
    setDevotees,
}) {
    const handleChange = (
        index,
        field,
        value
    ) => {
        const updated = [...devotees];

        updated[index][field] = value;

        setDevotees(updated);
    };

    return (
        <>
            {devotees.map((devotee, index) => (
                <div
                    key={index}
                    className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/90"
                >
                    <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                        Devotee {index + 1}
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={devotee.name}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                                placeholder="Enter Full Name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                                Age
                            </label>

                            <input
                                type="number"
                                value={devotee.age}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "age",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                                placeholder="Enter Age"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                                Gender
                            </label>

                            <select
                                value={devotee.gender}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "gender",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                            >
                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                                ID Proof (Optional)
                            </label>

                            <input
                                type="text"
                                value={devotee.idProof}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "idProof",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                                placeholder="Aadhaar / PAN / Passport"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default DevoteeForm;