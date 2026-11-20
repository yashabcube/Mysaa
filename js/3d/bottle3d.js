// MYŚAA 3D bottles v2 — lightweight custom glass (no transmission pass), heavy glass walls & base,
// viscous liquid with gravity-level surface, rising micro-bubbles when shaken.
import * as THREE from 'three';
import { RoomEnvironment } from './RoomEnvironment.js';

const LOGO_D = "M11.6704 23.0104L3.32515 6.70776H0V27.4559H0.57095V8.61452L10.1981 27.4271L19.6565 7.93584V27.4559H23.0104V6.70776H19.6565L11.6704 23.0139V23.0104ZM36.2176 27.3194H39.8983V16.7658L49.116 6.59645H48.3512L39.6289 16.0584L31.0934 6.59645H27.1399L36.2176 16.9561V27.3194ZM64.1295 1.11317L63.5909 0L57.2207 3.36106L57.4469 3.84942L64.1295 1.11317ZM56.6102 18.0765C57.3392 18.2381 58.201 18.3961 59.2028 18.5397C61.8924 18.9383 63.8027 19.4087 64.9303 19.9581C66.5821 20.7014 67.4116 21.6494 67.4116 22.7913C67.4116 23.4305 67.2643 23.9763 66.9735 24.4287C66.855 24.6191 66.7221 24.8058 66.5713 24.9782L66.5605 24.9638C64.2121 27.1686 60.8475 27.5815 57.7521 27.0824C57.3966 27.0321 57.0339 26.9675 56.682 26.8777C54.7286 26.4181 52.9296 25.4198 52.4197 23.7537C52.1898 23.0175 52.2114 22.1485 52.5848 21.1359L52.1288 21.0102C52.0211 21.3873 51.8882 21.8002 51.8451 22.2239C51.7661 22.8883 51.8307 23.4844 52.0103 24.023C52.0749 24.2205 52.1575 24.4108 52.2509 24.5903C52.2545 24.5939 52.2545 24.5975 52.2581 24.6011C53.2958 26.5474 56.0141 27.5528 58.7899 27.8257C58.8114 27.8293 58.8366 27.8329 58.8581 27.8329C59.3788 27.894 59.9246 27.9227 60.4884 27.9227C62.194 27.9227 63.7561 27.6462 65.1745 27.0896C66.5928 26.533 67.7204 25.7897 68.5535 24.8525C69.3902 23.9224 69.8067 22.8775 69.8067 21.732C69.8067 20.8235 69.6272 20.0479 69.2609 19.4123C68.8982 18.7803 68.4062 18.2488 67.7886 17.8179C67.171 17.3942 66.4672 17.0423 65.6772 16.7694C64.8836 16.4965 64.0649 16.2667 63.2102 16.0764C62.3556 15.8861 61.501 15.7209 60.6464 15.5736C59.6445 15.4085 58.7288 15.2289 57.8957 15.0242C56.6246 14.7513 55.6443 14.2881 54.962 13.6382C54.2797 12.981 53.9135 12.2377 53.8596 11.401C53.8596 10.0545 54.6963 8.94129 56.366 8.04716C57.3356 7.52648 58.3913 7.19612 59.5332 7.05967C59.824 7.02017 60.1221 6.99862 60.4309 6.98785C61.7164 6.98785 62.8763 7.14585 63.9105 7.46185C63.9141 7.46544 63.9176 7.46544 63.9212 7.46544C65.6305 7.90712 67.1961 8.76175 67.8353 10.1263C68.2231 10.945 68.277 11.954 67.8317 13.1642L68.2878 13.2898C68.3955 12.9128 68.5283 12.5034 68.5714 12.0761C68.6612 11.3472 68.575 10.7008 68.3488 10.1227C68.2734 9.91083 68.1728 9.71333 68.0508 9.51942C67.2643 8.52834 66.2661 7.79221 65.0524 7.31103C64.2588 6.99862 63.458 6.77599 62.6465 6.63594H62.6608C62.5998 6.62517 62.5387 6.61799 62.4813 6.60722C62.4131 6.59645 62.3448 6.58567 62.2766 6.5749C60.3591 6.28763 58.2297 6.55335 56.7682 7.02017H56.8149C56.6856 7.05608 56.5563 7.0884 56.4307 7.13149C56.2727 7.18535 56.1183 7.24639 55.9639 7.30744C54.98 7.70962 54.1397 8.21234 53.4466 8.8192C53.1953 9.03824 52.9583 9.27165 52.7464 9.51942C51.9492 10.4423 51.5507 11.4693 51.5507 12.5968V12.981C51.5507 15.6347 53.2384 17.3296 56.6174 18.0801L56.6102 18.0765ZM72.6363 27.4271H73.1821L76.6689 20.6655H87.1111L90.7092 27.4523H94.3073L83.3479 6.70417L72.6327 27.4235L72.6363 27.4271ZM76.8879 20.2813L81.8505 10.7116L86.9244 20.2813H76.8915H76.8879ZM109.044 6.70776L98.329 27.4271H98.8749L102.362 20.6655H112.804L116.402 27.4523H120L109.041 6.70417L109.044 6.70776ZM102.584 20.2813L107.547 10.7116L112.621 20.2813H102.588H102.584Z";
export const BOTTLES = {
  "body-essence":  { glass:"clear",  deep:[0.96,0.60,0.30], light:[1.0,0.80,0.52], top:[1.0,0.88,0.66], spark:1.7, ink:"rgba(255,248,234,1)",
    lines:[["PURE GOLD BODY","t"],["ESSENCE","t"],["Luminous Hydration & Silken Glow","s"],["with Apricot, Saffron & Gold","s"],["—","r"],["100 ML / 3.3 OZ.","m"]] },
  "celestial-glow":{ glass:"frost",  deep:[1.0,0.78,0.20], light:[1.0,0.91,0.52], top:[1.0,0.95,0.72], spark:0.0, ink:"#1d1712",
    lines:[["PHYTO-ACTIVE","t"],["HYDRATING CLEANSER","t"],["Brightening & Barrier Support","s"],["with Saffron, Turmeric & Sandalwood","s"],["—","r"],["100 ML / 3.3 OZ.","m"]] },
  "floral-harmony":{ glass:"frost",  deep:[0.86,0.87,0.88], light:[0.97,0.97,0.97], top:[1.0,1.0,1.0], spark:0.0, ink:"#1d1712",
    lines:[["BRIGHTENING &","t"],["HYDRATING TONER MIST","t"],["Antioxidant Rich Hydrosols","s"],["with Guava & Rose","s"],["—","r"],["100 ML / 3.3 OZ.","m"]] }
};
const R=0.6, H=3.15, CAP_H=1.22, BASE=0.2, WALL=0.04, FILL=0.88;
const LR=R-WALL;                      // liquid radius (thick glass walls)

