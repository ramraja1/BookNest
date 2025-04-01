import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaSignOutAlt, FaSave, FaTimes, FaCamera } from "react-icons/fa";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch user data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data.user);
        setName(response.data.user.name);
        setMobile(response.data.user.mobile || "");
        setBio(response.data.user.bio || "");
      } catch (error) {
        toast.error("Failed to load profile.");
      }
    };

    fetchUserProfile();
  }, [token]);

  if (!profile) return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Handle Profile Update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("bio", bio);
  
      let imageUrl = profile.image; // ✅ Keep existing image if no new image is uploaded
  
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);
  
        const uploadRes = await axios.post(
          "http://localhost:5000/api/books/upload-image",
          formDataImage,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        imageUrl = uploadRes.data.imageUrl; // ✅ Update image URL after successful upload
      }
  
      const userdata = { name, mobile, bio, image: imageUrl }; // ✅ Send updated data to backend
  
      const response = await axios.put(
        "http://localhost:5000/api/users/update-profile",
        userdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.data.success) {
        setProfile(userdata); // ✅ Directly update the profile state
        toast.success(response.data.message || "Profile updated successfully!"); // ✅ Show success message
        setIsEditing(false); // ✅ Close the form
      } else {
        toast.error(response.data.message || "Failed to update profile."); // ✅ Handle errors
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile."); // ✅ Handle network errors
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6 border-r border-gray-200">
        <div className="flex flex-col items-center">
          {/* ✅ Profile Image */}
          <div className="relative w-32 h-32">
            <img
              src={profile.image || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-900 transition">
                <FaCamera />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-4">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <p className="text-gray-500">{profile.mobile || "No mobile added"}</p>

          {/* ✅ Edit & Logout Buttons */}
          <div className="mt-6 flex flex-col gap-3 w-full">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
              >
                <FaEdit className="inline mr-2" /> Edit Profile
              </button>
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information.</p>

        {isEditing ? (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            {/* ✅ Name */}
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />

            {/* ✅ Mobile */}
            <label className="block text-gray-600 font-medium">Mobile</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />

            {/* ✅ Bio */}
            <label className="block text-gray-600 font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />

            {/* ✅ Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <FaSave className="inline mr-2" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                <FaTimes className="inline mr-2" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Mobile:</strong> {profile.mobile || "Not added"}</p>
              <p><strong>Bio:</strong> {profile.bio || "No bio added"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
