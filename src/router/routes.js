import HomeView from "../views/HomeView.vue"
const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta:{HeaderShow:true,FooterShow:true}
    },
    {
        path:'/user',
        component:()=>import('../views/UserView'),
        meta:{HeaderShow:false,FooterShow:true}
    },
    {
        path:'/search',
        component:()=>import('../views/SearchView.vue'),
        meta:{HeaderShow:false,FooterShow:true}
    },
    {
        path:'/songlist',
        component:()=>import('../views/SongList.vue'),
        meta:{HeaderShow:false,FooterShow:true}
    },
    {
        path:'/MV',
        component:()=>import('../views/MV.vue'),
        meta:{HeaderShow:false,FooterShow:false}
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