function labelTexture(cfg){
  const W=2048, c=document.createElement("canvas"); c.width=W; c.height=W; const x=c.getContext("2d");
  x.fillStyle=cfg.ink; x.textAlign="center"; const cx=W/2; let y=W*0.15, s=0;
  cfg.lines.forEach(([t,k])=>{
    if(k==="t"){x.font="700 86px 'Helvetica Neue', Aileron, 'Helvetica Neue', Arial, sans-serif"; y+=96; x.fillText(t,cx,y);}
    else if(k==="s"){x.font="400 58px Aileron, 'Helvetica Neue', Arial, sans-serif"; y+=s?70:92; s=1; x.fillText(t,cx,y);}
    else if(k==="r"){y+=86; x.fillRect(cx-46,y-14,92,4);}
    else {x.font="400 52px Aileron, 'Helvetica Neue', Arial, sans-serif"; y+=96; x.fillText(t,cx,y);}
  });
  const p=new Path2D(LOGO_D), lw=640, sc=lw/120; x.save(); x.translate(cx-lw/2, W*0.77); x.scale(sc,sc); x.fill(p); x.restore();
  const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=4; return t;
}

/* ---------- shaders ---------- */
const V=`varying vec3 vW; varying vec3 vN; varying vec3 vV; varying vec3 vVN;
void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; vN=normalize(mat3(modelMatrix)*normal); vV=normalize(cameraPosition-w.xyz); vVN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*viewMatrix*w; }`;

