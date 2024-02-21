export const key = "AIzaSyDyOSIf7xpawGKMaFBZmRG6xblUfPGM1IA";

// export const YOUTUBE_API_DATA = `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=100&regionCode=IN&key=${key}&part=snippet,statistics`;

// export const YOUTUBE_API_DATA_1 =
// export const YOUTUBE_RELATED_CONTENT_API_DATA =
//   "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=random&type=video&key=AIzaSyCHZE-HFOoLXXMxUBwDS2V_LdO9LTi29jY&regionCode=IN";

export const YOUTUBE_LIVE_API_DATA = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=50&key=${key}`;

export const formattedTimeAgo = (dateString) => {
  function calculateDaysDifference(dateString) {
    const currentDate = new Date();
    const providedDate = new Date(dateString);

    const timeDifference = currentDate - providedDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  function formatTimeAgo(daysDifference) {
    if (daysDifference === 0) {
      const hoursDifference = Math.floor(
        (new Date() - new Date(dateString)) / (1000 * 60 * 60)
      );

      return `${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      } ago`;
    } else if (daysDifference < 30) {
      return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
    } else if (daysDifference < 365) {
      const months = Math.floor(daysDifference / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(daysDifference / 365);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  }

  const daysDifference = calculateDaysDifference(dateString);
  return formatTimeAgo(daysDifference);
};

export function formatNumber(number) {
  if (number >= 1000000000) {
    return Math.round(number / 1000000000) + "B";
  } else if (number >= 1000000) {
    return Math.round(number / 1000000) + "M";
  } else if (number >= 1000) {
    return Math.round(number / 1000) + "K";
  }
  return number.toString();
}

export const navLinkSvgs = {
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      focusable="false"
    >
      <g>
        <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path>
      </g>
    </svg>
  ),
  liked: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      focusable="false"
    >
      <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
    </svg>
  ),
  history: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      focusable="false"
    >
      <g>
        <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path>
      </g>
    </svg>
  ),
  subscriptions: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      focusable="false"
    >
      <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
    </svg>
  ),
  library: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      focusable="false"
    >
      <path d="m10 8 6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"></path>
    </svg>
  ),
};
