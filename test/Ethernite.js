// File: test/PostDonation.test.js
const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');
const PostDonation = artifacts.require('PostDonation');

contract('PostDonation', (accounts) => {
  let postDonation;

  before(async () => {
    postDonation = await PostDonation.new();
  });

  it('should create a post', async () => {
    const username = 'dummy.eth';
    const content = 'My first post';
    await postDonation.createPost(username, content);

    const postDetails = await postDonation.getPostDetails(1);
    assert.equal(postDetails[1], username, 'Username mismatch');
    assert.equal(postDetails[2], content, 'Content mismatch');
  });

  it('should donate to a post', async () => {
    const postId = 1;
    const donationAmount = web3.utils.toWei('0.001', 'ether');
    const initialBalance = new BN(await web3.eth.getBalance(accounts[0]));
    
    await postDonation.donateToPost(postId, { value: donationAmount });
    
    const postDetails = await postDonation.getPostDetails(postId);
    assert.equal(postDetails[3].toString(), donationAmount, 'Total donations mismatch');
    assert.equal(postDetails[4].toString(), donationAmount, 'User donation mismatch');

    const finalBalance = new BN(await web3.eth.getBalance(accounts[0]));
    assert.isTrue(initialBalance.sub(finalBalance).gte(new BN(donationAmount)), 'Donation amount not subtracted from balance');
  });

  it('should not allow donating to a non-existent post', async () => {
    const nonExistentPostId = 999;
    const donationAmount = web3.utils.toWei('0.001', 'ether');
    
    await expectRevert(
      postDonation.donateToPost(nonExistentPostId, { value: donationAmount }),
      'Invalid post ID'
    );
  });
});
