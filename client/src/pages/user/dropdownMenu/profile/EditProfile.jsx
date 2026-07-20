import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getProfile, updateProfile,} from "@services/user/userService";

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
          ? user.profileImage
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
    return <div className="mt-10 text-center text-slate-600 dark:text-slate-300">Loading...</div>;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        Edit Profile
      </h2>
      <div className="mb-6 flex flex-col items-center">

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

        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
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
            className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-gray-100 p-2 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
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
            className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
            required
          />
        </div>

        <div>
          <label>Gender</label>

          <input
            type="text"
            value={formData.gender}
            className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-gray-100 p-2 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            readOnly
          />
        </div>

        <div>
          <label>Date of Birth</label>

          <input
            type="date"
            value={formData.dob}
            className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-gray-100 p-2 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
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
            className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          />
        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-orange-600 px-5 py-2 text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditProfile;