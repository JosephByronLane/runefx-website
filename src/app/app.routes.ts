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

export const routes: Routes = [
    {
        path: '',
        title:'Home | RuneFX',
        component: HomeComponent
    },
    {
        path:'render',
        title:'Technologies | RuneFX',
        component: RenderComponent
    },
    {
        path:'render/runic-renderer',
        title:'Runic Renderer | RuneFX',
        component: RunicRendererComponent
    },
    {
        path:'render/spherical-harmonics',
        title:'Spherical Harmonics | RuneFX',
        component: SphericalHarmonicsComponent
    },
    {
        path:'render/axiom',
        title:'Axiom | RuneFX',
        component: AxiomComponent
    },
    {
        path:'render/rqueue',
        title:'RQueue | RuneFX',
        component: RqueueComponent
    },
    {
        path:'render/forge',
        title:'Forge | RuneFX',
        component: ForgeComponent
    },
    { 
        path: 'vfx/:name',
        title: 'Showcase | RuneFX',
        component: ItemDetailComponent 
    },
    { 
        path: 'vfx',     
        title:'Showcase | RuneFX',
        component: VfxComponent 
    },
    { 
        path: 'try-buy',     
        title:'Try/Buy | RuneFX',
        component: TryBuyComponent 
    },
    { 
        path: 'about',     
        title:'About | RuneFX',
        component: AboutComponent 
    },
    { 
        path: '404', 
        title:'Not found | RuneFX',
        component: NotFoundComponent },
    
    { 
        path: '**', 
        redirectTo: '/404' 
    } 
];
