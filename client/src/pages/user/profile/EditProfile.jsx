import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
} from "../../../services/userService";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      const user = res.data.user;

      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        gender: user.gender || "",
        dob: user.dob ? user.dob.substring(0, 10) : "",
        address: user.address || "",
      });

      setPreview(
        user.profileImage
          ? `http://localhost:5000${user.profileImage}`
          : ""
      );

    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("phone", formData.phone);
      data.append("address", formData.address);

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const res = await updateProfile(data);

      toast.success(res.data.message);

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Edit Profile
      </h2>
      <div className="flex flex-col items-center mb-6">

        <img
          src={
            preview ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              formData.name
            )}&background=f97316&color=fff`
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 cursor-pointer hover:opacity-80 transition"
          onClick={() =>
            document.getElementById("profileImage").click()
          }
        />

        <p className="text-sm text-gray-500 mt-2">
          Click the photo to change it
        </p>

        <input
          id="profileImage"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setProfileImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label>Gender</label>

          <input
            type="text"
            value={formData.gender}
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label>Date of Birth</label>

          <input
            type="date"
            value={formData.dob}
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label>Address</label>

          <textarea
            name="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="border px-5 py-2 rounded"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditProfile;