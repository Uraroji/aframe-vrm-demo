import { THREE } from 'aframe'

export interface BoneKeys {
  chest?: string,
  head?: string,
  hips?: string,
  leftEye?: string,
  leftFoot?: string,
  leftHand?: string,
  leftIndexDistal?: string,
  leftIndexIntermediate?: string,
  leftIndexProximal?: string,
  leftLittleDistal?: string,
  leftLittleIntermediate?: string,
  leftLittleProximal?: string,
  leftLowerArm?: string,
  leftLowerLeg?: string,
  leftMiddleDistal?: string,
  leftMiddleIntermediate?: string,
  leftMiddleProximal?: string,
  leftRingDistal?: string,
  leftRingIntermediate?: string,
  leftRingProximal?: string,
  leftShoulder?: string,
  leftThumbDistal?: string,
  leftThumbIntermediate?: string,
  leftThumbProximal?: string,
  leftToes?: string,
  leftUpperArm?: string,
  leftUpperLeg?: string,
  neck?: string,
  rightEye?: string,
  rightFoot?: string,
  rightHand?: string,
  rightIndexDistal?: string,
  rightIndexIntermediate?: string,
  rightIndexProximal?: string,
  rightLittleDistal?: string,
  rightLittleIntermediate?: string,
  rightLittleProximal?: string,
  rightLowerArm?: string,
  rightLowerLeg?: string,
  rightMiddleDistal?: string,
  rightMiddleIntermediate?: string,
  rightMiddleProximal?: string,
  rightRingDistal?: string,
  rightRingIntermediate?: string,
  rightRingProximal?: string,
  rightShoulder?: string,
  rightThumbDistal?: string,
  rightThumbIntermediate?: string,
  rightThumbProximal?: string,
  rightToes?: string,
  rightUpperArm?: string,
  rightUpperLeg?: string,
  spine?: string,
  upperChest?: string,
}

interface TrackTimeLine { 
  keys: { 
    time: number, 
    rot?: number[] | THREE.Quaternion, 
    pos?: number[]
  }[]
}

export interface Tracks {
  chest?: TrackTimeLine,
  head?: TrackTimeLine
  hips?: TrackTimeLine
  leftEye?: TrackTimeLine
  leftFoot?: TrackTimeLine
  leftHand?: TrackTimeLine
  leftIndexDistal?: TrackTimeLine
  leftIndexIntermediate?: TrackTimeLine
  leftIndexProximal?: TrackTimeLine
  leftLittleDistal?: TrackTimeLine
  leftLittleIntermediate?: TrackTimeLine
  leftLittleProximal?: TrackTimeLine
  leftLowerArm?: TrackTimeLine
  leftLowerLeg?: TrackTimeLine
  leftMiddleDistal?: TrackTimeLine
  leftMiddleIntermediate?: TrackTimeLine
  leftMiddleProximal?: TrackTimeLine
  leftRingDistal?: TrackTimeLine
  leftRingIntermediate?: TrackTimeLine
  leftRingProximal?: TrackTimeLine
  leftShoulder?: TrackTimeLine
  leftThumbDistal?: TrackTimeLine
  leftThumbIntermediate?: TrackTimeLine
  leftThumbProximal?: TrackTimeLine
  leftToes?: TrackTimeLine
  leftUpperArm?: TrackTimeLine
  leftUpperLeg?: TrackTimeLine
  neck?: TrackTimeLine
  rightEye?: TrackTimeLine
  rightFoot?: TrackTimeLine
  rightHand?: TrackTimeLine
  rightIndexDistal?: TrackTimeLine
  rightIndexIntermediate?: TrackTimeLine
  rightIndexProximal?: TrackTimeLine
  rightLittleDistal?: TrackTimeLine
  rightLittleIntermediate?: TrackTimeLine
  rightLittleProximal?: TrackTimeLine
  rightLowerArm?: TrackTimeLine
  rightLowerLeg?: TrackTimeLine
  rightMiddleDistal?: TrackTimeLine
  rightMiddleIntermediate?: TrackTimeLine
  rightMiddleProximal?: TrackTimeLine
  rightRingDistal?: TrackTimeLine
  rightRingIntermediate?: TrackTimeLine
  rightRingProximal?: TrackTimeLine
  rightShoulder?: TrackTimeLine
  rightThumbDistal?: TrackTimeLine
  rightThumbIntermediate?: TrackTimeLine
  rightThumbProximal?: TrackTimeLine
  rightToes?: TrackTimeLine
  rightUpperArm?: TrackTimeLine
  rightUpperLeg?: TrackTimeLine
  spine?: TrackTimeLine
  upperChest?: TrackTimeLine
}

