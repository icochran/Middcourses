import styles from "../styles/Home.module.css";

export default function CourseCard({course}) {
    
    //for now we are just using the array of the first professor, though there are multiple
    const difficultyArray = course.profs[0].difficulty;
    const interestingArray = course.profs[0].interest;
    const timeCommitmentArray = course.profs[0].time_commitment;

    const courseName = course.class_name;
    const courseDifficulty = (difficultyArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(difficultyArray.length)*10;
    const courseInteresting = (interestingArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(interestingArray.length)*10;
    const courseTimeCommitment = (timeCommitmentArray.reduce((previousValue, currentValue) => previousValue + currentValue))/(timeCommitmentArray.length)*10;

    const difficultyBarStyle = {
        width: `${courseDifficulty}%`,
        background: "#47b5ff"
    }
    const interestingBarStyle = {
        width:`${courseInteresting}%`,
        background: "#47b5ff"
    }
    const timeCommitmentBarStyle = {
        width:`${courseTimeCommitment}%`,
        background: "#47b5ff"
    }

    return(
    <div className={styles.classBox}>
        <div className={styles.className}>
            <span>{courseName}</span>
        </div>


        <div className={styles.courseBody}>
            <div className={styles.difficulty}>
                <div className="difficultyName">
                    <p>Difficulty</p>
                </div>
                <div className={styles.difficultyBarBackground}> 
                    <span className={styles.difficultyBar} style={difficultyBarStyle}/>
                </div>
            </div>

            <div className={styles.interesting}>
                <div className="interesting-name">
                    <p>Interesting</p>
                </div>
                <div className={styles.interestingBarBackground}>
                    <span className={styles.interestingBar} style={interestingBarStyle}/>
                </div>
            </div>

            <div className="timecommitment">
                <div className="timecommitment-name">
                    <p>Time Commitment</p>
                </div>
                <div className="timecommitment-bar-wrapper">
                    <div className={styles.timecommitmentBarBackground}>
                        <span className={styles.timecommitmentBar} style={timeCommitmentBarStyle}/>
                    </div>
                    <div className={styles.timecommitmentBarNumber}> 5 hours
                    </div>
                </div>
            </div>
        </div>
    </div>        
        );
}