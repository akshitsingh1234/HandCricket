// Import useState hook from React for state management
'use client'
import { useContext, useEffect, useState } from "react";
// Import necessary components from react-native
// Import core components from react-native for building UI
import { 
    View,         // Container component for layout
    Text,         // Component for displaying text
    TouchableOpacity, // Button component for touch interactions
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import modalContext from "./modalContext";
import SyncStorage from "sync-storage";

// Main App componentss
function App() {
    // State to store player's current choice
    const aa = useContext(modalContext);
    const [playerVal, setPlayerVal] = useState(0);
    const [guide, setguide] = useState(false);
    // State to store computer's current choice
    const [computerVal, setComputerVal] = useState(0);
    // State to store player's score
    const [playerScore, setPlayerScore] = useState(0);
    // State to store computer's score
    const [compScore, setCompScore] = useState(0);
    const [tosstime, settosstime] = useState(true);
    const [tosswon, settosswon] = useState(false);
    const [tosslost, settosslost] = useState(false);
    const [tossdoneonce, settossdoneonce] = useState(true);
    const [decisiontaken, setdecisiontaken] = useState(null);
    const [tossdone, settossdone] = useState(true);
    const [playerdecision, setplayerDecision] = useState(null);
    const [score, setScore] = useState(0);
    const [tossSideSelected, setTossSideSelected] = useState(false);
    const [firstInningsScore, setfirstInningsScore] = useState(0);
    const [innings, setinnings] = useState(null);
    const [result, setresult] = useState(null);
    const [wicket, setwicket] = useState(false);
    const [showstats, setshowstats] = useState(false);
    const [reset,setreset]=useState(false);
    if(SyncStorage.get('num-pla')!=null)
    {
    aa.num_played=SyncStorage.get('num-pla');
    aa.num_won=SyncStorage.get('num-won');
    aa.num_lost=SyncStorage.get('num-lost');
    aa.num_drawn=SyncStorage.get('num-drawn');
    aa.percent_won = ((SyncStorage.get('num-won') / SyncStorage.get('num-pla')) * 100).toFixed(2);
    }

    useEffect(()=>
    {
        if(reset==true)
        {
            resetstat();
            setreset(false);
        }
    },[reset]);

    useEffect(() => {
        const initializeSyncStorage = async () => {
            try {
                await SyncStorage.init();
                console.log('SyncStorage initialized successfully!');
            } catch (error) {
                console.error('Error initializing SyncStorage:', error);
            }
        };

        initializeSyncStorage();
    }, []);

    useEffect(() => {
        let a = ["Batting", "Bowling"];
        comp_decision = a[Math.floor(Math.random() * a.length)];

        if (tosslost) {
            if (comp_decision == "Batting") {
                setplayerDecision("Bowling");


            }
            else if (comp_decision == "Bowling") {
                setplayerDecision("Batting");

            }
            setinnings("First");
            settosstime(false);
        }
    },
        [tosslost]);




    useEffect(() => {
        setTimeout(() => {
            setwicket(false);
        }, 1000);
    }, [innings, wicket]);



    useEffect(() => {
        if (aa.percent_won != 0)
            aa.percent_won = ((aa.num_won / aa.num_played) * 100).toFixed(2);

        else
            aa.percent_won = (0.00).toFixed(2);

        SyncStorage.set('per-won',aa.percent_won);
        aa.percent_won=SyncStorage.get('per-won');
    }, [aa.num_lost, aa.num_won, aa.num_played]);


    'use client';
    const tossdefault = () => {
        setPlayerScore(0);
        setCompScore(0);
        setScore(0);
        setfirstInningsScore(0);
        settosstime(true);
        setinnings(null);
        settosswon(false);
        settosslost(false);
        setTossSideSelected(false);
        settossdone(true);
        settossdoneonce(true);
    };

    
    const resetstat=()=>
    {
        aa.num_played=0;
        aa.num_won=0;
        aa.num_lost=0;
        aa.num_drawn=0;
        aa.percent_won=0;
        SyncStorage.set('num-pla',0);
        SyncStorage.set('num-won',0);
        SyncStorage.set('num-lost',0);
        SyncStorage.set('num-drawn',0);
        SyncStorage.set('per-won',0.00);
    };

    'use client';
    const second_innings_transition = () => {
        setwicket(true);
        setfirstInningsScore(score);
        setScore(0);
        setinnings("Second");
    };

    useEffect(() => {
        setPlayerScore(playerScore);

        if ((playerScore > firstInningsScore) && (innings == "Second")) {
            setresult("You chased the target.Victory!!");
            aa.num_played += 1;
            aa.num_won += 1;
             SyncStorage.set('num-pla',aa.num_played);
        aa.num_played=SyncStorage.get('num-pla');
             SyncStorage.set('num-won',aa.num_won);
        aa.num_won=SyncStorage.get('num-won');
        aa.percent_won=SyncStorage.get('per-won');
            tossdefault();
        }

    }, [playerScore]);

    useEffect(() => {
        setCompScore(compScore);
        if ((compScore > firstInningsScore) && (innings == "Second")) {
            setresult("Your opponent chased and you lost!!");
            aa.num_played += 1;
            aa.num_lost += 1;
            SyncStorage.set('num-pla',aa.num_played);
        aa.num_played=SyncStorage.get('num-pla');
             SyncStorage.set('num-lost',aa.num_lost);
        aa.num_lost=SyncStorage.get('num-lost');
        aa.percent_won=SyncStorage.get('per-won');
            tossdefault();
        }

    }, [compScore]);


    useEffect(() => {
        let a = ["Batting", "Bowling"];
        comp_decision = a[Math.floor(Math.random() * a.length)];

        if (tosslost) {
            if (comp_decision == "Batting") {
                setplayerDecision("Bowling");

            }
            else if (comp_decision == "Bowling") {
                setplayerDecision("Batting");

            }
            setinnings("First");
            settosstime(false);
        }
    }, [tosslost]);


    // Function to handle player's choice and update state
    const decision = (playerChoice) => {
        setPlayerVal(playerChoice);
        const choices = [1, 2, 3, 4, 5, 6];
        const compChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerVal(compChoice);

        if (playerdecision == "Batting") {
            if (playerChoice != compChoice) {

                setPlayerScore(score + playerChoice);
                setScore(playerChoice + score);

            }
            else if ((playerChoice == compChoice) && (innings == "First")) {
                setplayerDecision("Bowling");
                second_innings_transition();
            }
            else if ((innings == "Second") && (compChoice == playerChoice)) {
                setwicket(true);
                if (score < firstInningsScore) {
                    setresult("You have lost while chasing");
                    aa.num_played += 1;
                    aa.num_lost += 1;
                    SyncStorage.set('num-pla',aa.num_played);
        aa.num_played=SyncStorage.get('num-pla');
                    SyncStorage.set('num-lost',aa.num_lost);
        aa.num_lost=SyncStorage.get('num-lost');
        aa.percent_won=SyncStorage.get('per-won');
                }


                else if (score == firstInningsScore) {
                    setresult("Its a tie");
                    aa.num_played += 1;
                    aa.num_drawn += 1;
                    SyncStorage.set('num-pla',aa.num_played);
        aa.num_played=SyncStorage.get('num-pla');
                    SyncStorage.set('num-drawn',aa.num_drawn);
        aa.num_drawn=SyncStorage.get('num-drawn');
        aa.percent_won=SyncStorage.get('per-won');
                }
                tossdefault();
            }
        }
        else if (playerdecision == "Bowling") {
            if (playerChoice != compChoice) {

                setCompScore(score + compChoice);
                setScore(score + compChoice);

            }
            else if ((playerChoice == compChoice) && (innings == "First")) {
                setplayerDecision("Batting");
                second_innings_transition();
            }
            else if ((innings == "Second") && (compChoice == playerChoice)) {
                setwicket(true);
                if (score < firstInningsScore) {
                    setresult("You won while defending your score");
                    aa.num_played += 1;
                    aa.num_won += 1;
                    SyncStorage.set('num-pla',aa.num_played);
        aa.num_played=SyncStorage.get('num-pla');
                    SyncStorage.set('num-won',aa.num_won);
        aa.num_won=SyncStorage.get('num-won');
        aa.percent_won=SyncStorage.get('per-won');
                }

                else if (score == firstInningsScore) {
                    setresult("Its a tie");
                    aa.num_played += 1;
                    aa.num_drawn += 1;
                    SyncStorage.set('num-pla',aa.num_played);
        aa.num_played=SyncStorage.get('num-pla');
                    SyncStorage.set('num-drawn',aa.num_drawn);
        aa.num_drawn=SyncStorage.get('num-drawn');
        aa.percent_won=SyncStorage.get('per-won');
                }
                tossdefault();
            }
        }
    };


    const oneoffdisplay = (numbr) => {
        if (tosstime) {
            const choicestoss = [1, 2, 3, 4, 5, 6];
            // Randomly select computer's choice
            const compChoicetoss = choicestoss[Math.floor(Math.random() * choicestoss.length)];
            setPlayerVal(numbr);
            setComputerVal(compChoicetoss);
            settossdone(false);
            if ((numbr + compChoicetoss) % 2 == 0)
                if (decisiontaken === "EVEN") {
                    settosswon(true);
                    settosslost(false);
                }
                else {
                    settosswon(false);
                    settosslost(true);
                }
            if ((numbr + compChoicetoss) % 2 != 0)
                if (decisiontaken === "ODD") {
                    settosswon(true);
                    settosslost(false);
                }

                else {
                    settosswon(false);
                    settosslost(true);
                }
            settossdoneonce(false);
        }
    };

    // Render UI
    return (
        <View style={styles.container}>

            <View style={styles.buttonContainerforsettings}>

                <Pressable
                    style={[styles.buttonforguide, styles.buttonOpen]}
                    onPress={() => {
                        setguide(true);
                    } }>
                    <Text style={styles.textStyle}>Guide</Text>
                </Pressable>


                <Pressable
                    style={[styles.buttonforguide, styles.buttonOpen]}
                    onPress={() => {
                        setshowstats(true);
                    } }>
                    <Text style={styles.textStyle}>Statistics</Text>
                </Pressable>

            </View>


            {(showstats) && <Modal
                animationType="slide"
                transparent={true}
                visible={showstats}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                } }>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Number of matches played: {(aa.num_played==0)?0:SyncStorage.get('num-pla')}</Text>
                        <Text style={styles.modalText}>Number of matches won: {(aa.num_won==0)?0:SyncStorage.get('num-won')}</Text>
                        <Text style={styles.modalText}>Number of matches lost: {(aa.num_lost==0)?0:SyncStorage.get('num-lost')}</Text>
                        <Text style={styles.modalText}>Number of matches drawn: {(aa.num_drawn==0)?0:SyncStorage.get('num-drawn')}</Text>
                        <Text style={styles.modalText}>Win Percentage: {(aa.num_played==0)?((0.00).toFixed(2)):((aa.num_won / aa.num_played) * 100).toFixed(2)} %</Text>
                        <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.buttonforclosing, styles.buttonClose]}
                            onPress={() => setshowstats(false)}>
                            <Text style={styles.textStyle}>Hide Stats</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonforclosing, styles.buttonClose]}
                            onPress={() =>setreset(true)}>
                            <Text style={styles.textStyle}>Reset Stats</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>}








            {(guide) && <Modal
                animationType="slide"
                transparent={true}
                visible={guide}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');

                } }>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Welcome to hand cricket with computer world!
                            Play a toss, get to know whether you won or not, and get either batting or
                            bowling accordingly!
                            Randomly throwing a dic of number with same value
                            of computer's value guarantees you are out and vice-versa depending
                            on who is batting, otherwise you go score big, just like traditional cricket!</Text>
                        <Pressable
                            style={[styles.buttonforclosing, styles.buttonClose]}
                            onPress={() => setguide(false)}>
                            <Text style={styles.textStyle}>Hide Guide</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>}

            <Text style={styles.title}> Hand Cricket Game</Text>

            {(tosstime) && (tossdoneonce) ?
                (<Text style={styles.match_scene}>
                    Toss Time:
                </Text>)
                :
                (<Text style={styles.match_scene}>

                </Text>)}

            {(tossSideSelected) && (tossdone) && (
                <>
                    <Text style={styles.toss_scene}>You chose {decisiontaken}</Text>
                    <Text style={styles.toss_scene}>Change before you select your throw</Text>
                </>)}

            <View style={styles.buttonContainer}>
                {(tossdone) ? (<TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setdecisiontaken("ODD");
                        setTossSideSelected(true);
                        setresult("");
                    } }
                >
                    <Text style={styles.buttonText}>
                        ODD
                    </Text>
                </TouchableOpacity>) : null}


                {(tossdone) ? (<TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setdecisiontaken("EVEN");
                        setTossSideSelected(true);
                        setresult("");
                    } }>
                    <Text style={styles.buttonText}>
                        EVEN
                    </Text>
                </TouchableOpacity>) : null}
            </View>



            {(tosswon) && (tosstime) && (
                <Text style={styles.match_scene}>You won the toss</Text>)}



            <View style={styles.buttonContainer}>

                {(tosswon) && (tosstime) && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setinnings("First");
                            setplayerDecision("Batting");
                            settosstime(false);
                        } }
                    >
                        <Text style={styles.buttonText}>
                            Batting
                        </Text>
                    </TouchableOpacity>
                )}
                {(tosswon) && (tosstime) && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setinnings("First");
                            setplayerDecision("Bowling");
                            settosstime(false);
                        } }>
                        <Text style={styles.buttonText}>
                            Bowling
                        </Text>
                    </TouchableOpacity>)}
            </View>


            {(tosslost) && (innings=="First") &&
                <Text style={styles.toss_scene}>You lost the toss and You have to play {playerdecision} first</Text>}

            {((tosslost) || (tosswon)) && (!tosstime) && <Text style={styles.toss_scene}>{innings} innings:You are {playerdecision}</Text>}
            {((tosslost) || (tosswon)) && (!tosstime) && (innings == "Second")
                && (playerdecision == "Bowling") && (<Text style={styles.toss_scene}>
                    Computer needs {firstInningsScore + 1} run to win</Text>)}

            {((tosslost) || (tosswon)) && (!tosstime) && (innings == "Second")
                && (playerdecision == "Batting") && (<Text style={styles.toss_scene}>
                    You need {firstInningsScore + 1} run to win</Text>)}

            {/* Buttons for player to choose */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        (tossSideSelected) && ((tosstime) ? oneoffdisplay(1) : decision(1));

                    } } // Player chooses 1
                >
                    <Text style={styles.buttonText}>
                        1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        (tossSideSelected) && ((tosstime) ? oneoffdisplay(2) : decision(2));

                    } } // Player chooses 2
                >
                    <Text style={styles.buttonText}>
                        2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        (tossSideSelected) && ((tosstime) ? oneoffdisplay(3) : decision(3));

                    } } // Player chooses 3
                >
                    <Text style={styles.buttonText}>
                        3
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        (tossSideSelected) && ((tosstime) ? oneoffdisplay(4) : decision(4));

                    } } // Player chooses 4
                >
                    <Text style={styles.buttonText}>
                        4
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        (tossSideSelected) && ((tosstime) ? oneoffdisplay(5) : decision(5));

                    } } // Player chooses 5
                >
                    <Text style={styles.buttonText}>
                        5
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        (tossSideSelected) && ((tosstime) ? oneoffdisplay(6) : decision(6));

                    } } // Player chooses 6
                >
                    <Text style={styles.buttonText}>
                        6
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Display choices and scores */}
            <View style={styles.scoreContainer}>
                <Text style={styles.choiceTextPlayer}>
                    Your choice: {playerVal}
                </Text>
                <Text style={styles.choiceTextComputer}>
                    Computer's choice: {computerVal}
                </Text>
                <Text style={styles.scoreTextPlayer}>
                    Your Score: {playerScore}
                </Text>
                <Text style={styles.scoreTextComputer}>
                    Computer Score: {compScore}
                </Text>
            </View>
            {(wicket) && <Text style={styles.match_scene}>WICKET</Text>}

            <Text style={styles.match_result_scene}>{result}</Text>
        </View>
    );
}

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1, // Take full height
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "#333", // Dark background
        color: "#fff", // Text color
    },
    title: {
        fontSize: 28, // Large font size
        marginBottom: 20, // Space below title
        color: "#4caf50", // Green color
        fontWeight: "bold", // Bold text
        textTransform: "uppercase", // Uppercase letters
    },

    match_scene: {
        fontSize: 20, // Large font size
        marginBottom: 20, // Space below title
        color: "#FFFF00", // Yellow color
        fontWeight: "bold", // Bold text
        textTransform: "uppercase", // Uppercase letters
    },

     match_result_scene: {
        fontSize: 20, // Large font size
        marginBottom: 20, // Space below title
        color: "#00ffffa7", // Light Blue Colour
        fontWeight: "bold", // Bold text
        textTransform: "uppercase", // Uppercase letters
        textAlign:"center",
    },

    toss_scene: {
        fontSize: 20, // Large font size
        marginBottom: 20, // Space below title
        color: "#009dffff", // Sky Blue color
        fontWeight: "bold", // Bold text
        textTransform: "uppercase", // Uppercase letters
        textAlign:"center",
    },

    buttonContainer: {
        flexDirection: "row", // Arrange buttons in a row
        justifyContent: "space-between", // Space between buttons
        marginVertical: 10, // Vertical margin
    },

     buttonContainerforsettings: {
        flexDirection: "row", // Arrange buttons in a row
        justifyContent: "space-between", // Space between buttons
        marginHorizontal:90 , // Vertical margin
    },


    button: {
        backgroundColor: "#4caf50", // Green background
        paddingVertical: 12, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        borderRadius: 8, // Rounded corners
        marginHorizontal: 40, // Space between buttons
    },
    buttonText: {
        color: "#fff", // White text
        fontSize: 18, // Medium font size
        fontWeight: "bold", // Bold text
    },
    scoreContainer: {
        marginTop: 20, // Space above scores
        alignItems: "center", // Center align
    },
    choiceTextPlayer: {
        color: "#f63d33ff", // Navy Red Text
        fontSize:  22, // Font size
        marginBottom: 10, // Space below each score
        textAlign: "center", // Centered text
    },
    choiceTextComputer: {
        color: "#ebb736ff", // Golden text
        fontSize:  22, // Font size
        marginBottom: 10, // Space below each score
        textAlign: "center", // Centered text
    },
    scoreTextPlayer: {
        color: "#d70ed1ff", // Pink text
        fontSize:  30, // Font size
        marginBottom: 10, // Space below each score
        textAlign: "center", // Centered text
    },
    scoreTextComputer: {
        color: "#8be02aff", // Grass Green text
        fontSize:  30, // Font size
        marginBottom: 10, // Space below each score
        textAlign: "center", // Centered text
    },

    modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },

  buttonforguide: {
   borderRadius: 20,
   padding: 10,
   elevation: 2,
   marginHorizontal: 60,
   marginBottom:40,
  },

  buttonforclosing: {
   borderRadius: 20,
   padding: 10,
   elevation: 2,
   marginHorizontal: 60,
  },



  buttonOpen: {
    backgroundColor: '#7880caff',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
    
});

// Export the App component as default
export default App;












