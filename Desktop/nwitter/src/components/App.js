import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // 유저의 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // 유저상태에 변화가 있을 때 알아차리게 함
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: args => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      // 만약 init이 false이라면 router를 숨김
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    // console.log(authService.currentUser.displayName); ==> 덩치가 매우 큼
    // setUserObj(authService.currentUser);
    // setUserObj({ displayName: "BS" });
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: args => user.updateProfile(args)
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; Nwitter {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
