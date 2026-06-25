import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Mask model component
const MaskModel = React.forwardRef(({ position, rotation }, ref) => {
  const { scene } = useGLTF('/models/Mask.glb');

  return <primitive ref={ref} object={scene} position={position} rotation={rotation} />;
});

// Main component
export default function ScrollAnimation() {
  const beeRef = useRef();

  const arrPositionModel = [
    {
      id: 'banner',
      position: { x: 0, y: -0.08, z: 0 },
      rotation: { x: 0, y: -0.8, z: 0 }
    },
    {
      id: "intro",
      position: { x: 1, y: 0, z: -5 },
      rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
      id: "description",
      position: { x: -1, y: 0, z: -5 },
      rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
      id: "contact",
      position: { x: 0.8, y: 0, z: 0 },
      rotation: { x: 0.3, y: -0.5, z: 0 },
    },
  ];

  const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        currentSection = section.id;
      }
    });
    let position_active = arrPositionModel.findIndex(
      (val) => val.id == currentSection
    );
    if (position_active >= 0 && beeRef.current) {
      let new_coordinates = arrPositionModel[position_active];
      gsap.to(beeRef.current.position, {
        x: new_coordinates.position.x,
        y: new_coordinates.position.y,
        z: new_coordinates.position.z,
        duration: 3,
        ease: "power1.out"
      });
      gsap.to(beeRef.current.rotation, {
        x: new_coordinates.rotation.x,
        y: new_coordinates.rotation.y,
        z: new_coordinates.rotation.z,
        duration: 3,
        ease: "power1.out"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      modelMove();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 10 }}
        gl={{ alpha: true }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 10, pointerEvents: 'none', background: 'transparent' }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[-10, 0, 8]} intensity={2} />
        <MaskModel ref={beeRef} position={[0, -0.08, 0]} rotation={[0, -0.8, 0]} />
      </Canvas>

      {/* HTML Content */}

      <div className="section" id="banner">
        <div className="content-fit">
          <div className="title" data-before="WEBSITEDESIGN">3D ANIMATION</div>
        </div>
        <img src="/img/flower.png" className="decorate" alt="" style={{ width: '50vw', bottom: 0, right: 0 }} />
        <img src="/img/leaf.png" className="decorate" alt="" style={{ width: '30vw', bottom: 0, left: 0 }} />
      </div>
      <div className="section" id="intro">
        <div className="content-fit">
          <div className="number">01</div>
          <div className="des">
            <div className="title">Experience</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus voluptas a porro libero
              recusandae quae, aut ratione, incidunt laborum, necessitatibus similique enim doloremque ex.
              Laudantium obcaecati aspernatur doloremque illo beatae, maxime hic itaque consequatur nisi
              accusantium veritatis, voluptatem ratione! Placeat numquam nisi reiciendis harum quibusdam tempore
              eaque deleniti accusantium, veniam quae eos sed, asperiores laborum corporis odit mollitia
              consequatur adipisci? Quibusdam quis eos debitis non esse blanditiis laudantium rerum odit tempora?
              Corrupti maiores velit consequuntur cupiditate reiciendis similique provident repudiandae.</p>
          </div>
        </div>
      </div>
      <div className="section" id="description">
        <div className="content-fit">
          <div className="number">02</div>
          <div className="des">
            <div className="title">Pat</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus voluptas a porro libero
              recusandae quae, aut ratione, incidunt laborum, necessitatibus similique enim doloremque ex.
              Laudantium obcaecati aspernatur doloremque illo beatae, maxime hic itaque consequatur nisi
              accusantium veritatis, voluptatem ratione! Placeat numquam nisi reiciendis harum quibusdam tempore
              eaque deleniti accusantium, veniam quae eos sed, asperiores laborum corporis odit mollitia
              consequatur adipisci? Quibusdam quis eos debitis non esse blanditiis laudantium rerum odit tempora?
              Corrupti maiores velit consequuntur cupiditate reiciendis similique provident repudiandae.</p>
          </div>
        </div>
        <img src="/img/leaf1.png" className="decorate" alt="" style={{ width: '70vw', bottom: 0, right: 0, zIndex: 101 }} />
      </div>
      <div className="section" id="contact">
        <div className="content-fit">
          <div className="number">03</div>
          <div className="des">
            <div className="title">CONTACT</div>
            <table>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>test@gmail.com</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>+4529257032</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>patrickhoejberg.dev</td>
                </tr>
                <tr>
                  <td>LinkedIn</td>
                  <td>@patrickhoejberg</td>
                </tr>
              </tbody>
            </table>
            <div className="sign">Patrick</div>
          </div>
        </div>
      </div>
    </>
  );
}