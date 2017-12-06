const { getRemember, setRemember, getIP } = require('./js/data/db')
//TODOfor autologin

const hostName = require('os').hostname()
const token = getRemember()
const ip = getIP()

if (token != null && ip != null) {
  fetch("http://" + ip + ":3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify(token)
  })
    .then(res => res.json())
    .then(res => {

      if (res.status == 202) {

        setUser(res.user)
        //user, token, device
        const token = navigator.platform
        setRemember({ user: res.user._id, token: res.token, device })
        ipcRenderer.send("logIn", true)

      }
    })
    .catch(error => { });
}