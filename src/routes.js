import MainPage from "./pages/MainPage";
import CreateAdPage from "./pages/CreateAdPage";
import ProfilePage from "./pages/ProfilePage";
import CardPage from "./pages/CardPage";
import CatalogBoardPage from "./pages/CatalogBoardPage";
import SimilarPage from "./pages/SimilarPage";
import SearchPage from "./pages/SearchPage";
import ServicePage from "./pages/ServicePage";
import CardEditPage from "./pages/CardEditPage";
import HomePage from "./pages/HomePage";

export const publicRoutes = [
    {
        path: '/',
        Component: HomePage
    }, {
        path: '/home',
        Component: HomePage
    }, {
        path: '/card/:id',
        Component: CardPage
    }, {
        path: '/category',
        Component: CatalogBoardPage
    },{
        path: '/similar',
        Component: SimilarPage
    },{
        path: '/search',
        Component: SearchPage
    },{
        path: '/service',
        Component: ServicePage
    },{
        path: '/profile/:id',
        Component: ProfilePage
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
    },
		{
			path: '/card/:id/edit',
			Component: CardEditPage
		}
]