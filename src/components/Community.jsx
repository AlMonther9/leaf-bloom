import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebaseConfig";
import { Heart } from "lucide-react";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [likeErrors, setLikeErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editPostData, setEditPostData] = useState({}); // Data for the post being edited

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to view this page.");
      return;
    }

    const fetchPosts = () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      return onSnapshot(
        q,
        (querySnapshot) => {
          const postsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(postsArray);
        },
        (error) => {
          console.error("Error fetching posts:", error);
          setError("Failed to load posts. Please try again later.");
        }
      );
    };

    const fetchLikedPosts = async () => {
      try {
        const likedPostsRef = doc(db, "userLikedPosts", user.uid);
        const likedPostsSnap = await getDoc(likedPostsRef);
        if (likedPostsSnap.exists()) {
          setLikedPosts(likedPostsSnap.data());
        } else {
          await setDoc(likedPostsRef, {});
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };

    const unsubscribe = fetchPosts();
    fetchLikedPosts();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPost.title) {
      setError("Please provide a title for your post.");
      return;
    }

    if (!newPost.image && !isEditing) {
      setError("Please provide an image for your post.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const post = {
        ...newPost,
        createdAt: new Date(),
        userId: user.uid,
        likes: 0,
        comments: [],
      };

      if (image) {
        const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        post.imageUrl = await getDownloadURL(imageRef);
      }

      if (isEditing) {
        // Update the post if editing
        const postRef = doc(db, "posts", editPostData.id);
        await updateDoc(postRef, { ...editPostData, ...post });
        setIsEditing(false); // Reset edit state after updating
      } else {
        // Add a new post if not editing
        await addDoc(collection(db, "posts"), post);
      }

      setNewPost({ title: "", description: "" });
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again later.");
    }
  };

  const handleLike = async (postId) => {
    if (likedPosts[postId]) {
      setLikeErrors((prev) => ({
        ...prev,
        [postId]: "You've already liked this post.",
      }));
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const likedPostsRef = doc(db, "userLikedPosts", user.uid);
      await updateDoc(likedPostsRef, {
        [postId]: true,
      });

      setLikedPosts((prev) => ({ ...prev, [postId]: true }));
      setLikeErrors((prev) => ({ ...prev, [postId]: null }));
    } catch (error) {
      console.error("Error liking post:", error);
      setLikeErrors((prev) => ({
        ...prev,
        [postId]: "You've already liked this post.",
      }));
    }
  };

  const deletePost = async (postId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again later.");
    }
  };

  const editPost = (post) => {
    setIsEditing(true); // Set edit mode
    setEditPostData(post); // Load the post data into the form
    setNewPost({ title: post.title, description: post.description }); // Prefill form with post data
  };

  if (!auth.currentUser) {
    return (
      <div className="container mx-auto px-4 md:px-12 lg:px-24 mt-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            You must be logged in to view this page.
          </span>
        </div>
      </div>
    );
  }

  const user = auth.currentUser;

  return (
    <div className="container flex flex-col md:flex-row mx-auto px-4 md:px-12 lg:px-24 mt-4 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Community</h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded outline-none focus:border-quaternary focus:border-2"
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded-lg resize-none outline-none focus:border-quaternary focus:border-2"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />
          <button
            type="submit"
            className="bg-tertiary  text-white py-2 px-4 rounded-lg hover:bg-quaternary hover:scale-100"
          >
            {isEditing ? "Update Post" : "Post"}
          </button>
        </form>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 my-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="break-inside-avoid bg-white border rounded mb-4 text-center "
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full object-cover mb-2"
              />
            )}
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="px-2">{post.description}</p>
            <div className="flex justify-between px-4 my-2">
              {user.uid === post.userId && (
                <button
                  className="text-gray-500 hover:text-tertiary"
                  onClick={() => editPost(post)}
                >
                  Edit
                </button>
              )}
              {user.uid === post.userId && (
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex justify-between px-2 items-center mt-2 mb-4">
              {user.uid !== post.userId && (
                <button
                  className="flex items-center text-tertiary "
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className="mr-1" />
                  <span>{post.likes || 0}</span>
                </button>
              )}
              <p>{likeErrors[post.id]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
