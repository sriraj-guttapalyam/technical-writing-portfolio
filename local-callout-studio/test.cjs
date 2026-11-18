/* Development only. NODE_PATH can point to a Playwright + sharp installation. */
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const sharp=require('sharp');
const root=__dirname,output=path.join(root,'examples');
async function main(){
  await fs.mkdir(output,{recursive:true});
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1600,height:1100},acceptDownloads:true});
    const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
    page.on('dialog',d=>d.accept());
    await page.goto(pathToFileURL(path.join(root,'index.html')).href);
    await page.waitForSelector('[data-callout="8"]');
    assert.equal(await page.locator('[data-callout]').count(),8);
    assert.equal(await page.locator('[data-outline]').count(),1);
    assert.equal(await page.locator('#imageFile').isVisible(),false);
    async function save(button,name){const pending=page.waitForEvent('download');await page.locator(button).click();const d=await pending;await d.saveAs(path.join(output,name));return d;}
    await save('#png','Project-tracker-demo-callouts.png');
    await save('#svg','Project-tracker-demo-callouts.svg');
    await save('#saveProject','demo.callouts.json');
    await save('#savePreset','demo.preset.json');
    const pngPath=path.join(output,'Project-tracker-demo-callouts.png'),meta=await sharp(pngPath).metadata();
    assert.equal(meta.width,1184);assert.equal(meta.height,721);
    const src=path.join(root,'examples','demo-screen.png');
    const original=await sharp(src).extract({left:300,top:280,width:300,height:180}).ensureAlpha().raw().toBuffer();
    const exported=await sharp(pngPath).extract({left:380,top:360,width:300,height:180}).ensureAlpha().raw().toBuffer();
    assert.deepEqual(exported,original,'Unannotated screenshot pixels should be preserved');
    await page.screenshot({path:path.join(output,'studio-preview.png'),fullPage:true});
    // Exercise pointer interaction, including drag events while the SVG is redrawn.
    async function point(x,y){return page.locator('#stage svg').evaluate((s,p)=>{const b=s.getBoundingClientRect(),v=s.viewBox.baseVal;return{x:b.x+(p.x-v.x)/v.width*b.width,y:b.y+(p.y-v.y)/v.height*b.height};},{x,y});}
    await page.locator('#pointMode').click();let p=await point(500,300);await page.mouse.click(p.x,p.y);assert.equal(await page.locator('[data-callout]').count(),9);
    await page.locator('#moveMode').click();const originalBadge=await page.evaluate(()=>[...project.items[8].badge]);p=await point(...originalBadge);await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+30,p.y+10,{steps:5});await page.mouse.up();
    assert.notDeepEqual(await page.evaluate(()=>project.items[8].badge),originalBadge);
    await page.locator('#undo').click();assert.deepEqual(await page.evaluate(()=>project.items[8].badge),originalBadge);
    await page.locator('#undo').click();assert.equal(await page.locator('[data-callout]').count(),8);
    await page.locator('#boxMode').click();const a=await point(300,200),b=await point(500,350);await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(b.x,b.y,{steps:4});await page.mouse.up();assert.equal(await page.locator('[data-outline]').count(),2);await page.locator('#undo').click();
    await page.locator('#projectFile').setInputFiles(path.join(output,'demo.callouts.json'));await page.waitForFunction(()=>document.getElementById('status').textContent.includes('Project restored'));assert.equal(await page.locator('[data-callout]').count(),8);
    const snagx=process.env.SNAGX_TEST;
    if(snagx){await page.locator('#imageFile').setInputFiles(snagx);await page.waitForFunction(()=>document.getElementById('status').textContent.includes('SNAGX background imported'));assert.equal(await page.locator('[data-callout]').count(),0);}
    else{await page.locator('#imageFile').setInputFiles(src);await page.waitForFunction(()=>document.getElementById('status').textContent.includes('Image loaded'));assert.equal(await page.locator('[data-callout]').count(),0);}
    await page.locator('#demoPreset').click();assert.equal(await page.locator('[data-callout]').count(),8);
    const bad=await page.evaluate(()=>{const p=CalloutEngine.clone(project);p.image='https://example.com/tracker.png';try{CalloutEngine.validate(p);return false;}catch{return true;}});assert.ok(bad);
    const escaped=await page.evaluate(()=>{const p=CalloutEngine.clone(project);p.items[0].label='<script>alert(1)</script>';return CalloutEngine.svg(p);});assert.ok(!escaped.includes('<script>'));assert.ok(escaped.includes('&lt;script&gt;'));
    const batchDownload=page.waitForEvent('download');await page.locator('#batchFiles').setInputFiles([src,snagx||src]);const batch=await batchDownload;await batch.saveAs(path.join(output,'batch-test.zip'));
    await page.locator('#presetFile').setInputFiles(path.join(output,'demo.preset.json'));await page.waitForFunction(()=>document.getElementById('status').textContent.includes('Preset applied'));
    assert.equal(await page.locator('[data-callout]').count(),8);
    assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
    console.log('PASS: 8-callout demo, PNG pixel fidelity, SVG, project/preset round trips, point and outline creation, dragging, undo, SNAGX import, validation, escaping, batch ZIP, and zero network requests.');
  }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
