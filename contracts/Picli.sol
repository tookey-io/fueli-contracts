// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";


/// @custom:security-contact ceo@tookey.io
contract Picli is ERC721, ERC721Enumerable, AccessControl {
    using Counters for Counters.Counter;
    using Strings for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    struct PicliMeta {
        uint256 value;
        string prompt;
        string message;
        string image;
        string videoId;
        bool privacy;
    }

    mapping (uint256 => PicliMeta) public meta;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Fueli Pictures", "PICLI") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function init(address to, string memory prompt, string memory message, uint256 value, bool privacy) public onlyRole(MINTER_ROLE) returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _setMetaValue(tokenId, value);
        _setMetaPrompt(tokenId, prompt);
        _setMetaMessage(tokenId, message);
        _setMetaPrivacy(tokenId, privacy);

        // Allocate NFT
        _safeMint(to, tokenId);

        return tokenId;
    }

    function inject(uint256 tokenId, string memory image, string memory videoId) public onlyRole(MINTER_ROLE) {
        _setMetaImage(tokenId, image);
        _setMetaVideoId(tokenId, videoId);
    }

    function _setMetaImage(uint256 tokenId, string memory image) internal {
        meta[tokenId].image = image;
    }
    function _setMetaVideoId(uint256 tokenId, string memory videoId) internal {
        meta[tokenId].videoId = videoId;
    }
    function _setMetaPrivacy(uint256 tokenId, bool privacy) internal {
        meta[tokenId].privacy = privacy;
    }
    function _setMetaValue(uint256 tokenId, uint256 value) internal {
        meta[tokenId].value = value;
    }
    function _setMetaPrompt(uint256 tokenId, string memory prompt) internal {
        meta[tokenId].prompt = prompt;
    }

    function _setMetaMessage(uint256 tokenId, string memory message) internal {
        meta[tokenId].message = message;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {   
        _requireMinted(tokenId);
        PicliMeta storage data = meta[tokenId];

        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Richi ', data.prompt, '", "description": "', data.message ,'", "image": "', data.image,'", "privacy": "', (data.privacy ? "private" : "public") , '", "transcoded_id": "', data.videoId,'", "value": "', data.value.toString(),'"}'))));
        string memory output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
