![RuneFX Logo](assets/logo2-highres-wide.png)

# RuneFX Front-end
This repository contains the front-end code for RuneFX, a (fake) VFX company.

## What is this?

This is my graduation project (or what was going to be my graduation project) for the bachelor of computer science at Universidad Modelo in Mexico. Sadly I didn't quite have enough time to finish this in time, so I ended up choosing to graduate by virtue of having good grades.

It started as an idea during our `Web Development` class that I fleshed out during the `Web Development II` class, that I further finished during the last semester; Most initial design, logos, color palette and everything was done the `Web Development II` class when I made this webpage for the homework `My first Angular Webpage` (Yes, really. I spent 18 hours making the base of this website to flex during  class).

Once I was near graduating, I thought it would be fun (and for flexing rights) to have the 3 graduation options open to me (Even though you can only choose 1 to actually graduate with): By having a good GPA (90+/100, which I managed to achieve), by passing the graduation exam EGEL ISOFT (which  I passed as the top of my class), or by making a project so good that I could defend it against a board of judges (Similar to how you defend your thesis). 

## Why a VFX company?

I do 3D as a hobby (Mainly Blender and Houdini), and I wanted to make a website of what "my own vfx company" would look like. 
Coding/software keeps the tecnical and problem solving side of my brain happy, and 3D keeps the artistic, make cool looking stuff side of my brain happy.

## Tech stack

The whole project consisted of 4 main parts:
- **Front-end**: This is the front-end code, written in Angular, hosted on Netlify (because I didn't want to pay for hosting).
- **Back-end**: The back-end code, written in Python with Django, hosted on Google Cloud Platform (because I wanted to learn some Django, I didn't want to pay for hosting and GCP's Cloud Run free tier is generous enough that I'd pay pennies a month. I also could of just used their free  e3-micro instance, but eh).
- **Database**: The  database, hosted on Aiven, using PostgreSQL as the database engine (because I wanted to try out Postgres and Aiven has a free db tier).
- **Terraform  & CI/CD**: I'll admit, this isn't the most elaborate CI/CD pipeline or the biggest Terraform project I've done, but I wanted a measure so that if I somehow woke up with a 50+ USD bill I could just `terraform destroy`, send a support ticket to whoever billed me (GCP most likely) and be done with it. The CI/CD pipeline for the Front-end makes use of Netlify's automatic repository linking, and t he backend uses GitHub Actions.
If I do somehow end up with a huge bill, I'll just move all  API-side stuff into a huge json and host it on GitHub Pages or something.

## How to run this locally
Its as simple as it gets:

1. Clone the repository:
   ```bash
   git clone 
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200/` to see the application running.

`NOTE`: The back-end is not included in this repository, so you might be missing a few things here and there. You can still view the front-end and its design though.

## Wow thats so cool! What cool things did you do in here?

Well,

### Custom image paralax thingy
I did a algorithm that adds zoom into images and adds parallax to the image based on the parent container size, which is used in `services/utils.service.ts` in the `calculateParallax` funciton.

### Custom loading screen thingy
An overcomplicated way to have the loading screens have a query of http requests, and only hide the loading screen once all of them have finished. You can find them scattered around `services/intermitent-loading.service.ts`, `services/initial-loading.service.ts` and `interceptors/intermitent-loading.interceptor.ts`.

The TLDR of it is that theres a main function called `switchWithLoading` in `intermitent-loading.service.ts` that:
1. Turns on the intermitent loading screen,
2. Switches you to whatever route you fed the function,
3. Scrolls to a desired element (if you provided one),
4. If all goes well, it does  nothing else and lets the `intermitent-loading.interceptor.ts` hide the loading screens once all HTTP requests have finished.

### I wrote all the CSS myself
Yeeeeaaah, I wrote all the CSS myself; No tailwind, no bootstrap, no nothing. 

#### Why?
When I started actually working on the webpage (during the `Web Development II` class), I didn't really know about the existence of any CSS frameworks, so I just wrote the css myself. And when I eventually did find them, I didn't think they were worth it, so I just kept writing the CSS myself.

Now that I'm older and (hopefully) wiser, theres a few things I would have done differently, mainly using a css framework lmao.

### A really cursed markdown parser
So for the `Releases` section of the webpage, I originally just wanted a flat markdown page like a simple blog.
Turns out that was ugly looking, but I also didn't want to have a full on custom html page for each release (even though I only ended up doing a single one, lmao), so I ended up making a small markdown parser that sections things and sorta-kinda styles it to the general website style.

You can find it in `pages/release-detail`.


# Credits

So of course, I didn't wholly do this by myself, I had a lot of help from various sources, so here are those who Id like to extend a thank you to:

- My teacher whom I had during the `Web Development II`  class, **Fran**. Who taught me the basics of Angular, answered my questions, and for generally being a cool guy whom I look up to.

- My teacher whom I had during the `Web Development III` and `New technologies in the industry` class, **Bolio**. Who inspired me to try out some cloud stuff (mainly AWS and Hetzner), who also answered *alot* of my questions, and who taught me most of all the cloud infrastructure and CI/CD stuff I know today.

- To the various artists on [ArtStation](https://www.artstation.com) whose artwork I used for the webpage, if you see something that catches your eye go show your support!

And last but not least, to the various VFX companies (or VFX adjacent) whose websites I took inspiration from, listed below:

- [Rebelway Academy](https://www.rebelway.net/). For the general vibe of the webpage, the hero videos and color palette. They were my main reference and inspiration. 
- [WetaFX](https://www.wetafx.co.nz/) For a few of their tecnologies to put in the `Technologies` section, 
- [ILM](https://www.ilm.com/) From whom I got most of the shows that "RuneFX" has made, 
- [RenderMan](https://renderman.pixar.com/) Also used for general inspiration, and a few bits of `Runic Renderer` description and pricing,
- [Maxon Redshift](https://www.maxon.net/en/redshift) (Mostly for the forums design and description of `Runic Renderer`),
- [SideFX](https://www.sidefx.com/) (I literally copied their footer design, also the `RQueue` is based on their `HQueue`),
- [Theory Accelerated](https://www.theoryaccelerated.com/) (For the `Axiom` section, which is literally just their (really good, go check it out) `Axiom solver`, but rebranded with `RuneFX` stuff.)
- [QuadSpinner](https://quadspinner.com/) (For the `Forge` section, which is literally just their (also really good, go check it out) `Gaea`.)


## Stuff to do incase I ever come back to this project
- [ ] Make/find a way to have the intermitent-loading also accept when an iframe begins playing, so that the page doesn't load until the video is ready to go.
- [ ] Refactor the whole codebase cause the whole foundation and base of the project was made when it was smaller, and now that its grown i kinda need to reorganize it.
- [ ] More releases for the release page?
- [ ] Make accesibility improvements.