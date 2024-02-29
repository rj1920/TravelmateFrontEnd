//isLoggedIn=>

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

//doLogin=> data=>set to localstorage

export const doLogin = (data,next) => {
  localStorage.setItem("data", JSON.stringify(data));

  next()
};

//doLogout=> remove from localStorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  localStorage.removeItem("cities");
  next()
};

//get currentUser
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return undefined;
  }
};

export const setId=()=>{
  return (JSON.parse(localStorage.getItem("data")).user).userId;

}

export const isAdmin = () => {
  if (isLoggedIn()) {
    return (JSON.parse(localStorage.getItem("data")).user.role === 'ROLE_ADMIN') ? true : false;
  } else {
    return false;
  }
};

export const getToken=()=>{
  if(isLoggedIn()){
    return JSON.parse(localStorage.getItem("data")).token
  }else{
    return null;
  }
}
