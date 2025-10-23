import { computed, reactive, onMounted, watchEffect } from 'vue'

const THEME_KEY = 'app-theme'

const layoutConfig = reactive({
  preset: 'Aura',
  primary: 'fuchsia',
  surface: null,
  darkTheme: true,
  menuMode: 'static',
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
})

export function useLayout() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme) {
      layoutConfig.darkTheme = savedTheme === 'dark'
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      layoutConfig.darkTheme = prefersDark
      localStorage.setItem(THEME_KEY, prefersDark ? 'dark' : 'light')
    }

    applyThemeClass()
  }

  const applyThemeClass = () => {
    document.documentElement.classList.toggle('app-dark', layoutConfig.darkTheme)
  }

  const watchSystemTheme = () => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', (e) => {
      layoutConfig.darkTheme = e.matches
      localStorage.setItem(THEME_KEY, e.matches ? 'dark' : 'light')
      applyThemeClass()
    })
  }

  const toggleDarkMode = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme
    localStorage.setItem(THEME_KEY, layoutConfig.darkTheme ? 'dark' : 'light')
    applyThemeClass()
  }

  const setActiveMenuItem = (item) => {
    layoutState.activeMenuItem = item.value || item
  }

  const toggleMenu = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  )
  const isDarkTheme = computed(() => layoutConfig.darkTheme)
  const getPrimary = computed(() => layoutConfig.primary)
  const getSurface = computed(() => layoutConfig.surface)

  onMounted(() => {
    initTheme()
    watchSystemTheme()
  })

  watchEffect(() => applyThemeClass())

  return {
    layoutConfig,
    layoutState,
    toggleMenu,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
  }
}
