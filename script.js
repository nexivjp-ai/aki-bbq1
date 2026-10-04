const start=Date.parse('2026-10-17T15:00:00+09:00');
const end=Date.parse('2026-10-18T00:00:00+09:00');
function remaining(now){let diff=Math.max(0,Math.floor((start-now)/1000));return {days:Math.floor(diff/86400),hours:Math.floor(diff%86400/3600),minutes:Math.floor(diff%3600/60),seconds:diff%60};}
function update(){const now=Date.now();const values=remaining(now);for(const key of Object.keys(values))document.getElementById(key).textContent=key==='days'?values[key]:String(values[key]).padStart(2,'0');document.getElementById('count-label').textContent=now>=end?'ご参加ありがとうございました':now>=start?'本日の開催時刻を迎えました':'開催まで';}
update();setInterval(update,1000);
const photoButtons=[...document.querySelectorAll('[data-photo]')];
const photoDialog=document.getElementById('photo-dialog');
let photoIndex=0;
function showPhoto(index){photoIndex=(index+photoButtons.length)%photoButtons.length;const source=photoButtons[photoIndex].querySelector('img');const large=document.getElementById('photo-large');large.src=source.src;large.alt=source.alt;document.getElementById('photo-position').textContent=`${photoIndex+1} / ${photoButtons.length}`;}
photoButtons.forEach((button,index)=>button.addEventListener('click',()=>{showPhoto(index);photoDialog.showModal();document.body.style.overflow='hidden';}));
function closePhoto(){photoDialog.close();}
document.getElementById('photo-close').addEventListener('click',closePhoto);
document.getElementById('photo-prev').addEventListener('click',()=>showPhoto(photoIndex-1));
document.getElementById('photo-next').addEventListener('click',()=>showPhoto(photoIndex+1));
photoDialog.addEventListener('close',()=>{document.body.style.overflow='';photoButtons[photoIndex].focus();});
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog){const box=photoDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closePhoto();}});
photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(photoIndex-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(photoIndex+1);}});
