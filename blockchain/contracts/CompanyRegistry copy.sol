// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyRegistry {
    struct User {
        address company;
        address walletAddress;
        bytes32 passwordHash;
    }
    struct Company {
        string name;
        uint256 deposit;
        uint256 totalUsers;
    }

    struct Login {
        User user;
        uint256 lastLoginTime;
        uint256 totalLoggedInDays;
        bool isLoggedIn;
    }
    mapping(address => User) private userMap;
    mapping(address => Company) private companies;
    mapping(address => Login) private LoginDetails;

    event CompanyRegistered(address indexed companyAddress, string name);
    event DepositAdded(address indexed companyAddress, uint256 amount);
    event CompanyDeleted(address indexed companyAddress);
    event UserLoggedIn(User indexed user);
    event UserRewarded(address indexed userAddress, uint256 amount);
    event UserRegistered(
        address indexed companyAddress,
        address indexed userAddress
    );

    function doesLoginExist(address walletAddress) public view returns (bool) {
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Company not registered"
        );
        require(
            companies[msg.sender].deposit > 10000000000000000 wei,
            "Deposit some ETH first"
        );
        require(
            userMap[walletAddress].company == msg.sender,
            "User doesn't belong to your company"
        );

        return LoginDetails[walletAddress].user.walletAddress == walletAddress;
    }

    function loginUser(address walletAddress, bytes32 passwordHash)
        public
        returns (bool)
    {
        require(!doesLoginExist(walletAddress), "Login Details already exists");
        require(passwordHash != 0, "Invalid password hash");
        require(
            userMap[walletAddress].passwordHash == passwordHash,
            "Incorrect password"
        );
        User memory userInfo = userMap[walletAddress];
        LoginDetails[walletAddress] = Login({
            user: userInfo,
            lastLoginTime: block.timestamp,
            totalLoggedInDays: 1,
            isLoggedIn: true
        });
        emit UserLoggedIn(userMap[walletAddress]);
        return LoginDetails[walletAddress].isLoggedIn;
    }

    // function checkForRewards() public {}
    function gettotalLoggedInDays(address CompanyAddress, address userAddress)
        public
        view
        returns (uint256)
    {
        require(
            bytes(companies[CompanyAddress].name).length > 0,
            "Company not registered"
        );
        require(
            companies[msg.sender].deposit > 10000000000000000 wei,
            "Deposit some ETH first"
        );
        require(
            userMap[userAddress].company == CompanyAddress,
            "User doesn't exists in this company"
        );
        require(doesLoginExist(userAddress), "Login detail does not exists");
        return LoginDetails[userAddress].totalLoggedInDays;
    }

    function getIsLoggedInStatus(address CompanyAddress, address userAddress)
        public
        view
        returns (bool)
    {
        require(
            bytes(companies[CompanyAddress].name).length > 0,
            "Company not registered"
        );
        require(
            companies[CompanyAddress].deposit > 10000000000000000 wei,
            "Deposit some ETH first"
        );

        require(
            userMap[userAddress].company == CompanyAddress,
            "User doesn't exists in this company"
        );
        require(doesLoginExist(userAddress), "Login detail does not exists");
        return LoginDetails[userAddress].isLoggedIn;
    }

    function registerCompany(string memory name) public {
        require(bytes(name).length > 0, "Company name cannot be empty");
        require(
            bytes(companies[msg.sender].name).length == 0,
            "Company already registered"
        );
        companies[msg.sender] = Company(name, 0, 0);
        emit CompanyRegistered(msg.sender, name);
    }

    function addDeposit() public payable {
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Company not registered"
        );
        require(msg.value > 0, "Value cannot be less than 0");
        companies[msg.sender].deposit += msg.value;
        emit DepositAdded(msg.sender, msg.value);
    }

    function deleteCompany() public {
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Company not registered"
        );
        uint256 balance = companies[msg.sender].deposit;
        delete companies[msg.sender];
        emit CompanyDeleted(msg.sender);
        if (balance > 0) {
            payable(msg.sender).transfer(balance);
        }
    }

    function registerUser(address walletAddress, bytes32 passwordHash) public {
        require(passwordHash != 0, "Invalid password hash");
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Only Companies can register their users"
        );
        require(
            companies[msg.sender].deposit > 10000000000000000 wei,
            "Deposit some ETH first"
        );
        require(
            userMap[walletAddress].walletAddress != walletAddress,
            "User already registered"
        );

        userMap[walletAddress] = User(msg.sender, walletAddress, passwordHash);
        companies[msg.sender].totalUsers++;
        emit UserRegistered(msg.sender, walletAddress);
    }

    function getCompanyDeposit() public view returns (uint256) {
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Company not registered"
        );
        return companies[msg.sender].deposit;
    }

    function lastLoginTime(address walletAddress)
        public
        view
        returns (uint256)
    {
        require(
            bytes(companies[msg.sender].name).length > 0,
            "Company not registered"
        );
        require(
            companies[msg.sender].deposit > 10000000000000000 wei,
            "Deposit some ETH first"
        );
        require(
            userMap[walletAddress].company == msg.sender,
            "User doesn't belong to your company"
        );

        return (LoginDetails[walletAddress].lastLoginTime);
    }

    // function giveReward(address userAddress) private {
    //     uint256 rewardAmount = companies[msg.sender].deposit /
    //         companies[msg.sender].totalUsers;
    //     payable(LoginDetails[userAddress].user.walletAddress).transfer(
    //         rewardAmount
    //     );
    //     emit UserRewarded(
    //         LoginDetails[userAddress].user.walletAddress,
    //         rewardAmount
    //     );
    // }

    //Update login status
    function updateLoggedInStatus(address userAddress)
        public
        returns (bool, uint256)
    {
        require(doesLoginExist(userAddress), "Login Details doesn't exists");
        uint256 currentDay = block.timestamp / 1 days;
        uint256 lastLoginDay = LoginDetails[userAddress].lastLoginTime / 1 days;
        if (currentDay > lastLoginDay) {
            if (currentDay - lastLoginDay == 1) {
                LoginDetails[userAddress].totalLoggedInDays += 1;
            } else if (currentDay - lastLoginDay >= 2) {
                LoginDetails[userAddress].totalLoggedInDays = 1;
            }
            LoginDetails[userAddress].lastLoginTime = block.timestamp;
        }
        LoginDetails[userAddress].isLoggedIn = true;
        if (LoginDetails[userAddress].totalLoggedInDays == 7) {
            // reward user with ETH
            uint256 rewardAmount = companies[msg.sender].deposit /
                companies[msg.sender].totalUsers;
            payable(LoginDetails[userAddress].user.walletAddress).transfer(
                rewardAmount
            );
            emit UserRewarded(
                LoginDetails[userAddress].user.walletAddress,
                rewardAmount
            );
            // reset totalLoggedInDays
            LoginDetails[userAddress].totalLoggedInDays = 0;
        }
        return (
            LoginDetails[userAddress].isLoggedIn,
            LoginDetails[userAddress].totalLoggedInDays
        );
    }

    function logoutUser(address walletAddress) public {
        require(
            doesLoginExist(walletAddress),
            "User is not currently logged in"
        );
        LoginDetails[walletAddress].isLoggedIn = false;
    }
}
