import { makeAutoObservable, runInAction } from 'mobx'
import { request } from 'utils/request'
import { SPECIALISTS } from '../utils/apiConstants'

import { RootStore } from '../rootStore'
import {
  ActiveFilters,
  SpecialistCardType,
} from 'pages/Specialists/Specialists.types'
import i18n from 'i18n'

class SpecialistsStore {
  rootStore: RootStore
  specialists: SpecialistCardType[] = []
  error: string | null = null
  specialistsRequested = false
  shouldSendRequest = false
  hasMoreSpecialists = false
  scrollLoaderVis = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchSpecialists(
    searchText = '',
    activeFilters: ActiveFilters = {},
    isScroll = false,
    isFirstRender = false
  ) {
    isScroll
      ? this.setScrollLoaderVis(true)
      : this.rootStore.loaderStore.setIsLoading(true)

    const res = await request(
      `${SPECIALISTS}`,
      'POST',
      {},
      { searchText, activeFilters, isScroll },
      ''
    )

    runInAction(() => {
      this.specialistsRequested = true
      this.shouldSendRequest = false

      if (res.success) {
        const payload = res?.payload
        this.specialists = payload.specialists
        // после 1ого рендера выставляем true, чтобы при скролле получилось сделать новый запрос
        // потом рандом
        if (isFirstRender) {
          this.hasMoreSpecialists = true
        }
        if (isScroll) {
          this.hasMoreSpecialists = this.getRandomLength(-10, 10) > 0
        }
      } else {
        this.error = i18n.t('userSettings.changesSaved')
        this.hasMoreSpecialists = false
      }
    })
    isScroll
      ? this.setScrollLoaderVis(false)
      : this.rootStore.loaderStore.setIsLoading(false)
  }

  setScrollLoaderVis(scrollLoaderVis: boolean) {
    this.scrollLoaderVis = scrollLoaderVis
  }

  getRandomLength(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  setShouldSendRequest(shouldSendRequest: boolean) {
    this.shouldSendRequest = shouldSendRequest
  }

  setSpecialists(specialists: SpecialistCardType[]) {
    this.specialists = specialists
  }
}

export default SpecialistsStore