export const vrmBonesKey: BoneKeys = {
  chest: 'J_Bip_C_Chest',
  head: 'J_Bip_C_Head',
  hips: 'J_Bip_C_Hips',
  leftEye: 'J_Adj_L_FaceEye',
  leftFoot: 'J_Bip_L_Foot',
  leftHand: 'J_Bip_L_Hand',
  leftIndexDistal: 'J_Bip_L_Index3',
  leftIndexIntermediate: 'J_Bip_L_Index2',
  leftIndexProximal: 'J_Bip_L_Index1',
  leftLittleDistal: 'J_Bip_L_Little3',
  leftLittleIntermediate: 'J_Bip_L_Little2',
  leftLittleProximal: 'J_Bip_L_Little1',
  leftLowerArm: 'J_Bip_L_LowerArm',
  leftLowerLeg: 'J_Bip_L_LowerLeg',
  leftMiddleDistal: 'J_Bip_L_Middle3',
  leftMiddleIntermediate: 'J_Bip_L_Middle2',
  leftMiddleProximal: 'J_Bip_L_Middle1',
  leftRingDistal: 'J_Bip_L_Ring3',
  leftRingIntermediate: 'J_Bip_L_Ring2',
  leftRingProximal: 'J_Bip_L_Ring1',
  leftShoulder: 'J_Bip_L_Shoulder',
  leftThumbDistal: 'J_Bip_L_Thumb3',
  leftThumbIntermediate: 'J_Bip_L_Thumb2',
  leftThumbProximal: 'J_Bip_L_Thumb1',
  leftToes: 'J_Bip_L_ToeBase',
  leftUpperArm: 'J_Bip_L_UpperArm',
  leftUpperLeg: 'J_Bip_L_UpperLeg',
  neck: 'J_Bip_C_Neck',
  rightEye: 'J_Adj_R_FaceEye',
  rightFoot: 'J_Bip_R_Foot',
  rightHand: 'J_Bip_R_Hand',
  rightIndexDistal: 'J_Bip_R_Index3',
  rightIndexIntermediate: 'J_Bip_R_Index2',
  rightIndexProximal: 'J_Bip_R_Index1',
  rightLittleDistal: 'J_Bip_R_Little3',
  rightLittleIntermediate: 'J_Bip_R_Little2',
  rightLittleProximal: 'J_Bip_R_Little1',
  rightLowerArm: 'J_Bip_R_LowerArm',
  rightLowerLeg: 'J_Bip_R_LowerLeg',
  rightMiddleDistal: 'J_Bip_R_Middle3',
  rightMiddleIntermediate: 'J_Bip_R_Middle2',
  rightMiddleProximal: 'J_Bip_R_Middle1',
  rightRingDistal: 'J_Bip_R_Ring3',
  rightRingIntermediate: 'J_Bip_R_Ring2',
  rightRingProximal: 'J_Bip_R_Ring1',
  rightShoulder: 'J_Bip_R_Shoulder',
  rightThumbDistal: 'J_Bip_R_Thumb3',
  rightThumbIntermediate: 'J_Bip_R_Thumb2',
  rightThumbProximal: 'J_Bip_R_Thumb1',
  rightToes: 'J_Bip_R_ToeBase',
  rightUpperArm: 'J_Bip_R_UpperArm',
  rightUpperLeg: 'J_Bip_R_UpperLeg',
  spine: 'J_Bip_C_Spine',
  upperChest: 'J_Bip_C_UpperChest',
}

