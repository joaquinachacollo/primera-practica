const socket = io();

let user;
let chatbox = document.getElementById("chatbox");

Swal.fire({
  title: "identificate",
  input: "text",
  inputValidator: (value) => {
    return !value && "ingrese nombre de usuario";
  },
  allowOutsideClick: false,
  toast: true,
}).then((res) => {
  user = res.value;
  socket.emit("authenticated", user);
});

chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatbox.value.trim() });
      chatbox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  if (!user) return;

  let log = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((message) => {
    messages += `${message.user} dice: ${message.message} <br/>`;
  });
  log.innerHTML = messages;
});

socket.on("newUserConnnected", (data) => {
  if (!user) return;
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${data} se ha unido al chat`,
    icon: "success",
  });
});
