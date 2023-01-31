import React, { useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userSlice from "../reducers/user";

function KakaoLogin() {
  const params = new URL(document.location).searchParams;
  const kakao_code = params.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getKakaoToken = () => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${kakao_code}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          dispatch(userSlice.actions.login({ token: data.access_token }));
          window.Kakao.Auth.setAccessToken(data.access_token);
          navigate("/");
        } else {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    if (!window.location.search) return;
    getKakaoToken();
  }, []);

  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