// glass: fresnel + studio strip reflections; frosted = milky & soft
const GLASS_F=`uniform float uFrost; uniform vec3 uTint; uniform float uBase; uniform float uBack;
varying vec3 vW; varying vec3 vN; varying vec3 vV; varying vec3 vVN;
void main(){
  vec3 N=normalize(vN); if(!gl_FrontFacing) N=-N;
  float fr=pow(1.-abs(dot(N,vV)),2.6);
  float sx=vVN.x*(gl_FrontFacing?1.:-1.);
  float soft=mix(0.035,0.16,uFrost);
  float b1=smoothstep(soft,0.,abs(sx+0.52))*mix(1.,.45,uFrost);
  float b2=smoothstep(soft*1.6,0.,abs(sx-0.66))*0.55*mix(1.,.5,uFrost);
  float b3=smoothstep(.25,0.,abs(sx-0.15))*0.06;
  vec3 col=mix(uTint,vec3(1.),0.35+0.65*fr);
  col+=vec3(1.,.97,.9)*(b1+b2+b3);
  float a=uBase+fr*mix(0.75,0.5,uFrost)+(b1+b2)*0.8;
  if(!gl_FrontFacing) a*=uBack;
  gl_FragColor=vec4(col,clamp(a,0.,0.95));
}`;

const LIQ_F=`uniform vec3 uDeep; uniform vec3 uLight; uniform vec3 uTop; uniform vec3 uFill; uniform vec2 uWob; uniform float uSpark; uniform float uTime; uniform float uFrost;
varying vec3 vW; varying vec3 vN; varying vec3 vV; varying vec3 vVN;
float hh(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,45.164)))*43758.5453);}
void main(){
  vec3 n=normalize(vec3(uWob.x,1.,uWob.y));
  float d=dot(vW-uFill,n);
  if(d>0.) discard;
  vec3 base=mix(uLight,uDeep,0.45);
  if(!gl_FrontFacing){ gl_FragColor=vec4(pow(mix(base,uTop,0.45),vec3(2.2)),1.); return; }
  vec3 N=normalize(vN); vec3 L=normalize(vec3(-0.5,0.8,0.6));
  float dif=0.6+0.4*max(dot(N,L),0.);
  float fr=pow(1.-max(dot(N,vV),0.),2.);
  float n1=sin(vW.x*5.+uTime*.6)*sin(vW.y*4.-uTime*.4)*sin(vW.z*5.+uTime*.3);
  vec3 c=base*dif*(0.95+0.07*n1);
  c=mix(c,uLight*1.12,fr*0.6);
  c*=0.86+0.16*smoothstep(-2.,1.,vW.y-uFill.y+1.5);
  c+=smoothstep(-0.06,0.,d)*0.3*uTop;
  vec3 Hh=normalize(L+vV); c+=pow(max(dot(N,Hh),0.),70.)*0.28;
  if(uSpark>0.){ vec3 q=floor((vW+vec3(uWob.x*.3,uTime*0.05,uWob.y*.3))*115.); float s=step(0.979,hh(q));
    c+=s*uSpark*vec3(1.,.86,.55)*(0.45+0.55*sin(uTime*2.4+hh(q)*40.)); c+=uSpark*0.05*vec3(1.,.8,.5)*(0.5+0.5*n1); }
  gl_FragColor=vec4(pow(c*1.06,vec3(2.2)),1.);
}`;

const BUB_V=`attribute float aA; attribute float aS; varying float vA;
void main(){ vA=aA; vec4 mv=modelViewMatrix*vec4(position,1.); gl_PointSize=aS*(300./-mv.z); gl_Position=projectionMatrix*mv; }`;
const BUB_F=`varying float vA; uniform float uFrost;
void main(){ vec2 p=gl_PointCoord*2.-1.; float r=length(p); if(r>1.) discard;
  float ring=smoothstep(0.55,0.95,r)*(1.-smoothstep(0.95,1.,r)); float hl=smoothstep(0.35,0.,length(p-vec2(-.35,.35)));
  float a=(ring*0.8+hl*0.9)*vA*mix(1.,.55,uFrost); gl_FragColor=vec4(vec3(1.,.98,.94),a); }`;

