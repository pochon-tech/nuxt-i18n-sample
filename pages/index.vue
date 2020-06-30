<template>
  <div class="container">
    <div>
      <logo />
      <main>
        <h1>Vue: {{ $t('home') }}</h1>
        <h1>Data: {{ $t(greeting) }}</h1>
        <h1>Data: {{ count }}</h1>
        <h1>Store: {{ $store.state.counter }}</h1>
        <h1>Store:{{ $t($store.state.greeting2) }}</h1>

 
        <nuxt-link
          v-if="$i18n.locale !== 'en'"
          :to="switchLocalePath('en')"
        >
          English
        </nuxt-link>
 
        <nuxt-link
          v-if="$i18n.locale !== 'jp'"
          :to="switchLocalePath('jp')"
        >
          日本語
        </nuxt-link>
 
        <nuxt-link
          v-if="$i18n.locale !== 'cn'"
          :to="switchLocalePath('cn')"
        >
          中国語
        </nuxt-link>
      </main>
    </div>
  </div>
</template>
 
<script>
import Logo from '~/components/Logo.vue'
 
export default {
  components: {
    Logo
  },
  data: function () {
    return {
      count: 0,
      greeting: 'greeting'
    }
  },
}
</script>
 
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
 
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
 
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
 
.links {
  padding-top: 15px;
}
</style>