export const checkAuth=(decodedToken:any,method:any,pages:any)=>{
  const shouldOpen = (decodedToken?.Role === "super_admin") ||
                  (decodedToken?.Pages[pages[0]].all === true) ||
                  (decodedToken?.Pages[pages[0]][pages[1]][method] === true) ||
                  (decodedToken?.Pages[pages[0]][pages[1]][method] === false && decodedToken?.Pages[pages[0]].all === true) ||
                  (decodedToken?.Pages[pages[0]][pages[1]][method] === true && decodedToken?.Pages[pages[0]].all === false);

  return shouldOpen;
}