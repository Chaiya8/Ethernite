import React, { useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { ethers } from "ethers"
import EtherniteAbi from './contractsData/ethernite.json'
import EtherniteAddress from './contractsData/ethernite-address.json'

const Home = ({  account }) => {

  const handleDonate = async (postId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    try {
      const contract = new ethers.Contract(EtherniteAddress, EtherniteAbi, signer);
      const tx = await contract.donateToPost(postId, { value: ethers.utils.parseEther('0.01') });
      await tx.wait();
      console.log('Donation successful');
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  // Use the useEnsName hook to fetch ENS name associated with the account
  const { data: ensNameData } = useEnsName({
    address: account,
  });

  // Use the useEnsAvatar hook to fetch the avatar associated with the user's ENS name
  const { data: avatarData } = useEnsAvatar({
    name: ensNameData,
    // chainID: 5,
  });

  // Define avatar URLs for different users (example URLs)
  const avatarUrls = {
    'dummy1.eth': 'https://euc.li/goerli/qtea8.eth',
    'akiva-8.eth': 'https://euc.li/goerli/akiva-8.eth',
  };

  // State to manage the list of posts
  const [posts, setPosts] = useState([
    { id: 1, username: 'qtea8.eth', address:"0xC3974Fd0b75Cce812123ABe572fa42063561C6bf", content: 'How do I make a post?' },
    { id: 2, username: 'akiva-8.eth', address:"0x735BdFbA03D4F88928670Eb7a336AC5cdB8d6d01", content: 'Donate ETH to enter this giveaway!' },
  ]);

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
      address: account,
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
                  ? avatarData // Use the user's avatar
                  : avatarUrls[post.username] || 'https://publish.one37pm.net/wp-content/uploads/2021/11/Brantly.eth_.png' // Use dummy avatars
              }
              alt={`${post.username}'s profile`}
              style={{ width: 50, height: 50 }}
            />
            <span className="username">{post.username}</span>
          </div>
          <p>{post.content}</p>
          <button
            className={post.liked ? 'liked' : ''}
            onClick={() => handleDonate(post.id)} // Change the function to handleDonate
          >
            {post.liked ? 'Donated' : 'Donate 0.01 Eth'} {/* Change the donation amount in the button text */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
