// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./CompanyRegistry.sol";

contract AuthenticationServiceProvider is CompanyRegistry {
    address public owner;

    // CompanyRegistry public companyRegistry;

    constructor() {
        owner = msg.sender;
        // companyRegistry = CompanyRegistry(_companyRegistryAddress);
    }
}
