import * as THREE from 'three';

import vs from './glsl/Points.vs';
import fs from './glsl/Points.fs';

export default class Points extends THREE.Points {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry();

    // Define attributes of the geometry
    const edgeCount = 16;
    const baPositions = new THREE.BufferAttribute(new Float32Array(Math.pow(edgeCount, 3) * 3), 3);
    const baUvs = new THREE.BufferAttribute(new Float32Array(Math.pow(edgeCount, 3) * 3), 3);
    for (let x = 0; x < edgeCount; x++) {
      const uvX = x / (edgeCount - 1);
      const posX = (uvX * 2.0 - 1.0) * 30;
      for (let y = 0; y < edgeCount; y++) {
        const uvY = y / (edgeCount - 1);
        const posY = (uvY * 2.0 - 1.0) * 30;
        for (let z = 0; z < edgeCount; z++) {
          const i = x * Math.pow(edgeCount, 2) + y * edgeCount + z
          const uvZ = z / (edgeCount - 1);
          const posZ = (uvZ * 2.0 - 1.0) * 30;
          baPositions.setXYZ(i, posX, posY, posZ);
          baUvs.setXYZ(i, uvX, uvY, uvZ);
        }
      }
    }
    geometry.setAttribute('position', baPositions);
    geometry.setAttribute('uv', baUvs);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        resolution: {
          value: new THREE.Vector2()
        },
        pixelRatio: {
          value: window.devicePixelRatio
        },
        noiseTex: {
          value: null
        },
        multiTime: {
          value: new THREE.Vector2()
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Points';
  }
  start(noiseTex, multiTime) {
    const { uniforms } = this.material;

    uniforms.noiseTex.value = noiseTex;
    uniforms.multiTime.value.copy(multiTime);
  }
  update(time) {
    const { uniforms } = this.material;

    uniforms.time.value += time;
  }
  resize(resolution) {
    const { uniforms } = this.material;

    uniforms.resolution.value.copy(resolution);
  }
}
