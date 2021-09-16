import navConfig from '../nav.config.js'

const registerRoute = navConfig => {
  const route = []
  const navs = navConfig
  navs.forEach(nav => {
    if (nav.href) return
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  function addRoute (page) {
    const child = {
      path: page.path,
      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: 'component-' + (page.title || page.name),
      component: () => import(`../docs/${page.path}.md`)
    }

    route.push(child)
  }
  return route
}

const route = registerRoute(navConfig)

export default route
