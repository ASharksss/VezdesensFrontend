import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.";
import MainPage from "./pages/MainPage";
import CreateAdPage from "./pages/CreateAdPage";
import ProfilePage from "./pages/ProfilePage";
import CardPage from "./pages/CardPage";
import CatalogBoardPage from "./pages/CatalogBoardPage";

export const publicRoutes = [
    {
        path: '/signin',
        Component: SignIn
    }, {
        path: '/signup',
        Component: SignUp
    }, {
        path: '/',
        Component: MainPage
    }, {
        path: '/card/:id',
        Component: CardPage
    }, {
        path: '/category',
        Component: CatalogBoardPage
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