// SPDX-License-Identifier: MIT
// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.0;


/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

// File: @openzeppelin/contracts/token/ERC20/ERC20.sol


// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;




/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * The default value of {decimals} is 18. To change this, you should override
 * this function so it returns a different value.
 *
 * We have followed general OpenZeppelin Contracts guidelines: functions revert
 * instead returning `false` on failure. This behavior is nonetheless
 * conventional and does not conflict with the expectations of ERC20
 * applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the default value returned by this function, unless
     * it's overridden.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `from` to `to`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}

// File: signature.sol


pragma solidity ^0.8.0;

/* Signature Verification

How to Sign and Verify
# Signing
1. Create message to sign
2. Hash the message
3. Sign the hash (off chain, keep your private key secret)

# Verify
1. Recreate hash from the original message
2. Recover signer from signature and hash
3. Compare recovered signer to claimed signer
*/

contract VerifySignature {
    /* 1. Unlock MetaMask account
    ethereum.enable()
    */

    /* 2. Get message hash to sign
    getMessageHash(
        0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C,
        123,
        "coffee and donuts",
        1
    )

    hash = "0xcf36ac4f97dc10d91fc2cbb20d718e94a8cbfe0f82eaedc6a4aa38946fb797cd"
    */
    function getMessageHash(
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_to, _amount, _message, _nonce));
    }

    /* 3. Sign message hash
    # using browser
    account = "copy paste account of signer here"
    ethereum.request({ method: "personal_sign", params: [account, hash]}).then(console.log)

    # using web3
    web3.personal.sign(hash, web3.eth.defaultAccount, console.log)

    Signature will be different for different accounts
    0x993dab3dd91f5c6dc28e17439be475478f5635c92a56e17e82349d3fb2f166196f466c0b4e0c146f285204f0dcb13e5ae67bc33f4b888ec32dfe0a063e8f3f781b
    */
    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    /* 4. Verify signature
    signer = 0xB273216C05A8c0D4F0a4Dd0d7Bae1D2EfFE636dd
    to = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C
    amount = 123
    message = "coffee and donuts"
    nonce = 1
    signature =
        0x993dab3dd91f5c6dc28e17439be475478f5635c92a56e17e82349d3fb2f166196f466c0b4e0c146f285204f0dcb13e5ae67bc33f4b888ec32dfe0a063e8f3f781b
    */
    function verify(
        address _signer,
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce,
        bytes memory signature
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(_to, _amount, _message, _nonce);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(
        bytes memory sig
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }
    // function myTokens(string memory tokenName, uint randomValue, address[] memory _tokenAddresses) public pure {
    //     tokenName = "hello";
    //     randomValue = 123;
    //     _tokenAddresses[0];
        
    // } 
}

// File: Tourism/Tourism.sol


pragma solidity ^0.8.0;

// import "./Token.sol";



contract ERC20WithAutoMinerReward is ERC20("DCToken", "Xu"),  VerifySignature{
    function _mintMinerReward(
        address _signer,
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce,
        bytes memory signature) internal {
        if(verify(_signer, _to, _amount, _message, _nonce, signature)){
          _mint(_to, 1000);
        }
    }
}

