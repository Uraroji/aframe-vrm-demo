import { registerComponent, THREE } from 'aframe'
import { tracksToAnimationClip } from './animation'
import { userVRMLoadAsync } from './userLoader'
import TWEEN from '@tweenjs/tween.js'
import 'aframe-environment-component'


registerComponent('vrm-anchor', {
  avatarEl: null as any,
  schema: { 
    model: { type: 'selector' },
    href: { type: 'asset' }
  },
  init() {
    this.avatarEl = this.data.model
  },
  tick() {
    if ( this.el.object3D && this.avatarEl ) {
      if (this.avatarEl.object3D) {
        const box1 = new THREE.Box3().setFromObject(this.el.object3D)
        const box2 = new THREE.Box3().setFromObject(this.avatarEl.object3D)
        if ( box1.intersectsBox(box2) ) {
          console.log('遷移')
        }
      }
    }
  },
})

registerComponent('vrm-model', {
  
  model: null as THREE.Group | null,
  mixer: null as THREE.AnimationMixer | null,
  animation: null as THREE.AnimationAction | null,
  vrmFile: null as File | null,
  
  schema: { type: 'model' },

  init() {
    if (this.data) {
      (async () => {
        try {
          const fblob = await fetch(this.data)
            .then(res => {
              return res.blob().then(blob => ({
                contentType: res.headers.get("Content-Type"),
                blob: blob
              }))
            })
            .then(data => {
              return new File(
                [data.blob], 
                this.data, 
                {type: data.contentType!}
              )
            })
          this.vrmFile = fblob
          const model = await userVRMLoadAsync(fblob)
          this.model = model.scene as THREE.Group
          this.el.setObject3D('mesh', this.model)
          this.el.emit('vrm-loaded', {format: 'vrm', component: this})
        } catch(error) {
          this.el.emit('vrm-error', {format: 'vrm', src: this.data});
        }

      })()
    } else {
      this.el.innerHTML += `
      <div id="loader" style="
        border-radius: 30px;
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
          this.vrmFile = loadButton.files[0]
          await this.vrmFileLoad(loadButton.files[0])
        }
      }
    }
  },

  async vrmFileLoad(file: File) {
    const model = await userVRMLoadAsync(file)
    this.model = model.scene as THREE.Group
    this.el.setObject3D('mesh', this.model)
    this.el.emit('vrm-loaded', {format: 'vrm', component: this})
    this.el.querySelector('#loader')?.remove()
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


registerComponent('vrm-controller', {
  self: null as any,
  _keylock: false,
  _state: 'up' as 'up' | 'down' | 'left' | 'right',
  _initRot: null as THREE.Quaternion | null,
  _angle: 0,
  _speed: 0,
  moveSpeed: 0.5,
  async setClips(name: string, url: string): Promise<THREE.AnimationClip> {
    const res = await fetch(url).then(v=>v.json())
    const clip = tracksToAnimationClip(res)
    clip.name = name
    return clip
  },
  init() {
    this.el.addEventListener('vrm-loaded', async (e) => {
      (async () => {
        try {
          let ev: any = e
          const self = ev.detail.component
          self.model!.animations.push(await this.setClips('idle', '../assets/idle.json'))
          self.model!.animations.push(await this.setClips('walk', '../assets/walk.json'))
          self.model!.animations.push(await this.setClips('run', '../assets/run.json'))
          self.mixer = new THREE.AnimationMixer(self.el.object3D)
          self.animation = self.mixer.clipAction(self.model!.animations[0])
          self.animation.clampWhenFinished = true
          self.animation.play()
          this._initRot = self.el.object3D.quaternion
          this.self = self
        } catch(err) {
          console.error(err)
        }
      })()
    })
    window.addEventListener('keydown', event => {
      if (this.self) {
        if (event.code === 'KeyI' && !this._keylock) {
          this.self.animation.fadeOut(500)
          this.self.animation = 
            this.self.mixer.clipAction(this.self.model!.animations[1])
            this.self.animation.clampWhenFinished = true
          this.self.animation
            .reset()
            .setLoop(Infinity)
            .fadeIn(500)
            .play()
          this._keylock = true
          const q: THREE.Quaternion = this.self.el.object3D.quaternion
          const axis = new THREE.Vector3(0, 1, 0).normalize()
          new TWEEN.Tween({angle: this._angle, speed: this._speed})
            .easing(TWEEN.Easing.Exponential.Out)
            .to({angle: 0, speed: 0.002}, 500)
            .onUpdate((data) => {
              this._angle = data.angle
              this._speed = data.speed
              q.copy(
                this._initRot!.setFromAxisAngle(axis, this._angle)
              )
            })
            .start()
        } 
        if (event.code === 'KeyJ' && !this._keylock) {
          this.self.animation.fadeOut(500)
          this.self.animation = 
            this.self.mixer.clipAction(this.self.model!.animations[1])
            this.self.animation.clampWhenFinished = true
          this.self.animation
            .reset()
            .setLoop(Infinity)
            .fadeIn(500)
            .play()
          this._keylock = true
          const q: THREE.Quaternion = this.self.el.object3D.quaternion
          const axis = new THREE.Vector3(0, 1, 0).normalize()
          new TWEEN.Tween({angle: this._angle, speed: this._speed})
            .easing(TWEEN.Easing.Exponential.Out)
            .to({angle: Math.PI / 2, speed: 0.002}, 500)
            .onUpdate((data) => {
              this._angle = data.angle
              this._speed = data.speed
              q.copy(
                this._initRot!.setFromAxisAngle(axis, this._angle)
              )
            })
            .start()
        }
        if (event.code === 'KeyL' && !this._keylock) {
          this.self.animation.fadeOut(500)
          this.self.animation = 
            this.self.mixer.clipAction(this.self.model!.animations[1])
            this.self.animation.clampWhenFinished = true
          this.self.animation
            .reset()
            .setLoop(Infinity)
            .fadeIn(500)
            .play()
          this._keylock = true
          const q: THREE.Quaternion = this.self.el.object3D.quaternion
          const axis = new THREE.Vector3(0, 1, 0).normalize()
          new TWEEN.Tween({angle: this._angle, speed: this._speed})
            .easing(TWEEN.Easing.Exponential.Out)
            .to({angle: -Math.PI / 2, speed: 0.002}, 500)
            .onUpdate((data) => {
              this._angle = data.angle
              this._speed = data.speed
              q.copy(
                this._initRot!.setFromAxisAngle(axis, this._angle)
              )
            })
            .start()
        }
        if (event.code === 'KeyK' && !this._keylock) {
          this._angle = Math.PI
          this.self.animation.fadeOut(500)
          this.self.animation = 
            this.self.mixer.clipAction(this.self.model!.animations[1])
            this.self.animation.clampWhenFinished = true
          this.self.animation
            .reset()
            .setLoop(Infinity)
            .fadeIn(500)
            .play()
          this._keylock = true
          const q: THREE.Quaternion = this.self.el.object3D.quaternion
          const axis = new THREE.Vector3(0, 1, 0).normalize()
          new TWEEN.Tween({angle: this._angle, speed: this._speed})
            .easing(TWEEN.Easing.Exponential.Out)
            .to({angle: Math.PI, speed: 0.002}, 500)
            .onUpdate((data) => {
              this._angle = data.angle
              this._speed = data.speed
              q.copy(
                this._initRot!.setFromAxisAngle(axis, this._angle)
              )
            })
            .start()
        }
      }
    })
    window.addEventListener('keyup', event => {
      if (this.self) {
        if (
          (
            event.code === 'KeyI' ||
            event.code === 'KeyJ' ||
            event.code === 'KeyL' ||
            event.code === 'KeyK'
          )
          && this._keylock
        ) {
          this.self.animation.fadeOut(500)
          this.self.animation = 
            this.self.mixer.clipAction(this.self.model!.animations[0])
          this.self.animation.clampWhenFinished = true
          this.self.animation
            .reset()
            .setLoop(Infinity)
            .fadeIn(500)
            .play()
          this._keylock = false
        }
      }
    })
  },
  tick(time, timeDelta) {
    if (this._keylock) {
      TWEEN.update()
      const pos = this.self.el.object3D.position
      pos.x -= Math.sin(this._angle) * timeDelta * this._speed
      pos.z -= Math.cos(this._angle) * timeDelta * this._speed
    }
  }
})