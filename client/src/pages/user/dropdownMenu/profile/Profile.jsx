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
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            user.profileImage
              ? `http://localhost:5000${user.profileImage}`
              : "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(user.name) +
              "&background=f97316&color=fff&size=150"
          }
          alt={user.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 shadow-lg"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">
        My Profile
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-gray-500">Name</p>
          <p>{user.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p>{user.phone}</p>
        </div>

        <div>
          <p className="text-gray-500">Gender</p>
          <p>{user.gender || "Not Added"}</p>
        </div>

        <div>
          <p className="text-gray-500">Date of Birth</p>
          <p>
            {user.dob
              ? new Date(user.dob).toLocaleDateString()
              : "Not Added"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Address</p>
          <p>{user.address || "Not Added"}</p>
        </div>

        <div>
          <p className="text-gray-500">Member Since</p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

      </div>

      <button
        onClick={() => navigate("/profile/edit")}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;