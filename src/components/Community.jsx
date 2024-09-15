import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  runTransaction,
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
  const [isEditing, setIsEditing] = useState(false);
  const [editPostData, setEditPostData] = useState({});
  const [comments, setComments] = useState({}); // Track comments for each post

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to view this page.");
      return;
    }
  
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
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
  
    const fetchLikedPosts = async () => {
      try {
        const likedPostsRef = doc(db, "userLikedPosts", user.uid);
        const likedPostsSnap = await getDoc(likedPostsRef);
        if (likedPostsSnap.exists()) {
          setLikedPosts(likedPostsSnap.data());
        } else {
          await setDoc(likedPostsRef, {}); // Create an empty document if it doesn't exist
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };
  
    fetchLikedPosts();
  
    return () => unsubscribe();
  }, []);
  

  const handleImageUpload = async (image) => {
    const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!newPost.title) {
        setError("Please provide a title for your post.");
        return;
      }

      if (!image && !isEditing) {
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
          post.imageUrl = await handleImageUpload(image);
        }

        if (isEditing) {
          const postRef = doc(db, "posts", editPostData.id);
          await updateDoc(postRef, { ...editPostData, ...post });
          setIsEditing(false);
        } else {
          await addDoc(collection(db, "posts"), post);
        }

        setNewPost({ title: "", description: "" });
        setImage(null);
      } catch (error) {
        console.error("Error creating post:", error);
        setError("Failed to create post. Please try again later.");
      }
    },
    [newPost, image, isEditing, editPostData]
  );

  const handleLike = useCallback(async (postId) => {
    const user = auth.currentUser;
    if (!user) {
      setLikeErrors((prev) => ({
        ...prev,
        [postId]: "You must be logged in to like posts.",
      }));
      return;
    }
  
    const postRef = doc(db, "posts", postId);
    const userLikedPostsRef = doc(db, "userLikedPosts", user.uid);
  
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        const userLikedPostsDoc = await transaction.get(userLikedPostsRef);
  
        if (!postDoc.exists()) throw new Error("Post does not exist.");
        const postData = postDoc.data();
        const userLikedPosts = userLikedPostsDoc.exists()
          ? userLikedPostsDoc.data()
          : {};
  
        // Check if the post is already liked by the user
        const hasLiked = userLikedPosts[postId] === true;
  
        // Update likes count based on whether the user is liking or unliking
        const newLikesCount = hasLiked
          ? postData.likes - 1
          : postData.likes + 1;
  
        // Update the user's liked posts and the post's like count in Firestore
        transaction.update(postRef, { likes: newLikesCount });
        transaction.set(
          userLikedPostsRef,
          { [postId]: !hasLiked }, // Toggle the like status
          { merge: true }
        );
  
        // Update local state
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !hasLiked,
        }));
        setLikeErrors((prev) => ({
          ...prev,
          [postId]: null,
        }));
      });
    } catch (error) {
      console.error("Error liking post:", error);
      setLikeErrors((prev) => ({
        ...prev,
        [postId]: "Failed to like post. Please try again later.",
      }));
    }
  }, [likedPosts]);

  const deletePost = useCallback(async (postId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again later.");
    }
  }, []);

  const editPost = useCallback((post) => {
    setIsEditing(true);
    setEditPostData(post);
    setNewPost({ title: post.title, description: post.description });
  }, []);

  const addComment = async (postId, commentText) => {
    if (!commentText) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const post = postSnap.data();
        const updatedComments = [
          ...post.comments,
          { userId: user.uid, text: commentText, createdAt: new Date() },
        ];

        await updateDoc(postRef, { comments: updatedComments });
        setComments((prev) => ({
          ...prev,
          [postId]: updatedComments,
        }));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (postId, commentIndex) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const post = postSnap.data();
        const updatedComments = post.comments.filter(
          (_, index) => index !== commentIndex
        );

        await updateDoc(postRef, { comments: updatedComments });
        setComments((prev) => ({
          ...prev,
          [postId]: updatedComments,
        }));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
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
    <div className="bg-[#040201] flex flex-col md:flex-row mx-auto px-4 md:px-12 lg:px-24 p-6 gap-4">
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
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 mb-2 border rounded outline-none focus:border-quaternary focus:border-2"
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                description: e.target.value,
              }))
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
            className="break-inside-avoid bg-white border rounded-lg mb-4 text-center "
          >
            <div className="relative">
  {post.imageUrl && (
    <img
      src={post.imageUrl}
      alt={post.title}
      className="w-full rounded-lg object-cover"
    />
  )}
  <div className="absolute top-2 right-2 z-10">
    <button
      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
      onClick={() => handleLike(post.id)}
    >
      <Heart
        className={`w-5 h-5 ${
          likedPosts[post.id] ? "text-red-500 fill-current" : "text-gray-500"
        }`}
      />
    </button>
  </div>
</div>
<h2 className="text-xl font-bold">{post.title}</h2>
<p className="px-2">{post.description}</p>

{/* Display the number of likes */}
<div className="flex justify-between px-4 my-2">
  <span>{post.likes} {post.likes === 1 ? "Like" : "Likes"}</span>

  {user.uid === post.userId && (
    <>
      <button
        className="text-gray-500 hover:text-tertiary"
        onClick={() => editPost(post)}
      >
        Edit
      </button>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => deletePost(post.id)}
      >
        Delete
      </button>
    </>
  )}
</div>


            {/* Comments Section */}
            <div className="text-left px-4 pb-4">
              <h3 className="font-bold mb-2">Comments</h3>
              {comments[post.id] &&
                comments[post.id].map((comment, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    {comment.userId === user.uid && (
                      <button
                        className="text-red-500 text-xs"
                        onClick={() => deleteComment(post.id, index)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(post.id, e.target.elements.commentText.value);
                  e.target.reset();
                }}
                className="flex mt-2"
              >
                <input
                  name="commentText"
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded-l outline-none"
                />
                <button
                  type="submit"
                  className="bg-tertiary text-white py-2 px-4 rounded-r"
                >
                  Comment
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