contract TouristConTract is ERC20WithAutoMinerReward {
    constructor()  {
        destinations.push(Destination(1, "HoTay"));
        destinations.push(Destination(2, "HCM"));
        destinations.push(Destination(3, "HN"));
        destinations.push(Destination(4, "VietNam"));
        destinations.push(Destination(5, "BangKok"));
        destinations.push(Destination(6, "Phuket"));
        tickets.push(Ticket(111111111111111, false));
        tickets.push(Ticket(222222222222222, false));
        tickets.push(Ticket(333333333333333, false));
        tickets.push(Ticket(444444444444444, false));
        admin.push(msg.sender);
        owner = msg.sender;
    }
    struct Ticket {
      uint256 id;
      bool isUsed;
    }

    struct Tourist {
        string name;
        uint256 age;
        bool signup;
        address touristAddress;
    }

    struct Album {
      uint id;
      string name;
    }

    struct Destination {
        uint256 index; // identifier
        string desName;
    }

    struct Journey {
        string desName;
        uint256 arrivalDate;
        string review;
        uint rate;
    }

    enum ServiceType{Hotel, Playground, Restaurant}
    struct Service {
      ServiceType typ;
      string name;
      address enterpiseAddress;
      bool sign;
    }
    address private owner;
    address[] private  admin; // mảng địa chỉ cho sở doanh nghiệp
    address[] private enterpise; // mảng địa chỉ cho doanh nghiệp 
    // Token private erc20Token; // Token Diem Thuong erc20Token
    ERC20 private erc20Token;

    Ticket[] public tickets;
    Destination[] private destinations;
    Tourist[] private tourists;
    mapping(address => Tourist) public touristIdentify; // tra cứu định danh du khách bằng địa chỉ ví
    mapping(address => Journey[]) public touristJourneys; // tra cứu hành trình dư khách bằng địa chỉ ví
    mapping(address => Service[]) private enterpiseService; // tra cứu các dịch vụ du lịch của doanh nghiệp qua địa chỉ ví doanh nghiệp
    
    mapping(address => Album[]) public touristAlbums; // tra cứu danh sách album qua địa chỉ ví của du khách
    mapping(address => mapping(uint=>Journey[])) public albumJourneys; //tra cứu hành trình của du khách qua địa chỉ ví và id album
    mapping(address => mapping(uint=>Destination[])) public albumDestination;  // tra cứu địa điểm được thêm vào album qua địa chỉ ví và id album

    mapping(uint => uint) checkInTime;

    mapping(uint => uint) public noPeopleCheckIn; // số lượng người check in tại 1 địa điểm
    mapping(uint => uint[]) public destinationRates; // số rate của một địa điểm
    

    event CreateAlbum(uint _id, string _name);
    function createAlbum(uint _id,string memory _name) public {
        touristAlbums[msg.sender].push(Album(_id, _name)); // thêm vào mảng touristAlbums của địa chỉ người dùng
        emit CreateAlbum(_id, _name);
    }

    function getNameAlbum(uint _id) private view returns (string memory name) {
      for(uint i = 0; i < touristAlbums[msg.sender].length; i++) {
        if(_id == touristAlbums[msg.sender][i].id) {
          return touristAlbums[msg.sender][i].name;
        }
      }
    }

    event AddDestinationInAlbum(string nameDestination, string nameAlbum);
    function addDestinationInAlbum(uint desIndex, uint albumId) public {
      string memory name; 
      for (uint i = 0; i < destinations.length; ++i) {  // thực hiện vòng lặp để tìm index của Destination trong mảng destinations
        if (desIndex == destinations[i].index) { 
          name = destinations[i].desName;
          albumDestination[msg.sender][albumId].push(destinations[i]); // thêm địa điểm vào album
          break;
        }
      }
      emit AddDestinationInAlbum(name, getNameAlbum(desIndex));
    }

    event AddJourneyInAlbum(string AlbumName, Journey journey);
    function addAlbumJourney(uint index, uint albumId, uint256 date) public { // thêm địa điểm check-in vào album
      bool isSuccess = false;
      string memory name;
      Journey memory journey;
      for (uint i = 0; i < destinations.length; i++) { // thực hiện vòng lặp để lấy ra tên của destination thông qua index
        if(index == destinations[i].index) { 
          name = destinations[i].desName;
          break;
        }
      }
      for (uint i = 0; i < touristJourneys[msg.sender].length; i++)
      {
        if ((keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(touristJourneys[msg.sender][i].desName))) // check name của destination và desName trong Journey 
          && (touristJourneys[msg.sender][i].arrivalDate == date)) { // check date
          journey = Journey({
            desName: name,
            arrivalDate: date,
            review: touristJourneys[msg.sender][i].review,
            rate: touristJourneys[msg.sender][i].rate
            });
          albumJourneys[msg.sender][albumId].push(journey); //thêm Journey vào mảng albumJourneys có albumId của du khách);    
            isSuccess = true;
            break;
        }
      }
      require(isSuccess, "This Destination was not checkin");
      emit AddJourneyInAlbum(getNameAlbum(albumId),journey);
    }

    function getAlbumNotCheckIn(uint id) public view returns (Destination[] memory) {
      return albumDestination[msg.sender][id];
    }

    function getAlbumCheckIn(uint id) public view returns (Journey[] memory){
      return albumJourneys[msg.sender][id];
    }

    event AddTourist(string name, uint256 age);
    function register(string memory name, uint256 age) public {
        // Hàm để add một du khách mới
        Tourist memory newTourist = Tourist(name, age, true, msg.sender);
        touristIdentify[msg.sender].name = name; // lưu vào tên
        touristIdentify[msg.sender].age = age; // lưu vào tuổi
        touristIdentify[msg.sender].touristAddress = msg.sender;
        if (!touristIdentify[msg.sender].signup) {
            // nếu đăng nhập lần đầu tiên sẽ được thêm vào mảng
            tourists.push(newTourist); // Thêm vào mảng
            touristIdentify[msg.sender].signup = true; // set true cho signup
        }
    
    emit AddTourist(name, age);
    }

    function getBalance(address add) public view returns (uint256) {
      // return erc20Token.balanceOf(add);
    }
    //check-in -> them vào touristjourney -> arrivalDate
    event CheckIn(string desName, string review, uint rate, uint256 ticketID);
    function checkIn (uint QRcode, string memory review, uint rate,uint256 ticketID) public returns (bool) {
      require(rate >=0 && rate <= 5, "Invalid rate number");
      bool isValid = false;
      // bool isSuccess = false;
      bool validTicket = false;
      // check ticketID
      for (uint i = 0; i < tickets.length;i++) {
        if (ticketID == tickets[i].id) {
          require(!tickets[i].isUsed, "Ticket has used");
          validTicket = true;
        }
      }
      require(validTicket, "Invalid Ticket ! Please Check-in again");

      string memory name;
      for (uint i = 0; i < destinations.length; ++i) {
        if(QRcode == destinations[i].index)
         // mapping (uint -> Destination) 
         {
          name = destinations[i].desName;
          for (uint j = 0; j < touristJourneys[msg.sender].length; j++) { // vòng lặp để check valid check-in
            if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(touristJourneys[msg.sender][j].desName))) {
              // uint256 timeLimit =  1 days;
              require(block.timestamp > (touristJourneys[msg.sender][j].arrivalDate + 1 days) , //yc thời gian check-in lại phải lớn hơn 1 ngày kể từ lần check-in trước đó
              "Check-in only 1 time per day.");
              break;
            }
          }
          isValid = true;
          noPeopleCheckIn[QRcode]++;
          destinationRates[QRcode].push(rate);
          touristJourneys[msg.sender].push(Journey(destinations[i].desName, block.timestamp, review, rate)); // thêm vào mảng touristJourney
          // isSuccess = tokenTransfer(); // chuyển điểm thưởng cho du khách khi check-in thành công
          break;
        }
      }
      require(isValid == true, "Invalid QRcode");
      // require(isSuccess== true,"Cannot transfer token");
      emit CheckIn(name, review, rate, ticketID);
      return true;
    }

    // function tokenTransfer() private returns (bool) {
    //   return erc20Token.transfer(msg.sender, 1000000000000000000);
    // }

    function getAllJourney () public view returns(Journey[] memory) {
      return touristJourneys[msg.sender];
    }
    

    function getAllDestination() public view returns (Destination[] memory) {
        return destinations;
    }

    modifier onlyAdmin {
      bool isAdmin = false;
      for (uint i = 0; i < admin.length;++i) 
        if (msg.sender == admin[i]) {
          isAdmin = true;
          break;
        }
      require(isAdmin == true, "Only admin can call this function");
      _;
    }

    modifier onlyEnterpirse {
      bool isEnterpirse = false;
      for (uint i = 0; i < enterpise.length;++i) 
        if (msg.sender == enterpise[i]) {
          isEnterpirse = true;
          break;
        }
      require(isEnterpirse == true, "Only Enterprise can call this function");
      _;
    }

    function grantRole(address userAddress, uint role) external onlyAdmin {
      require(role == 1 || role == 2, "Invalid role, only admin or service suitable.");
      if (role == 1) {
        admin.push(userAddress);
      }
      if(role == 2) {
        enterpise.push(userAddress);
      }
    }

    function validIndex(uint index) private view returns(bool) {
        for (uint i = 0; i < destinations.length;++i){
          if(index == destinations[i].index) return false;
        }
        return true;
    }

    function addDestination(uint index, string memory name) external onlyAdmin {
      require(validIndex(index) == true, "Index has been already existed"); 
      destinations.push(Destination(index, name));  
    }

    function validAddIDTicket(uint256 id) public view returns (bool) {
      for (uint i = 0; i < tickets.length;i++) {
        if (id == tickets[i].id) return false;
      }
      return true;
    }
    function addTicket(uint256 id) external onlyAdmin {
      require(validAddIDTicket(id), "This ID already existed");
      tickets.push(Ticket(id, false)); 
    }
    // function signService(string memory name, ServiceType serTyp) public view onlyEnterpirse {
    //   enterpiseService[msg.sender].push(Service(serTyp,name,))
    // }
     function claimPrize(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public view returns (bool) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);

        // if the signature is signed by the owner
        if (signer == owner) {
            // give player (msg.sender) a prize
            return true;
        }

        return false;
    }
    
}

// hình ảnh chụp của du khách? 
// hình ảnh của destination? (string: url)  
// điểm thưởng cố định? Cách sử dụng điểm thưởng? 
// QR leak -> không ở đó nhưng mà vẫn check-in được.


// tính điểm trung bình