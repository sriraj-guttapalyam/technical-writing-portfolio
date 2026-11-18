/* Offline deterministic annotation renderer. No external libraries or network calls. */
'use strict';
window.CalloutEngine = (() => {
  const MAX_BYTES = 48 * 1024 * 1024;
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const finite = (v,min,max) => typeof v === 'number' && Number.isFinite(v) && v>=min && v<=max;
  function validate(p, imageRequired=true) {
    if (!p || p.version!==1 || !finite(p.width,1,16000) || !finite(p.height,1,16000) || p.width*p.height>40000000) throw Error('Unsupported project or image dimensions.');
    if (imageRequired && (typeof p.image!=='string' || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(p.image) || p.image.length>MAX_BYTES*1.4)) throw Error('The project must contain a PNG, JPEG, or WebP image.');
    const s=p.style;
    if (!s || !/^#[0-9a-f]{6}$/i.test(s.color) || !finite(s.diameter,20,80) || !finite(s.lineWidth,1,12) || !finite(s.margin,40,240)) throw Error('Invalid callout style.');
    if (!Array.isArray(p.items) || p.items.length>200) throw Error('A project supports up to 200 callouts.');
    for (const i of p.items) {
      if (!i || typeof i.label!=='string' || i.label.length>200 || !Array.isArray(i.badge) || !Array.isArray(i.target) || i.badge.length!==2 || i.target.length!==2 || ![...i.badge,...i.target].every(v=>finite(v,-2000,18000))) throw Error('Invalid callout coordinates or label.');
      if (i.box && (!Array.isArray(i.box)||i.box.length!==4||!i.box.every(v=>finite(v,0,16000))||i.box[2]<=0||i.box[3]<=0||i.box[0]+i.box[2]>p.width||i.box[1]+i.box[3]>p.height)) throw Error('Outline must be within the image.');
      if (i.target[0]<0||i.target[0]>p.width||i.target[1]<0||i.target[1]>p.height) throw Error('Callout targets must be within the image.');
    }
    return p;
  }
  function bounds(p) {
    const m=p.style.margin,r=p.style.diameter/2+10;
    const minX=Math.min(-m,...p.items.map(i=>i.badge[0]-r));
    const minY=Math.min(-m,...p.items.map(i=>i.badge[1]-r));
    const maxX=Math.max(p.width+m,...p.items.map(i=>i.badge[0]+r));
    const maxY=Math.max(p.height+m,...p.items.map(i=>i.badge[1]+r));
    return {x:Math.floor(minX),y:Math.floor(minY),width:Math.ceil(maxX-minX),height:Math.ceil(maxY-minY)};
  }
  function svg(p,selected=-1,editing=false) {
    validate(p);
    const b=bounds(p),s=p.style,r=s.diameter/2,dot=Math.max(4,s.lineWidth);
    const parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${b.width}" height="${b.height}" viewBox="${b.x} ${b.y} ${b.width} ${b.height}" role="img" aria-label="Annotated screenshot"><title>${esc(p.name||'Annotated screenshot')}</title><rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" fill="white"/><image x="0" y="0" width="${p.width}" height="${p.height}" href="${p.image}"/>`];
    // Draw connectors before badges so they never cover the numerals.
    p.items.forEach((i,n)=>{
      const [x,y]=i.badge,[tx,ty]=i.target,dx=tx-x,dy=ty-y,len=Math.hypot(dx,dy)||1;
      if(i.box)parts.push(`<rect data-outline="${n}" x="${i.box[0]}" y="${i.box[1]}" width="${i.box[2]}" height="${i.box[3]}" rx="8" fill="none" stroke="${s.color}" stroke-width="${s.lineWidth}"/>`);
      parts.push(`<g data-callout="${n+1}"><title>${n+1}. ${esc(i.label)}</title><line x1="${x+dx/len*r*.85}" y1="${y+dy/len*r*.85}" x2="${tx}" y2="${ty}" stroke="${s.color}" stroke-width="${s.lineWidth}" stroke-linecap="round"/><circle ${editing?`data-handle="target" data-index="${n}"`:''} cx="${tx}" cy="${ty}" r="${dot}" fill="${s.color}"/></g>`);
    });
    p.items.forEach((i,n)=>{
      const [x,y]=i.badge;
      parts.push(`<g ${editing?`data-handle="badge" data-index="${n}" tabindex="0" role="button" aria-label="Callout ${n+1}: ${esc(i.label)}"`:''}><circle cx="${x}" cy="${y}" r="${r}" fill="${s.color}"/><text x="${x}" y="${y}" fill="white" font-family="Arial, sans-serif" font-size="${s.diameter*(n>=99?.47:.65)}" font-weight="400" text-anchor="middle" dominant-baseline="central" pointer-events="none">${n+1}</text></g>`);
      if(editing&&n===selected)parts.push(`<circle cx="${x}" cy="${y}" r="${r+5}" fill="none" stroke="#244c31" stroke-width="1.5" stroke-dasharray="4 3" pointer-events="none"/>`);
    });
    return parts.join('')+'</svg>';
  }
  async function imageSize(url) {
    const img = new Image(); img.src=url; await img.decode();
    if(img.naturalWidth>16000||img.naturalHeight>16000||img.naturalWidth*img.naturalHeight>40000000)throw Error('Image too large. Use a screenshot under 40 megapixels and 16,000 pixels per side.');
    return {width:img.naturalWidth,height:img.naturalHeight};
  }
  async function dataURL(blob) {return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(blob);});}
  async function png(p,scale=1) {
    const b=bounds(p),w=Math.round(b.width*scale),h=Math.round(b.height*scale);
    if(w*h>40000000||w>16000||h>16000)throw Error('Export too large. Use 1× output or a smaller screenshot.');
    const url=URL.createObjectURL(new Blob([svg(p)],{type:'image/svg+xml'}));
    try {const img=new Image();img.src=url;await img.decode();const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('PNG export failed.')),'image/png'));}
    finally{URL.revokeObjectURL(url);}
  }
  function scaled(p,width,height) {
    const out=clone(p),sx=width/p.width,sy=height/p.height;
    out.width=width;out.height=height;
    out.items=out.items.map(i=>({...i,badge:[i.badge[0]*sx,i.badge[1]*sy],target:[i.target[0]*sx,i.target[1]*sy],...(i.box?{box:[i.box[0]*sx,i.box[1]*sy,i.box[2]*sx,i.box[3]*sy]}:{})}));
    return out;
  }
  // Read only entries referenced by SNAGX index/page metadata. Never extract paths to disk.
  async function readZip(buffer) {
    const d=new DataView(buffer),bytes=new Uint8Array(buffer),entries=new Map();let e=-1;
    for(let p=d.byteLength-22;p>=Math.max(0,d.byteLength-65557);p--){if(d.getUint32(p,true)===0x06054b50){e=p;break;}}
    if(e<0)throw Error('This SNAGX is not a supported ZIP archive.');
    const count=d.getUint16(e+10,true);let pos=d.getUint32(e+16,true);
    if(count>500)throw Error('SNAGX has too many entries. Export a PNG from Snagit instead.');
    for(let n=0;n<count;n++){
      if(pos+46>d.byteLength||d.getUint32(pos,true)!==0x02014b50)throw Error('Invalid ZIP directory.');
      const nameLen=d.getUint16(pos+28,true),extra=d.getUint16(pos+30,true),comment=d.getUint16(pos+32,true),name=new TextDecoder().decode(bytes.slice(pos+46,pos+46+nameLen));
      entries.set(name,{method:d.getUint16(pos+10,true),flags:d.getUint16(pos+8,true),size:d.getUint32(pos+24,true),compressed:d.getUint32(pos+20,true),offset:d.getUint32(pos+42,true)});pos+=46+nameLen+extra+comment;
    }
    let total=0;
    return async name=>{
      const a=entries.get(name);if(!a||a.flags&1||a.size>MAX_BYTES)throw Error('Unsupported or missing SNAGX entry. Export a PNG from Snagit instead.');
      if(a.offset+30>d.byteLength||d.getUint32(a.offset,true)!==0x04034b50)throw Error('Invalid ZIP entry.');
      const start=a.offset+30+d.getUint16(a.offset+26,true)+d.getUint16(a.offset+28,true);
      if(start+a.compressed>d.byteLength)throw Error('Truncated SNAGX file.');
      const chunk=bytes.slice(start,start+a.compressed);let result;
      if(a.method===0)result=chunk;
      else if(a.method===8){
        const stream=new Blob([chunk]).stream().pipeThrough(new DecompressionStream('deflate-raw')),reader=stream.getReader(),pieces=[];let len=0;
        try {while(true){const {done,value}=await reader.read();if(done)break;len+=value.length;if(len+total>MAX_BYTES)throw Error('SNAGX expands beyond the supported limit.');pieces.push(value);}}
        finally{await reader.cancel().catch(()=>{});}
        result=new Uint8Array(len);let at=0;for(const part of pieces){result.set(part,at);at+=part.length;}
      } else throw Error('Unsupported SNAGX compression. Export a PNG from Snagit instead.');
      total+=result.length;if(result.length!==a.size||total>MAX_BYTES)throw Error('Invalid or oversized SNAGX data.');return result;
    };
  }
  async function loadImage(file) {
    if(file.size>MAX_BYTES)throw Error('Choose an image smaller than 48 MB.');
    let blob=file,note='';
    if(/\.snagx$/i.test(file.name)){
      const get=await readZip(await file.arrayBuffer()),index=JSON.parse(new TextDecoder().decode(await get('index.json')));
      if(!Array.isArray(index.Pages)||!index.Pages.length)throw Error('SNAGX contains no pages.');
      const page=JSON.parse(new TextDecoder().decode(await get(index.Pages[0])));
      if(typeof page.CaptureBackgroundImage!=='string')throw Error('No background image found. Export PNG from Snagit instead.');
      blob=new Blob([await get(page.CaptureBackgroundImage)],{type:'image/png'});
      note='SNAGX background imported. Existing Snagit annotations and extra pages are not included.';
    } else if(!/\.(png|jpe?g|webp)$/i.test(file.name)) throw Error('Choose PNG, JPG, WebP, or SNAGX.');
    const mime=/\.jpe?g$/i.test(file.name)?'image/jpeg':/\.webp$/i.test(file.name)?'image/webp':'image/png';
    if(!blob.type||!/^image\//.test(blob.type))blob=new Blob([blob],{type:mime});
    const image=await dataURL(blob),size=await imageSize(image);return {image,...size,name:file.name.replace(/\.[^.]+$/,''),note};
  }
  const crcTable=Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
  function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0;}
  function zip(files){
    let offset=0;const chunks=[],directory=[];
    for(const f of files){const name=new TextEncoder().encode(f.name),data=f.data,crc=crc32(data),head=new Uint8Array(30+name.length),h=new DataView(head.buffer);h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x800,true);h.setUint32(14,crc,true);h.setUint32(18,data.length,true);h.setUint32(22,data.length,true);h.setUint16(26,name.length,true);head.set(name,30);
      const central=new Uint8Array(46+name.length),c=new DataView(central.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);central.set(name,46);chunks.push(head,data);directory.push(central);offset+=head.length+data.length;
    }
    const end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,directory.reduce((a,b)=>a+b.length,0),true);e.setUint32(16,offset,true);return new Blob([...chunks,...directory,end],{type:'application/zip'});
  }
  return {clone,validate,bounds,svg,png,scaled,loadImage,imageSize,zip};
})();
