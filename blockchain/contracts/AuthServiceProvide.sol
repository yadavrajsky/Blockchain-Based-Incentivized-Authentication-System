// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./CompanyRegistry.sol";

contract AuthenticationServiceProvider is CompanyRegistry {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}
