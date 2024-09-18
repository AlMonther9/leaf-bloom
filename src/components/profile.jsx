import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { VintagePlantBackground } from "./UI/ThemedPlantBg";
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
    <VintagePlantBackground>
      <div className="flex items-center justify-center min-h-screen text-quaternary">
        <div className="w-full max-w-md p-6 m-auto bg-opacity-50 rounded shadow-md backdrop-blur-2xl ">
          <h1 className="mb-6 text-2xl font-bold text-center">Profile</h1>
          <div className="mb-4">
            <p className="">Email: {user.email}</p>
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
                  className="px-2 py-1 mt-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="">
                Display Name: {user.displayName || "Not set"}
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-sm underline"
                >
                  Edit
                </button>
              </p>
            )}
          </div>
          {error && <p className="mb-4 text-xs italic text-red-500">{error}</p>}
          <button
            onClick={handleLogout}
            className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Logout
          </button>
        </div>
      </div>{" "}
    </VintagePlantBackground>
  );
};

export default Profile;
