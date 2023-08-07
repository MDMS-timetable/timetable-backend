const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const qs = require("qs");

const kakao = {
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: process.env.REDIRECTURL,
};

router.get("/auth/kakao", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email`;
  res.redirect(kakaoAuthURL);
});

router.get("/auth/kakao/callback", async (req, res) => {
  //axios>>promise object
  try {
    //access토큰을 받기 위한 코드
    token = await axios({
      //token
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: "authorization_code", //특정 스트링
        client_id: kakao.clientID,
        client_secret: kakao.clientSecret,
        redirectUri: kakao.redirectUri,
        code: req.query.code, //결과값을 반환했다. 안됐다.
      }), //객체를 string 으로 변환
    });
  } catch (err) {
    res.json(err.data);
  }
  //access토큰을 받아서 사용자 정보를 알기 위해 쓰는 코드
  let user;
  try {
    console.log(token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
    user = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      }, //헤더에 내용을 보고 보내주겠다.
    });
  } catch (e) {
    res.json(e.data);
  }
  console.log(user);

  req.session.kakao = user.data;
  //req.session = {['kakao'] : user.data};

  res.send("success");
});

router.get("/auth/info", (req, res) => {
  let { nickname, profile_image } = req.session.kakao.properties;
  //   res.render("info", {
  //     nickname,
  //     profile_image,
  //   });
  res.send(nickname, profile_image);
});

module.exports = router;
