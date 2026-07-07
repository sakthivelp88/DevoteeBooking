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
                    className="bg-white rounded-xl shadow p-6 mb-6"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Devotee {index + 1}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-2 font-medium">
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
                                className="w-full border rounded-lg p-2"
                                placeholder="Enter Full Name"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
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
                                className="w-full border rounded-lg p-2"
                                placeholder="Enter Age"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
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
                                className="w-full border rounded-lg p-2"
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
                            <label className="block mb-2 font-medium">
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
                                className="w-full border rounded-lg p-2"
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