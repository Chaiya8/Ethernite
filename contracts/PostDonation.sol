// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PostDonation {
    struct Post {
        address author;
        string username;
        string content;
        uint256 totalDonations;
        mapping(address => uint256) donationsByUser;
    }

    uint256 public postCount;
    mapping(uint256 => Post) public posts;

    event PostCreated(uint256 postId, address author, string username, string content);
    event DonationAdded(uint256 postId, address donor, uint256 amount);

    function createPost(string memory _username, string memory _content) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");

        postCount++;
        Post storage newPost = posts[postCount];
        newPost.author = msg.sender;
        newPost.username = _username;
        newPost.content = _content;
        newPost.totalDonations = 0;

        emit PostCreated(postCount, msg.sender, _username, _content);
    }

    function donateToPost(uint256 _postId) external payable {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(msg.value > 0, "Donation amount must be greater than 0");

        Post storage post = posts[_postId];
        post.totalDonations += msg.value;
        post.donationsByUser[msg.sender] += msg.value;

        emit DonationAdded(_postId, msg.sender, msg.value);
    }

    function getPostDetails(uint256 _postId) external view returns (address, string memory, string memory, uint256, uint256) {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");

        Post storage post = posts[_postId];
        return (
            post.author,
            post.username,
            post.content,
            post.totalDonations,
            post.donationsByUser[msg.sender]
        );
    }
}