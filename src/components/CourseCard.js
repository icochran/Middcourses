import styles from '../styles/Home.module.css';

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
    <div class={styles.classBox}>
        <div class={styles.className}>
            <span>{courseName}</span>
        </div>


        <div class={styles.courseBody}>
            <div class={styles.difficulty}>
                <div class="difficultyName">
                    <p>Difficulty</p>
                </div>
                <div class={styles.difficultyBarBackground}> 
                    <span class={styles.difficultyBar} style={difficultyBarStyle}>
                    </span>
                </div>
            </div>

            <div class={styles.interesting}>
                <div class="interesting-name">
                    <p>Interesting</p>
                </div>
                <div class={styles.interestingBarBackground}>
                    <span class={styles.interestingBar} style={interestingBarStyle}>
                    </span>
                </div>
            </div>

            <div class="timecommitment">
                <div class="timecommitment-name">
                    <p>Time Commitment</p>
                </div>
                <div class="timecommitment-bar-wrapper">
                    <div class={styles.timecommitmentBarBackground}>
                        <span class={styles.timecommitmentBar} style={timeCommitmentBarStyle}>
                        </span>
                    </div>
                    <div class={styles.timecommitmentBarNumber}> 5 hours
                    </div>
                </div>
            </div>
        </div>
    </div>        
        );
}