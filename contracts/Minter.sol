// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

interface IFueli {
    function mint(address to, uint256 amount) external;
}

interface IPicli {
    function init(address to, string memory prompt, string memory message, uint256 value, bool privacy) external returns(uint256);
    function inject(uint256 tokenId, string memory image, string memory videoId) external;
}

/// @custom:security-contact ceo@tookey.io
contract FueliPicliMinter is AccessControl {
    bytes32 public constant INJECTOR_ROLE = keccak256("INJECTOR_ROLE");

    uint256 public constant COST_PER_MINT = 1 ether;
    uint256 public constant COST_PER_MESSAGE_BYTE = 0.01 ether;
    uint256 public constant COST_PER_PROMPT_BYTE = 0.1 ether;

    IFueli public fueli;
    IPicli public picli;
    address public treasury;

    event MintingRequest(
        address indexed minter,
        uint256 tokenId,
        string prompt,
        string message,
        uint256 value,
        bool indexed privacy
    );

    constructor(IFueli _fueli, IPicli _picli, address _treasury) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(INJECTOR_ROLE, msg.sender);
        fueli = _fueli;
        picli = _picli;
        treasury = _treasury;
    }

    function mint(string memory prompt, string memory message, bool privacy) external payable {
        uint256 costOfPrompt = strlen(prompt) * COST_PER_PROMPT_BYTE;
        uint256 costOfMessage = strlen(message) * COST_PER_MESSAGE_BYTE;
        uint256 totalCost = costOfPrompt + costOfMessage + COST_PER_MINT;
        require(msg.value >= totalCost, "Not enough funds deposited to mint");
        uint256 tokenId = picli.init(msg.sender, prompt, message, msg.value, privacy);
        fueli.mint(msg.sender, msg.value);
        emit MintingRequest(msg.sender, tokenId, prompt, message, msg.value, privacy);

        payable(treasury).transfer(msg.value);
    }

    function inject(uint256 tokenId, string memory image, string memory videoId) public onlyRole(INJECTOR_ROLE) {
        picli.inject(tokenId, image, videoId);
    }

    function strlen(string memory s) internal pure returns (uint256) {
        uint256 len;
        uint256 i = 0;
        uint256 bytelength = bytes(s).length;

        for (len = 0; i < bytelength; len++) {
            bytes1 b = bytes(s)[i];
            if (b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }
}
