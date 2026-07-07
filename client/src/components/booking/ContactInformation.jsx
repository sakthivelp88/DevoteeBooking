function ContactInformation({ contact, setContact }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        Contact Information
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 font-medium">
            Mobile Number
          </label>

          <input
            type="tel"
            name="mobile"
            value={contact.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Address
          </label>

          <textarea
            name="address"
            rows={3}
            value={contact.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full border rounded-lg p-2"
          />
        </div>

      </div>
    </div>
  );
}

export default ContactInformation;