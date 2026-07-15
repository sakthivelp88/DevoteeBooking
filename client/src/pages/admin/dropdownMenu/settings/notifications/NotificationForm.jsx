import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { createNotification } from "../../../../../services/adminNotificationService";
import { getUsers } from "../../../../../services/adminUserService";

const NotificationForm = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    message: "",
    type: "general",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      if (res.success) {
        setUsers(res.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await createNotification(formData);

      if (res.success) {
        alert("Notification sent successfully.");

        navigate("/admin/settings/notifications/manage");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Create Notification
          </h1>

          <p className="text-gray-500">
            Send a notification to a user.
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >

        {/* User */}

        <div>

          <label className="mb-2 block font-medium">
            User
          </label>

          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select User</option>

            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))}

          </select>

        </div>

        {/* Title */}

        <div>

          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

        </div>

        {/* Message */}

        <div>

          <label className="mb-2 block font-medium">
            Message
          </label>

          <textarea
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

        </div>

        {/* Type */}

        <div>

          <label className="mb-2 block font-medium">
            Notification Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="general">General</option>
            <option value="booking">Booking</option>
            <option value="refund">Refund</option>
            <option value="feedback">Feedback</option>
            <option value="announcement">
              Announcement
            </option>
            <option value="remark">Remark</option>
          </select>

        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>

      </form>

    </div>
  );
};

export default NotificationForm;