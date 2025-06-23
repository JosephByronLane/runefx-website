import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RenderComponent } from './pages/render/render.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { VfxComponent } from './pages/vfx/vfx.component';
import { RunicRendererComponent } from './pages/runic-renderer/runic-renderer.component';
import { SphericalHarmonicsComponent } from './pages/spherical-harmonics/spherical-harmonics.component';
import { AxiomComponent } from './pages/axiom/axiom.component';
import { RqueueComponent } from './pages/rqueue/rqueue.component';
import { ForgeComponent } from './pages/forge/forge.component';
import { TryBuyComponent } from './pages/try-buy/try-buy.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { CommunityComponent } from './pages/community/community.component';
import { ForumComponent } from './pages/forum/forum.component';
import { SingleForumTopicComponent } from './pages/single-forum-topic/single-forum-topic.component';
export const routes: Routes = [
    {
        path: '',
        title:'RuneFX | Home',
        component: HomeComponent
    },
    {
        path:'render',
        title:'RuneFX | Technologies',
        component: RenderComponent
    },
    {
        path:'render/runic-renderer',
        title:'RuneFX | Runic Renderer',
        component: RunicRendererComponent
    },
    {
        path:'render/spherical-harmonics',
        title:'RuneFX | Spherical Harmonics',
        component: SphericalHarmonicsComponent
    },
    {
        path:'render/axiom',
        title:'RuneFX | Axiom',
        component: AxiomComponent
    },
    {
        path:'render/rqueue',
        title:'RuneFX | RQueue',
        component: RqueueComponent
    },
    {
        path:'render/forge',
        title:'RuneFX | Forge',
        component: ForgeComponent
    },
    { 
        path: 'vfx/:name',
        title: 'RuneFX | Showcase',
        component: ItemDetailComponent 
    },
    { 
        path: 'vfx',     
        title:'RuneFX | Showcase',
        component: VfxComponent 
    },
    { 
        path: 'try-buy',     
        title:'RuneFX | Try/Buy',
        component: TryBuyComponent 
    },
    { 
        path: 'about',     
        title:'RuneFX | About',
        component: AboutComponent 
    },
    { 
        path: '404', 
        title:'RuneFX | Not found',
        component: NotFoundComponent },
    { 
        path: 'register', 
        title:'RuneFX | Register',
        component: RegisterComponent
    },
    {
        path: 'community',
        title: 'RuneFX | Community',
        component: CommunityComponent
    },
    {
        path: 'forum',
        title: 'RuneFX | Forum',
        component: ForumComponent
    },
    {
        path: 'forum/:topicId/:topicSlug',
        title: 'RuneFX | Forum',
        component: SingleForumTopicComponent
    },
    {
        path: 'under-construction',
        title: 'RuneFX | Under Construction',
        component: ComingSoonComponent
    },
    { 
        path: '**', 
        redirectTo: '/404' 
    } 
];
