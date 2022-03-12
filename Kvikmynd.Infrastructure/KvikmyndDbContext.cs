using System;
using System.Collections.Generic;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Infrastructure
{
    public class KvikmyndDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public KvikmyndDbContext()
        { }
        
        public KvikmyndDbContext(DbContextOptions<KvikmyndDbContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.LogTo(System.Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region DataSeeding
            
            string[] genresArray = new []
            {
                "anime", "biography", "western", "military", "detective", "child", "for adults", "documentary", "drama", "the game",
                "history", "comedy", "concert", "short film", "crime", "melodrama", "music", "cartoon", "musical", "news", 
                "adventures", "real tv", "family", "sport", "talk show", "thriller", "horrors", "fantastic", "film noir", "fantasy",
                "action"
            };
            
            for (int i = 0; i < genresArray.Length; i++)
            {
                modelBuilder.Entity<Genre>().HasData(
                    new Genre()
                    {
                        Id = i + 1,
                        Name = genresArray[i]
                    }
                );
            }
            
            modelBuilder.Entity<Movie>().HasData(
                new Movie()
                {
                    Id = 1,
                    Title = "Fight Club",
                    Description = "A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage in competitive rivalry for love and power.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "SUXWAEX2jlg",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 2,
                    Title = "American Psycho",
                    Description = "It's the late 1980s. Twenty-seven year old Wall Streeter Patrick Bateman travels among a closed network of the proverbial beautiful people, that closed network in only they able to allow others like themselves in in a feeling of superiority. Patrick has a routinized morning regimen to maintain his appearance of attractiveness and fitness. He, like those in his network, are vain, narcissistic, egomaniacal and competitive, always having to one up everyone else in that presentation of oneself, but he, unlike the others, realizes that, for himself, all of these are masks to hide what is truly underneath, someone/something inhuman in nature. In other words, he is comprised of a shell resembling a human that contains only greed and disgust, greed in wanting what others may have, and disgust for those who do not meet his expectations and for himself in not being the first or the best. That disgust ends up manifesting itself in wanting to rid the world of those people, he not seeing them as people but only of those characteristics he wants to rid.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "5YnGhW4UEhc",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 3,
                    Title = "Pulp Fiction",
                    Description = "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "s7EdQ4FqbhY",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 4,
                    Title = "Memento",
                    Description = "Memento chronicles two separate stories of Leonard, an ex-insurance investigator who can no longer build new memories, as he attempts to find the murderer of his wife, which is the last thing he remembers. One story line moves forward in time while the other tells the story backwards revealing more each time.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "HDWylEQSwFo",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 5,
                    Title = "2001: A Space Odyssey",
                    Description = "\"2001\" is a story of evolution. Sometime in the distant past, someone or something nudged evolution by placing a monolith on Earth (presumably elsewhere throughout the universe as well). Evolution then enabled humankind to reach the moon's surface, where yet another monolith is found, one that signals the monolith placers that humankind has evolved that far. Now a race begins between computers (HAL) and human (Bowman) to reach the monolith placers. The winner will achieve the next step in evolution, whatever that may be.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "oR_e9y-bka0",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 6,
                    Title = "No Country for Old Men",
                    Description = "In rural Texas, welder and hunter Llewelyn Moss (Josh Brolin) discovers the remains of several drug runners who have all killed each other in an exchange gone violently wrong. Rather than report the discovery to the police, Moss decides to simply take the two million dollars present for himself. This puts the psychopathic killer, Anton Chigurh (Javier Bardem), on his trail as he dispassionately murders nearly every rival, bystander and even employer in his pursuit of his quarry and the money. As Moss desperately attempts to keep one step ahead, the blood from this hunt begins to flow behind him with relentlessly growing intensity as Chigurh closes in. Meanwhile, the laconic Sheriff Ed Tom Bell (Tommy Lee Jones) blithely oversees the investigation even as he struggles to face the sheer enormity of the crimes he is attempting to thwart.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "38A__WT3-o0",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 7,
                    Title = "28 Days Later",
                    Description = "Animal activists invade a laboratory with the intention of releasing chimpanzees that are undergoing experimentation, infected by a virus -a virus that causes rage. The naive activists ignore the pleas of a scientist to keep the cages locked, with disastrous results. Twenty-eight days later, our protagonist, Jim, wakes up from a coma, alone, in an abandoned hospital. He begins to seek out anyone else to find London is deserted, apparently without a living soul. After finding a church, which had become inhabited by zombie like humans intent on his demise, he runs for his life. Selena and Mark rescue him from the horde and bring him up to date on the mass carnage and horror as all of London tore itself apart. This is a tale of survival and ultimately, heroics, with nice subtext about mankind's savage nature.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "c7ynwAgQlDQ",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 8,
                    Title = "The Girl with the Dragon Tattoo",
                    Description = "Forty years ago, Harriet Vanger disappeared from a family gathering on the island owned and inhabited by the powerful Vanger clan. Her body was never found, yet her uncle suspects murder and that the killer is a member of his own tightly knit but dysfunctional family. He employs disgraced financial journalist Mikael Blomkvist and the tattooed, ruthless computer hacker Lisbeth Salander to investigate. When the pair link Harriet's disappearance to a number of grotesque murders from almost forty years ago, they begin to unravel a dark and appalling family history; but, the Vangers are a secretive clan, and Blomkvist and Salander are about to find out just how far they are prepared to go to protect themselves.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "gBVwUWeB0CE",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 9,
                    Title = "Dunkirk",
                    Description = "May/June 1940. Four hundred thousand British and French soldiers are hole up in the French port town of Dunkirk. The only way out is via sea, and the Germans have air superiority, bombing the British soldiers and ships without much opposition. The situation looks dire and, in desperation, Britain sends civilian boats in addition to its hard-pressed Navy to try to evacuate the beleaguered forces. This is that story, seen through the eyes of a soldier amongst those trapped forces, two Royal Air Force fighter pilots, and a group of civilians on their boat, part of the evacuation fleet.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "F-eMt3SrfFU",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 10,
                    Title = "Thursday",
                    Description = "The movie opens in a Los Angeles convenience store one late Monday night, where a smalltime drug dealer named Nick (Aaron Eckhart) is trying to decide what coffee brand to buy. His ex-lover Dallas (Paulina Porizkova) and fellow hitman Billy Hill (James LeGros) are getting impatient and tell him to hurry up. Conflicts between Nick and the cashier (Luck Hari) ensue, resulting in Dallas shooting the cashier dead. Though the three attempt to cover up the crime, they are forced to also shoot a police officer (Bari K. Willerford) when he discovers blood on the ground.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "LJ0lN6yLrrg",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 11,
                    Title = "Scarface",
                    Description = "Tony Montana manages to leave Cuba during the Mariel exodus of 1980. He finds himself in a Florida refugee camp but his friend Manny has a way out for them: undertake a contract killing and arrangements will be made to get a green card. He's soon working for drug dealer Frank Lopez and shows his mettle when a deal with Colombian drug dealers goes bad. He also brings a new level of violence to Miami. Tony is protective of his younger sister but his mother knows what he does for a living and disowns him. Tony is impatient and wants it all however, including Frank's empire and his mistress Elvira Hancock. Once at the top however, Tony's outrageous actions make him a target and everything comes crumbling down.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "7pQQHnqBa2E",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 12,
                    Title = "The Matrix",
                    Description = "Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "m8e-FF8MsqU",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 13,
                    Title = "Catch Me If You Can",
                    Description = "A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "s-7pyIxz8Qg",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 14,
                    Title = "Se7en",
                    Description = "A film about two homicide detectives' (Morgan Freeman and Brad Pitt) desperate hunt for a serial killer who justifies his crimes as absolution for the world's ignorance of the Seven Deadly Sins. The movie takes us from the tortured remains of one victim to the next as the sociopathic John Doe (Kevin Spacey) sermonizes to Detectives Somerset and Mills -- one sin at a time. The sin of Gluttony comes first and the murderer's terrible capacity is graphically demonstrated in the dark and subdued tones characteristic of film noir. The seasoned and cultured but jaded Somerset researches the Seven Deadly Sins in an effort to understand the killer's modus operandi while the bright but green and impulsive Detective Mills (Pitt) scoffs at his efforts to get inside the mind of a killer.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "znmZoVkCjpI",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 15,
                    Title = "The Shining",
                    Description = "Haunted by a persistent writer's block, the aspiring author and recovering alcoholic, Jack Torrance, drags his wife, Wendy, and his gifted son, Danny, up snow-capped Colorado's secluded Overlook Hotel after taking up a job as an off-season caretaker. As the cavernous hotel shuts down for the season, the manager gives Jack a grand tour, and the facility's chef, the ageing Mr Hallorann, has a fascinating chat with Danny about a rare psychic gift called 'The Shining', making sure to warn him about the hotel's abandoned rooms, and, in particular, the off-limits Room 237. However, instead of overcoming the dismal creative rut, little by little, Jack starts losing his mind, trapped in an unforgiving environment of seemingly endless snowstorms, and a gargantuan silent prison riddled with strange occurrences and eerie visions. Now, the incessant voices inside Jack's head demand sacrifice. Is Jack capable of murder?",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "S014oGZiSdI",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 16,
                    Title = "12 Angry Men",
                    Description = "The defense and the prosecution have rested, and the jury is filing into the jury room to decide if a young man is guilty or innocent of murdering his father. What begins as an open-and-shut case of murder soon becomes a detective story that presents a succession of clues creating doubt, and a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, AND each other. Based on the play, all of the action takes place on the stage of the jury room.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "2L4IhbF2WK0",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 17,
                    Title = "American History X",
                    Description = "Derek Vineyard is paroled after serving 3 years in prison for brutally killing two black men who tried to break into/steal his truck. Through his brother's, Danny Vineyard, narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he did.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "XfQYHqsiN5g",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 18,
                    Title = "One Flew Over the Cuckoo's Nest",
                    Description = "McMurphy has a criminal past and has once again gotten himself into trouble and is sentenced by the court. To escape labor duties in prison, McMurphy pleads insanity and is sent to a ward for the mentally unstable. Once here, McMurphy both endures and stands witness to the abuse and degradation of the oppressive Nurse Ratched, who gains superiority and power through the flaws of the other inmates. McMurphy and the other inmates band together to make a rebellious stance against the atrocious Nurse.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "OXrcDonY-B8",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 19,
                    Title = "Lock, Stock and Two Smoking Barrels",
                    Description = "Four Jack-the-lads find themselves heavily - seriously heavily - in debt to an East End hard man and his enforcers after a crooked card game. Overhearing their neighbours in the next flat plotting to hold up a group of out-of-their-depth drug growers, our heroes decide to stitch up the robbers in turn. In a way the confusion really starts when a pair of antique double-barrelled shotguns go missing in a completely different scam.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "h6hZkvrFIj0",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 20,
                    Title = "Who Am I",
                    Description = "Benjamin is invisible, a nobody. This changes abruptly when he meets charismatic Max. Even though they couldn't seem more different from the outside, they share the same interest: hacking. Together with Max's friends, the impulsive Stephan and paranoid Paul, they form the subversive Hacker collective CLAY (CLOWNS LAUGHING @ YOU). CLAY provokes with fun campaigns and speaks for a whole generation. For the first time in his life, Benjamin is part of something and even the attractive Marie begins noticing him. But fun turns into deadly danger when CLAY appears on the BKA's (Bundeskriminalamt, Federal Criminal Police Office) as well as Europol's most wanted list. Hunted by Cybercrime investigator Hanne Lindberg, Benjamin is no longer a nobody, but instead one of the most wanted hackers in the world.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "ynW6Ys3LLAQ",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 21,
                    Title = "There Will Be Blood",
                    Description = "The intersecting life stories of Daniel Plainview and Eli Sunday in early twentieth century California is presented. Miner turn oilman Daniel Plainview is a driven man who will do whatever it takes to achieve his goals. He works hard but he also takes advantage of those around him at their expense if need be. His business partner is his son H.W., who in reality he 'acquired' when H.W.'s biological single father, who worked on one of Daniel's rigs, got killed in a workplace accident. Daniel is deeply protective of H.W. if only for what H.W. brings to the partnership. Eli Sunday is one in a pair of twins, whose family farm Daniel purchases for the major oil deposit located on it. Eli, the local preacher and a self-proclaimed faith healer, wants the money from the sale of the property to finance his own church. The lives of the two competitive men often clash as Daniel pumps oil off the property and tries to acquire all the surrounding land at bargain prices to be able to build a pipeline to the coast, and as Eli tries to build his own religious empire.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "FeSLPELpMeM",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 22,
                    Title = "Taxi Driver",
                    Description = "Travis Bickle is an ex-Marine and Vietnam War veteran living in New York City. As he suffers from insomnia, he spends his time working as a taxi driver at night, watching porn movies at seedy cinemas during the day, or thinking about how the world, New York in particular, has deteriorated into a cesspool. He's a loner who has strong opinions about what is right and wrong with mankind. For him, the one bright spot in New York humanity is Betsy, a worker on the presidential nomination campaign of Senator Charles Palantine. He becomes obsessed with her. After an incident with her, he believes he has to do whatever he needs to make the world a better place in his opinion. One of his priorities is to be the savior for Iris, a twelve-year-old runaway and prostitute who he believes wants out of the profession and under the thumb of her pimp and lover Matthew.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "UUxD4-dEzn0",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 23,
                    Title = "The Thing",
                    Description = "A US research station, Antarctica, early-winter 1982. The base is suddenly buzzed by a helicopter from the nearby Norwegian research station. They are trying to kill a dog that has escaped from their base. After the destruction of the Norwegian chopper the members of the US team fly to the Norwegian base, only to discover them all dead or missing. They do find the remains of a strange creature the Norwegians burned. The Americans take it to their base and deduce that it is an alien life form. After a while it is apparent that the alien can take over and assimilate into other life forms, including humans, and can spread like a virus. This means that anyone at the base could be inhabited by The Thing, and tensions escalate.",
                    Cover = Array.Empty<byte>(),
                    YoutubeLink = "5ftmr17M-a4",
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                }
            );

            modelBuilder.Entity<GenreMovie>().HasData(
                new GenreMovie
                {
                    MovieId = 1,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 1,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 2,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 2,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 2,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 3,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 3,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 4,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 4,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 4,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 4,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 5,
                    GenreId = 21
                },
                new GenreMovie
                {
                    MovieId = 5,
                    GenreId = 28
                },
                new GenreMovie
                {
                    MovieId = 6,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 6,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 6,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 7,
                    GenreId = 27
                },
                new GenreMovie
                {
                    MovieId = 7,
                    GenreId = 28
                },
                new GenreMovie
                {
                    MovieId = 7,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 7,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 8,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 8,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 8,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 8,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 9,
                    GenreId = 4
                },
                new GenreMovie
                {
                    MovieId = 9,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 9,
                    GenreId = 11
                },
                new GenreMovie
                {
                    MovieId = 10,
                    GenreId = 31
                },
                new GenreMovie
                {
                    MovieId = 10,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 10,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 10,
                    GenreId = 12
                },
                new GenreMovie
                {
                    MovieId = 10,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 10,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 11,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 11,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 12,
                    GenreId = 31
                },
                new GenreMovie
                {
                    MovieId = 12,
                    GenreId = 28
                },
                new GenreMovie
                {
                    MovieId = 13,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 13,
                    GenreId = 2
                },
                new GenreMovie
                {
                    MovieId = 13,
                    GenreId = 12
                },
                new GenreMovie
                {
                    MovieId = 14,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 14,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 14,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 14,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 15,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 15,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 15,
                    GenreId = 27
                },
                new GenreMovie
                {
                    MovieId = 15,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 16,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 16,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 16,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 17,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 18,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 19,
                    GenreId = 31
                },
                new GenreMovie
                {
                    MovieId = 19,
                    GenreId = 12
                },
                new GenreMovie
                {
                    MovieId = 19,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 20,
                    GenreId = 28
                },
                new GenreMovie
                {
                    MovieId = 20,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 20,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 20,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 20,
                    GenreId = 5
                },
                new GenreMovie
                {
                    MovieId = 21,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 22,
                    GenreId = 26
                },
                new GenreMovie
                {
                    MovieId = 22,
                    GenreId = 9
                },
                new GenreMovie
                {
                    MovieId = 22,
                    GenreId = 15
                },
                new GenreMovie
                {
                    MovieId = 23,
                    GenreId = 27
                },
                new GenreMovie
                {
                    MovieId = 23,
                    GenreId = 28
                },
                new GenreMovie
                {
                    MovieId = 23,
                    GenreId = 8
                }
            );

            #endregion
            
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<GenreMovie>().HasKey(gm => new {gm.GenreId, gm.MovieId});
            modelBuilder.Entity<MovieRating>().HasKey(mr => new {mr.MovieId, mr.UserId});
            modelBuilder.Entity<Comment>().HasOne<User>(comment => comment.User).WithMany(user => user.Comments)
                .HasForeignKey(comment => comment.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Comment>().HasOne<Movie>(comment => comment.Movie).WithMany(movie => movie.Comments)
                .HasForeignKey(comment => comment.MovieId).OnDelete(DeleteBehavior.Cascade);
        }
        
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}