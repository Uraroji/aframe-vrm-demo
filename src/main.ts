import { registerComponent, THREE } from 'aframe'
import { VRM } from '@pixiv/three-vrm'
import { animationClipToTrack, tracksToAnimationClip, mixamoBonesKey } from './animation'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import 'aframe-environment-component'

registerComponent('vrm-model', {
  
  model: null as THREE.Group | null,
  mixer: null as THREE.AnimationMixer | null,
  animation: null as THREE.AnimationAction | null,
  speed: 2.5,
  angle: 0,
  
  schema: { type: 'model' },

  init() {
    if (this.data) {
      (async () => {

        const three: any = THREE
        const gltfLoader = new three.GLTFLoader()

        if (!this.el.getAttributeNames().includes('position')) {
          this.el.setAttribute('position', new THREE.Vector3(0, 0, 0))
        }

        try {
          const gltf = await gltfLoader.loadAsync(this.data)
          const model: VRM = await VRM.from(gltf)
          this.model = model.scene as THREE.Group
          this.el.setObject3D('mesh', model.scene)
          this.el.emit('vrm-loaded', {format: 'vrm', component: this})
        } catch(error) {
          this.el.emit('vrm-error', {format: 'vrm', src: this.data});
        }

      })()
    }
  },
  
  tick(time, timeDelta) {
    if (this.mixer) {
      this.mixer.update(timeDelta)
    }
  },

})

registerComponent('vrm-mixamo-motion', {
  schema: { type: 'model' },
  init() {
    if (this.data) {
      (async () => {
        try {
          const fbxLoader = new FBXLoader()
          
          const fbx = await fbxLoader.loadAsync(this.data)
          const track = animationClipToTrack(fbx.animations[0], mixamoBonesKey)
          const clip = tracksToAnimationClip(track)

          this.el.addEventListener('vrm-loaded', (e) => {
            let ev: any = e
            const self = ev.detail.component
            self.mixer = new THREE.AnimationMixer(self.el.object3D)
            self.model!.animations.push(clip)
            self.animation = self.mixer.clipAction(self.model!.animations[0])
            self.animation.play()
          })
          
        } catch (err) {
        }
      })()
    }
  },
})