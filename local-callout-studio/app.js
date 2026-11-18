'use strict';
const E=window.CalloutEngine,$=id=>document.getElementById(id);
let project,selected=-1,mode='move',history=[],drag=null,busy=false;
const defaultStyle={color:'#6CB238',diameter:40,lineWidth:6,margin:80};
const demoItems=[
  ['Date range presets',[-40,85],[45,85]],['Search field',[590,-30],[590,85]],
  ['Status filter',[827,-30],[827,85]],['Clear filters',[1064,85],[960,85]],
  ['Task table',[1064,300],[1004,300],[20,130,984,340]],['Add task button',[1064,26],[942,26]],
  ['Rows per page',[925,591],[925,525]],['Pagination controls',[270,591],[270,525]]
].map(([label,badge,target,box])=>({label,badge,target,...(box?{box}:{})}));
function message(text,error=false){$('status').textContent=text;$('status').classList.toggle('error',error);}
function snapshot(){history.push(E.clone(project));if(history.length>25)history.shift();}
function syncStyle(){for(const key of ['color','diameter','lineWidth','margin'])$(key).value=project.style[key];}
function render(list=true){
  $('stage').innerHTML=E.svg(project,selected,true);
  if(drag){const s=$('stage').querySelector('svg'),b=drag.bounds;s.setAttribute('viewBox',`${b.x} ${b.y} ${b.width} ${b.height}`);s.setAttribute('width',b.width);s.setAttribute('height',b.height);}
  $('fileInfo').textContent=`${project.name} · ${project.width} × ${project.height} px`;
  $('count').textContent=`${project.items.length} callouts`;
  $('undo').disabled=!history.length;$('remove').disabled=selected<0;$('label').disabled=selected<0;
  if(list){
    $('label').value=selected>=0?project.items[selected].label:'';
    $('callouts').replaceChildren();
    project.items.forEach((i,n)=>{const b=document.createElement('button'),num=document.createElement('span'),label=document.createElement('span');num.className='number';num.textContent=n+1;label.textContent=i.label;b.append(num,label);b.setAttribute('aria-pressed',String(n===selected));b.onclick=()=>{selected=n;setMode('move');render();};$('callouts').append(b);});
  }
}
function setMode(value){mode=value;$('stage').dataset.mode=mode;for(const m of ['move','point','box'])$(m+'Mode').setAttribute('aria-pressed',String(m===mode));$('instruction').textContent=mode==='point'?'Click the image target. A numbered marker is placed in the nearest margin.':mode==='box'?'Drag around an image region to add an outline and numbered callout.':'Drag a number or its endpoint. Click a number to select it.';}
function demoPreset(){return {version:1,width:1024,height:561,style:E.clone(defaultStyle),items:E.clone(demoItems)};}
function applyPreset(p){E.validate(p,false);snapshot();const scaled=E.scaled(p,project.width,project.height);project.items=scaled.items;project.style=scaled.style;selected=-1;syncStyle();render();message('Preset applied. Check target alignment before exporting.');}
function loadExample(){if(project)snapshot();project={version:1,name:'Project-tracker-demo',image:window.DEMO_SAMPLE,width:1024,height:561,style:E.clone(defaultStyle),items:E.clone(demoItems)};selected=-1;syncStyle();setMode('move');render();message('All 8 demo callouts are ready. Export now, or drag markers to adjust.');}
function safeName(s){return String(s||'image').replace(/[<>:"/\\|?*\x00-\x1f]/g,'_').replace(/[. ]+$/,'').slice(0,100)||'image';}
function download(blob,name){const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
function jsonDownload(value,name){download(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),name);}
async function task(fn){if(busy)return;busy=true;document.body.setAttribute('aria-busy','true');try{await fn();}catch(err){message(err.message||String(err),true);}finally{busy=false;document.body.removeAttribute('aria-busy');}}
async function jsonFile(file){if(file.size>70*1024*1024)throw Error('Project file too large.');return JSON.parse(await file.text());}
function choose(button,input,handler){$(button).onclick=()=>$(input).click();$(input).onchange=()=>{const files=[...$(input).files];$(input).value='';if(files.length)task(()=>handler(files));};}
choose('openImage','imageFile',async([file])=>{const data=await E.loadImage(file);snapshot();project={version:1,...data,style:E.clone(project.style),items:[]};delete project.note;selected=-1;render();message(data.note||'Image loaded. Add targets or apply a saved layout.');});
choose('loadProject','projectFile',async([file])=>{const p=E.validate(await jsonFile(file));const size=await E.imageSize(p.image);if(size.width!==p.width||size.height!==p.height)throw Error('Saved image dimensions do not match the project.');snapshot();project=p;selected=-1;syncStyle();render();message('Project restored with editable callouts.');});
choose('loadPreset','presetFile',async([file])=>applyPreset(await jsonFile(file)));
choose('batch','batchFiles',async files=>{
  if(!project.items.length)throw Error('Add callouts or apply a preset before batch export.');
  if(files.length>40||files.reduce((n,f)=>n+f.size,0)>150*1024*1024)throw Error('Batch limit: 40 files, 150 MB total.');
  const preset=E.clone(project),scale=Number($('scale').value),out=[];let total=0;
  for(let n=0;n<files.length;n++){
    message(`Rendering ${n+1} of ${files.length}: ${files[n].name}`);
    const data=await E.loadImage(files[n]),p={...E.scaled(preset,data.width,data.height),...data};
    const blob=await E.png(p,scale);total+=blob.size;if(total>200*1024*1024)throw Error('Batch output exceeds 200 MB. Choose fewer files.');
    out.push({name:`${String(n+1).padStart(2,'0')}-${safeName(data.name)}-callouts.png`,data:new Uint8Array(await blob.arrayBuffer())});
  }
  download(E.zip(out),'annotated-images.zip');message(`Exported ${out.length} PNGs in one ZIP. Batch positions assume the same screen layout.`);
});
$('saveProject').onclick=()=>{jsonDownload(project,safeName(project.name)+'.callouts.json');message('Project saved, including the source image and editable callouts.');};
$('savePreset').onclick=()=>{const p=E.clone(project);delete p.image;delete p.name;jsonDownload(p,'callout-layout.preset.json');message('Layout saved. Load it on future screenshots of the same screen.');};
$('sample').onclick=loadExample;$('demoPreset').onclick=()=>applyPreset(demoPreset());
$('png').onclick=()=>task(async()=>{message('Rendering PNG…');const p=E.clone(project);download(await E.png(p,Number($('scale').value)),safeName(p.name)+'-callouts.png');message('PNG exported. The source image was not modified.');});
$('svg').onclick=()=>{download(new Blob([E.svg(project)],{type:'image/svg+xml'}),safeName(project.name)+'-callouts.svg');message('SVG exported with vector callouts and an embedded screenshot.');};
$('undo').onclick=()=>{if(history.length){project=history.pop();selected=-1;syncStyle();render();message('Previous edit restored.');}};
$('remove').onclick=()=>{if(selected<0)return;snapshot();project.items.splice(selected,1);selected=-1;render();message('Callout removed and numbers updated. Undo restores it.');};
$('label').onchange=()=>{if(selected<0)return;snapshot();project.items[selected].label=$('label').value.slice(0,200);render();};
for(const m of ['move','point','box'])$(m+'Mode').onclick=()=>setMode(m);
for(const key of ['color','diameter','lineWidth','margin'])$(key).onchange=()=>{
  const value=key==='color'?$(key).value:Number($(key).value),next=E.clone(project);next.style[key]=value;
  try{E.validate(next);snapshot();project=next;render();}catch(e){syncStyle();message(e.message,true);}
};
function svgPoint(event){const svg=$('stage').querySelector('svg'),p=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());return [Math.round(p.x),Math.round(p.y)];}
const inImage=([x,y])=>x>=0&&y>=0&&x<=project.width&&y<=project.height;
function marginBadge([x,y]){
  const m=project.style.margin*.58,choices=[[x,-m],[project.width+m,y],[x,project.height+m],[-m,y]];
  const distances=[y,project.width-x,project.height-y,x];return choices[distances.indexOf(Math.min(...distances))];
}
$('stage').addEventListener('pointerdown',event=>{
  if(busy||event.button!==0||!event.target.closest('svg'))return;
  const point=svgPoint(event),handle=event.target.closest('[data-handle]');
  if(mode==='move'&&handle){selected=Number(handle.dataset.index);snapshot();drag={type:handle.dataset.handle,index:selected,bounds:E.bounds(project),start:point,original:[...project.items[selected][handle.dataset.handle]]};render();}
  else if(mode==='point'&&inImage(point)){
    if(project.items.length>=200)return message('Maximum 200 callouts.',true);
    snapshot();project.items.push({label:`Element ${project.items.length+1}`,target:point,badge:marginBadge(point)});selected=project.items.length-1;render();message('Callout added. Switch to Move to adjust the circle or endpoint.');
  }else if(mode==='box'&&inImage(point))drag={type:'box',start:point,end:point,bounds:E.bounds(project)};
  else if(mode==='move'){selected=-1;render();}
  if(drag){$('stage').setPointerCapture(event.pointerId);event.preventDefault();}
});
$('stage').addEventListener('pointermove',event=>{
  if(!drag)return;const pt=svgPoint(event);
  if(drag.type==='box'){
    drag.end=[Math.max(0,Math.min(project.width,pt[0])),Math.max(0,Math.min(project.height,pt[1]))];
    render(false);const rect=document.createElementNS('http://www.w3.org/2000/svg','rect'),[x,y]=drag.start,[ex,ey]=drag.end;
    for(const [k,v] of Object.entries({x:Math.min(x,ex),y:Math.min(y,ey),width:Math.abs(ex-x),height:Math.abs(ey-y),fill:'none',stroke:project.style.color,'stroke-width':3,'stroke-dasharray':'6 3'}))rect.setAttribute(k,v);document.querySelector('#stage svg').append(rect);
  } else {
    let pos=[drag.original[0]+pt[0]-drag.start[0],drag.original[1]+pt[1]-drag.start[1]];
    if(drag.type==='target')pos=[Math.max(0,Math.min(project.width,pos[0])),Math.max(0,Math.min(project.height,pos[1]))];
    else pos=pos.map((v,k)=>Math.max(-1500,Math.min((k?project.height:project.width)+1500,v)));
    project.items[drag.index][drag.type]=pos;render(false);
  }
});
function finishDrag(event){
  if(!drag)return;
  if(drag.type==='box'&&project.items.length<200){const [x,y]=drag.start,[ex,ey]=drag.end,box=[Math.min(x,ex),Math.min(y,ey),Math.abs(ex-x),Math.abs(ey-y)];if(box[2]>5&&box[3]>5){snapshot();const target=[box[0]+box[2],box[1]+box[3]/2];project.items.push({label:`Region ${project.items.length+1}`,box,target,badge:[project.width+project.style.margin*.58,target[1]]});selected=project.items.length-1;}}
  drag=null;if($('stage').hasPointerCapture(event.pointerId))$('stage').releasePointerCapture(event.pointerId);render();
}
$('stage').addEventListener('pointerup',finishDrag);$('stage').addEventListener('pointercancel',finishDrag);
$('stage').addEventListener('keydown',event=>{const h=event.target.closest('[data-handle="badge"]');if(h&&(event.key==='Enter'||event.key===' ')){event.preventDefault();selected=Number(h.dataset.index);render();$('label').focus();}});
window.addEventListener('keydown',event=>{if(event.ctrlKey&&event.key.toLowerCase()==='z'&&!/INPUT|TEXTAREA/.test(event.target.tagName)){event.preventDefault();$('undo').click();}});
window.addEventListener('beforeunload',event=>{if(history.length){event.preventDefault();event.returnValue='';}});
loadExample();
