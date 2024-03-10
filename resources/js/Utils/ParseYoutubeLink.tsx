// parse youtube link
const parseYoutubeLink = (link: string) => {
  const linkArr = link.split('/');
  const videoId = linkArr[linkArr.length - 1];
  return `https://www.youtube.com/embed/${videoId}`;
}


export { parseYoutubeLink }