function glassMat(frost, side, base, back){
  return new THREE.ShaderMaterial({vertexShader:V,fragmentShader:GLASS_F,transparent:true,depthWrite:false,side,
    uniforms:{uFrost:{value:frost},uTint:{value:new THREE.Color(frost?0xf4efe8:0xfff8ee)},uBase:{value:base},uBack:{value:back}}});
}

function makeBottle(id, quality){
  const cfg=BOTTLES[id], frost=cfg.glass==="frost"?1:0, g=new THREE.Group(), seg=quality>1?72:48;
  // outer glass silhouette
  const pts=[], rr=0.09; pts.push(new THREE.Vector2(0,0));
  for(let i=0;i<=6;i++){const a=-Math.PI/2+i/6*Math.PI/2; pts.push(new THREE.Vector2(R-rr+Math.cos(a)*rr, rr+Math.sin(a)*rr));}
  for(let i=0;i<=6;i++){const a=i/6*Math.PI/2; pts.push(new THREE.Vector2(R-rr+Math.cos(a)*rr, H-rr+Math.sin(a)*rr));}
  pts.push(new THREE.Vector2(0,H));
  const geo=new THREE.LatheGeometry(pts,seg);
  // liquid (inside the thick walls, above the heavy base)
  const lH=H-BASE-0.06, liqMat=new THREE.ShaderMaterial({vertexShader:V,fragmentShader:LIQ_F,side:THREE.DoubleSide,
    uniforms:{uDeep:{value:new THREE.Vector3(...cfg.deep)},uLight:{value:new THREE.Vector3(...cfg.light)},uTop:{value:new THREE.Vector3(...cfg.top)},
      uFill:{value:new THREE.Vector3()},uWob:{value:new THREE.Vector2()},uSpark:{value:cfg.spark},uTime:{value:0},uFrost:{value:frost}}});
  const liq=new THREE.Mesh(new THREE.CylinderGeometry(LR,LR*0.985,lH,seg,1,false),liqMat); liq.position.y=BASE+lH/2; liq.renderOrder=1; g.add(liq);
  // bubbles
  const NB=quality>1?34:20, bp=new Float32Array(NB*3), ba=new Float32Array(NB), bs=new Float32Array(NB);
  const bg=new THREE.BufferGeometry(); bg.setAttribute("position",new THREE.BufferAttribute(bp,3)); bg.setAttribute("aA",new THREE.BufferAttribute(ba,1)); bg.setAttribute("aS",new THREE.BufferAttribute(bs,1));
  const bubbles=new THREE.Points(bg,new THREE.ShaderMaterial({vertexShader:BUB_V,fragmentShader:BUB_F,transparent:true,depthWrite:false,uniforms:{uFrost:{value:frost}}}));
  bubbles.renderOrder=3; bubbles.frustumCulled=false; g.add(bubbles);
  const bub=[...Array(NB)].map(()=>({on:0,x:0,y:0,z:0,v:0,ph:Math.random()*6,s:0,a:0}));
  // glass: physically based, see-through (clear) or softly frosted, with a little wall thickness
  const glass=new THREE.MeshPhysicalMaterial({color:0xffffff, roughness:frost?0.42:0.02, transmission:1, thickness:frost?0.5:0.3, ior:1.5,
    envMapIntensity:frost?0.9:1.1, clearcoat:frost?0:1, clearcoatRoughness:0.03, specularIntensity:frost?0.6:1, sheen:frost?0.6:0, sheenColor:new THREE.Color(0xffffff), sheenRoughness:0.8,
    attenuationColor:new THREE.Color(frost?0xfbf8f3:0xfffbf4), attenuationDistance:frost?2.5:8});
  const body=new THREE.Mesh(geo,glass); g.add(body);
  // label printed on the glass
  const lab=new THREE.Mesh(new THREE.CylinderGeometry(R*1.004,R*1.004,H*0.98,seg,1,true,-Math.PI*0.62,Math.PI*1.24),
    new THREE.MeshBasicMaterial({map:labelTexture(cfg),transparent:true,depthWrite:false}));
  lab.position.y=H*0.49; lab.renderOrder=6; g.add(lab);
  // gold cap + collar
  const gold=new THREE.MeshPhysicalMaterial({color:0xfadc90,metalness:1,roughness:0.07,envMapIntensity:1.25,clearcoat:1,clearcoatRoughness:0.02});
  const cp=[new THREE.Vector2(0,0),new THREE.Vector2(R*1.005,0),new THREE.Vector2(R*1.005,CAP_H-0.03),new THREE.Vector2(R*0.985,CAP_H),new THREE.Vector2(0,CAP_H)];
  const cap=new THREE.Mesh(new THREE.LatheGeometry(cp,seg),gold); cap.position.y=H+0.02; g.add(cap);
  const ring=new THREE.Mesh(new THREE.CylinderGeometry(R*0.94,R*0.94,0.06,seg),new THREE.MeshStandardMaterial({color:0x2b2422,roughness:0.6})); ring.position.y=H; g.add(ring);
  g.userData={liq,bubbles,bub,last:new THREE.Vector3(),lastQ:new THREE.Quaternion(),vx:0,vz:0,addX:0,addZ:0,wx:0,wz:0,t:0,energy:0,lH};
  return g;
}

