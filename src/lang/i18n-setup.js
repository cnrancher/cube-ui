import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/zh'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  fallbackLocale: 'zh',
  messages // set locale messages
})

const loadedLanguages = ['zh']

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  Cookies.set('language', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (loadedLanguages.indexOf(lang) < 0) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
