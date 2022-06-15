import { registerComponent, THREE } from 'aframe'
import { VRM } from '@pixiv/three-vrm'
import { tracksToAnimationClip } from './animation'
import { userVRMLoadAsync } from './userLoader'
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
    } else {
      this.el.innerHTML += `
      <div id="loader" style="
      box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
        position: absolute;
        left: 50px;
        top: 50px;
        z-index: 1000;
        padding: 20px;
        background: #fff;
      ">
        <h2>VRM読み込み<h2>
        <input id="vrmfile" type="file" accept=".vrm"/>
      </div>
      `
      const loadButton: any = document.querySelector('#vrmfile')
      loadButton.onchange = async () => {
        if (loadButton.files !== null && loadButton.files.length > 0) {
          const model = await userVRMLoadAsync(loadButton.files[0])
          this.model = model.scene as THREE.Group
          this.el.setObject3D('mesh', this.model)
          this.el.emit('vrm-loaded', {format: 'vrm', component: this})
          this.el.querySelector('#loader')?.remove()
        }
      }
    }
  },
  
  tick(time, timeDelta) {
    if (this.mixer) {
      this.mixer.update(timeDelta)
    }
  },

})

registerComponent('vrm-motion', {
  schema: { type: 'model' },
  init() {
    if (this.data) {
      (async () => {
        try {
          const res = await fetch(this.data).then(v=>v.json())
          const clip = tracksToAnimationClip(res)
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
  }
})