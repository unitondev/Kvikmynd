using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Application.Services
{
    public class SeedService
    {
        private readonly UserManager<User> _userManager;
        private readonly IFileUploadService _fileUploadService;
        private readonly IMovieService _movieService;
        private readonly IService<Genre> _genreService;
        private readonly IService<GenreMovie> _genreMoviesService;
        private readonly IHostingEnvironment  _webHostEnvironment;

        public SeedService(UserManager<User> userManager,
            IFileUploadService fileUploadService,
            IMovieService movieService, 
            IService<Genre> genreService, 
            IService<GenreMovie> genreMoviesService,
            IHostingEnvironment  webHostEnvironment)
        {
            _userManager = userManager;
            _fileUploadService = fileUploadService;
            _movieService = movieService;
            _genreService = genreService;
            _genreMoviesService = genreMoviesService;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task SeedAllAsync()
        {
            await SeedAdminAsync();
            await SeedMoviesAsync();
            await SeedGenresAsync();
            await SeedGenreMoviesAsync();
        }
        public async Task SeedGenresAsync()
        {
            var genres = new List<Genre>
            {
                new() { Name = "anime" },
                new() { Name = "biography" },
                new() { Name = "western" },
                new() { Name = "military" },
                new() { Name = "detective" },
                new() { Name = "child" },
                new() { Name = "for adults" },
                new() { Name = "documentary" },
                new() { Name = "drama" },
                new() { Name = "the game" },
                new() { Name = "history" },
                new() { Name = "comedy" },
                new() { Name = "concert" },
                new() { Name = "short film" },
                new() { Name = "crime" },
                new() { Name = "melodrama" },
                new() { Name = "music" },
                new() { Name = "cartoon" },
                new() { Name = "musical" },
                new() { Name = "news" },
                new() { Name = "adventures" },
                new() { Name = "real tv" },
                new() { Name = "family" },
                new() { Name = "sport" },
                new() { Name = "talk show" },
                new() { Name = "thriller" },
                new() { Name = "horrors" },
                new() { Name = "fantastic" },
                new() { Name = "film noir" },
                new() { Name = "fantasy" },
                new() { Name = "action" },
                new() { Name = "detective" },
                new() { Name = "western" },
                new() { Name = "child" },
                new() { Name = "detective" },
                new() { Name = "detective" },
            };

            await _genreService.CreateRangeAsync(genres);
        }

        public async Task<ServiceResult> SeedAdminAsync()
        {
            var defaultPassword = "Testest123!";
            var user = await _userManager.FindByEmailAsync("admin@admin.com");
            if (user == null)
            {
                var admin = new User
                {
                    FullName = "Admin",
                    UserName = "Admin",
                    Email = "admin@admin.com",
                    EmailConfirmed = true,
                };

                var result = await _userManager.CreateAsync(admin, defaultPassword);
                if (!result.Succeeded)
                {
                    return new ServiceResult(ErrorCode.UserNotCreated);
                }

                var roleResult = await _userManager.AddToRoleAsync(admin, Role.SystemAdmin.ToString());
                if (!roleResult.Succeeded)
                {
                    return new ServiceResult(ErrorCode.UserNotCreated);
                }
            }

            return new ServiceResult();
        }

        public async Task SeedMoviesAsync()
        {
            var movies = new List<Movie>
            {
                new()
                {
                    Title = "Fight Club",
                    Description =
                        "A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage in competitive rivalry for love and power.",
                    YoutubeLink = "SUXWAEX2jlg",
                    Year = 1999,
                },
                new()
                {
                    Title = "American Psycho",
                    Description =
                        "It's the late 1980s. Twenty-seven year old Wall Streeter Patrick Bateman travels among a closed network of the proverbial beautiful people, that closed network in only they able to allow others like themselves in in a feeling of superiority. Patrick has a routinized morning regimen to maintain his appearance of attractiveness and fitness. He, like those in his network, are vain, narcissistic, egomaniacal and competitive, always having to one up everyone else in that presentation of oneself, but he, unlike the others, realizes that, for himself, all of these are masks to hide what is truly underneath, someone/something inhuman in nature. In other words, he is comprised of a shell resembling a human that contains only greed and disgust, greed in wanting what others may have, and disgust for those who do not meet his expectations and for himself in not being the first or the best. That disgust ends up manifesting itself in wanting to rid the world of those people, he not seeing them as people but only of those characteristics he wants to rid.",
                    YoutubeLink = "5YnGhW4UEhc",
                    Year = 2000,
                },
                new()
                {
                    Title = "Pulp Fiction",
                    Description =
                        "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
                    YoutubeLink = "s7EdQ4FqbhY",
                    Year = 1994,
                },
                new()
                {
                    Title = "Memento",
                    Description =
                        "Memento chronicles two separate stories of Leonard, an ex-insurance investigator who can no longer build new memories, as he attempts to find the murderer of his wife, which is the last thing he remembers. One story line moves forward in time while the other tells the story backwards revealing more each time.",
                    YoutubeLink = "HDWylEQSwFo",
                    Year = 2000,
                },
                new()
                {
                    Title = "2001: A Space Odyssey",
                    Description =
                        "\"2001\" is a story of evolution. Sometime in the distant past, someone or something nudged evolution by placing a monolith on Earth (presumably elsewhere throughout the universe as well). Evolution then enabled humankind to reach the moon's surface, where yet another monolith is found, one that signals the monolith placers that humankind has evolved that far. Now a race begins between computers (HAL) and human (Bowman) to reach the monolith placers. The winner will achieve the next step in evolution, whatever that may be.",
                    YoutubeLink = "oR_e9y-bka0",
                    Year = 1968,
                },
                new()
                {
                    Title = "No Country for Old Men",
                    Description =
                        "In rural Texas, welder and hunter Llewelyn Moss (Josh Brolin) discovers the remains of several drug runners who have all killed each other in an exchange gone violently wrong. Rather than report the discovery to the police, Moss decides to simply take the two million dollars present for himself. This puts the psychopathic killer, Anton Chigurh (Javier Bardem), on his trail as he dispassionately murders nearly every rival, bystander and even employer in his pursuit of his quarry and the money. As Moss desperately attempts to keep one step ahead, the blood from this hunt begins to flow behind him with relentlessly growing intensity as Chigurh closes in. Meanwhile, the laconic Sheriff Ed Tom Bell (Tommy Lee Jones) blithely oversees the investigation even as he struggles to face the sheer enormity of the crimes he is attempting to thwart.",
                    YoutubeLink = "38A__WT3-o0",
                    Year = 2007,
                },
                new()
                {
                    Title = "28 Days Later",
                    Description =
                        "Animal activists invade a laboratory with the intention of releasing chimpanzees that are undergoing experimentation, infected by a virus -a virus that causes rage. The naive activists ignore the pleas of a scientist to keep the cages locked, with disastrous results. Twenty-eight days later, our protagonist, Jim, wakes up from a coma, alone, in an abandoned hospital. He begins to seek out anyone else to find London is deserted, apparently without a living soul. After finding a church, which had become inhabited by zombie like humans intent on his demise, he runs for his life. Selena and Mark rescue him from the horde and bring him up to date on the mass carnage and horror as all of London tore itself apart. This is a tale of survival and ultimately, heroics, with nice subtext about mankind's savage nature.",
                    YoutubeLink = "c7ynwAgQlDQ",
                    Year = 2002,
                },
                new()
                {
                    Title = "The Girl with the Dragon Tattoo",
                    Description =
                        "Forty years ago, Harriet Vanger disappeared from a family gathering on the island owned and inhabited by the powerful Vanger clan. Her body was never found, yet her uncle suspects murder and that the killer is a member of his own tightly knit but dysfunctional family. He employs disgraced financial journalist Mikael Blomkvist and the tattooed, ruthless computer hacker Lisbeth Salander to investigate. When the pair link Harriet's disappearance to a number of grotesque murders from almost forty years ago, they begin to unravel a dark and appalling family history; but, the Vangers are a secretive clan, and Blomkvist and Salander are about to find out just how far they are prepared to go to protect themselves.",
                    YoutubeLink = "gBVwUWeB0CE",
                    Year = 2009,
                },
                new()
                {
                    Title = "Dunkirk",
                    Description =
                        "May/June 1940. Four hundred thousand British and French soldiers are hole up in the French port town of Dunkirk. The only way out is via sea, and the Germans have air superiority, bombing the British soldiers and ships without much opposition. The situation looks dire and, in desperation, Britain sends civilian boats in addition to its hard-pressed Navy to try to evacuate the beleaguered forces. This is that story, seen through the eyes of a soldier amongst those trapped forces, two Royal Air Force fighter pilots, and a group of civilians on their boat, part of the evacuation fleet.",
                    YoutubeLink = "F-eMt3SrfFU",
                    Year = 2017,
                },
                new()
                {
                    Title = "Thursday",
                    Description =
                        "The movie opens in a Los Angeles convenience store one late Monday night, where a smalltime drug dealer named Nick (Aaron Eckhart) is trying to decide what coffee brand to buy. His ex-lover Dallas (Paulina Porizkova) and fellow hitman Billy Hill (James LeGros) are getting impatient and tell him to hurry up. Conflicts between Nick and the cashier (Luck Hari) ensue, resulting in Dallas shooting the cashier dead. Though the three attempt to cover up the crime, they are forced to also shoot a police officer (Bari K. Willerford) when he discovers blood on the ground.",
                    YoutubeLink = "LJ0lN6yLrrg",
                    Year = 1998,
                },
                new()
                {
                    Title = "Scarface",
                    Description =
                        "Tony Montana manages to leave Cuba during the Mariel exodus of 1980. He finds himself in a Florida refugee camp but his friend Manny has a way out for them: undertake a contract killing and arrangements will be made to get a green card. He's soon working for drug dealer Frank Lopez and shows his mettle when a deal with Colombian drug dealers goes bad. He also brings a new level of violence to Miami. Tony is protective of his younger sister but his mother knows what he does for a living and disowns him. Tony is impatient and wants it all however, including Frank's empire and his mistress Elvira Hancock. Once at the top however, Tony's outrageous actions make him a target and everything comes crumbling down.",
                    YoutubeLink = "7pQQHnqBa2E",
                    Year = 1983,
                },
                new()
                {
                    Title = "The Matrix",
                    Description =
                        "Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.",
                    YoutubeLink = "m8e-FF8MsqU",
                    Year = 1999,
                },
                new()
                {
                    Title = "Catch Me If You Can",
                    Description =
                        "A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit.",
                    YoutubeLink = "s-7pyIxz8Qg",
                    Year = 2002,
                },
                new()
                {
                    Title = "Se7en",
                    Description =
                        "A film about two homicide detectives' (Morgan Freeman and Brad Pitt) desperate hunt for a serial killer who justifies his crimes as absolution for the world's ignorance of the Seven Deadly Sins. The movie takes us from the tortured remains of one victim to the next as the sociopathic John Doe (Kevin Spacey) sermonizes to Detectives Somerset and Mills -- one sin at a time. The sin of Gluttony comes first and the murderer's terrible capacity is graphically demonstrated in the dark and subdued tones characteristic of film noir. The seasoned and cultured but jaded Somerset researches the Seven Deadly Sins in an effort to understand the killer's modus operandi while the bright but green and impulsive Detective Mills (Pitt) scoffs at his efforts to get inside the mind of a killer.",
                    YoutubeLink = "znmZoVkCjpI",
                    Year = 1995,
                },
                new()
                {
                    Title = "The Shining",
                    Description =
                        "Haunted by a persistent writer's block, the aspiring author and recovering alcoholic, Jack Torrance, drags his wife, Wendy, and his gifted son, Danny, up snow-capped Colorado's secluded Overlook Hotel after taking up a job as an off-season caretaker. As the cavernous hotel shuts down for the season, the manager gives Jack a grand tour, and the facility's chef, the ageing Mr Hallorann, has a fascinating chat with Danny about a rare psychic gift called 'The Shining', making sure to warn him about the hotel's abandoned rooms, and, in particular, the off-limits Room 237. However, instead of overcoming the dismal creative rut, little by little, Jack starts losing his mind, trapped in an unforgiving environment of seemingly endless snowstorms, and a gargantuan silent prison riddled with strange occurrences and eerie visions. Now, the incessant voices inside Jack's head demand sacrifice. Is Jack capable of murder?",
                    YoutubeLink = "S014oGZiSdI",
                    Year = 1980,
                },
                new()
                {
                    Title = "12 Angry Men",
                    Description =
                        "The defense and the prosecution have rested, and the jury is filing into the jury room to decide if a young man is guilty or innocent of murdering his father. What begins as an open-and-shut case of murder soon becomes a detective story that presents a succession of clues creating doubt, and a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, AND each other. Based on the play, all of the action takes place on the stage of the jury room.",
                    YoutubeLink = "2L4IhbF2WK0",
                    Year = 1957,
                },
                new()
                {
                    Title = "American History X",
                    Description =
                        "Derek Vineyard is paroled after serving 3 years in prison for brutally killing two black men who tried to break into/steal his truck. Through his brother's, Danny Vineyard, narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he did.",
                    YoutubeLink = "XfQYHqsiN5g",
                    Year = 1998,
                },
                new()
                {
                    Title = "One Flew Over the Cuckoo's Nest",
                    Description =
                        "McMurphy has a criminal past and has once again gotten himself into trouble and is sentenced by the court. To escape labor duties in prison, McMurphy pleads insanity and is sent to a ward for the mentally unstable. Once here, McMurphy both endures and stands witness to the abuse and degradation of the oppressive Nurse Ratched, who gains superiority and power through the flaws of the other inmates. McMurphy and the other inmates band together to make a rebellious stance against the atrocious Nurse.",
                    YoutubeLink = "OXrcDonY-B8",
                    Year = 1975,
                },
                new()
                {
                    Title = "Lock, Stock and Two Smoking Barrels",
                    Description =
                        "Four Jack-the-lads find themselves heavily - seriously heavily - in debt to an East End hard man and his enforcers after a crooked card game. Overhearing their neighbours in the next flat plotting to hold up a group of out-of-their-depth drug growers, our heroes decide to stitch up the robbers in turn. In a way the confusion really starts when a pair of antique double-barrelled shotguns go missing in a completely different scam.",
                    YoutubeLink = "h6hZkvrFIj0",
                    Year = 1998,
                },
                new()
                {
                    Title = "Who Am I",
                    Description =
                        "Benjamin is invisible, a nobody. This changes abruptly when he meets charismatic Max. Even though they couldn't seem more different from the outside, they share the same interest: hacking. Together with Max's friends, the impulsive Stephan and paranoid Paul, they form the subversive Hacker collective CLAY (CLOWNS LAUGHING @ YOU). CLAY provokes with fun campaigns and speaks for a whole generation. For the first time in his life, Benjamin is part of something and even the attractive Marie begins noticing him. But fun turns into deadly danger when CLAY appears on the BKA's (Bundeskriminalamt, Federal Criminal Police Office) as well as Europol's most wanted list. Hunted by Cybercrime investigator Hanne Lindberg, Benjamin is no longer a nobody, but instead one of the most wanted hackers in the world.",
                    YoutubeLink = "ynW6Ys3LLAQ",
                    Year = 2014,
                },
                new()
                {
                    Title = "There Will Be Blood",
                    Description =
                        "The intersecting life stories of Daniel Plainview and Eli Sunday in early twentieth century California is presented. Miner turn oilman Daniel Plainview is a driven man who will do whatever it takes to achieve his goals. He works hard but he also takes advantage of those around him at their expense if need be. His business partner is his son H.W., who in reality he 'acquired' when H.W.'s biological single father, who worked on one of Daniel's rigs, got killed in a workplace accident. Daniel is deeply protective of H.W. if only for what H.W. brings to the partnership. Eli Sunday is one in a pair of twins, whose family farm Daniel purchases for the major oil deposit located on it. Eli, the local preacher and a self-proclaimed faith healer, wants the money from the sale of the property to finance his own church. The lives of the two competitive men often clash as Daniel pumps oil off the property and tries to acquire all the surrounding land at bargain prices to be able to build a pipeline to the coast, and as Eli tries to build his own religious empire.",
                    YoutubeLink = "FeSLPELpMeM",
                    Year = 2007,
                },
                new()
                {
                    Title = "Taxi Driver",
                    Description =
                        "Travis Bickle is an ex-Marine and Vietnam War veteran living in New York City. As he suffers from insomnia, he spends his time working as a taxi driver at night, watching porn movies at seedy cinemas during the day, or thinking about how the world, New York in particular, has deteriorated into a cesspool. He's a loner who has strong opinions about what is right and wrong with mankind. For him, the one bright spot in New York humanity is Betsy, a worker on the presidential nomination campaign of Senator Charles Palantine. He becomes obsessed with her. After an incident with her, he believes he has to do whatever he needs to make the world a better place in his opinion. One of his priorities is to be the savior for Iris, a twelve-year-old runaway and prostitute who he believes wants out of the profession and under the thumb of her pimp and lover Matthew.",
                    YoutubeLink = "UUxD4-dEzn0",
                    Year = 1976,
                },
                new()
                {
                    Title = "The Thing",
                    Description =
                        "A US research station, Antarctica, early-winter 1982. The base is suddenly buzzed by a helicopter from the nearby Norwegian research station. They are trying to kill a dog that has escaped from their base. After the destruction of the Norwegian chopper the members of the US team fly to the Norwegian base, only to discover them all dead or missing. They do find the remains of a strange creature the Norwegians burned. The Americans take it to their base and deduce that it is an alien life form. After a while it is apparent that the alien can take over and assimilate into other life forms, including humans, and can spread like a virus. This means that anyone at the base could be inhabited by The Thing, and tensions escalate.",
                    YoutubeLink = "5ftmr17M-a4",
                    Year = 1982,
                },
            };
            
            await _movieService.CreateRangeAsync(movies);
        }

        public async Task SeedGenreMoviesAsync()
        {
            var genreMovies = new List<GenreMovie>
            {
                new()
                {
                    GenreId = 9,
                    MovieId = 1
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 1
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 2
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 2
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 2
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 3
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 3
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 4
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 4
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 4
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 4
                },
                new()
                {
                    GenreId = 21,
                    MovieId = 5
                },
                new()
                {
                    GenreId = 28,
                    MovieId = 5
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 6
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 6
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 6
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 7
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 7
                },
                new()
                {
                    GenreId = 27,
                    MovieId = 7
                },
                new()
                {
                    GenreId = 28,
                    MovieId = 7
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 8
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 8
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 8
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 8
                },
                new()
                {
                    GenreId = 4,
                    MovieId = 9
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 9
                },
                new()
                {
                    GenreId = 11,
                    MovieId = 9
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 10
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 10
                },
                new()
                {
                    GenreId = 12,
                    MovieId = 10
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 10
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 10
                },
                new()
                {
                    GenreId = 31,
                    MovieId = 10
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 11
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 11
                },
                new()
                {
                    GenreId = 28,
                    MovieId = 12
                },
                new()
                {
                    GenreId = 31,
                    MovieId = 12
                },
                new()
                {
                    GenreId = 2,
                    MovieId = 13
                },
                new()
                {
                    GenreId = 12,
                    MovieId = 13
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 13
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 14
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 14
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 14
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 14
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 15
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 15
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 15
                },
                new()
                {
                    GenreId = 27,
                    MovieId = 15
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 16
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 16
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 16
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 17
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 18
                },
                new()
                {
                    GenreId = 12,
                    MovieId = 19
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 19
                },
                new()
                {
                    GenreId = 31,
                    MovieId = 19
                },
                new()
                {
                    GenreId = 5,
                    MovieId = 20
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 20
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 20
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 20
                },
                new()
                {
                    GenreId = 28,
                    MovieId = 20
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 21
                },
                new()
                {
                    GenreId = 9,
                    MovieId = 22
                },
                new()
                {
                    GenreId = 15,
                    MovieId = 22
                },
                new()
                {
                    GenreId = 26,
                    MovieId = 22
                },
                new()
                {
                    GenreId = 8,
                    MovieId = 23
                },
                new()
                {
                    GenreId = 27,
                    MovieId = 23
                },
                new()
                {
                    GenreId = 28,
                    MovieId = 23
                },
            };

            await _genreMoviesService.CreateRangeAsync(genreMovies);
        }
        
        public async Task SeedMoviesCoversAsync()
        {
            var coversPaths = new[]
            {
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "fightClub.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "americanPsycho.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "PulpFiction.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "memento.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "2001.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "NoCountryForOldMen.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "28DaysLater.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "TheGirlWithTheDragonTattoo.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "Dunkirk.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "Thursday.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "Scarface.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "TheMatrix.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "CatchMeIfYouCan.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "Se7en.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "TheShining.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "12AngryMen.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "AmericanHistoryX.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "OneFlewOvertheCuckoosNest.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "LockStockandTwoSmokingBarrels.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "WhoAmI.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "ThereWillBeBlood.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "TaxiDriver.jpg"),
                Path.Combine(_webHostEnvironment.WebRootPath, "images", "TheThing.jpg"),
            };

            var movies = await _movieService.Filter(_ => _.Id < coversPaths.Length + 1).OrderBy(_ => _.Id).ToListAsync();
            
            for (var i = 0; i < coversPaths.Length; i++)
            {
                var movie = movies[i];
                if (movie.CoverUrl is null)
                {
                    var coverInBytes = await System.IO.File.ReadAllBytesAsync(coversPaths[i]);
                    movie.CoverUrl = await _fileUploadService.UploadImageToFirebaseAsync(Convert.ToBase64String(coverInBytes), "covers");
                    await _movieService.UpdateAsync(movie);
                }
            }
        }
    }
}