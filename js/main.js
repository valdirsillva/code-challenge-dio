    
 let author = document.querySelector("#autor");
 let authorImage = document.querySelector("#image-author");
 let source = document.createElement('source');
 let titleVideo = document.querySelector('.title');
 let containerVideo = document.querySelector('#carregar-video');

 let handleIconClick = document.querySelector('.onLike');
 let videoid = document.querySelector('.videoid');

 window.addEventListener("load", function() {
   const BUTTON_PLAY = 'images/play.png';
   const SERVICE_API = 'http://localhost/tube-move-php/api/';

   async function getVideos() {

      return await
      fetch(`${SERVICE_API}`)
         .then((response) => response.json())
         .catch(err => console.log(err))
   }

   async function mapper() {
      const allVideos = await getVideos();
      allVideos.map(video => {
         findAll(video);
      });
   }

   async function find() {
      const currentVideo = await getVideos();

      let videoFirst = document.createElement('video');
      let {
         id,
         titulo,
         video,
         visualizacoes,
         data_publicacao,
         autor,
         imagem
      } = currentVideo;

      author.textContent = autor;
      authorImage.src = imagem;

      titleVideo.textContent = titulo;

      videoFirst.src = video;
      videoFirst.setAttribute("width", "100%");
      videoFirst.setAttribute("height", "315px");
      videoFirst.setAttribute("controls", "");
      videoFirst.setAttribute("id", id);
      videoFirst.setAttribute("controlsList", "nodownload");

      videoFirst.appendChild(source);
      containerVideo.appendChild(videoFirst);
   }


   function findAll(video) {

      let output = `
               <div class="movie">
                  <div class="thumbnail-video">
                  <video>
                     <source src=${video.video} type="video/mp4"  >
                  </video>

                     <div class="details-video">
                     <span>${video.titulo}</span>
                     <small>${video.visualizacoes} visualizações</small>
                     </div>
                  </div>

                  <div class="frame">
                     <div class="play" >
                        <img src='${BUTTON_PLAY}' 
                        onclick='getUrlVideo(this)' 
                        id=${video.id}
                        name=${video.video} 
                        title='${video.titulo}' 
                        alt='${video.autor}' />
                     </div>
                  </div>
               </div>`;
      document.querySelector("#items").innerHTML += output;
   }

   find();
   mapper();

 });



 function getUrlVideo() {

   const VIDEO = {
      id: event.target.id,
      title: event.target.title,
      autor: event.target.alt,
      uniformResourceLocator: event.target.name
   }

   // remove o elemento  <video/> do DOM
   removeComponent(containerVideo);

   // cria um novo elemento no DOM
   let video = document.createElement('video');

   video.setAttribute("width", "100%");
   video.setAttribute("height", "315px");
   video.setAttribute("controls", "");
   video.setAttribute("id", VIDEO.id);
   video.setAttribute("controlsList", "nodownload");

   source.src = VIDEO.uniformResourceLocator;
   source.type = 'video/mp4';

   titleVideo.textContent = VIDEO.titulo;
   author.textContent = VIDEO.autor;

   video.appendChild(source);
   containerVideo.appendChild(video);
 }

 function removeComponent(containerVideo) {
   // caso haja um filho um nó filho no elemento <video/> remova-o do DOM
   while (containerVideo.firstChild) {
      containerVideo.removeChild(containerVideo.firstChild);
   }
 }
