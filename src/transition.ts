import Dexie from 'dexie'

export class AssetsManager {

  detabase: Dexie
  
  constructor() {
    this.detabase = new Dexie('AssetsManagerDB')
    this.detabase.version(1).stores({
      assets: '++id, file, updated_at'
    })
  }

  async setAsset(file: File) {
    const a: any = this.detabase
    return await a.assets.add({
      file: file,
      updated_at: new Date()
    })
  }

  async getAsset(id: number) {
    const a: any = this.detabase
    return (await (await a.assets.where({
      id: id
    })).toArray())[0]
  }

  removeAll() {
    const a: any = this.detabase
    a.delete()
  }

  async transition(url: string, file: File) {
    const u = new URL(url)
    const id = await this.setAsset(file)
    u.searchParams.append('modelid', id)
    u.searchParams.append('fromsite', location.href)
    location.href = u.toString()
  }

  async send() {
    if (window.parent == null || window.parent === window) {
      return
    }
    const search = new URLSearchParams(location.search)
    if (search.has('modelid') && search.has('tosite')) {
      const modelid = parseInt(search.get('modelid')!)
      const tosite = new URL(search.get('tosite')!)
      const file = await this.getAsset(modelid)
      await this.removeAll()
      window.parent.postMessage(file, tosite.href)
    }
  }

  async receive() {
    return new Promise((resolve, reject) => {
      const search = new URLSearchParams(location.search)
      if(search.has('modelid') && search.has('fromsite')) {
        const modelid = parseInt(search.get('modelid')!)
        const fromsite = new URL(search.get('fromsite')!)
        const iframe: HTMLIFrameElement = document.createElement('iframe') as any
        fromsite.searchParams.append('modelid', `${modelid}`)
        fromsite.searchParams.append('tosite', location.href)
        iframe.src = fromsite.toString()
        iframe.width = `${0}`
        iframe.height = `${0}`
        document.body.appendChild(iframe)
        window.addEventListener('message', async (event) => {
          if (event.origin !== fromsite.origin) {
            return
          }
          resolve(event.data)
        })
      } else {
        reject()
      }
    })
  }

}