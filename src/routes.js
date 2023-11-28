import MainPage from "./pages/MainPage";
import CreateAdPage from "./pages/CreateAdPage";
import ProfilePage from "./pages/ProfilePage";
import CardPage from "./pages/CardPage";
import CatalogBoardPage from "./pages/CatalogBoardPage";
import LikeAdsPage from "./pages/LikeAdsPage";
import SimilarPage from "./pages/SimilarPage";
import SearchPage from "./pages/SearchPage";

export const publicRoutes = [
    {
        path: '/',
        Component: MainPage
    }, {
        path: '/card/:id',
        Component: CardPage
    }, {
        path: '/category',
        Component: CatalogBoardPage
    },{
        path: '/test',
        Component: LikeAdsPage
    },{
        path: '/similar',
        Component: SimilarPage
    },{
        path: '/search',
        Component: SearchPage
    }
]

export const privateRoutes = [
    {
        path: '/createAd',
        Component: CreateAdPage
    },
    {
        path: '/profile/:id',
        Component: ProfilePage
    }
]