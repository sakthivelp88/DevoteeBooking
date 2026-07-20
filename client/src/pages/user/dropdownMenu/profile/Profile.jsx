import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "@services/user/userService";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex flex-col items-center">
        <img
          src={
            user.profileImage
              ? `${user.profileImage.startsWith("http") ? user.profileImage : user.profileImage}`
              : "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(user.name) +
              "&background=f97316&color=fff&size=150"
          }
          alt={user.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 shadow-lg"
        />
      </div>
      
      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        My Profile
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-gray-500 dark:text-slate-400">Name</p>
          <p className="text-slate-700 dark:text-slate-200">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">Email</p>
          <p className="text-slate-700 dark:text-slate-200">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">Phone</p>
          <p className="text-slate-700 dark:text-slate-200">{user.phone}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">Gender</p>
          <p className="text-slate-700 dark:text-slate-200">{user.gender || "Not Added"}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">Date of Birth</p>
          <p className="text-slate-700 dark:text-slate-200">
            {user.dob
              ? new Date(user.dob).toLocaleDateString()
              : "Not Added"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">Address</p>
          <p className="text-slate-700 dark:text-slate-200">{user.address || "Not Added"}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">Member Since</p>
          <p className="text-slate-700 dark:text-slate-200">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

      </div>

      <button
        onClick={() => navigate("/profile/edit")}
        className="mt-8 rounded-lg bg-orange-600 px-5 py-2 text-white transition hover:bg-orange-700"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;