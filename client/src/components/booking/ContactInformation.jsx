function ContactInformation({ contact, setContact }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
      <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
        Contact Information
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Mobile Number
          </label>

          <input
            type="tel"
            name="mobile"
            value={contact.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Address
          </label>

          <textarea
            name="address"
            rows={3}
            value={contact.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;