const _p=new THREE.Vector3(),_q=new THREE.Quaternion(),_dq=new THREE.Quaternion(),_e=new THREE.Euler(),_c=new THREE.Vector3(),_inv=new THREE.Quaternion();
function updateLiquid(b, dt, time){
  const u=b.userData; b.updateMatrixWorld(true);
  b.getWorldPosition(_p); b.getWorldQuaternion(_q);
  const idt=1/Math.max(dt,1e-3);
  const vx=(_p.x-u.last.x)*idt, vz=(_p.z-u.last.z)*idt;
  _inv.copy(u.lastQ).invert(); _dq.copy(_q).multiply(_inv); _e.setFromQuaternion(_dq);
  // low-pass the motion so the liquid responds like something thick, not water
  const ax=_e.x*idt, ay=_e.y*idt, az=_e.z*idt, lp=Math.min(1,dt*6);
  u.vx+=((vx*0.07+az*0.02+ay*0.006)-u.vx)*lp; u.vz+=((vz*0.07+ax*0.02)-u.vz)*lp;
  const max=0.3; u.addX=THREE.MathUtils.clamp(u.addX+u.vx*dt*9,-max,max); u.addZ=THREE.MathUtils.clamp(u.addZ+u.vz*dt*9,-max,max);
  u.t+=dt; const w=2*Math.PI*1.15;                               // slow, heavy oscillation
  u.wx+=((u.addX*Math.sin(w*u.t))-u.wx)*Math.min(1,dt*8); u.wz+=((u.addZ*Math.sin(w*u.t+0.7))-u.wz)*Math.min(1,dt*8);
  const rec=Math.min(1,dt*1.5); u.addX*=1-rec; u.addZ*=1-rec;       // viscous damping
  u.energy=u.energy*0.94+(Math.abs(u.vx)+Math.abs(u.vz))*0.6;
  u.last.copy(_p); u.lastQ.copy(_q);
  _c.set(0,BASE+(H-BASE)*FILL,0); b.localToWorld(_c);
  const m=u.liq.material.uniforms; m.uFill.value.copy(_c); m.uWob.value.set(u.wx,u.wz); m.uTime.value=time;
  // bubbles: a few appear when shaken, rise slowly through the thick formula and vanish at the surface
  const top=BASE+(H-BASE)*FILL-0.06, pos=u.bubbles.geometry.attributes.position, A=u.bubbles.geometry.attributes.aA, S=u.bubbles.geometry.attributes.aS;
  let spawn=u.energy>0.05?Math.min(3,Math.floor(u.energy*6*Math.random()+Math.random()*0.6)):0;
  u.bub.forEach((o,i)=>{
    if(!o.on&&spawn>0){spawn--; const r=Math.sqrt(Math.random())*LR*0.82, a=Math.random()*6.283; o.on=1; o.x=Math.cos(a)*r; o.z=Math.sin(a)*r; o.y=BASE+0.1+Math.random()*(top-BASE)*0.55; o.v=0.12+Math.random()*0.22; o.s=1.2+Math.random()*3.2; o.a=0;}
    if(o.on){ o.y+=o.v*dt*(0.7+o.s*0.15); o.ph+=dt*2; o.x+=Math.sin(o.ph)*0.0015; o.a=Math.min(1,o.a+dt*3);
      if(o.y>top){o.a-=dt*6; if(o.a<=0){o.on=0;o.a=0;}} }
    pos.setXYZ(i,o.x,o.y,o.z); A.setX(i,o.on?o.a*0.85:0); S.setX(i,o.s);
  });
  pos.needsUpdate=true; A.needsUpdate=true; S.needsUpdate=true;
}

