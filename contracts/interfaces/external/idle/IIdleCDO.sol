// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.12;

/// @title IIdleCDO
/// @author bugduino - Idle Labs
/// @notice Interface for the `IdleCDO` contract
/// @dev This interface only contains functions of the `IdleCDO` which are called by other contracts
/// of this module
interface IIdleCDO {
    function virtualPrice(address _tranche) external view returns(uint256);
}