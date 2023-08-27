import React, { useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';

const Profile = ({  account }) => {
   
       // Use the useEnsName hook to fetch ENS name associated with the account
  const { data: ensNameData } = useEnsName({
    address: '0xDFde15ffC82369618528D8295d1A447e2283b83E',
  });

  // Use the useEnsAvatar hook to fetch the avatar associated with the user's ENS name
  const { data: avatarData } = useEnsAvatar({
    name: ensNameData,
    chainID: 1,
  });
    
        return (
        <div className="container">
           
          <main className="main"> 
            <div className="grid">
              <div className="card">
                <h1>HELLO! </h1>
                 {/* Display the ENS name */}
                {ensNameData && <p>ENS Name: {ensNameData}</p>}
            
                {/* Display the avatar */}
               {avatarData && <img src={avatarData} alt="Avatar" width= "200" height= "auto" />}
                <div>
                  <p>POSTS</p>
                  <p>ETH SENT</p>
                  <p>ETH RECEIVED</p>
                  <p>3</p>
                  <p>0.233</p>
                  <p></p>
                </div>         
                   
              </div>
    
              <div className="card">
                <h2>Analytics</h2>
                <div>
                  <img src="https://cdn.discordapp.com/attachments/1119042949825703987/1145187158592860170/image.png" width= "900" height= "auto"/>
                </div>         
              </div>
              <div className="card">
                <h2>Tutorials</h2>
                <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
                </div>             
              </div>
            </div>
          </main>
          <footer className="footer"></footer>
        </div>
      );
    };
export default Profile;