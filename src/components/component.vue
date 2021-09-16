<template>
  <el-row type="flex" class="page-container page-component">
    <el-col :span="4" style="height: 100%;">
      <el-scrollbar class="page-component__nav">
        <side-nav :data="NavData"></side-nav>
      </el-scrollbar>
    </el-col>
    <el-col :span="20" style="height: 100%;">
      <el-scrollbar class="page-component__content">
        <router-view class="content"></router-view>
      </el-scrollbar>
    </el-col>
    <el-backtop
      v-if="showBackToTop"
      target=".page-component__scroll .el-scrollbar__wrap"
      :right="100"
      :bottom="150"
    ></el-backtop>
  </el-row>
</template>
<script>
import SideNav from './side-nav.vue'
import NavData from '../nav.config.js'

export default {
  components: {
    SideNav
  },
  data () {
    return {
      NavData,
      showBackToTop: false
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  height: 100%;
}
.page-component {
  &__scroll {
    height: 100%;
  }
  &__content {
    height: 100%;
    .content {
      padding: 0 40px;
    }
  }
  &__nav {
    height: 100%;
  }
}
::v-deep .el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
  overflow-x: auto;
}
</style>
<style lang="scss">
  .page-component__scroll {
    height: calc(100% - 80px);

    > .el-scrollbar__wrap {
      overflow-x: auto;
    }
  }

  .page-component {
    box-sizing: border-box;
    height: 100%;
    &.page-container {
      padding: 0;
    }

    .page-component__nav {
      width: 240px;
      position: fixed;
      top: 0;
      bottom: 0;
      transition: padding-top .3s;

      > .el-scrollbar__wrap {
        height: 100%;
        overflow-x: auto;
      }

      &.is-extended {
        padding-top: 0;
      }
    }

    .side-nav {
      height: 100%;
      padding-bottom: 50px;
      padding-right: 0;

      & > ul {
        padding-bottom: 50px;
      }
    }

    .page-component__content {
      box-sizing: border-box;
    }

    .content {
      padding-top: 50px;

      > {
        h3 {
          margin: 55px 0 20px;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          background-color: #fff;
          font-size: 14px;
          margin-bottom: 45px;
          line-height: 1.5em;

          strong {
            font-weight: normal;
          }

          td, th {
            border-bottom: 1px solid #dcdfe6;
            padding: 15px;
            max-width: 250px;
          }

          th {
            text-align: left;
            white-space: nowrap;
            color: #909399;
            font-weight: normal;
          }

          td {
            color: #606266;
          }

          th:first-child, td:first-child {
            padding-left: 10px;
          }
        }

        ul:not(.timeline) {
          margin: 10px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          color: #5e6d82;
          line-height: 2em;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .page-component {
      .page-component__nav {
        width: 100%;
        position: static;
        margin-top: 0;
      }
      .side-nav {
        padding-top: 0;
        padding-left: 50px;
      }
      .page-component__content {
        padding-left: 10px;
        padding-right: 10px;
      }
      .content {
        padding-top: 0;
      }
      .content > table {
        overflow: auto;
        display: block;
      }
    }
  }
</style>
