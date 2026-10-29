// Fragment shader for the homepage ribbon: a soft band of the five rating colours anchored top-right,
// dissolving into white on every edge. Ported verbatim from the prototype's pt-gradient (ribbon mode).
const NOISE = `
vec3 m289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 m289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 perm(vec4 x){return m289(((x*34.0)+1.0)*x);}
vec4 tis(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=m289(i);
  vec4 p=perm(perm(perm(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 nm=tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=nm.x;p1*=nm.y;p2*=nm.z;p3*=nm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export const RIBBON_FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;uniform float t;uniform float px;uniform vec3 c0,c1,c2,c3,c4;
${NOISE}
vec3 pal(float s){
  vec3 c=c0;
  c=mix(c,c1,smoothstep(0.16,0.40,s));
  c=mix(c,c2,smoothstep(0.40,0.62,s));
  c=mix(c,c3,smoothstep(0.62,0.86,s));
  c=mix(c,c4,0.4*smoothstep(0.92,1.12,s));
  return c;
}
void main(){
  vec2 g=gl_FragCoord.xy/px;vec2 R=r/px;
  float W=R.x;float U=clamp(0.42*W,300.0,560.0);float sh=max(0.0,1224.0-W)*0.6;
  float Yp=R.y-g.y;float X=(g.x-W-sh)/U;float Y=Yp/U;
  float T=t*0.14;
  float xc=-0.64+0.15*Y+0.10*Y*Y+0.05*sin(T*0.9+Y*1.6)+0.05*snoise(vec3(Y*1.3,T*0.6,1.0));
  float sl=0.15+0.2*Y;float cs=inversesqrt(1.0+sl*sl);
  float v=(xc-X)*cs;float u=Y/cs;
  float hw=0.34+0.06*snoise(vec3(u*0.8,3.0,T*0.5));
  float s=0.5-v/(2.0*hw);
  float w=snoise(vec3(u*1.5-T*1.2,s*1.3,T*0.7));
  vec3 col=pal(s+0.12*w+0.10*sin(u*1.1-T*0.8));
  float bnd=0.5+0.5*sin(u*2.6-T*2.0+s*2.2+w*0.8);
  float hl=exp(-pow((s-0.42-0.22*sin(u*1.2-T*1.1))*4.2,2.0));
  col=mix(col,vec3(1.0),0.34*hl*bnd+0.12);
  col*=0.95+0.05*bnd;
  float a=(1.0-smoothstep(hw-0.05,hw+0.42,v))*smoothstep(-hw-0.14,-hw+0.06,v);
  vec3 o=mix(vec3(1.0),col,a);
  o+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-0.5)/255.0;
  gl_FragColor=vec4(o,1.0);
}`;

export const RIBBON_VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}";

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
