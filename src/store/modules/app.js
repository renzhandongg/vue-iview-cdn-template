import {
    setTagNavListInSession,
    getTagNavListFromSession,
    getNextRoute,
    routeEqual,
    getRouteTitleHandled,
    routeHasExist
} from '@/utils'

const homeName = 'user'
import router from '@/router'
const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter((item) => {
        return !routeEqual(item, route)
    })
    router.push(nextRoute)
}
export default {
    state: {
        tagNavList: [],
    },
    getters: {},
    mutations: {
        setTagNavList(state, list) {
            let tagList = []
            if (list) {
                tagList = [...list]
            } else tagList = getTagNavListFromSession() || [];
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0]
                tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInSession([...tagList])
        },
        closeTag(state, route) {
            let tag = state.tagNavList.filter((item) => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
        },
        addTag(state, {
            route,
            type = 'unshift'
        }) {
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                if (type === 'push') state.tagNavList.push(router)
                else {
                    if (router.name === homeName) state.tagNavList.unshift(router)
                    else state.tagNavList.splice(1, 0, router)
                }
                setTagNavListInSession([...state.tagNavList])
            }
        },
    },
    actions: {}
}