function goldEnv(){
  const e=new THREE.Scene(); e.background=new THREE.Color(0x9c8260);
  const room=new THREE.Mesh(new THREE.BoxGeometry(20,12,20),new THREE.MeshBasicMaterial({color:0xb09574,side:THREE.BackSide})); e.add(room);
  const panel=(w,h,col,x,y,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide})); m.position.set(x,y,z); m.rotation.y=ry; e.add(m);};
  panel(1.1,10,new THREE.Color(6,5.6,5),-5.5,0,4,Math.PI/2.6);
  panel(0.6,10,new THREE.Color(4,3.6,3),-3,0,6.5,Math.PI/1.2);
  panel(0.9,10,new THREE.Color(4.5,3.8,2.8),6,0,2,-Math.PI/2.3);
  panel(0.4,10,new THREE.Color(2.5,2.2,1.8),3.5,0,6.8,-Math.PI/1.15);
  panel(4,10,new THREE.Color(0.9,0.62,0.32),0,0,-9.5,0);
  panel(3,10,new THREE.Color(0.12,0.09,0.07),-1.5,0,9,Math.PI);   // one dark band, like the real photos
  panel(12,3,new THREE.Color(2.2,2.0,1.7),0,6,0,0);
  return e;
}
function studioEnv(){
  const e=new THREE.Scene(); e.background=new THREE.Color(0xd9cfc3);
  const room=new THREE.Mesh(new THREE.BoxGeometry(20,12,20),new THREE.MeshBasicMaterial({color:0xcfc3b4,side:THREE.BackSide})); e.add(room);
  const panel=(w,h,col,x,y,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide})); m.position.set(x,y,z); m.rotation.y=ry; e.add(m);};
  panel(1.4,9,new THREE.Color(4,3.8,3.4),-6,0.5,3,Math.PI/2.4);     // key strip left
  panel(1.0,9,new THREE.Color(3.2,2.8,2.2),6.5,0.5,1,-Math.PI/2.2);  // warm strip right
  panel(10,3,new THREE.Color(2.6,2.4,2.2),0,5.8,0,0);                // big top softbox
  panel(5,6,new THREE.Color(0.18,0.14,0.11),-2,0,-9.6,0);            // dark wall: gives the gold its contrast
  panel(4,5,new THREE.Color(1.3,1.0,0.7),4,0.5,-9.5,0);              // amber bounce
  panel(6,2,new THREE.Color(1.6,1.5,1.4),0,-2.5,8,Math.PI);          // front fill
  return e;
}

