// Function to generate a random name
export function generateRandomName() {
  var firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Helen",
  ];
  var lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
  ];

  var randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  var randomLastNameIndex = Math.floor(Math.random() * lastNames.length);

  var randomFirstName = firstNames[randomFirstNameIndex];
  var randomLastName = lastNames[randomLastNameIndex];

  return randomFirstName + " " + randomLastName;
}

export const videoId = (video) => {
  return typeof video.id === "object"
    ? video.id.videoId !== undefined
      ? video.id.videoId
      : video.id.id
    : video.snippet.resourceId !== undefined
    ? video.snippet.resourceId.videoId
    : video.id;
};

export const infiniteScroll = (
  currentPageInfo,
  videosInfoList,
  setLoading,
  setPageToken,
  setResultsPerPage,
  setEndOfPage,
  maxResult
) => {
  const handleInfiniteScroll = () => {
    // console.log(currentPageInfo);
    if (currentPageInfo.pageInfo?.totalResults === videosInfoList.length) {
      setEndOfPage(true);
      return;
    }

    const isScrollNearBottom =
      document.documentElement.scrollTop + window.innerHeight + 1 >=
      document.documentElement.scrollHeight;

    if (
      currentPageInfo.pageInfo?.totalResults !== videosInfoList.length &&
      isScrollNearBottom
    ) {
      setLoading(true);
      setPageToken(currentPageInfo.nextPageToken);

      const remainingResults =
        currentPageInfo.pageInfo?.totalResults - videosInfoList.length;
      if (maxResult > remainingResults) {
        setResultsPerPage(remainingResults);
      }
    }
  };

  const handleScroll = () => {
    if (Object.keys(currentPageInfo).length !== 0) {
      handleInfiniteScroll();
    }
  };

  const debounce = (handleScroll, delayTime) => {
    let timeOut;
    return () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        handleScroll();
      }, delayTime);
    };
  };

  const debouncedScroll = debounce(handleScroll, 200);
  debouncedScroll();
};
