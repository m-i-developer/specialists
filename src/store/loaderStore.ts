import { makeAutoObservable } from 'mobx'

import { RootStore } from './rootStore'

class LoaderStore {
  rootStore: RootStore
  isLoading = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }
}

export default LoaderStore
