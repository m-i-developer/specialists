import { makeAutoObservable } from 'mobx'

import LoaderStore from './loaderStore'
import SpecialistsStore from './Specialists/specialistsStore'

export class RootStore {
  loaderStore = new LoaderStore(this)
  specialistsStore = new SpecialistsStore(this)

  constructor() {
    makeAutoObservable(this)
  }
}