/* Mount a scene. ids = product ids. opts: labels (elements to align), gap, lift (shift bottles up/down), onReady */
export function mountBottles(canvas, ids, opts={}){
  const mob=innerWidth<820, quality=mob?1:2;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:!mob,alpha:true,powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(mob?1.25:1.35,window.devicePixelRatio||1)); renderer.toneMapping=THREE.NoToneMapping;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  if(opts.clear!==undefined) renderer.setClearColor(opts.clear,1);
  const scene=new THREE.Scene(); const pm=new THREE.PMREMGenerator(renderer);
  let bgTex=null; const pos=opts.bgPos||[.5,.5];
  const fitBg=()=>{ if(!bgTex||!bgTex.image) return; const ia=bgTex.image.width/bgTex.image.height, ca=canvas.clientWidth/Math.max(1,canvas.clientHeight);
    if(ca>ia){bgTex.repeat.set(1,ia/ca); bgTex.offset.set(0,(1-ia/ca)*(1-pos[1]));} else {bgTex.repeat.set(ca/ia,1); bgTex.offset.set((1-ca/ia)*pos[0],0);} };
  if(opts.bg){ new THREE.TextureLoader().load(opts.bg,t=>{t.colorSpace=THREE.SRGBColorSpace; bgTex=t; fitBg(); scene.background=t; scene.backgroundIntensity=1;}); } scene.environment=pm.fromScene(studioEnv(),0.02).texture; const metalEnv=pm.fromScene(goldEnv(),0.02).texture; pm.dispose();
  const key=new THREE.DirectionalLight(0xfff3e2,1.9); key.position.set(-3,5,4); scene.add(key);
  const rim=new THREE.DirectionalLight(0xffc98a,1.4); rim.position.set(4,3,-3); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xfff6ec,0.55));
  const cam=new THREE.PerspectiveCamera(28,1,0.1,100);
  const bottles=ids.map(id=>makeBottle(id,quality));
  bottles.forEach(b=>b.traverse(o=>{if(o.material&&o.material.metalness===1){o.material.envMap=metalEnv;}}));
  const n=bottles.length, gap=opts.gap||2.1, lift=opts.lift||0, Y0=-(H+CAP_H)/2+lift;
  const stage=new THREE.Group(); scene.add(stage);
  bottles.forEach((b,i)=>{b.position.set((i-(n-1)/2)*gap,Y0,0); b.rotation.y=-0.12; stage.add(b); b.userData.baseX=b.position.x;});
  const sh=document.createElement("canvas"); sh.width=sh.height=128; const sx=sh.getContext("2d"); const gr=sx.createRadialGradient(64,64,4,64,64,62); gr.addColorStop(0,"rgba(20,10,6,.55)"); gr.addColorStop(1,"rgba(20,10,6,0)"); sx.fillStyle=gr; sx.fillRect(0,0,128,128);
  const shTex=new THREE.CanvasTexture(sh);
  bottles.forEach(b=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(2.1,0.8),new THREE.MeshBasicMaterial({map:shTex,transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.set(b.position.x,Y0-0.01,0); m.renderOrder=-1; stage.add(m);});

  const size=()=>{const w=canvas.clientWidth,h=canvas.clientHeight; if(!w||!h) return; renderer.setSize(w,h,false); cam.aspect=w/h; fitBg();
    const t=Math.tan(THREE.MathUtils.degToRad(cam.fov/2)); const span=n>1?(n-1)*gap+R*3.4:R*5.6;
    const fitW=span/2/t/cam.aspect, fitH=(H+CAP_H)*(opts.fit||1.12)/2/t;
    cam.position.set(0,0.55,Math.max(fitW,fitH)); cam.lookAt(0,0.05,0); cam.updateProjectionMatrix();
    if(opts.baseAt){ const want=1-2*opts.baseAt; stage.position.y=0; stage.updateMatrixWorld();
      const a=new THREE.Vector3(0,Y0,0).project(cam).y, b2=new THREE.Vector3(0,Y0+1,0).project(cam).y; stage.position.y=(want-a)/(b2-a); stage.updateMatrixWorld(true);
      bottles.forEach(b=>{b.userData.last.setFromMatrixPosition(b.matrixWorld);}); }
    if(opts.labels) bottles.forEach((b,i)=>{const v=new THREE.Vector3(b.userData.baseX,Y0+stage.position.y,0).project(cam); const el=opts.labels[i]; if(el){el.style.left=((v.x+1)/2*100)+"%"; el.style.top=((1-v.y)/2*100)+"%";}});};
  size(); const ro=new ResizeObserver(size); ro.observe(canvas);
  renderer.compile(scene,cam);                                   // compile shaders up front: no hitch on first frame

  const ray=new THREE.Raycaster(), ptr=new THREE.Vector2(); let drag=null, hover=-1, mx=0, my=0;
  const pick=e=>{const r=canvas.getBoundingClientRect(); ptr.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1); ray.setFromCamera(ptr,cam);
    for(let i=0;i<n;i++){ if(ray.intersectObject(bottles[i],true).length) return i;} return n===1?0:-1;};
  const onDown=e=>{const i=pick(e); if(i<0) return; drag={i,x:e.clientX,y:e.clientY,v:0}; canvas.setPointerCapture(e.pointerId); canvas.style.cursor="grabbing";};
  let pmRaf=0;
  const onMove=e=>{const r=canvas.getBoundingClientRect(); mx=(e.clientX-r.left)/r.width*2-1; my=(e.clientY-r.top)/r.height*2-1;
    if(drag){const b=bottles[drag.i]; const dx=e.clientX-drag.x, dy=e.clientY-drag.y; b.userData.spin=(b.userData.spin||0)+dx*0.012; drag.v=dx*0.012; b.userData.tiltT=THREE.MathUtils.clamp(dy*0.004,-0.5,0.5); drag.x=e.clientX; drag.y=e.clientY;}
    else if(!pmRaf){pmRaf=requestAnimationFrame(()=>{pmRaf=0; hover=pick(e); canvas.style.cursor=hover>=0?"grab":"default";});}};
  const up=()=>{if(drag){bottles[drag.i].userData.vel=drag.v; bottles[drag.i].userData.tiltT=0;} drag=null; canvas.style.cursor="grab";};
  canvas.addEventListener("pointerdown",onDown); canvas.addEventListener("pointermove",onMove);
  canvas.addEventListener("pointerup",up); canvas.addEventListener("pointercancel",up); canvas.addEventListener("pointerleave",()=>{hover=-1;mx=my=0;});
  let lastScroll=window.scrollY, scrollKick=0;
  const onScroll=()=>{const y=window.scrollY; scrollKick+=THREE.MathUtils.clamp((y-lastScroll)*0.0012,-0.18,0.18); lastScroll=y;}; window.addEventListener("scroll",onScroll,{passive:true});

  let visible=false; const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting;},{threshold:0}); io.observe(canvas);
  const clock=new THREE.Clock(); let raf=0, alive=true, first=true;
  const loop=()=>{ if(!alive) return; raf=requestAnimationFrame(loop); const dtRaw=clock.getDelta(); if(!visible||document.hidden) return;
    const dt=Math.min(dtRaw,0.04), t=clock.elapsedTime; scrollKick*=0.9;
    bottles.forEach((b,i)=>{const u=b.userData;
      if(!drag||drag.i!==i){u.vel=(u.vel||0)*0.93; u.spin=(u.spin||0)+u.vel;}
      const ry=-0.12+(u.spin||0)+Math.sin(t*0.55+i*1.7)*0.09+(hover===i?mx*0.35:0);
      b.rotation.y+=(ry-b.rotation.y)*0.16;
      const tz=(hover===i?-mx*0.12:0)+scrollKick*0.6*(i%2?1:-1)+Math.sin(t*0.9+i)*0.018;
      const tx=(u.tiltT||0)+(hover===i?my*0.08:0)+scrollKick;
      b.rotation.z+=(tz-b.rotation.z)*0.1; b.rotation.x+=(tx-b.rotation.x)*0.1;
      b.position.y=Y0+Math.sin(t*0.8+i*1.3)*0.045;
      updateLiquid(b,dt,t);
    });
    renderer.render(scene,cam);
    if(first){first=false; opts.onReady&&opts.onReady();}
  };
  loop();
  return {destroy(){alive=false;cancelAnimationFrame(raf);io.disconnect();ro.disconnect();window.removeEventListener("scroll",onScroll);renderer.dispose();renderer.forceContextLoss&&renderer.forceContextLoss();}};
}
