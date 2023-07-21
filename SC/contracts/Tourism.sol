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
        // destinations.push(Destination(1, unicode"Rừng Tràm Trà Sư"));
        // destinations.push(Destination(2, unicode"Hồ & Chùa Tà Pạ"));
        // destinations.push(Destination(3, unicode"Hồ Latina"));
        // destinations.push(Destination(4, unicode"Chùa Koh Kas"));
        // destinations.push(Destination(6, unicode"Bún cá Hiếu Thuận"));
        // destinations.push(Destination(5, unicode"Miếu Bà Chúa Xứ Núi Sam"));
        // destinations.push(Destination(7, unicode"Quán nướng 368 (Thành phố Long Xuyên)"));
        // destinations.push(Destination(8, unicode"Lẩu mắm Hiếu Miênn (Thành phố Long Xuyên)"));
        // destinations.push(Destination(9, unicode"Quán bò Tư Thiêng (Thành phố Châu Đốc)"));
        // destinations.push(Destination(10, unicode"Bánh bò Út Dứt (Huyện An Phú)"));
        // destinations.push(Destination(11, unicode"Little Sài Gòn Hostel (Little Saigon Hostel)"));
        // destinations.push(Destination(12, unicode"SANG NHU NGOC RESORT"));
        // destinations.push(Destination(13, unicode"Khách sạn châu tiến"));
        // destinations.push(Destination(14, unicode"Khách Sạn The Luxe Châu Đốc (The Luxe Hotel Chau Doc)"));
        // destinations.push(Destination(15, unicode"Dong Bao Hotel An Giang"));
        // destinations.push(Destination(16, unicode"Trại Cá Sấu Long Xuyên"));
        // destinations.push(Destination(17, unicode"Flyhigh Trampoline Park Vietnam"));
        // destinations.push(Destination(18, unicode"Thanh Long Water Park"));
        // destinations.push(Destination(19, unicode"Lotte Cinema Mỹ Bình Long Xuyên"));
        // destinations.push(Destination(20, unicode"Công viên Mỹ Thới"));
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
        tickets.push(Ticket(16, false));
        tickets.push(Ticket(17, false));
        tickets.push(Ticket(18, false));
        tickets.push(Ticket(19, false));
        tickets.push(Ticket(20, false));
        
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

    // struct Destination {
    //     uint256 index; // identifier
    //     string desName;
    // }

    struct Journey {
        uint placeId;
        uint256 arrivalDate;
        string review;
        uint rate;
        bool isReview;
        string title;
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
    // Destination[] private destinations;
    Tourist[] private tourists;

    mapping(address => Tourist) public touristIdentify; // tra cứu định danh du khách bằng địa chỉ ví
    mapping(address => Journey[]) public touristJourneys; // tra cứu hành trình dư khách bằng địa chỉ ví
    mapping(address => Service[]) private enterpriseService; // tra cứu các dịch vụ du lịch của doanh nghiệp qua địa chỉ ví doanh nghiệp
    
    mapping(address => Album[]) public touristAlbums; // tra cứu danh sách album qua địa chỉ ví của du khách
    mapping(address => mapping(uint=>Journey[])) public albumJourneys; //tra cứu hành trình của du khách qua địa chỉ ví và id album
    // mapping(address => mapping(uint=>Destination[])) public albumDestination;  // tra cứu địa điểm được thêm vào album qua địa chỉ ví và id album

    mapping(uint => uint) public noPeopleCheckIn; // số lượng người check in tại 1 địa điểm
    mapping(uint => uint) public noPeopleRate; // số lượng người rate tại 1 địa điểm

    mapping(uint => uint[]) public destinationRates; // số rate của một địa điểm
    // mapping(uint => string[]) public destinationReviews; // tất cả reviews của một địa điểm
    // mapping(uint => address[]) public touristReview; // nhung du khach review tai dia diem index
    // mapping(uint => uint256[]) public timeReview; // thoi gian du khach review tai dia diem index 
    mapping (uint => Journey[]) destinationJourney; 

    function getAllRates(uint placeid) public view returns(uint [] memory ) {
      return destinationRates[placeid];
    }  

    function getReviewsInPlace(uint placeid) public view returns(Journey [] memory ) {
      return destinationJourney[placeid]; 
    }
    // function getTouristReview(uint placeid) public view returns(address [] memory ) {
    //   return touristReview[placeid]; 
    // }
    // function getTimeReview(uint placeid) public view returns(uint256 [] memory ) {
    //   return timeReview[placeid]; 
    // }

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

    // event AddDestinationInAlbum(string nameDestination, string nameAlbum);
    // function addDestinationInAlbum(uint desIndex, uint albumId) public {
    //   string memory name; 
    //   for (uint i = 0; i < destinations.length; ++i) {  // thực hiện vòng lặp để tìm index của Destination trong mảng destinations
    //     if (desIndex == destinations[i].index) { 
    //       name = destinations[i].desName;
    //       albumDestination[msg.sender][albumId].push(destinations[i]); // thêm địa điểm vào album
    //       break;
    //     }
    //   }
    //   emit AddDestinationInAlbum(name, getNameAlbum(desIndex));
    // }

    event AddJourneyInAlbum(string AlbumName, Journey journey);
    function addAlbumJourney(uint placeId, uint albumId, uint256 date) public { // thêm địa điểm check-in vào album
      bool isSuccess = false;
      Journey memory journey;
      // for (uint i = 0; i < destinations.length; i++) { // thực hiện vòng lặp để lấy ra tên của destination thông qua index
      //   if(index == destinations[i].index) { 
      //     name = destinations[i].desName;
      //     break;
      //   }
      // }
      for (uint i = 0; i < touristJourneys[msg.sender].length; i++)
      {
        if ((placeId == touristJourneys[msg.sender][i].placeId) // check ID của destination và placeID trong Journey 
          && (touristJourneys[msg.sender][i].arrivalDate == date)) { // check date
          journey = Journey({
            placeId: placeId,
            arrivalDate: date,
            review: touristJourneys[msg.sender][i].review,
            rate: touristJourneys[msg.sender][i].rate,
            isReview: touristJourneys[msg.sender][i].isReview,
            title: ""
            });
          albumJourneys[msg.sender][albumId].push(journey); //thêm Journey vào mảng albumJourneys có albumId của du khách);    
            isSuccess = true;
            break;
        }
      }
      require(isSuccess, "This Destination was not checkin");
      emit AddJourneyInAlbum(getNameAlbum(albumId),journey);
    }

    // function getAlbumNotCheckIn(uint id) public view returns (Destination[] memory) {
    //   return albumDestination[msg.sender][id];
    // }

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
    function checkValidTicket(uint ticketID) public view returns(bool) {
      for (uint i = 0; i < tickets.length;i++) {
        if (ticketID == tickets[i].id) {
          if(tickets[i].isUsed == true) return false;
        }
      }
      return true;
    }
    event CheckIn(uint ticketId, uint placeId);
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
      noPeopleCheckIn[placeID]++;
      touristJourneys[msg.sender].push(Journey(placeID, block.timestamp, "", 0, false, "")); // thêm vào mảng touristJourney
      emit CheckIn(ticketID, placeID);
    }

  function review(uint placeId, uint arrDate, string memory comment, uint rate, string memory title) public {
    for (uint i = 0; i < touristJourneys[msg.sender].length; i++){
      if(arrDate == touristJourneys[msg.sender][i].arrivalDate) {
        require(touristJourneys[msg.sender][i].isReview == false, 'You had been reviewed this trip');
        touristJourneys[msg.sender][i].review = comment;
        touristJourneys[msg.sender][i].rate = rate;
        touristJourneys[msg.sender][i].isReview = true;
        touristJourneys[msg.sender][i].title = title; 
        destinationJourney[placeId].push(touristJourneys[msg.sender][i]);
        break;
      }
    } 
        destinationRates[placeId].push(rate);
        noPeopleRate[placeId]++;
    }

    // function tokenTransfer() private returns (bool) {
    //   return erc20Token.transfer(msg.sender, 1000000000000000000);
    // }

    function getAllJourney () public view returns(Journey[] memory) {
      return touristJourneys[msg.sender];
    }
    

    // function getAllDestination() public view returns (Destination[] memory) {
    //     return destinations;
    // }

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

    // function validIndex(uint index) private view returns(bool) {
    //     for (uint i = 0; i < destinations.length;++i){
    //       if(index == destinations[i].index) return false;
    //     }
    //     return true;
    // }

    // function addDestination(uint index, string memory name) external onlyAdmin {
    //   require(validIndex(index) == true, "Index has been already existed"); 
    //   destinations.push(Destination(index, name));  
    // }

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