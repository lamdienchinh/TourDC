export const convertTimestampToVietnamTime = (timestamp) => {
  // Tạo đối tượng Date với timestamp
  const date = new Date(timestamp * 1000); // Đảo ngược timestamp về millisecond

  // Chuyển đổi thành ngày giờ Việt Nam
  const vietnamTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  // Trả về chuỗi ngày giờ Việt Nam
  return vietnamTime.toString();
};
