export const formatDateTime = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 날짜 비교를 위해 시간을 00:00:00으로 설정
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const compareYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

  // 시간 포맷팅
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12;
  const timeStr = `${ampm} ${hour12}:${minutes.toString().padStart(2, '0')}`;

  if (compareDate.getTime() === compareToday.getTime()) {
      return `오늘`;
  } else if (compareDate.getTime() === compareYesterday.getTime()) {
      return `어제`;
  } else {
      const year = date.getFullYear().toString().slice(2);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}년 ${month}월 ${day}일 · ${timeStr}`;
  }
};
