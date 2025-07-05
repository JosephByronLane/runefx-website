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
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { ReleasesComponent } from './pages/releases/releases.component';
import { ReleaseDetailComponent } from './pages/release-detail/release-detail.component';
import { SupportComponent } from './pages/support/support.component';
import { FaqComponent } from './pages/faq/faq.component';

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
        title: 'RuneFX | Forum - All Topics',
        component: ForumComponent
    },
    {
        path: 'forum/posts/:postId',
        title: 'RuneFX | Forum', //title is set in the post component
        component: ForumComponent
    },
    {
        path: 'forum/:topicId/:topicSlug/:subtopicId/:subtopicSlug',
        title: 'RuneFX | Forum', //title is set in the subtopic component
        component: ForumComponent
    },
    {
        path: 'forum/:topicId/:topicSlug',
        title: 'RuneFX | Forum', //title is set in the topic component
        component: ForumComponent
    },
    {
        path: 'releases',
        title: 'RuneFX | Releases',
        component: ReleasesComponent
    },
    {
        path: 'releases/:id',
        title: 'RuneFX | Release', //title is set in the release detail component
        component: ReleaseDetailComponent
    },
    {
        path: 'support',
        title: 'RuneFX | Support',
        component: SupportComponent
    },
    {
        path: 'support/faq',
        title: "RuneFX | FAQ",
        component: FaqComponent
    },
    {
        path: 'under-construction',
        title: 'RuneFX | Under Construction',
        component: ComingSoonComponent
    },
    {
        path: 'not-allowed',
        title: 'RuneFX | Not Allowed',
        component: NotAllowedComponent
    },
    { 
        path: '**', 
        redirectTo: '/404' 
    } 
];
