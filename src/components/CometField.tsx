import { useEffect, useRef } from 'react'

// "Comet star" aurora shader (user-supplied AnoAI fragment), ported to raw
// WebGL2 and tamed for integrated GPUs: low internal res, 30fps, 22 trails,
// paused offscreen. Blended with `screen` so black reads as transparent.
const FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float iTime;
uniform vec2 iResolution;

#define NUM_OCTAVES 3

float rand(vec2 n){return fract(sin(dot(n,vec2(12.9898,4.1414)))*43758.5453);}
float noise(vec2 p){
  vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);
  float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}
float fbm(vec2 x){
  float v=0.0;float a=0.3;vec2 shift=vec2(100.0);
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
  for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}
  return v;
}

void main(){
  vec2 shake=vec2(sin(iTime*1.2)*0.005,cos(iTime*2.1)*0.005);
  vec2 p=((gl_FragCoord.xy+shake*iResolution.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.0,-4.0,4.0,6.0);
  vec2 v;vec4 o=vec4(0.0);
  float f=2.0+fbm(p+vec2(iTime*5.0,0.0))*0.5;
  for(float i=0.0;i<22.0;i++){
    v=p+cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13.0,11.0))*3.5+vec2(sin(iTime*3.0+i)*0.003,cos(iTime*3.5-i)*0.003);
    float tailNoise=fbm(v+vec2(iTime*0.5,i))*0.3*(1.0-(i/22.0));
    vec4 auroraColors=vec4(
      0.1+0.3*sin(i*0.2+iTime*0.4),
      0.3+0.5*cos(i*0.3+iTime*0.5),
      0.7+0.3*sin(i*0.4+iTime*0.3),
      1.0
    );
    vec4 contrib=auroraColors*exp(sin(i*i+iTime*0.8))/length(max(v,vec2(v.x*f*0.015,v.y*1.5)));
    float thinness=smoothstep(0.0,1.0,i/22.0)*0.6;
    o+=contrib*(1.0+tailNoise*0.8)*thinness;
  }
  o=tanh(pow(o/100.0,vec4(1.6)));
  O=o*2.4;
  O.a=1.0;
}`

const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

export default function CometField({ className = '', opacity = 0.55 }: { className?: string; opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const gl = canvas.getContext('webgl2')
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const program = gl.createProgram()!
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'iResolution')
    const uTime = gl.getUniformLocation(program, 'iTime')

    const scale = () => {
      const r = canvas.parentElement!.getBoundingClientRect()
      const aspect = r.width / Math.max(1, r.height)
      canvas.width = 420
      canvas.height = Math.min(560, Math.max(1, Math.floor(420 / aspect)))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    scale()
    window.addEventListener('resize', scale)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    let raf = 0
    let last = 0
    let t = 0
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || now - last < 33) return
      t += Math.min(now - last, 100) * 1e-3
      last = now
      gl.useProgram(program)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', scale)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen', opacity }}
      aria-hidden
    />
  )
}
