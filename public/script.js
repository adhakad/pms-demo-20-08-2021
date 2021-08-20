$(document).ready(function(){
  getdata();
  function getdata(){
     $.ajax({
      type : "GET",
      url : "/get",
      dataType:'json',
      success:function(response){
        if(response.msg=='success'){
          var  student_id = response.student_id;
          var  student_name = response.student_name;
/************************************************************************************************************/

const socket = io().connect("/");
const peer = new Peer(student_id, {
  secure: true,
  host: "spanion-video-chat-peer.herokuapp.com",
});

const peers = {};
const newVideoGrid = document.getElementById("newVideoGrid");
const hostVideoGrid = document.getElementById("hostVideoGrid");
const joinVideoGrid = document.getElementById("joinVideoGrid");

const conNewVideoGrid = document.getElementById("conNewVideoGrid");
const conNewVideo_Text = document.createElement("div");
const conNewVideo_Item = document.createElement("div");
conNewVideo_Item.classList.add("conNewVideo_item");
conNewVideo_Text.classList.add("conNewVideo_name");
conNewVideo_Item.append(conNewVideo_Text)


const mediaConfig = {
  video: true,
  audio: true,
};

peer.on("open", (id) => {
  
  socket.emit("join-room", ROOM_ID, { id, name: student_name });
  navigator.mediaDevices
    .getUserMedia(mediaConfig)
    .then((stream) => {
    if(TEACHER_ID){
      const newVideo = document.createElement("video");
      newVideoStream(newVideo, stream);
    }else{
      const hostVideo = document.createElement("video");
      hostVideoStream(hostVideo, stream);
    }
    
    peer.on("call", (call) => { 
      call.answer(stream);
      const joinVideo = document.createElement("video");
      if(TEACHER_ID){
        call.on("stream", (userStream) => {
          const userId = call.peer;
          if(userId==TEACHER_ID){
            joinHostVideoStream(joinVideo, userStream);
          }
        });
      }
    });
    if(TEACHER_ID==!id){
      socket.on("user-connected", ({ id, name }) => {
        connectToNewUser({ id, name }, stream);
      });
    }
  })

  .catch((err) => {
    document.write(err);
  });
});

socket.on("user-disconnected", ({ id }) => {
  const video = document.getElementById(id);
  if (video) {
    video.parentElement.remove();
  }
  if (peers[id]) peers[id].close();
});

function connectToNewUser({ id, name }, stream) {
  const call = peer.call(id, stream, { metadata: { name: student_name } });
  const conNewVideo = document.createElement("video");
      call.on("stream", (userStream) => {
        conNewVideoStream(conNewVideo, userStream, id, name);
      });
  call.on("close", () => {
    conNewVideo.remove();
  });
  peers[id] = call;
}

if(TEACHER_ID){
  function newVideoStream(newVideo, stream) {
    newVideo.srcObject = stream;
    newVideo.addEventListener("loadedmetadata", () => {
      newVideo.play();
    });
    newVideoGrid.append(newVideo);
  }
}else{
  function hostVideoStream(hostVideo, stream) {
    hostVideo.srcObject = stream;
    hostVideo.addEventListener("loadedmetadata", () => {
      hostVideo.play();
    });
    hostVideoGrid.append(hostVideo);
  }
}
function joinHostVideoStream(joinVideo, stream) {
  joinVideo.srcObject = stream;
  joinVideo.addEventListener("loadedmetadata", () => {
    joinVideo.play();
  });
  joinVideoGrid.append(joinVideo);
}

function conNewVideoStream(conNewVideo, stream,id, name) {
  conNewVideo.srcObject = stream;
  conNewVideo.addEventListener("loadedmetadata", () => {
    conNewVideo.play();
  });
  conNewVideo.setAttribute("id", id);
  const clonedItem = conNewVideo_Item.cloneNode(true);
  clonedItem.children[0].innerHTML = name;
  clonedItem.append(conNewVideo);
  conNewVideoGrid.append(clonedItem);
  const nodes = document.querySelectorAll(".conNewVideo_item") || [];
  nodes.forEach((node) => {
    if (node.children && node.children.length < 2) {
      node.remove();
    }
  });
}

/************************************************************************************************************/
  
      }
   },
          error:function(response){
              alert('server error');
          }
      });
    
  } 
});
