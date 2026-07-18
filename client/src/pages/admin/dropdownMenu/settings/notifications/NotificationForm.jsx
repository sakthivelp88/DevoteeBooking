import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import {
  createAdminNotification, getAdminNotificationById, updateAdminNotification,
} from "@services/admin/adminNotificationService";
import { getUsers } from "@services/admin/adminUserService";
import { useParams, } from "react-router-dom";

const NotificationForm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    audience: "single",
    user: "",
    title: "",
    message: "",
    type: "general",
    priority: "normal",
    status: "draft",
    deliveryChannel: ["in_app"],
    scheduledAt: "",
    expiresAt: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
    if (id) {
      loadNotification();
    }
  }, [id]);

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
    const { name, value } = e.target;

    setFormData((prev) => ({...prev, [name]: value,
      ...(name === "status" && value === "draft"
        ? { scheduledAt: "" }
        : {}),
    }));
  };

  const handleChannelChange = (channel) => {
    setFormData((prev) => ({
      ...prev,
      deliveryChannel: prev.deliveryChannel.includes(channel)
        ? prev.deliveryChannel.filter((c) => c !== channel)
        : [...prev.deliveryChannel, channel],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Title is required.");
    }

    if (!formData.message.trim()) {
      return alert("Message is required.");
    }

    if (
      formData.audience === "single" &&
      !formData.user
    ) {
      return alert("Please select a user.");
    }

    if (
      formData.status === "scheduled" &&
      !formData.scheduledAt
    ) {
      return alert("Please select schedule date.");
    }

    if (formData.deliveryChannel.length === 0) {
      return alert("Select at least one delivery channel.");
    }

    setLoading(true);

    const payload = {
      ...formData,
    };

    try {
      const res = id
        ? await updateAdminNotification(id, payload)
        : await createAdminNotification(payload);
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

  const loadNotification = async () => {
    try {
      const res =
        await getAdminNotificationById(id);
      if (res.success) {
        setFormData({
          audience: res.notification.audience,
          user: res.notification.user?._id || "",
          title: res.notification.title,
          message: res.notification.message,
          type: res.notification.type,
          priority: res.notification.priority,
          status: res.notification.status,
          deliveryChannel: res.notification.deliveryChannel || ["in_app"],
          scheduledAt: res.notification.scheduledAt
            ? res.notification.scheduledAt.slice(0, 16)
            : "",
          expiresAt: res.notification.expiresAt
            ? res.notification.expiresAt.slice(0, 16)
            : "",
        });
      }
    } catch (err) {
      console.error(err);
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
            {id
              ? "Edit Notification"
              : "Create Notification"}
          </h1>

          <p className="text-gray-500">
            Create or update notification details.
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >
        <div>
          <label className="mb-2 block font-medium">
            audience
          </label>

          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="single">Specific User</option>
            <option value="devotees">All Devotees</option>
            <option value="admins">All Admins</option>
            <option value="all">Everyone</option>
          </select>
        </div>

        {/* User */}

        {formData.audience === "single" && (
          <div>
            <label className="mb-2 block font-medium">
              User
            </label>

            <select
              name="user"
              value={formData.user}
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
        )}

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
        {/* Priority */}

        <div>
          <label className="mb-2 block font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        {/* Status */}

        <div>
          <label className="mb-2 block font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        {/* Delivery Channel */}

        <div>
          <label className="mb-2 block font-medium">
            Delivery Channel
          </label>

          <div className="space-y-2">

            {["in_app", "email", "sms", "push"].map(channel => (

              <label
                key={channel}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={formData.deliveryChannel.includes(channel)}
                  onChange={() => handleChannelChange(channel)}
                />

                <span className="capitalize">
                  {channel.replace("_", " ")}
                </span>

              </label>

            ))}

          </div>

        </div>
        {/* Scheduled At */}

        {formData.status === "scheduled" && (

          <div>

            <label className="mb-2 block font-medium">
              Scheduled At
            </label>

            <input
              type="datetime-local"
              name="scheduledAt"
              value={formData.scheduledAt}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

          </div>

        )}
        {/* Expiry Date */}

        <div>

          <label className="mb-2 block font-medium">
            Expiry Date
          </label>

          <input
            type="datetime-local"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : id
            ? "Update Notification"
            : "Send Notification"}
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;