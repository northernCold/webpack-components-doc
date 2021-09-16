<template>
  <div id="app">
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>
<script>

export default {}
</script>
<style lang="scss">
html, body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .hljs {
    line-height: 1.8;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    font-size: 12px;
    padding: 18px 24px !important;
    box-sizing: border-box;
    background-color: #fafafa;
    border: solid 1px #eaeefb;
    margin-bottom: 25px;
    border-radius: 4px;
    -webkit-font-smoothing: auto;
  }
  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #fff;
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main-container {
  height: 100%;
}
</style>
