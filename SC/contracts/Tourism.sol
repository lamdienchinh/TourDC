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
        require(verify(_signer, _to, _amount, _message, _nonce, signature), 'Invalid Signature');
        _mint(_to, _amount * (10 ** 18));
    }

    function _exchangeReward(
        address _signer,
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce,
        bytes memory signature
    )  public {
        require(verify(_signer, _to, _amount, _message, _nonce, signature), 'Invalid Signature');
        _burn(_to, _amount * (10 ** 18));
    } 
}

contract TouristConTract is ERC20WithAutoMinerReward {
    constructor()  {
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
    struct Journey {
        uint tripId;
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
    // Voucher private vouchers;
    Ticket[] private tickets;
    // Destination[] private destinations;
    Tourist[] private tourists;

    uint private tripID;
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

    event ExchangeVoucher(string voucherID, uint256 amount);
    function exchangeVoucher(string memory voucherID, address _signer,address _to,uint _amount,string memory _message,uint _nonce,bytes memory signature) public {
        require(balanceOf(msg.sender) >= _amount, 'You not have enough money to purchase');
        _exchangeReward(_signer, _to, _amount, _message, _nonce, signature);
        emit ExchangeVoucher(voucherID, _amount);
    } 
    function getAllRates(uint placeid) public view returns(uint [] memory ) { // Lấy tất cả rates của 1 place theo placeID
      return destinationRates[placeid];
    }  

    function getReviewsInPlace(uint placeid) public view returns(Journey [] memory ) { // Lấy tất cả Reviews của một place theo placeID
      return destinationJourney[placeid]; 
    }
    
    function getJourneyWithID(uint[] memory idTrip) public view returns (Journey[] memory) { // Lấy ra một mảng các Journey theo list IDtrip
      Journey[] memory lstJourney = new Journey[](idTrip.length);
      uint256 count = 0;

      for (uint256 i = 0; i < idTrip.length; i++) {
          for (uint256 j = 0; j < touristJourneys[msg.sender].length; j++) {
              if (idTrip[i] == touristJourneys[msg.sender][j].tripId) {
                  // Thêm vào mảng lstJourney
                  lstJourney[count] = touristJourneys[msg.sender][j];
                  count++;
                  break;
              }
          }
      }
      return lstJourney;
    }

    event CreateAlbum(uint _id, string _name);
    function createAlbum(uint _id,string memory _name) public {
        touristAlbums[msg.sender].push(Album(_id, _name)); // thêm vào mảng touristAlbums của địa chỉ người dùng
        emit CreateAlbum(_id, _name);
    }

    // function getNameAlbum(uint _id) private view returns (string memory name) {
    //   for(uint i = 0; i < touristAlbums[msg.sender].length; i++) {
    //     if(_id == touristAlbums[msg.sender][i].id) {
    //       return touristAlbums[msg.sender][i].name;
    //     }
    //   }
    // }
    // event AddJourneyInAlbum(string AlbumName, Journey journey);
    // function addAlbumJourney(uint placeId, uint albumId, uint256 date) public { // thêm địa điểm check-in vào album
    //   bool isSuccess = false;
    //   Journey memory journey;
    //   for (uint i = 0; i < touristJourneys[msg.sender].length; i++)
    //   {
    //     if ((placeId == touristJourneys[msg.sender][i].placeId) // check ID của destination và placeID trong Journey 
    //       && (touristJourneys[msg.sender][i].arrivalDate == date)) { // check date
    //       journey = Journey({
    //         tripId: touristJourneys[msg.sender][i].tripId,
    //         placeId: placeId,
    //         arrivalDate: date,
    //         review: touristJourneys[msg.sender][i].review,
    //         rate: touristJourneys[msg.sender][i].rate,
    //         isReview: touristJourneys[msg.sender][i].isReview,
    //         title: ""
    //         });
    //       albumJourneys[msg.sender][albumId].push(journey); //thêm Journey vào mảng albumJourneys có albumId của du khách);    
    //         isSuccess = true;
    //         break;
    //     }
    //   }
    //   require(isSuccess, "This Destination was not checkin");
    //   emit AddJourneyInAlbum(getNameAlbum(albumId),journey);
    // // }

    // function getAlbumCheckIn(uint id) public view returns (Journey[] memory){
    //   return albumJourneys[msg.sender][id];
    // }

    // event AddTourist(string name, uint256 age);
    // function register(string memory name, uint256 age) public {
    //     // Hàm để add một du khách mới
    //     Tourist memory newTourist = Tourist(name, age, true, msg.sender);
    //     touristIdentify[msg.sender].name = name; // lưu vào tên
    //     touristIdentify[msg.sender].age = age; // lưu vào tuổi
    //     touristIdentify[msg.sender].touristAddress = msg.sender;
    //     if (!touristIdentify[msg.sender].signup) {
    //         // nếu đăng nhập lần đầu tiên sẽ được thêm vào mảng
    //         tourists.push(newTourist); // Thêm vào mảng
    //         touristIdentify[msg.sender].signup = true; // set true cho signup
    //     }
    // emit AddTourist(name, age);
    // }

    function getBalance(address add) public view returns (uint256) {
      // return erc20Token.balanceOf(add);
    }
    function checkValidTicket(uint ticketID) public view returns(bool) { // check xem một tấm vé đã được dùng hay chưa
      for (uint i = 0; i < tickets.length;i++) {
        if (ticketID == tickets[i].id) {
          if(tickets[i].isUsed == true) return false;
        }
      }
      return true;
    }
    event CheckIn(uint ticketId, uint placeId);
    function checkIn(uint ticketID, uint placeID) public { // Hàm thực hiện việc check-in của du khách
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
      tripID++;
      touristJourneys[msg.sender].push(Journey(tripID,placeID, block.timestamp, "", 0, false, "")); // thêm vào mảng touristJourney
      emit CheckIn(ticketID, placeID);
    }
  event Review(uint placeId, uint idTrip, string comment, uint rate, string title);
  function review(uint placeId, uint idTrip, string memory comment, uint rate, string memory title) public { // hàm thực hiện cho việc review của du khách
    for (uint i = 0; i < touristJourneys[msg.sender].length; i++){ // vòng lặp để lấy ra Journey tương ứng với tripID
      if(idTrip == touristJourneys[msg.sender][i].tripId) { 
        require(touristJourneys[msg.sender][i].isReview == false, 'You had been reviewed this trip'); // yêu cầu là phải chưa review lần nào
        touristJourneys[msg.sender][i].review = comment; // thêm comment vào cho Journey có tripID tương ứng
        touristJourneys[msg.sender][i].rate = rate; // thêm rate vào cho Journey có tripID tương ứng
        touristJourneys[msg.sender][i].isReview = true; // set lại biến isReview thành true
        touristJourneys[msg.sender][i].title = title;  // set title cho journey có tripID tương ứng
        destinationJourney[placeId].push(touristJourneys[msg.sender][i]); // Thêm vào mảng các Journey của địa danh có placeID tương ứng
        break;
      }
    } 
        destinationRates[placeId].push(rate);// them vào mảng các đánh giá của địa danh tương ứng
        noPeopleRate[placeId]++;
        emit Review(placeId, idTrip, comment, rate, title);
    }

    function getAllJourney () public view returns(Journey[] memory) { // lấy ra tất cả hành trình của du khách
      return touristJourneys[msg.sender];
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

    function validAddIDTicket(uint256 id) public view onlyAdmin returns (bool) { // check xem thử là idticket hợp lệ không 
      for (uint i = 0; i < tickets.length;i++) {
        if (id == tickets[i].id) return false;
      }
      return true;
    }
    function addTicket(uint256 id) external onlyAdmin {
      require(validAddIDTicket(id), "This ID already existed");
      tickets.push(Ticket(id, false)); 
    }  
}
