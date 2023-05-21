import React, { useState } from "react";

const Home = () => {
  return (
    <div className="container min-h-screen">
      <main>
        <div className="text-center">
          <div className="py-6 sm:px-0">
            <h1 className="text-5xl lg:text-5xl  font-bold text-purple-800 text-center">
              Advanced Authenication System
            </h1>
            <blockquote className="mt-3 text-xl text-blue-700">
              "Consumers and producers : equal economic partners."
            </blockquote>
            <p className="mt-2 text-black ">Powered by BlockAuth</p>
          </div>
        </div>
      </main>
      <p className="justify-center mx-7">
        <span className="text-4xl ml-4">W</span>e propose to develop an
        authentication system that combines a client-server model with block
        chain technology. Companies will register on the block chain and deposit
        an initial asset, which will serve as an incentive for their active
        users. In this system, companies will register their users using their
        wallet address and password instead of traditional methods such as email
        or username. The companies will perform a session with the user's
        details, authenticate them, and track their regular session. They will
        keep the login data of the users updated every day. If their users are
        active for consecutive days, they will be rewarded with incentives
        through a smart contract. If a company fails to update their users'
        login data, they will be deemed untrustworthy.
      </p>
      <img
        src="/Arch.jpg"
        className="object-contain h-1/2 w-1/2 mx-auto"
        alt="Architecture of BlockAuth"
      />
    </div>
  );
};

export default Home;
