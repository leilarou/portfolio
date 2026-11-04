document.querySelectorAll('.slider').forEach(function(sl){
  var tr=sl.querySelector('.track'), btns=sl.querySelectorAll('.arr'), dots=sl.querySelectorAll('.dots span');
  function step(){var c=tr.children[0];return c?c.getBoundingClientRect().width+16:tr.clientWidth}
  function upd(){var max=tr.scrollWidth-tr.clientWidth-2;btns[0].disabled=tr.scrollLeft<=2;btns[1].disabled=tr.scrollLeft>=max;
    if(dots.length){var i=Math.round(tr.scrollLeft/step());dots.forEach(function(d,k){d.classList.toggle('on',k===i)})}}
  btns.forEach(function(b){b.addEventListener('click',function(){tr.scrollBy({left:step()*(+b.dataset.dir),behavior:'smooth'})})});
  tr.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});
  window.addEventListener('resize',upd); upd();
});

/* Les Heures Maison : distance de défilement = hauteur de la page - hauteur de la fenêtre */
(function(){
  function fit(){document.querySelectorAll('.lp-screen').forEach(function(sc){
    var img=sc.querySelector('img'); if(!img||!img.offsetHeight) return;
    var v=Math.max(0,img.offsetHeight-sc.clientHeight)+'px';
    if(img.style.getPropertyValue('--lp-shift')===v) return;
    img.style.setProperty('--lp-shift',v);
    /* relance l'animation pour qu'elle prenne la nouvelle distance */
    img.style.animation='none'; void img.offsetWidth; img.style.animation='';})}
  document.querySelectorAll('.lp-screen img').forEach(function(img){ img.addEventListener('load',fit); });
  if('ResizeObserver' in window){var ro=new ResizeObserver(fit);document.querySelectorAll('.lp-screen').forEach(function(sc){ro.observe(sc);ro.observe(sc.querySelector('img'));});}
  window.addEventListener('resize',fit); fit();
})();
