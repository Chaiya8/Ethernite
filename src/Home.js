import React, { useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { ethers } from "ethers"

const Home = ({ contract, account }) => {

  // Use the useEnsName hook to fetch ENS name associated with the account
  const { data: ensNameData } = useEnsName({
    address: account,
  });

  // Use the useEnsAvatar hook to fetch the avatar associated with the user's ENS name
  const { data: avatarData } = useEnsAvatar({
    name: ensNameData,
    chainID: 5,
  });

  // Define avatar URLs for different users (example URLs)
  const avatarUrls = {
    'qtea8.eth': 'https://euc.li/goerli/qtea8.eth',
    'akiva-8.eth': 'https://euc.li/goerli/akiva-8.eth',
  };
  const addressMapping = {
    'qtea8.eth': '0xC3974Fd0b75Cce812123ABe572fa42063561C6bf',
    'akiva-8.eth': '0x735BdFbA03D4F88928670Eb7a336AC5cdB8d6d01',
    }

  // State to manage the list of posts
  const [posts, setPosts] = useState([
    { id: 1, username: 'qtea8.eth', author:"0xC3974Fd0b75Cce812123ABe572fa42063561C6bf", content: 'How do I make a post?' },
    { id: 2, username: 'akiva-8.eth', author:"0x735BdFbA03D4F88928670Eb7a336AC5cdB8d6d01", content: 'Donate ETH to enter this giveaway!' },
  ]);

  const handleDonate = async (postId) => {
    const post = posts.find((p) => p.id === postId);
  
    if (!post) {
      return;
    }
  
    const donationAmount = ethers.utils.parseEther('0.00001');
  
    try {
      const transaction = await contract.donateToPost(postId, {
        value: donationAmount,
      });
  
      await transaction.wait();
  
      const updatedPosts = posts.map((p) =>
        p.id === postId ? { ...p, totalDonations: p.totalDonations.add(donationAmount) } : p
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error donating:', error);
    }
};
 
  // State to manage the content of the new post input
  const [newPostContent, setNewPostContent] = useState('');

  // Function to handle the like button click
  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    );
    setPosts(updatedPosts);
  };

  // Function to handle the submission of a new post
  const handleNewPostSubmit = () => {
    if (newPostContent.trim() === '' || ensNameData.trim() === '') {
      return;
    }

    // Create a new post object
    const newPost = {
      id: Date.now(),
      username: ensNameData,
      author: account,
      content: newPostContent,
    };

    // Update the list of posts
    setPosts([...posts, newPost]);
    setNewPostContent('');
  };

  // Render the component
  return (
    <div className="post-list">
      <form>
        <input
          type="text"
          placeholder="Enter new post"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button type="button" onClick={handleNewPostSubmit}>
          Add Post
        </button>
      </form>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="user-info">
            <img
              src={
                post.username === ensNameData // Check if it's the user who made the post
                  ? avatarData
                  : avatarUrls[post.username] ||
                    'https://publish.one37pm.net/wp-content/uploads/2021/11/Brantly.eth_.png'
              }
              alt={`${post.username}'s profile`}
              style={{ width: 50, height: 50 }}
            />
            <span className="username">{post.username}</span>
          </div>
          <p>{post.content}</p>
          <button
            className={post.liked ? 'liked' : ''}
            onClick={() => handleLike(post.id)}
          >
            {post.liked ? 'Donated' : 'Donate 0.001 Eth'}
          </button>
          <button onClick={() => handleDonate(post.id)}>Donate</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
