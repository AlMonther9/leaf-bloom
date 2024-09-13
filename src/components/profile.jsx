import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      setError("Logout failed: " + error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, { displayName });
      setIsEditing(false);
      setError("");
    } catch (error) {
      setError("Profile update failed: " + error.message);
    }
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-signBg bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Profile</h1>
        <div className="mb-4">
          <p className="text-white">Email: {user.email}</p>
          {isEditing ? (
            <div className="mt-2">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
              />
              <button
                onClick={handleUpdateProfile}
                className="mt-2 bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-white">
              Display Name: {user.displayName || "Not set"}
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 text-sm text-amber-200 hover:text-amber-300"
              >
                Edit
              </button>
            </p>
          )}
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          onClick={handleLogout}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;