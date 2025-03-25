import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;

  const token = localStorage.getItem("token");

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Handle Profile Update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:5000/api/users/update-profile/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser({ ...user, name: response.data.name, image: response.data.imageUrl });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: response.data.name, image: response.data.imageUrl })
      );

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F7F7] px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

        {/* ✅ Profile Image */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={user.image || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer hover:bg-gray-900 transition">
              📷
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>

        {isEditing ? (
          <>
            {/* ✅ Editable Name Input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
            />
            {/* ✅ Save Button */}
            <button
              onClick={handleUpdate}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </>
        ) : (
          <>
            {/* ✅ Display Name & Email */}
            <p className="text-gray-700 text-lg font-semibold">{user.name}</p>
            <p className="text-gray-500 text-sm mb-4">{user.email}</p>

            {/* ✅ Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </>
        )}

        {/* ✅ Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
