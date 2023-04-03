import HomeView from "../views/HomeView.vue"
const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta:{HeaderShow:true}
    },
    {
        path:'/user',
        component:()=>import('../views/UserView'),
        meta:{HeaderShow:false}
    },
    {
        path:'/search',
        component:()=>import('../views/SearchView.vue'),
        meta:{HeaderShow:false}
    },
    {
        path:'/songlist',
        component:()=>import('../views/SongList.vue'),
        meta:{HeaderShow:false}
    },
    {
        path:'/MV',
        component:()=>import('../views/MV.vue'),
        meta:{HeaderShow:false}
    },
    {
        redirect:(to)=>{
            return{
                path:'/home'
            }
        }
    }
]

export default routes 