import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Item {
  title: string;
  imgsrc: string;
  actualimage: string;
  desc: string;
  director: string[];
  producers: string[];
  vfxsupe: string[];
  vfxprod: string[];
  animsupe: string[];
  year:string;
}

@Injectable({
  providedIn: 'root'
})
export class VfxDataFetcherService {
  private items: Item[] = [
    {
      "title": "Echo",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/12/ECHO-654x334-2.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/12/ECHO-header-1-aspect-ratio-2.7-1.jpg",
      "desc": "Streaming exclusively on Disney, the origin story of Echo revisits Maya Lopez, whose ruthless behavior in New York City catches up with her in her hometown. She must face her past, reconnect with her Native American roots and embrace the meaning of family and community if she ever hopes to move forward.",
      "director": ["Sydney Freeland", "Catriona McKenzie"],
      "producers": [],
      "vfxsupe": ["Steven Godfrey", "Ivan Busquets", "Tristan Myles"],
      "vfxprod": ["James Schembri"],
      "animsupe": [],
      "year": "2024"
    },
    {
      "title": "All the Light We Cannot See",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/10/AllTheLightWeCannotSee-prev.png",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/11/AllTheLightWeCannotSee-head-aspect-ratio-2.7-1.png",
      "desc": "Based on the Pulitzer Prize winning novel, All the Light We Cannot See tells the story of Marie-Laure Leblanc (Aria Mia Loberti), a blind French girl taking refuge with her father and reclusive uncle in St. Malo, France and Werner (Louis Hofmann), a brilliant teenager enlisted by hitler’s regime with an expertise in radio repair. Together they share a secret connection that will become a beacon of light that leads them through the harrowing backdrop of WWII.",
      "director": ["Shawn Levy"],
      "producers": [],
      "vfxsupe": ["Paolo Acri", "Vick Schutz"],
      "vfxprod": ["Josiane Fradette"],
      "animsupe": [],
      "year": "2023"
  
    },
    {
      "title": "Postcard From Earth",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/10/postcardFromEarth-prev-1.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/10/postCardFromEarth-head-aspect-ratio-2.7-1.jpg",
      "desc": "Director Darren Aronofsky once again called on longtime collaborator ILM to create visuals for his new film Postcard From Earth however, this project would be like no other. Postcard is the first immersive production made for MSG Sphere, the state-of-the-art sphere-shaped venue that opened in the Fall of 2023. Aronofsky created, directed, and produced the film which was captured on a bespoke camera system called Big Sky, a single-lens camera with a 316-megapixel, 3-inch x 3-inch HDR image sensor that can capture 18Kx18K images up to 120 frames per second. Crafting visual effects for the film was an incredible challenge, but one Visual Effects Supervisor Bill George and his crew were excited to tackle.",
      "director": ["Darren Aronofsky"],
      "producers": ["Bill George"],
      "vfxsupe": [],
      "vfxprod": [],
      "animsupe": [],
      "year": "2023"
    },
    {
      "title": "Killers of the Flower Moon",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/10/Screenshot-2023-10-06-at-4.36.05-PM-aspect-ratio-654-334-654x334.png",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/10/Actors_KOTFM-aspect-ratio-2.7-1.jpeg",
      "desc": "At the turn of the 20th century, oil brought a fortune to the Osage Nation, who became some of the richest people in the world overnight. The wealth of these Native Americans immediately attracted white interlopers, who manipulated, extorted, and stole as much Osage money as they could before resorting to murder. Based on a true story and told through the improbable romance of Ernest Burkhart (Leonardo DiCaprio) and Mollie Kyle (Lily Gladstone), Killers of the Flower Moon is an epic western crime saga, where real love crosses paths with unspeakable betrayal. Also starring Robert De Niro, Jesse Plemons, John Lithgow, Brendan Fraser, Tantoo Cardinal, Cara Jade Myers, JaNae Collins, and Jillian Dion, Killers of the Flower Moon is directed by Academy Award winner Martin Scorsese from a screenplay by Eric Roth and Scorsese, based on David Grann’s best-selling book.",
      "director": ["Martin Scorsese"],
      "producers": [],
      "vfxsupe": ["Pablo Helman"],
      "vfxprod": ["Jill Brooks", "Brian Barlettani"],
      "animsupe": [],
      "year": "2023"
    },
    {
      "title": "The Creator",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/05/THE-CREATOR_654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/05/TheCreator_Header-aspect-ratio-2.7-1-1.png",
      "desc": "From writer/director Gareth Edwards (Rogue One, Godzilla), photography from Greig Fraser (Rogue One, Dune, The Batman) and Oren Soffer (Fixation), production design by James Clyne (War of the Worlds), and a searing score by Hans Zimmer (Interstellar) comes an epic sci-fi action thriller set amidst a future war between the human race and the forces of artificial intelligence. Joshua (John David Washington, Tenet), a hardened ex-special forces agent grieving the disappearance of his wife (Gemma Chan, Mary Queen of Scots), is recruited to hunt down and kill the Creator, the elusive architect of advanced AI who has developed a mysterious weapon with the power to end the war… and mankind itself. Joshua and his team of elite operatives journey across enemy lines, into the dark heart of AI-occupied territory… only to discover the world-ending weapon he’s been instructed to destroy is an AI in the form of a young child (newcomer Madeleine Yuna Voyles).",
      "director": ["Gareth Edwards"],
      "producers": [],
      "vfxsupe": ["Jay Cooper", "Ian Comley", "Charmaine Chan"],
      "vfxprod": [],
      "animsupe": ["Michael Midlock", "Christopher Potter"],
      "year": "2023"
    },
    {
      "title": "Renfield",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/renfield-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/05/renfield-aspect-ratio-2.7-1.jpg",
      "desc": "In this modern monster tale of Dracula’s loyal servant, Nicholas Hoult stars as Renfield, the tortured aide to history’s most narcissistic boss, Dracula. Renfield is forced to procure his master’s prey and do his every bidding, no matter how debased. But now, after centuries of servitude, Renfield is ready to see if there’s a life outside the shadow of The Prince of Darkness. If only he can figure out how to end his codependency.",
      "director": ["Chris McKay"],
      "producers": [],
      "vfxsupe": ["Anthony Smith"],
      "vfxprod": ["Sandra Beerenbrock"],
      "animsupe": [],
      "year": "2023"
    },
    {
      "title": "Candy Cane Lane",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/10/CandyCaneLane-Prev.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/10/CandyCaneLane_Image-aspect-ratio-2.7-1.png",
      "desc": "Eddie Murphy stars in this holiday comedy adventure about a man on a mission to win his neighborhood’s annual Christmas home decoration contest. After Chris (Eddie Murphy) inadvertently makes a deal with a mischievous elf named Pepper (Jillian Bell) to better his chances of winning, she casts a magic spell that brings the 12 Days of Christmas to life and wreaks havoc on the whole town. At the risk of ruining the holidays for his family, Chris, his wife Carol (Tracee Ellis Ross), and their three children must race against the clock to break Pepper’s spell, battle deviously magical characters and save Christmas for everyone.",
      "director": ["Reginald Hudlin"],
      "producers": ["Joel Silver"],
      "vfxsupe": ["Jason Snell"],
      "vfxprod": ["Eric Schroeder"],
      "animsupe": ["Maia Kayser"],
      "year": "2023"
    },
    {
      "title": "Percy Jackson and the Olympians",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2022/07/PercyJackson_Olympians-prev.png",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/07/percyJackson-header-aspect-ratio-2.7-1.jpg",
      "desc": "Percy Jackson is on a dangerous quest. Outrunning monsters and outwitting gods, he must journey across America to return Zeus’ master bolt and stop an all-out war. After losing his mother, Percy is sheltered at Camp Half-Blood, a sanctuary for demigod children. He must prove himself and confront his origins once he discovers he too is a demigod, and will take off into the perils of pursuing enemies in search of the Underworld. With the help of his quest mates Annabeth and Grover, Percy’s journey will lead him closer to the answers he seeks: how to fit into a world where he feels out of place, if he’ll ever see his mother again, and if he can ever find out who he’s destined to be.",
      "director": ["Reginald Hudlin"],
      "producers": ["Joel Silver"],
      "vfxsupe": ["Jason Snell"],
      "vfxprod": ["Eric Schroeder"],
      "animsupe": ["Maia Kayser"],
      "year": "2023"
    },
    {
      "title": "The Pale Blue Eye",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2022/10/THE-PALE-BLUE-EYE_654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/10/paleBlueEye-head-aspect-ratio-2.7-1.png",
      "desc": "A world-weary detective is hired to investigate the murder of a West Point cadet. Stymied by the cadets’ code of silence, he enlists one of their own to help unravel the case – a young man the world would come to know as Edgar Allan Poe.",
      "director": ["Scott Cooper"],
      "producers": ["Jake Brave"],
      "vfxsupe": ["Scott Pritchard"],
      "vfxprod": ["Stefan Drury"],
      "animsupe": [""],
      "year": "2022"
    },
    {
      "title": "Babylon",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/07/22313_bab01977r_472549-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/07/Babylon-7-scaled-aspect-ratio-2.7-1-scaled.jpg",
      "desc": "A world-weary detective is hired to investigate the murder of a West Point cadet. Stymied by the cadets’ code of silence, he enlists one of their own to help unravel the case – a young man the world would come to know as Edgar Allan Poe.",
      "director": ["Scott Cooper"],
      "producers": ["Jake Brave"],
      "vfxsupe": ["Scott Pritchard"],
      "vfxprod": ["Stefan Drury"],
      "animsupe": [""],
      "year": "2022"
    },
    {
      "title": "Willow",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2022/09/WILLOW-S1_654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/06/Willow-1-aspect-ratio-2.7-1.jpg",
      "desc": "An epic period fantasy series with a modern sensibility set in an enchanted land of breathtaking beauty, Willow features a diverse international cast with Jonathan Kasdan, Ron Howard, Wendy Mericle, Kathleen Kennedy, and Michelle Rejwan serving as executive producers. The story began with an aspiring magician from a Nelwyn village and an infant girl destined to unite the realms, who together helped destroy an evil queen and banish the forces of darkness. Now, in a magical world where brownies, sorcerers, trolls, and other mystical creatures flourish, the adventure continues, as an unlikely group of heroes set off on a dangerous quest to places far beyond their home, where they must face their inner demons and come together to save their world.",
      "director": ["Stephen Woolfenden",
      "Jamie Childs",
      "Philippa Lowthorpe",
      "Debs Paterson"],
      "producers": ["Jonathan Kasden"],
      "vfxsupe": ["Mark Bakowski"],
      "vfxprod": ["Sophie Dawes"],
      "animsupe": [""],
      "year": "2022"
    },
    {
      "title": "The Fabelmans",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/07/MV5BNzA1Njg4YTktNWU4ZC00N2QwLWE4YTAtMmM3N2I0MjVhYzhjXkEyXkFqcGdeQXZ3ZXNsZXk@._V1_-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-22-at-5.31.14-PM-aspect-ratio-2.7-1.png",
      "desc": "The Fabelmans, which is loosely based on Steven Spielberg’s childhood, stars Michelle Williams, Paul Dano, Seth Rogen, and Gabriel LaBelle. Spielberg co-wrote the script alongside Tony Kushner (West Side Story). Kristie Macosko Krieger, p.g.a (The Post), Spielberg, p.g.a, and Kushner, p.g.a are producing the film.",
      "director": ["Steven Spielberg"],
      "producers": ["Tony Kushner"],
      "vfxsupe": ["Pablo Helman"],
      "vfxprod": ["Brian Barlettani"],
      "animsupe": [""],
      "year": "2022"
    },
    {
      "title": "Good Night Oppy",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/07/oppy1-videoSixteenByNine3000-scaled-aspect-ratio-654-334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2023/07/oppy1-videoSixteenByNine3000-scaled-aspect-ratio-2.7-1-scaled.jpg",
      "desc": "The Mars documentary attacks! Amazon Studios, Film 45, Amblin Television, and Tripod Media are co-producing Good Night Oppy, a feature about the Mars exploration rover Opportunity.",
      "director": ["Ryan White"],
      "producers": ["Abishek Nair"],
      "vfxsupe": ["Pablo Helman"],
      "vfxprod": ["Jonathan Privett"],
      "animsupe": ["Steven Nichols"],
      "year": "2022"
    },
    {
      "title": "Lost Ollie",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/07/MV5BMDQ5NGNlY2MtZjc0NC00MzNiLTg5NzktZGUwZDFiYTkzNTFhXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-22-at-5.31.14-PM-aspect-ratio-2.7-1.png",
      "desc": "A toy searches the countryside for the young boy who lost him in this family series inspired by the book “Ollie’s Odyssey.”",
      "director": ["Peter Ramsey"],
      "producers": ["Tony Kushner"],
      "vfxsupe": ["Hayden Jones"],
      "vfxprod": ["Stefan Drury"],
      "animsupe": ["Michael Beaulieu"],
      "year": "2022"
    },
    {
      "title": "The Gray Man",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/grayman-prev-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/06/theGrayMan-header-aspect-ratio-2.7-1.jpg",
      "desc": "The Fabelmans, which is loosely based on Steven Spielberg’s childhood, stars Michelle Williams, Paul Dano, Seth Rogen, and Gabriel LaBelle. Spielberg co-wrote the script alongside Tony Kushner (West Side Story). Kristie Macosko Krieger, p.g.a (The Post), Spielberg, p.g.a, and Kushner, p.g.a are producing the film.",
      "director": ["Steven Spielberg"],
      "producers": ["Tony Kushner"],
      "vfxsupe": ["Pablo Helman"],
      "vfxprod": ["Brian Barlettani"],
      "animsupe": [""],
      "year": "2022"
    },
    {
      "title": "The Old Man",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/07/fx-renews-jeff-bridges-the-old-man-for-a-second-season-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/06/FXs-THE-OLD-MAN-Pictured-Jeff-Bridges-as-Dan-Chase.-CR-Kurt-IswarienkoFX-e1650590937791-scaled-aspect-ratio-2.7-1-scaled.jpg",
      "desc": "Based on the bestselling novel of the same name by Thomas Perry, The Old Man stars Jeff Bridges, John Lithgow and Amy Brenneman. The Old Man centers on Dan Chase (Jeff Bridges) who absconded from the CIA decades ago and has been living off the grid since.  When an assassin arrives and tries to take Chase out, the old operative learns that to ensure his future he now must reconcile his past.",
      "director": ["Jon Watts","Greg Yaitanes"],
      "producers": ["Warren Littlefield"],
      "vfxsupe": ["Vincent Papaix"],
      "vfxprod": ["Adele Jones-Venables"],
      "animsupe": [""],
      "year": "2022"
    },
    
    {
      "title": "Lovely Little Farm",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2022/06/LOVELY-LITTLE-FARM_654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/06/LoveLittleFarm_Header1-aspect-ratio-2.7-1.jpg",
      "desc": "“Lovely Little Farm” follows sisters Jill and Jacky as they love and nurture all the animals on their farm nestled in lavender fields. Being a young farmer isn’t easy, but every day brings these sisters adventure and a chance to grow. The live-action animated hybrid uses the latest computer-generated technology, working with Industrial Light and Magic, to bring the series to life.",
      "director": ["Jack Jameson"],
      "producers": ["Louise Hussey"],
      "vfxsupe": ["Paul Jones"],
      "vfxprod": ["Graeme Puttock"],
      "animsupe": [""],
      "year": "2022"
    },
    {
      "title": "Free Guy",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/03/FreeGuy-preview.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/FreeGuy-header-aspect-ratio-2.7-1.jpg",
      "desc": "In Twentieth Century Studios’ epic adventure-comedy “Free Guy,” a bank teller discovers he’s actually a non-playable character in a brutal open-world video game, so he does what any logical NPC would do: he rewrites the story and becomes the hero. Now in a world run amok where there are no limits, he’s determined to be the guy to save his own world—his way—before time runs out.",
      "director": ["Shawn Levy"],
      "producers": ["Laurence Berkani"],
      "vfxsupe": ["Paolo Acri"],
      "vfxprod": [""],
      "animsupe": [""],
      "year": "2021"
    },
    {
      "title": "Y: The Last Man",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/06/IMG_0091.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/06/Y-LastMan-header-aspect-ratio-2.7-1.jpg",
      "desc": "A drama based on DC Comics’ acclaimed series by Brian K. Vaughan and Pia Guerra, Y: The Last Man traverses a post-apocalyptic world in which a cataclysmic event decimates every mammal with a Y chromosome but for one cisgender man and his pet monkey. The series follows the survivors in this new world as they struggle with their efforts to restore what was lost and the opportunity to build something better. Streaming exclusively on FX on Hulu.",
      "director": ["Eliza Clark"],
      "producers": ["Melina Matsoukas", "Nina Jacobson", "Brad Simpson"],
      "vfxsupe": ["Bruno Baron"],
      "vfxprod": ["Karen Clarke"],
      "animsupe": [""],
      "year": "2021"
    },
    {
      "title": "F9",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/03/FF9_654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/F9-header-aspect-ratio-2.7-1.jpg",
      "desc": "Vin Diesel’s Dom Toretto is leading a quiet life off the grid with Letty and his son, little Brian, but they know that danger always lurks just over their peaceful horizon. This time, that threat will force Dom to confront the sins of his past if he’s going to save those he loves most. His crew joins together to stop a world-shattering plot led by the most skilled assassin and high-performance driver they’ve ever encountered: a man who also happens to be Dom’s forsaken brother, Jakob (John Cena).",
      "director": ["Justin Lin"],
      "producers": [""],
      "vfxsupe": ["Julian Foddy"],
      "vfxprod": ["Jeanie King"],
      "animsupe": [""],
      "year": "2021"
    },
    {
      "title": "Underground Railroad",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/05/URR_654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/05/undergroundRailroad-header-aspect-ratio-2.7-1.jpg",
      "desc": "From Academy Award® winner Barry Jenkins and based on the Pulitzer Prize-winning novel by Colson Whitehead, “The Underground Railroad” is a new series that chronicles Cora Randall’s desperate bid for freedom in the Antebellum South. After escaping a Georgia plantation for the rumored Underground Railroad, Cora discovers no mere metaphor, but an actual railroad beneath the Southern soil.",
      "director": ["Barry Jenkins"],
      "producers": ["Louise Hussey"],
      "vfxsupe": ["Dottie Starling","Ivan Busquets"],
      "vfxprod": ["Jeanie King"],
      "animsupe": ["Alun Cummins"],
      "year": "2021"
    },
    {
      "title": "Finding Ohana",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2022/03/finding-ohana-2021-aspect-ratio-327-167-768x392.jpeg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2022/03/finding-ohana-2021-aspect-ratio-2.7-1.jpeg",
      "desc": "A summer in rural O‘ahu takes an exciting turn for two Brooklyn-raised siblings when a journal pointing to long-lost treasure sets them on an epic adventure with new friends, and leads them to reconnect with their Hawaiian heritage.",
      "director": ["Jude Weng"],
      "producers": ["Gretchen Libby"],
      "vfxsupe": ["Jay Cooper"],
      "vfxprod": ["Susan Greenhow"],
      "animsupe": [""],
      "year": "2021"
    },
    {
      "title": "The Midnight Sky",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/03/theMidnightSky-preview.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/04/TheMidnightSky-Grab.1920w-aspect-ratio-2.7-1.jpg",
      "desc": "For George Clooney’s The Midnight Sky, ILM provided virtual production services via ILM StageCraft as well as post visual effects work. Our visual effects team was responsible for terrestrial visual effects work depicting the fictional Barbeau Observatory and views from within as well as the lake crossing and flashback sequences.",
      "director": ["George Clooney"],
      "producers": ["Mark Bakowski"],
      "vfxsupe": ["Jay Cooper"],
      "vfxprod": ["Jill Brooks"],
      "animsupe": [""],
      "year": "2020"
    },
    {
      "title": "The Stand",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/04/TheStand-prev-768x392.png",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/06/TheStand_ILM_NadinesFall-aspect-ratio-2.7-1.jpg",
      "desc": "The Stand is Stephen King’s apocalyptic vision of a world decimated by plague and embroiled in an elemental struggle between good and evil. The fate of mankind rests on the frail shoulders of the 108-year-old Mother Abagail (Whoopi Goldberg) and a handful of survivors. Their worst nightmares are embodied in a man with a lethal smile and unspeakable powers: Randall Flagg (Alexander Skarsgård), the Dark Man.",
      "director": ["Jake Braver"],
      "producers": [""],
      "vfxsupe": ["Laurent Hugueniot"  ,"Hayden Jones"],
      "vfxprod": ["Panos Theodoropoulos"],
      "animsupe": [""],
      "year": "2020"
    },
    {
      "title": "The Mandalorian (Season 2)",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/02/HUC2-FF-002658-1.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/The-Madalorian-s2-hero-aspect-ratio-2.7-1.jpg",
      "desc": "Visual effects work on The Mandalorian was completed in all five of ILM’s studios (San Francisco, Singapore, Vancouver, London, and Sydney) as well as a contingent of other vendors under ILM’s supervision. The season’s 8 episodes encompassed nearly 5,000 visual effects shots in addition to all of ILM’s real-time effects work done for use during principal photography. The effects team leveraged virtually every trick in the book, from miniatures and motion control to traditional puppeteering, advanced animatronics, spectacular special effects, and photo-real CG. The team also continued to innovate on the virtual production front pioneering techniques to further leverage ILM’s StageCraft technology in service of Jon Favreau and Dave Filoni’s dramatic stories.",
      "director": ["Jon Favreau", "Peyton Reed", "Bryce Dallas Howard"],
      "producers": ["Abbigail Keller"],
      "vfxsupe": ["Stacy Bissell"],
      "vfxprod": ["Joe Bauer"],
      "animsupe": [""],
      "year": "2020"
    },
    {
      "title": "6 Underground",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2018/11/6underground_preview.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/pe1480.comp_.020371.1014-scaled-aspect-ratio-2.7-1-scaled.jpg",
      "desc": "VILM’s work on Michael Bay’s 6 Underground was overseen by visual effects supervisor Jason Snell. The action-packed film features a number of photoreal digital environments, hero digital doubles, and all manner of death-defying stunts, high-speed chases, crashes, and explosions. The team also created stunning car and motorcycle chase sequences, an elaborate fight sequence on a yacht, and CG stunt double work throughout. In addition, a few hundred gallons of water were simulated as a stunning glass-encased cantilevered rooftop pool gets shot up and rapidly empties over the side of the building all created in the digital realm.",
      "director": ["Michael Bay"],
      "producers": [""],
      "vfxsupe": ["Jason Snell"],
      "vfxprod": ["Luke O'Byrne"],
      "animsupe": [""],
      "year": "2019"
    },
    {
      "title": "Us",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2018/12/Us-preview.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/US-2511_JF200_COMP_005077_SHERRYH_V24_1020R-aspect-ratio-2.7-1.jpg",
      "desc": "Writer-director Jordan Peele’s psychological thriller Us made masterful use of plentiful yet invisible effects work. With Oscar-nominated visual effects supervisor Grady Cofer leading the ILM team, artists helped create the film’s menacing doppelgängers. All of the film’s visual effects live in the world of subtlety. Since each of the film’s main characters would ostensibly be playing two roles, we couldn’t rely on the tried and true split-screen technique to allow them to occupy the frame at the same time. Instead, the scenes had to be painstakingly rehearsed and shot in multiple passes so the crew could do extensive head and face swaps throughout the film. Bits and pieces of performances from successive takes along with those of body and stunt doubles would be grafted together to build up the performance that Peele ultimately sought. To capture all the footage that ILM’s artists would need to create the effect, the actors had to perform scenes twice, once for each of their roles. Lupita, for instance, would first play Red with her body or photo double playing Adelaide, and then she would go to wardrobe and hair and makeup and change into her alter ego meanwhile the set would be completely reset as though the scene never happened. Then it was filmed again with reactive performances being captured as carefully as possible particularly where the characters are interacting with each other.",
      "director": ["Jordan Peele"],
      "producers": [""],
      "vfxsupe": ["Grady Cofer"],
      "vfxprod": ["Lee Briggs"],
      "animsupe": [""],
      "year": "2019"
    },
    {
      "title": "Aladdin",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/03/aladin_bg.01-1-aspect-ratio-327-167-768x392.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/aladdin.bg02-aspect-ratio-2.7-1.jpg",
      "desc": "The show had many challenges and technological breakthroughs, one of which was the first use of Disney Research Studio’s ‘Anyma’ in a film; this new markerless performance capture technology was used to record Will Smith’s facial performance as Genie. As there were no facial markers or tracking devices necessary, the technology gave him free rein to move and express himself as energetically as he pleased. ILM’s simulation artists and animators then created the swirling vortex which occupies Genie’s lower body – Virtually a character unto itself. In addition to Genie, the ILM team was responsible for creating the performances of the infamous macaw Iago, Aladdin’s lovable monkey Abu, the magic carpet, hundreds of parading elephants, and more, as well as the film’s most notable environments, Agrabah and the Cave of Wonders.",
      "director": ["Guy Richie"],
      "producers": [""],
      "vfxsupe": ["Mike Mulholland"],
      "vfxprod": ["Tracey Leadbetter"],
      "animsupe": ["Steve Aplin"],
      "year": "2019"
    },
    {
      "title": "The Irishman",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2019/03/irishman_preview.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/02/VDR1030_V34_3D_063528.1213516r-scaled-aspect-ratio-2.7-1-scaled.jpg",
      "desc": "Under the watchful eye of production visual effects supervisor Pablo Helman, the visual effects team created 1,750 visual effects shots for Martin Scorsese’s epic three-and-a-half-hour drama, The Irishman. The film received both Oscar and BAFTA nominations for Best Visual Effects and won two Visual Effects Society (VES) Awards including Outstanding Supporting Visual Effects in a Feature and Outstanding Compositing in a Feature.",
      "director": ["Martin Scorsese"],
      "producers": [""],
      "vfxsupe": ["Pablo Helman"],
      "vfxprod": ["Flannery Huntley"],
      "animsupe": [""],
      "year": "2019"
    },
    {
      "title": "Terminator: Dark Fate",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2019/04/terminator-DarkFate_preview.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/US-2511_JF200_COMP_005077_SHERRYH_V24_1020R-aspect-ratio-2.7-1.jpg",
      "desc": "ILM has been closely associated with the Terminator franchise since first contributing to James Cameron’s Terminator 2: Judgment Day back in the early 1990s. For this installment in the series, we were tasked with creating digitally de-aged versions of Linda Hamilton as Sarah Connor, Edward Furlong as John Connor, and Arnold Schwartzenegger as the T-800 as they had appeared in Judgment Day.",
      "director": ["Alex Wang"],
      "producers": [""],
      "vfxsupe": ["Grady Cofer"],
      "vfxprod": ["Erin Dusseault"],
      "animsupe": ["Scott Benza"],
      "year": "2019"
    },
    {
      "title": "Ultraman: Rising",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2021/05/ultraman.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/05/ultraman-header-1-aspect-ratio-2.7-1.jpg",
      "desc": "Baseball superstar Ken Sato returns to his home country of Japan to pick up the mantle of Earth-defending superhero Ultraman, but quickly finds more than he bargained for when he’s forced to raise the offspring of his greatest foe, a newborn Kaiju. Struggling to balance the roles of teammate and new father, Ken must confront his own ego, his estranged father, and the conniving Kaiju Defense Force to rise up and discover what it truly means to be Ultraman.",
      "director": ["Shannon Tindle"],
      "producers": [""],
      "vfxsupe": ["Hayden Jones"],
      "vfxprod": ["Sean M. Murphy"],
      "animsupe": ["Scott Benza"],
      "year": "2024"
    },
    {
      "title": "Valerian And The City Of A Thousand Planets",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/jap0040550.comp_.029462.1052-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/jap0040550.comp_.029462.1052-aspect-ratio-2.7-1.jpg",
      "desc": "One planet contains the universe’s biggest shopping bazaar – The Big Market consists of five million stores that line a cross-shaped canyon extending 500 floors deep. But, shoppers in the 28th century needn’t walk through 500 floors of stores to find what they want. Instead, they stand within a large arena on a desert planet, in a helmet and gloves, and shop virtually. They can touch things with a glove. When they buy something, they place the object into a “transmatter,” and the object travels to them through space. While shopping, the merchant sees them as holograms and the two can interact. ILM’s Bianca Draghici, who served as VFX art director on the film, designed the hologram effect.",
      "director": ["Luc Besson"],
      "producers": [""],
      "vfxsupe": ["Philippe Rebours"],
      "vfxprod": ["David Fox"],
      "animsupe": [""],
      "year": "2018"
    },
    {
      "title": "Life",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/Life_bg.14-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/Life_bg.14-aspect-ratio-2.7-1.jpg",
      "desc": "Life is a terrifying sci-fi thriller about a team of scientists aboard the International Space Station whose mission of discovery turns to one of primal fear when they find a rapidly evolving life form that caused extinction on Mars, and now threatens the crew and all life on Earth.",
      "director": ["Daniel Espinosa"],
      "producers": [""],
      "vfxsupe": ["Mark Bakowski"],
      "vfxprod": ["Nina Fallon"],
      "animsupe": [""],
      "year": "2018"
    },
    {
      "title": "Mother!",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/gac5070.comp_.003566.1039-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/gac5070.comp_.003566.1039-aspect-ratio-2.7-1.jpg",
      "desc": "Mother! centers on a couple whose relationship is tested when uninvited guests arrive at their home, disrupting their tranquil existence.",
      "director": ["Darren Aronofsky"],
      "producers": [""],
      "vfxsupe": ["Ben Snow"],
      "vfxprod": ["Karim Sahai"],
      "animsupe": [""],
      "year": "2018"
    },
    {
      "title": "A Wrinkle in Time",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/a-wrinkle-in-time-hero-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/gac5070.comp_.003566.1039-aspect-ratio-2.7-1.jpg",
      "desc": "Meg Murry and her little brother, Charles Wallace, have been without their scientist father, Mr. Murry, for five years, ever since he discovered a new planet and used the concept known as a tesseract to travel there. Joined by Meg’s classmate Calvin O’Keefe and guided by the three mysterious astral travelers known as Mrs. Whatsit, Mrs. Who and Mrs. Which, the children brave a dangerous journey to a planet that possesses all of the evil in the universe.",
      "director": ["Ava DuVernay"],
      "producers": [""],
      "vfxsupe": ["Rich McBride"],
      "vfxprod": ["Simon Kennys"],
      "animsupe": ["Adrian Millington"],
      "year": "2018"
    },
    {
      "title": "Downsizing",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2023/06/fh0010.comp_.004913.1848-aspect-ratio-654-334-654x334.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/fh0010.comp_.004913.1848-aspect-ratio-2.7-1.jpg",
      "desc": "“Downsizing” follows a kindly occupational therapist who undergoes a new procedure to be shrunken to four inches tall so that he and his wife can help save the planet and afford a nice lifestyle at the same time.",
      "director": ["Alexander Payne"],
      "producers": [""],
      "vfxsupe": ["Lindy De Quattro"],
      "vfxprod": ["Jeff Atherton"],
      "animsupe": [""],
      "year": "2017"
    },
    {
      "title": "Only The Brave",
      "imgsrc": "https://www.ilm.com/wp-content/uploads/2017/01/OnlyTheBrave-preview-yf0035.1001.jpg",
      "actualimage": "https://www.ilm.com/wp-content/uploads/2021/03/yf0101.comp_.012232.v62.1019-scaled-aspect-ratio-2.7-1-scaled.jpg",
      "desc": "The team never wanted the fire to take the spotlight – this is a very real story of some incredibly heroic individuals and we wanted to honor their legacy – the best effects are always those in service of the story. To that end the approach was always to capture as much in-camera as possible to do safely. While there was an immense amount of fantastic fire created by the special effects team, visual effects played a key role in bringing that fire even closer to the actors and magnifying its scope and scale for the sequences where the fire was so intense and moving at such a high rate of speed that the director, Joseph Kosinski, leaned into the work of the visual effects team. We wanted audiences to feel the fire even though they were experiencing the story from the safety of a movie theater.",
      "director": ["Joseph Kosinski"],
      "producers": [""],
      "vfxsupe": ["Eric Barba"],
      "vfxprod": ["Jinnie Pak"],
      "animsupe": [""],
      "year": "2017"
    },
  ];

  constructor() { }

  getItemBySlug(slug: string): Item | undefined { //indian youtube man said these were slugs
    return this.items.find(item => this.createSlug(item.title) === slug);
  }

  getAllItems(): Item[] {
    return this.items;
  }

  //we take the url (name-of-series) and replace the dashes with spaces, since they're (name of series) in the 'json'
  public createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''); //I didnt do this, ChatGPT did.
  }
}
