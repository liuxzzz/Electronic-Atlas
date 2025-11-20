'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 初始化相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8; // 拉远相机，让粒子分布更广
    cameraRef.current = camera;

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // 创建自定义粒子纹理（椭圆形）
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // 绘制椭圆形渐变粒子
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(66, 133, 244, 0.8)');
      gradient.addColorStop(0.5, 'rgba(66, 133, 244, 0.4)');
      gradient.addColorStop(1, 'rgba(66, 133, 244, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // 创建粒子系统 - 减少数量，使其更稀疏
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 80; // 减少粒子数量
    const posArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);

    // 生成粒子位置和大小
    for (let i = 0; i < particlesCount; i++) {
      // 位置 - 扩大分布范围
      posArray[i * 3] = (Math.random() - 0.5) * 20;     // x
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
      
      // 大小 - 随机大小，有大有小
      sizeArray[i] = Math.random() * 0.3 + 0.15;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizeArray, 1)
    );

    // 创建粒子材质
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x5B8FE8, // 更接近图片中的蓝色
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      blending: THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true, // 根据距离调整大小
    });

    // 创建粒子对象
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // 动画循环 - 极其缓慢的漂浮效果
    let animationFrameId: number;
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.001;

      // 非常缓慢的旋转和漂浮
      if (particlesRef.current) {
        particlesRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        particlesRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 处理窗口大小调整
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 鼠标移动交互 - 更微妙的效果
    const handleMouseMove = (event: MouseEvent) => {
      if (!particlesRef.current) return;

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // 非常轻微的跟随效果
      particlesRef.current.rotation.x += (mouseY * 0.02 - particlesRef.current.rotation.x) * 0.05;
      particlesRef.current.rotation.y += (mouseX * 0.02 - particlesRef.current.rotation.y) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (particlesGeometry) {
        particlesGeometry.dispose();
      }

      if (particlesMaterial) {
        particlesMaterial.dispose();
      }

      if (particleTexture) {
        particleTexture.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 w-full h-full pointer-events-none'
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeBackground;