export const mixamoBonesKey: BoneKeys = {
  hips: 'mixamorigHips',
  spine: 'mixamorigSpine',
  chest: 'mixamorigSpine1',
  upperChest: 'mixamorigSpine2',
  leftShoulder: 'mixamorigLeftShoulder',
  leftUpperArm: 'mixamorigLeftArm',
  leftLowerArm: 'mixamorigLeftForeArm',
  leftHand: 'mixamorigLeftHand',
  rightShoulder: 'mixamorigRightShoulder',
  rightUpperArm: 'mixamorigRightArm',
  rightLowerArm: 'mixamorigRightForeArm',
  rightHand: 'mixamorigRightHand',
  leftUpperLeg: 'mixamorigLeftUpLeg',
  leftLowerLeg: 'mixamorigLeftLeg',
  leftFoot: 'mixamorigLeftFoot',
  leftToes: 'mixamorigLeftToeBase',
  rightUpperLeg: 'mixamorigRightUpLeg',
  rightLowerLeg: 'mixamorigRightLeg',
  rightFoot: 'mixamorigRightFoot',
  rightToes: 'mixamorigRightToeBase',
  neck: 'mixamorigNeck',
  head: 'mixamorigHead',
  leftEye: 'mixamorigLeftEye',
  rightEye: 'mixamorigRightEye',
  leftThumbProximal: 'mixamorigLeftHandThumb1',
  leftThumbIntermediate: 'mixamorigLeftHandThumb2',
  leftThumbDistal: 'mixamorigLeftHandThumb3',
  leftIndexProximal: 'mixamorigLeftHandIndex1',
  leftIndexIntermediate: 'mixamorigLeftHandIndex2',
  leftIndexDistal: 'mixamorigLeftHandIndex3',
  leftMiddleProximal: 'mixamorigLeftHandMiddle1',
  leftMiddleIntermediate: 'mixamorigLeftHandMiddle2',
  leftMiddleDistal: 'mixamorigLeftHandMiddle3',
  leftRingProximal: 'mixamorigLeftHandRing1',
  leftRingIntermediate: 'mixamorigLeftHandRing2',
  leftRingDistal: 'mixamorigLeftHandRing3',
  leftLittleProximal: 'mixamorigLeftHandPinky1',
  leftLittleIntermediate: 'mixamorigLeftHandPinky2',
  leftLittleDistal: 'mixamorigLeftHandPinky3',
  rightThumbProximal: 'mixamorigRightHandThumb1',
  rightThumbIntermediate: 'mixamorigRightHandThumb2',
  rightThumbDistal: 'mixamorigRightHandThumb3',
  rightIndexProximal: 'mixamorigRightHandIndex1',
  rightIndexIntermediate: 'mixamorigRightHandIndex2',
  rightIndexDistal: 'mixamorigRightHandIndex3',
  rightMiddleProximal: 'mixamorigRightHandMiddle1',
  rightMiddleIntermediate: 'mixamorigRightHandMiddle2',
  rightMiddleDistal: 'mixamorigRightHandMiddle3',
  rightRingProximal: 'mixamorigRightHandRing1',
  rightRingIntermediate: 'mixamorigRightHandRing2',
  rightRingDistal: 'mixamorigRightHandRing3',
  rightLittleProximal: 'mixamorigRightHandPinky1',
  rightLittleIntermediate: 'mixamorigRightHandPinky2',
  rightLittleDistal: 'mixamorigRightHandPinky3'
}

let q = (x: number, y: number, z: number) => 
  new THREE.Quaternion().setFromEuler(
    new THREE.Euler(x * Math.PI / 180, y * Math.PI / 180, z * Math.PI / 180))

export const exampleTracks: Tracks = {
  leftUpperArm: {
    keys: [
      { rot: q(0, 0, 65), time: 0 },
      { rot: q(0, 0, 63), time: 1000 },
      { rot: q(0, 0, 65), time: 2000 },
    ]
  },
  rightUpperArm: {
    keys: [
      { rot: q(0, 0, -65), time: 0 },
      { rot: q(0, 0, -60), time: 1000 },
      { rot: q(0, 0, -65), time: 2000 },
    ]
  },
  spine: {
    keys: [
      { rot: q(0, 2, 0), time: 0 },
      { rot: q(2, 0, -2), time: 1000 },
      { rot: q(2, -2, 0), time: 2000 },
      { rot: q(0, 0, 2), time: 3000 },
      { rot: q(0, 2, 0), time: 4000 },
    ]
  }
}

export function animationClipToTrack(clip: THREE.AnimationClip, keys: BoneKeys, usePos: boolean = false): Tracks {
  const findTracks = (t: THREE.KeyframeTrack[], name: string) => {
    return t.filter(v => v.name.split('.')[0] == name) 
  }
  let outTrack: any = {}
  for (let k in keys) {
    let ks = keys as any
    let v = ks[k] as string
    let nameTracks = findTracks(clip.tracks, v)
    
    if (nameTracks.length > 0) {
      let key: any[] = []

      for (let i = 0; i < nameTracks[0].times.length; i++) {
        let obj: any = {
          time: parseInt(`${nameTracks[0].times[i] * 1000}`)
        }
        for (let t of nameTracks) {
          switch (t.name.split('.')[1]) {
          case 'position':
            if (usePos) {
              obj['pos'] = [
                -t.values[i * 3 + 0] * 0.008,
                 t.values[i * 3 + 1] * 0.008,
                -t.values[i * 3 + 2] * 0.008,
              ]
            }
            break
          case 'quaternion':
            obj['rot'] = new THREE.Quaternion(
              -t.values[i * 4 + 0],
               t.values[i * 4 + 1],
              -t.values[i * 4 + 2],
               t.values[i * 4 + 3],
            )
            break
          }
        }
        key.push(obj)
      }

      outTrack[k] = {
        keys: key
      }
    }
  }
  
  return outTrack
}

export function tracksToAnimationClip(tracks: Tracks, name: string = 'default', keys: BoneKeys = vrmBonesKey) {
  const clip = THREE.AnimationClip.parseAnimation(
    {
      name: name,
      hierarchy: Object.values(tracks)
    },
    Object.keys(tracks).map(k => {
      return { name: k } as any
    })
  )
  for (let i=0; i<clip.tracks.length; i++) {
    const splitName = clip.tracks[i].name.split(/\[|\]/) as string[]
    const k = keys as any
    clip.tracks[i].name = k[splitName[1]] + splitName[2]
  }
  return clip
}
