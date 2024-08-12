import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = ({style, imageSize = 4}) => {
    
    const mountRef = useRef(null);

    useEffect(() => {

        const currentRef = mountRef.current;
        
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
        currentRef.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/todo_Logo.png', function (texture) {
           
            const material = new THREE.MeshBasicMaterial({ map: texture });

            const aspectRatio = texture.image.height / texture.image.width;
            const geometry = new THREE.PlaneGeometry(imageSize, imageSize * aspectRatio);

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            let isPointerOverImage = false;

            currentRef.addEventListener('mousemove', function(event) {
                const rect = currentRef.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            });

            function animate() {
                requestAnimationFrame(animate);

                raycaster.setFromCamera(mouse, camera);

                const intersects = raycaster.intersectObject(mesh);

                if (intersects.length > 0) {
                    isPointerOverImage = true;
                    mesh.rotation.y = mouse.x * 1;
                    mesh.rotation.x = -mouse.y * 1;
                }else{
                    isPointerOverImage = false;
                }

                if (!isPointerOverImage) {
                    mesh.rotation.y += (-mesh.rotation.y) * 0.1;
                    mesh.rotation.x += (-mesh.rotation.x) * 0.1;
                }
            
                renderer.render(scene, camera);
            }
            animate();
        });

        window.addEventListener('resize', () => {
            const width = currentRef.clientWidth;
            const height = currentRef.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        return () => {
            currentRef.removeChild(renderer.domElement);
        };


    },[imageSize]);

    return <div ref={mountRef} style={style} />;
};

export default ThreeScene;