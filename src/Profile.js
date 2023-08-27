import React, { useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';
import './App.css';

const Profile = ({ account }) => {
   
       // Use the useEnsName hook to fetch ENS name associated with the account
  const { data: ensNameData } = useEnsName({
    address: account,
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
                <h1>HELLO,</h1>
                 {/* Display the ENS name */}
                {ensNameData && <p>ENS Name: {ensNameData}</p>}
            
                {/* Display the avatar */}
               {avatarData && <img src={avatarData} alt="Avatar" />}
             <div>
                  <p></p>
                </div>         
                   
              </div>
    
              <div className="card">
                <h2>Analytics</h2>
                <div>
                  
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