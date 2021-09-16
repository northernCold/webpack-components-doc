<template>
  <div
    class="side-nav">
    <div
      v-for="(item, key) in data"
      :key="key">
      <ul class="nav-list sub-nav" v-if="item.children">
        <li
          class="nav-item"
          v-for="(navItem, key) in item.children"
          :key="key">
          <router-link
            class=""
            active-class="active"
            :to="base + navItem.path"
            exact
            v-text="navItem.title || navItem.name">
          </router-link>
        </li>
      </ul>
      <template v-if="item.groups">
        <div
          class="nav-group"
          v-for="(group, key) in item.groups"
          :key="key"
          >
          <div class="nav-group-title" @click="expandMenu">{{group.groupName}}</div>
          <ul class="nav-group-list">
            <li
              class="nav-item"
              v-for="(navItem, key) in group.list"
              v-show="!navItem.disabled"
              :key="key">
              <router-link
                active-class="active"
                :to="base + navItem.path"
                exact
                v-text="navItem.title"></router-link>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    base: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      highlights: [],
      navState: [],
      isSmallScreen: false,
      isFade: false
    }
  },
  watch: {
    '$route.path' () {
      this.handlePathChange()
    }
  },
  methods: {
    handleResize () {
      this.isSmallScreen = document.documentElement.clientWidth < 768
      this.handlePathChange()
    },
    handlePathChange () {
      if (!this.isSmallScreen) {
        this.expandAllMenu()
        return
      }
      this.$nextTick(() => {
        this.hideAllMenu()
        const activeAnchor = this.$el.querySelector('a.active')
        let ul = activeAnchor.parentNode
        while (ul.tagName !== 'UL') {
          ul = ul.parentNode
        }
        ul.style.height = 'auto'
      })
    },
    hideAllMenu () {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = '0'
      })
    },
    expandAllMenu () {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = 'auto'
      })
    },
    expandMenu (event) {
      if (!this.isSmallScreen) return
      const target = event.currentTarget
      if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return
      this.hideAllMenu()
      event.currentTarget.nextElementSibling.style.height = 'auto'
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style lang="scss" scoped>
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  height: 40px;
  line-height: 40px;
  padding: 0 16px 0 40px;
  margin: 4px 0 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.nav-group-title {
  padding-left: 20px;
}
</style>
