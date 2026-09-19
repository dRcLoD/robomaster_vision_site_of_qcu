import DefaultTheme from 'vitepress/theme'
import NetdiskBrowser from './components/NetdiskBrowser.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NetdiskBrowser', NetdiskBrowser)
  }
}
