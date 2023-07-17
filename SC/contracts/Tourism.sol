// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Signature.sol";

contract ERC20WithAutoMinerReward is ERC20("DCToken", "Xu"),  VerifySignature{
    function _mintMinerReward(
        address _signer,
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce,
        bytes memory signature) public {
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
        tickets.push(Ticket(1, false));
        tickets.push(Ticket(2, false));
        tickets.push(Ticket(3, false));
        tickets.push(Ticket(4, false));
        tickets.push(Ticket(5, false));
        tickets.push(Ticket(6, false));
        tickets.push(Ticket(7, false));
        tickets.push(Ticket(8, false));
        tickets.push(Ticket(9, false));
        tickets.push(Ticket(10, false));
        tickets.push(Ticket(11, false));
        tickets.push(Ticket(12, false));
        tickets.push(Ticket(13, false));
        tickets.push(Ticket(14, false));
        tickets.push(Ticket(15, false));
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
        bool isReview;
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

    Ticket[] private tickets;
    Destination[] private destinations;
    Tourist[] private tourists;

    mapping(address => Tourist) public touristIdentify; // tra cứu định danh du khách bằng địa chỉ ví
    mapping(address => Journey[]) public touristJourneys; // tra cứu hành trình dư khách bằng địa chỉ ví
    mapping(address => Service[]) private enterpriseService; // tra cứu các dịch vụ du lịch của doanh nghiệp qua địa chỉ ví doanh nghiệp
    
    mapping(address => Album[]) public touristAlbums; // tra cứu danh sách album qua địa chỉ ví của du khách
    mapping(address => mapping(uint=>Journey[])) public albumJourneys; //tra cứu hành trình của du khách qua địa chỉ ví và id album
    mapping(address => mapping(uint=>Destination[])) public albumDestination;  // tra cứu địa điểm được thêm vào album qua địa chỉ ví và id album

    mapping(uint => uint) public noPeopleCheckIn; // số lượng người check in tại 1 địa điểm
    mapping(uint => uint) public noPeopleRate; // số lượng người rate tại 1 địa điểm

    mapping(uint => uint[]) public destinationRates; // số rate của một địa điểm
    mapping(uint => string[]) public destinationReviews; // tất cả reviews của một địa điểm


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
            rate: touristJourneys[msg.sender][i].rate,
            isReview: touristJourneys[msg.sender][i].isReview
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
    // event CheckIn(string desName, string review, uint rate, uint256 ticketID);
    // function checkIn (uint QRcode, string memory review, uint rate,uint256 ticketID) public returns (bool) {
    //   require(rate >=0 && rate <= 5, "Invalid rate number");
    //   bool isValid = false;
    //   // bool isSuccess = false;
    //   bool validTicket = false;
    //   // check ticketID
    //   for (uint i = 0; i < tickets.length;i++) {
    //     if (ticketID == tickets[i].id) {
    //       require(!tickets[i].isUsed, "Ticket has used");
    //       validTicket = true;
    //     }
    //   }
    //   require(validTicket, "Invalid Ticket ! Please Check-in again");

    //   string memory name;
    //   for (uint i = 0; i < destinations.length; ++i) {
    //     if(QRcode == destinations[i].index)
    //      // mapping (uint -> Destination) 
    //      {
    //       name = destinations[i].desName;
    //       for (uint j = 0; j < touristJourneys[msg.sender].length; j++) { // vòng lặp để check valid check-in
    //         if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(touristJourneys[msg.sender][j].desName))) {
    //           // uint256 timeLimit =  1 days;
    //           require(block.timestamp > (touristJourneys[msg.sender][j].arrivalDate + 1 days) , //yc thời gian check-in lại phải lớn hơn 1 ngày kể từ lần check-in trước đó
    //           "Check-in only 1 time per day.");
    //           break;
    //         }
    //       }
    //       isValid = true;
    //       noPeopleCheckIn[QRcode]++;
    //       destinationRates[QRcode].push(rate);
    //       touristJourneys[msg.sender].push(Journey(destinations[i].desName, block.timestamp, review, rate)); // thêm vào mảng touristJourney
    //       // isSuccess = tokenTransfer(); // chuyển điểm thưởng cho du khách khi check-in thành công
    //       break;
    //     }
    //   }
    //   require(isValid == true, "Invalid QRcode");
    //   // require(isSuccess== true,"Cannot transfer token");
    //   emit CheckIn(name, review, rate, ticketID);
    //   return true;
    // }
    function checkValidTicket(uint ticketID) public view returns(bool) {
      for (uint i = 0; i < tickets.length;i++) {
        if (ticketID == tickets[i].id) {
          if(tickets[i].isUsed == true) return false;
        }
      }
      return true;
    }
    event CheckIn(uint ticketID, string placeName);
    function checkIn(uint ticketID, uint placeID) public {
      //check ticketID
      bool validTicket = false;
      for (uint i = 0; i < tickets.length;i++) {
        if (ticketID == tickets[i].id) {
          require(!tickets[i].isUsed, "Ticket has used");
          validTicket = true;
          tickets[i].isUsed = true;
        }
      }
      string memory name;
      for (uint i = 0; i < destinations.length; i++) {
        if(placeID == destinations[i].index)
         {
          name = destinations[i].desName;
          noPeopleCheckIn[placeID]++;
          touristJourneys[msg.sender].push(Journey(destinations[i].desName, block.timestamp, "", 0, false)); // thêm vào mảng touristJourney
          break;
          }
    }
    emit CheckIn(ticketID, name);
}

  function review(uint arrDate, string memory comment, uint rate) public {
    string memory name;
    for (uint i = 0; i < touristJourneys[msg.sender].length; i++){
      if(arrDate == touristJourneys[msg.sender][i].arrivalDate) {
        require(touristJourneys[msg.sender][i].isReview == false, 'You had been reviewed this trip');
        touristJourneys[msg.sender][i].review = comment;
        touristJourneys[msg.sender][i].rate = rate;
        name = touristJourneys[msg.sender][i].desName;
        touristJourneys[msg.sender][i].isReview == true;
        break;
      }
    }
    for (uint i = 0; i < destinations.length; i++) {
      if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(destinations[i].desName))) {
        destinationReviews[destinations[i].index].push(comment);
        destinationRates[destinations[i].index].push(rate);
        noPeopleRate[destinations[i].index]++;
        break;
      }
    }
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