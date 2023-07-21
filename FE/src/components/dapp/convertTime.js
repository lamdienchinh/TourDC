export const convertTimestampToVietnamTime = (timestamp) => {
  // Tạo đối tượng Date với timestamp
  const convertDate = new Date(timestamp * 1000); // Đảo ngược timestamp về millisecond

  // Chuyển đổi thành ngày giờ Việt Nam
  const vietnamTime = new Date(convertDate.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const dateObj = new Date(vietnamTime);
  // Lấy các thông tin ngày, tháng và năm từ đối tượng Date
  const day = dateObj.toLocaleString('en', { weekday: 'short' });
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString('en', { month: 'short' });
  const year = dateObj.getFullYear(); // 2023
  const hours = dateObj.getHours(); 
  const minutes = dateObj.getMinutes(); 
  const seconds = dateObj.getSeconds();
  // Tạo chuỗi mới theo định dạng "Fri, 21-Jul-2023"
  const formattedString = `${day}, ${date}-${month}-${year} ${hours}:${minutes}:${seconds}`; 
  return formattedString;
};
